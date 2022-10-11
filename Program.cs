using Automation_logger_extended.Data;
using Automation_logger_extended.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using AutoMapper;
using Automation_logger_extended.Mappings;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
});
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<webContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectiion"));
});

builder.Services.AddAutoMapper(typeof(MapperProfile));

builder.Services.AddScoped<ITestScriptRepository, TestScriptRepository>();
builder.Services.AddScoped<ITemplateRepository, TemplateRepository>();
builder.Services.AddScoped<ITestResultRepository, TestResultRepository>();
builder.Services.AddScoped<ITestStepRepository, TestStepRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

//app.UseEndpoints(endpoints =>
//{
//    //endpoints.MapControllerRoute(
//    //name: "default",
//    //pattern: "{controller}/{action=Index}/{id?}");
//    endpoints.MapControllers();
//});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

//app.MapControllers();

//app.MapFallbackToFile("index.html"); ;

app.Run();

/*
 *  After adding a controller, setupProxy.js also have to be updated
 */