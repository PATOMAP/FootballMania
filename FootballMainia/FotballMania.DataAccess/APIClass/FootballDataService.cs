using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FootballMania.DataAccess.APIClass.IApiService;

namespace FootballMania.DataAccess.APIClass
{
    public class FootballDataService : IFootballDataService
    {
        private readonly HttpClient _httpClient;

        public FootballDataService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetCompetitionsAsync()
        {
            var response = await _httpClient.GetAsync("https://api.football-data.org/v4/matches");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }
}
