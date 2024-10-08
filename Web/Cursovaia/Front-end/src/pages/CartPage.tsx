import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../components/ConfirmDialog';

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogDescription, setDialogDescription] = useState('');

    const fetchCart = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found');
            }

            const response = await axios.get(`https://localhost:7009/api/Cart/${userId}`);
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const removeItem = async (itemId: number) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found');
            }

            await axios.delete(`https://localhost:7009/api/Cart/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${userId}`
                }
            });
            fetchCart();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found');
            }

            await axios.delete(`https://localhost:7009/api/Cart/clear/${userId}`);
            fetchCart();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleOrder = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found');
            }

            if (cartItems.length === 0) {
                setDialogTitle('Корзина пуста');
                setDialogDescription('Нет товаров для оформления заказа.');
                setIsDialogOpen(true);
                return;
            }

            const response = await axios.post(`https://localhost:7009/api/Order/add/${userId}`);

            if (response.data.success) {
                setDialogTitle('Заказ оформлен');
                setDialogDescription('Ваш заказ был успешно оформлен!');
                clearCart();
            } else {
                setDialogTitle('Недостаточно товара');
                setDialogDescription('Один или несколько товаров недостаточно на складе.');
            }
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error processing order:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Ваша корзина
            </Typography>
            <Grid container spacing={2}>
                {cartItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://localhost:7009/${item.item.imagePath}`}
                                alt={item.item.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.item.name}
                                </Typography>
                                <Typography variant="body1">
                                    Цена: {item.item.price} ₽ 
                                </Typography>
                                <Typography variant="body1">
                                    Количество: {item.quantity}
                                </Typography>
                                <IconButton onClick={() => removeItem(item.itemId)}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {cartItems.length > 0 && (
                <Button variant="contained" color="secondary" onClick={clearCart} style={{ marginTop: '20px' }}>
                    Очистить корзину
                </Button>
            )}
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleOrder}>
                ОФОРМИТЬ ЗАКАЗ
            </Button>
            <ConfirmDialog
                open={isDialogOpen}
                title={dialogTitle}
                description={dialogDescription}
                onConfirm={() => setIsDialogOpen(false)}
                onCancel={() => setIsDialogOpen(false)}
            />
        </Container>
    );
};

export default CartPage;
