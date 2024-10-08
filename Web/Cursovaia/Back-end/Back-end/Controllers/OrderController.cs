using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Back_end.Models;
using System.Collections.Generic;
using Mysqlx.Crud;
using MySqlX.XDevAPI.Common;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ShopContext _context;

        public OrderController(ShopContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUserOrderItems(int userId)
        {
            // Получаем все заказы пользователя
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .ToListAsync();

            if (orders == null || !orders.Any())
            {
                return NotFound("Заказы не найдены для данного пользователя.");
            }

            // Получаем все orderItems, связанные с этими заказами
            var orderIds = orders.Select(o => o.Id).ToList();
            var orderItems = await _context.OrderItems
                .Where(oi => orderIds.Contains(oi.OrderId))
                .ToListAsync();

            // Получаем все продукты, связанные с заказами
            var productIds = orderItems.Select(oi => oi.ItemId).Distinct().ToList();
            var products = await _context.Items
                .Where(p => productIds.Contains(p.Id))
                .ToListAsync();

            // Формируем результат, связывая заказы, элементы заказа и продукты
            var result = orders.Select(o => new
            {
                OrderId = o.Id,
                Items = orderItems
                    .Where(oi => oi.OrderId == o.Id)
                    .Select(oi => new
                    {
                        ItemId = oi.ItemId,
                        ProductName = products.FirstOrDefault(p => p.Id == oi.ItemId)?.Name,
                        Quantity = oi.Quantity
                    })
            });
            return Ok(result);
        }



        // HTTP POST method for creating an order
        [HttpPost("add/{userId}")]
        public async Task<IActionResult> Order(int userId)
        {
            // Get the cart items for the user

            var cartID = await _context.Carts.FirstOrDefaultAsync(ci => ci.UserId == userId);
            var cartItems = await _context.CartItems
                .Where(ci => ci.CartId == cartID.Id)
                .ToListAsync();

            if (cartItems == null || !cartItems.Any())
            {
                return BadRequest("Корзина пуста.");
            }

            // Получаем список идентификаторов продуктов из корзины
            var productIds = await _context.CartItems.Select(ci => ci.ItemId).Distinct().ToListAsync();

            // Получаем информацию о продуктах из таблицы Products
            var products = await _context.Items
                .Where(p => productIds.Contains(p.Id))
                .ToListAsync();

            // Проверяем, что все продукты из корзины существуют
            if (products.Count != productIds.Count)
            {
                return BadRequest("Один или несколько продуктов в корзине не найдены.");
            }

            // Create a new order
            var order = new Back_end.Models.Order
            {
                UserId = userId
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync(); // Save the order to get its ID

            // Создаём записи для OrderItem на основе товаров из корзины
            foreach (var cartItem in cartItems)
            {
                var product = products.FirstOrDefault(p => p.Id == cartItem.ItemId);
                if (product != null)
                {
                    var orderItem = new Back_end.Models.OrderItem // Указываем полное имя класса
                    {
                        OrderId = order.Id,
                        ItemId = cartItem.ItemId,
                        Quantity = cartItem.Quantity
                    };

                    _context.OrderItems.Add(orderItem);
                }
            }

            // Удаляем товары из корзины
            _context.CartItems.RemoveRange(cartItems);

            // Сохраняем все изменения
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Заказ успешно создан", OrderId = order.Id });
        }

        [HttpGet("GetAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            // Получаем все заказы
            var orders = await _context.Orders
                .ToListAsync();

            if (orders == null || !orders.Any())
            {
                return NotFound("Заказы не найдены.");
            }

            // Получаем все элементы заказов (OrderItems), связанные с заказами
            var orderIds = orders.Select(o => o.Id).ToList();
            var orderItems = await _context.OrderItems
                .Where(oi => orderIds.Contains(oi.OrderId))
                .ToListAsync();

            var userIds = orders.Select(o => o.UserId).ToList();
            var users = await _context.Users
                .Where(u => userIds.Contains(u.Id))
                .ToListAsync();


            // Получаем все продукты, связанные с элементами заказов
            var productIds = orderItems.Select(oi => oi.ItemId).Distinct().ToList();
            var products = await _context.Items
                .Where(p => productIds.Contains(p.Id))
                .ToListAsync();
            
            
            // Формируем результат, связывая заказы, элементы заказов и продукты
            var result = orders.Select(o => new
            {
                OrderId = o.Id,
                Login = users.FirstOrDefault(u => u.Id == o.UserId)?.Login,
                Items = orderItems
                    .Where(oi => oi.OrderId == o.Id)
                    .Select(oi => new
                    {
                        ItemId = oi.ItemId,
                        ProductName = products.FirstOrDefault(p => p.Id == oi.ItemId)?.Name,
                        Quantity = oi.Quantity,
                    })
            });

            return Ok(result);
        }

    }
}
