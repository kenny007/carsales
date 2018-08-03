using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using playground.Controllers.Resources;
using playground.Models;
using playground.Persistence;

namespace playground.Controllers
{
    public class FeaturesController
    {

    private readonly VegaDbContext context;
    private readonly IMapper mapper;
    public FeaturesController(VegaDbContext context, IMapper mapper)
    {
      this.mapper = mapper;
      this.context = context;
    }

    [HttpGet("/api/features")]
    public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
    {
      var features = await context.Features.ToListAsync();
      
      return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features); 
    }
    }
}