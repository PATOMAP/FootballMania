using System.Collections;
using System.Linq.Expressions;

namespace FootballMania.DataAccess.Repository.IRepository
{
    public interface IRepository <T> where T : class
    {
        T Get(Expression<Func<T, bool>> filter);
        Task<IEnumerable<T>> GetAllAsync();
        void Add(T entity);
        void Remove(T entity);
    }

}
