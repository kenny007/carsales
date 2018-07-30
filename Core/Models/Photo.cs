using System.ComponentModel.DataAnnotations;

namespace playground.Core.Models
{
    public class Photo
    {
       public int Id { get; set; }
       [Required]
       [StringLength(255)]
       public int FileName { get; set; }

    }
}