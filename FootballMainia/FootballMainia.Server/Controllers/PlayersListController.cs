using FootballMania.DataAccess.Data;
using FootballMania.Models;
using FootballMania.DataAccess.Repository;
using FootballMania.DataAccess.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FootballMainia.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayersListController : ControllerBase
    {
        //private readonly ApplicationDbContext _db;
        private readonly IUnitOfWork _unitOfWork;
        public PlayersListController(IUnitOfWork db)
        {
            _unitOfWork = db;
 
        }

        [HttpGet("getAllPlayers")]
        public async Task<ActionResult<IEnumerable<PlayersItem>>> GetAllPlayers()
        {
            var players = await _unitOfWork.Players.GetAllAsync();//_db.Players.ToListAsync()
            return Ok(players);
        }
        [HttpPost("savePlayer")]
        public IActionResult SavePlayer([FromBody] PlayersItem player)
        {
            if (player == null)
                return BadRequest("Brak danych");

            _unitOfWork.Players.Update(player);//aktualizacja danych _db.Players.Update(player)
            _unitOfWork.Save();//zapisanie informacji w bazie danych _db.SaveChanges()

            return Ok("Zapisano pomyślnie");
        }
        [HttpPost("addPlayer")]
        public IActionResult AddPlayer([FromBody] PlayersItem player)
        {
            if (player == null)
                return BadRequest("Brak danych");

            _unitOfWork.Players.Add(player);//aktualizacja danych _db.Players.Add(player)
            _unitOfWork.Save();//zapisanie informacji w bazie danych _db.SaveChanges()

            return Ok("Dodano pomyślnie");
        }
        [HttpPost("deletePlayer")]
        public IActionResult DeletePlayer([FromBody] PlayersItem player)
        {
            if (player == null)
                return BadRequest("Brak danych");

            _unitOfWork.Players.Remove(player);//aktualizacja danych _db.Players.Remove(player)
            _unitOfWork.Save();//zapisanie informacji w bazie danych _db.SaveChanges()

            return Ok("Usunięto pomyślnie");
        }
    }
}
