using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
    [Table("Cart")]
    public class Cart
    {
        [Key]
        [Column("idcart")]
        public int Id { get; set; } 

        [Required]
        [Column("user_id")]
        public int UserId { get; set; }
    }
}
