using System;
using System.Collections.Generic;

namespace FootballMania.DataAccess.Repository.JsonClassDeserialize
{
    /// <summary>
    ///  Class to deserialize the JSON response from the football API for matches.
    /// </summary>
    public class MatchesInfo
    {
        public Filters? Filters { get; set; }
        public ResultSet? ResultSet { get; set; }
        public List<MatchFromApi>? Matches { get; set; }
    }

    public class Filters
    {
        public string? DateFrom { get; set; }
        public string? DateTo { get; set; }
        public string? Permission { get; set; }
    }

    public class ResultSet
    {
        public int Count { get; set; }
        public string? Competitions { get; set; }
        public string? First { get; set; }
        public string? Last { get; set; }
        public int Played { get; set; }
    }

    public class MatchFromApi
    {
        public Area Area { get; set; }
        public Competition? Competition { get; set; }
        public Season? Season { get; set; }
        public int Id { get; set; }
        public DateTime UtcDate { get; set; }
        public string? Status { get; set; }
        public int Matchday { get; set; }
        public string? Stage { get; set; }
        public string? Group { get; set; }
        public DateTime LastUpdated { get; set; }
        public Team? HomeTeam { get; set; }
        public Team? AwayTeam { get; set; }
        public Score? Score { get; set; }
        public Odds? Odds { get; set; }
        public List<object>? Referees { get; set; }
    }

    public class Area
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? Flag { get; set; }
    }

    public class Competition
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? Type { get; set; }
        public string? Emblem { get; set; }
    }

    public class Season
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CurrentMatchday { get; set; }
        public object? Winner { get; set; }
    }

    public class Team
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ShortName { get; set; }
        public string? Tla { get; set; }              // ← tu był CS8618
        public string? Crest { get; set; }
    }

    public class Score
    {
        public string? Winner { get; set; }
        public string? Duration { get; set; }
        public ScoreDetails? FullTime { get; set; }
        public ScoreDetails? HalfTime { get; set; }
    }

    public class ScoreDetails
    {
        public int? Home { get; set; }
        public int? Away { get; set; }
    }

    public class Odds
    {
        public string? Msg { get; set; }
    }
}
