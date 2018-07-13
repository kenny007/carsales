using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace playground.Controllers.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }

        public ModelResource Model { get; set; }
        public bool IsRegistered { get; set; }
        public ContactResource Contact { get; set; }
        public DateTime LastUpdate { get; set; }
 
        public ICollection<VehicleResource> Features { get; set; }

        public VehicleResource()
        {
            Features = new Collection<VehicleResource>();
        }
    }
}