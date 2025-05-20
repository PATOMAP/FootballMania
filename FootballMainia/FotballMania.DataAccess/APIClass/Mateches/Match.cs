using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballMania.DataAccess.APIClass.Mateches
{

        public class Match
        {
            public int Id { get; set; }
            public string Team1 { get; set; }
            public string Team2 { get; set; }

            public string Team1Img { get; set; }
            public string Team2Img { get; set; }

            public DateTime Date { get; set; }
            public string Status { get; set; }

            public string Result { get; set; }
        }
    }

