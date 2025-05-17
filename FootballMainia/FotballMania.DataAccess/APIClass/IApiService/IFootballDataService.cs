using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballMania.DataAccess.APIClass.IApiService
{
    public interface IFootballDataService
    {
        Task<string> GetCompetitionsAsync();
    }
}
