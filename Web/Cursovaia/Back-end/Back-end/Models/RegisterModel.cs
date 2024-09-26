using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class RegisterModel
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
