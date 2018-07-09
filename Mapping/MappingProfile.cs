using AutoMapper;
using playground.Controllers.Resources;
using playground.Models;

namespace playground.Mapping
{
    public class MappingProfile : Profile
    {    
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
            //These maps are unidirectional just Make to MakeResource           
        }
    }
}