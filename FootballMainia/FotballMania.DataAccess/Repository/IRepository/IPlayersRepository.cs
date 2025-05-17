using FootballMania.Models;

namespace FootballMania.DataAccess.Repository.IRepository
{
    public interface IPlayersRepository:IRepository<PlayersItem>
    {
        void Update(PlayersItem player);

    }

}
