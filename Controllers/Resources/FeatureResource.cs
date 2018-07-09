using System.ComponentModel.DataAnnotations;

namespace playground.Controllers.Resources
{
    public class FeatureResource
    {  
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
    }
}