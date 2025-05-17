using FootballMania.DataAccess.Data;
using FootballMania.DataAccess.Repository.IRepository;
using FootballMania.DataAccess.Repository;
using Microsoft.EntityFrameworkCore;
using FootballMania.DataAccess.ConfigureClass;
using Microsoft.Extensions.Options;
using FootballMania.DataAccess.APIClass;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.Configure<FootballApiOptions>(
    builder.Configuration.GetSection("FootballApi"));

builder.Services.AddHttpClient<FootballDataService>((sp, client) =>
{
    var options = sp.GetRequiredService<IOptions<FootballApiOptions>>().Value;
    client.DefaultRequestHeaders.Add("X-Auth-Token", options.Token);
});

builder.Services.AddDbContext<ApplicationDbContext>(options
    => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
