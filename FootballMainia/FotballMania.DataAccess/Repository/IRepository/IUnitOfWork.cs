using FootballMania.DataAccess.APIClass.IApiService;

namespace FootballMania.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        IPlayersRepository Players { get; }
        IFootballDataService FootballDataService { get; }
        void Save();

    }
}
