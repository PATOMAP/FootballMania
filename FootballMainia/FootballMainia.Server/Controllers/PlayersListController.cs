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
        [HttpPost("savePlayer")]
        public IActionResult SavePlayer([FromBody] PlayersItem player)
        {
            if (player == null)
                return BadRequest("Brak danych");

            _db.Players.Update(player);//aktualizacja danych
            _db.SaveChanges();//zapisanie informacji w bazie danych

            return Ok("Zapisano pomyślnie");
        }
    }
}
