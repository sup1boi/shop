using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("idusers")]
        public int Id { get; set; }

        [Required]
        [Column("login")]
        public string Login { get; set; }

        [Required]
        [Column("password")]
        public string Password { get; set; }

        [Required]
        [Column("role")]
        public string Role { get; set; }
    }
}