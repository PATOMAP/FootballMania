using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballMania.DataAccess.APIClass.Mateches
{
    public class League
    {
        public string LeagueName { get; set; }
        public string LeagueImg { get; set; }
        private List<Match> _matches;
        public List<Match> Matches
        {
            get
            {
                return _matches;
            }
            set
            {
                if (_matches == null)
                {
                    _matches = new List<Match>();
                }
                _matches = value;
            }
        }
    }
}
