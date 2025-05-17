using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballMania.DataAccess.APIClass.Mateches
{
    public interface ILiveMatches
    {

        IEnumerable <League> GetAll();
        League GetLegue (string name);
        Match GetMatch(string name);
    }
}
