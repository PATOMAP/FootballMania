using FootballMainia.Server.Data;
using FootballMainia.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FootballMainia.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayersListController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public PlayersListController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayersItem>>> GetAllPlayers()
        {
            var players = await _db.Players.ToListAsync();
            return players;
        }
    }
}
