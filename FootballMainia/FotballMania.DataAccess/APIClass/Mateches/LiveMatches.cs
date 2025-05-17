using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FootballMania.DataAccess.Repository.JsonClassDeserialize;
namespace FootballMania.DataAccess.APIClass.Mateches
{

    public class LiveMatches:ILiveMatches 
    {

        private List<League> _leagueList;
        
        public LiveMatches(List<MatchFromApi>matches)
        {

            _leagueList = new List<League>();
            CreateLeagueList(matches);
        }
        private void CreateLeagueList(List<MatchFromApi> matches)
        {
            foreach(var match in matches)
            {
                League league;
                if (_leagueList.Any(p=>p.LeagueName==match.Competition.Name))
                {
                    league = _leagueList.FirstOrDefault(p => p.LeagueName == match.Competition.Name);
                }
                else
                {
                    league = new League();
                    league.LeagueName = match.Competition.Name;
                    league.LeagueImg = match.Area.Flag;
                    league.Matches = new List<Match>();
                }
                Match match1 = new Match();
                match1.Team1 = match.HomeTeam.Name;
                match1.Team2 = match.AwayTeam.Name;
                match1.Team1Img = match.HomeTeam.Tla;
                match1.Team2Img = match.AwayTeam.Tla;
                match1.Result = match.Score.FullTime.Home + ":" + match.Score.FullTime.Away;
                match1.Date = match.UtcDate;
                match1.Status = match.Status;
                league.Matches.Add(match1);

                if (!_leagueList.Any(p => p.LeagueName == match.Competition.Name))
                    _leagueList.Add(league);
            }

        }

        public IEnumerable<League> GetAll()
        {
            return _leagueList;
        }

        public League GetLegue(string name)
        {
            throw new NotImplementedException();
        }

        public Match GetMatch(string name)
        {
            throw new NotImplementedException();
        }
    }
}
