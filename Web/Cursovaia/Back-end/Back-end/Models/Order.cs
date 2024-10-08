using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
    [Table("Orders")]
    public class Order
    {
        [Key]
        [Column("idorder")]
        public int Id { get; set; }

        [Required]
        [Column("user_id")]
        public int UserId { get; set; }
    }
}
