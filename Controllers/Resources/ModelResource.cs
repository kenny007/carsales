namespace playground.Controllers.Resources
{
    public class ModelResource
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // public Make Make { get; set; } //this is what is causing the loop in the JSON object
        // public int MakeId { get; set; }
    }
}