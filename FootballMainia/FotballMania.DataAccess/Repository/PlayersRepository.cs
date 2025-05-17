using FootballMania.DataAccess.Data;
using FootballMania.Models;
using FootballMania.DataAccess.Repository.IRepository;

namespace FootballMania.DataAccess.Repository
{
    public class PlayersRepository:Repository<PlayersItem>,IPlayersRepository
    {
        private ApplicationDbContext _db;
        public PlayersRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(PlayersItem obj)
        {
            _db.Players.Update(obj);
        }
    }
}
