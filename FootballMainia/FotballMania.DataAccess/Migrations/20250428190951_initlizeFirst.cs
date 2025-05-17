using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballMania.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class initlizeFirst : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    player_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    number = table.Column<int>(type: "int", nullable: false),
                    full_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    position = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    age = table.Column<int>(type: "int", nullable: false),
                    nationality = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    current_club = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    previous_club = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    market_value = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    height = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.player_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Players");
        }
    }
}
