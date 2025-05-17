using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace FootballMania.Models
{
    public class PlayersItem
    {
        [Key]
        public int player_id { get; set; }
        [Required]
        [Range(1, 100, ErrorMessage = "Too long")]
        [DisplayName("Number")]
        public int number { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Too Long")]
        [DisplayName("Full name")]
        public string full_name { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Too Long")]
        [DisplayName("Position")]
        public string position { get; set; }

        [Required]
        [Range(1, 50, ErrorMessage = "Too long")]
        [DisplayName("Age")]
        public int age { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Too Long")]
        [DisplayName("Nationality")]
        public string nationality { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Too Long")]
        [DisplayName("Current club")]
        public string current_club { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Too Long")]
        [DisplayName("Previous club")]
        public string previous_club { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Too Long")]
        [DisplayName("Market value")]
        public string market_value { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage = "Too Long")]
        [DisplayName("Height")]
        public string height { get; set; }
    }
}
