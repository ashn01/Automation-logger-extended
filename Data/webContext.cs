using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Automation_logger_extended.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace Automation_logger_extended.Data
{
    public class webContext : DbContext
    {
        public webContext(DbContextOptions options) : base(options) { }
        public DbSet<Template> Templates { get; set; }
        public DbSet<TestScript> TestCases { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<Panel> Panels { get; set; } 
        public DbSet<TestStep> TestSteps { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // relationship between Template and TestResult
            // reference key
            builder.Entity<Template>()
                .HasMany<TestResult>(template => template.TestResults) // Template contains many TestResults
                .WithOne(testResult => testResult.Template) // testTestResultResult has one Template
                .HasForeignKey(TestResult => TestResult.TemplateId) // TestResult has a foreignKey
                .IsRequired(); // is required

            // relationship between TestCase and TestResult
            // reference key
            builder.Entity<TestScript>()
                .HasMany<TestResult>(testScript => testScript.TestResults) // TestCase contains many TestResults
                .WithOne(testResult => testResult.TestCase) // TestResult has one TestCase
                .HasForeignKey(testResult => testResult.TestScriptId) // TestResult has a foreignKey
                .IsRequired(); // is required


            builder.Entity<Template>()
                .HasMany<Panel>(panel => panel.Panels) // Template contains many TestResults
                .WithOne(panel => panel.Template) // testTestResultResult has one Template
                .HasForeignKey(panel => panel.TemplateId) // TestResult has a foreignKey
                .IsRequired(); // is required

            builder.Entity<TestScript>()
                .HasMany<Panel>(panel => panel.Panels) // TestCase contains many TestResults
                .WithOne(panel => panel.TestCase) // TestResult has one TestCase
                .HasForeignKey(panel => panel.TestScriptId) // TestResult has a foreignKey
                .IsRequired(); // is required
        }
    }
}
