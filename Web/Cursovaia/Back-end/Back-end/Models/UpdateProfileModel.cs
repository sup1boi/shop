using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class UpdateProfileModel
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
