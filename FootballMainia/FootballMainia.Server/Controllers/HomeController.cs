using FootballMania.DataAccess.Repository.IRepository;
using FootballMania.Models;
using Microsoft.AspNetCore.Mvc;
using FootballMania.DataAccess.Repository.JsonClassDeserialize;
using FootballMania.DataAccess.Repository;
using FootballMania.DataAccess.APIClass.Mateches;
using System.Text.Json;
namespace FootballMainia.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public HomeController(IUnitOfWork db)
        {
            _unitOfWork = db;
        }
        [HttpGet("getAllMatches")]
        public async Task<ActionResult<IEnumerable<MatchesInfo>>> GetAllMatches()
        {
            string json = await _unitOfWork.FootballDataService.GetCompetitionsAsync();
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            MatchesInfo data = JsonSerializer.Deserialize<MatchesInfo>(json, options);
            LiveMatches liveMatches = new LiveMatches(data.Matches);
            var allMatches = liveMatches.GetAll();
            return Ok(data.Matches);
        }
    }
}
