using FootballMania.DataAccess.Data;
using FootballMania.DataAccess.Repository.IRepository;
using FootballMania.DataAccess.Repository.JsonClassDeserialize;
using Microsoft.Extensions.Options;
using System.Text.Json;
using FootballMania.DataAccess.APIClass.IApiService;
using FootballMania.DataAccess.APIClass;
namespace FootballMania.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public IPlayersRepository Players { get; set; }
        public IFootballDataService FootballDataService { get; set; }
        private ApplicationDbContext _db;
        public UnitOfWork(ApplicationDbContext db,FootballDataService footballDataService)
        {
            _db = db;
            Players = new PlayersRepository(_db);
            FootballDataService = footballDataService;

        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
