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
        public DbSet<TestScript> TestScripts { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<Panel> Panels { get; set; }
        public DbSet<TestStep> TestSteps { get; set; }
        public DbSet<TestActionValue> TestActionValues { get; set; }

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

            // relationship between TestScript and TestResult
            // reference key
            builder.Entity<TestScript>()
                .HasMany<TestResult>(testScript => testScript.TestResults) // TestScript contains many TestResults
                .WithOne(testResult => testResult.TestScript) // TestResult has one TestScript
                .HasForeignKey(testResult => testResult.TestScriptId) // TestResult has a foreignKey
                .IsRequired(); // is required


            builder.Entity<Template>()
                .HasMany<Panel>(template => template.Panels) // Template contains many TestResults
                .WithOne(panel => panel.Template) // testTestResultResult has one Template
                .HasForeignKey(panel => panel.TemplateId) // TestResult has a foreignKey
                .IsRequired(); // is required

            builder.Entity<TestScript>()
                .HasMany<Panel>(testScript => testScript.Panels) // TestScript contains many TestResults
                .WithOne(panel => panel.TestScript) // TestResult has one TestScript
                .HasForeignKey(panel => panel.TestScriptId) // TestResult has a foreignKey
                .IsRequired(); // is required

            builder.Entity<TestStep>()
                .HasMany<TestActionValue>(testStep => testStep.TestActionValues)
                .WithOne(testActionValue => testActionValue.TestStep)
                .HasForeignKey(testActionValue => testActionValue.TestStepId)
                .IsRequired();
        }
    }
}
