using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace playground.Models
{
    [Table("Models")]
    public class Model
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public Make Make { get; set; } //navigation property
                      
         public int MakeId { get; set; } //Convention here is nameofparent class with it's property
         //foreign key property to simplify the creating and updating of objects
    }
}