using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
    [Table("Categories")]
    public class Category
    {
        [Key]
        [Column("idcategories")]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; }
    }
}
