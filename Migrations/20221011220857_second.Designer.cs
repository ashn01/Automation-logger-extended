﻿// <auto-generated />
using System;
using Automation_logger_extended.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Automation_logger_extended.Migrations
{
    [DbContext(typeof(webContext))]
    [Migration("20221011220857_second")]
    partial class second
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Automation_logger_extended.Models.Panel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<int>("TemplateId")
                        .HasColumnType("int");

                    b.Property<int>("TestScriptId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TemplateId");

                    b.HasIndex("TestScriptId");

                    b.ToTable("Panels");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.Template", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Templates");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.TestActionValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DefaultValue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TestStepId")
                        .HasColumnType("int");

                    b.Property<int>("order")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TestStepId");

                    b.ToTable("TestActionValues");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.TestResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetimeoffset");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<int>("TemplateId")
                        .HasColumnType("int");

                    b.Property<int>("TestScriptId")
                        .HasColumnType("int");

                    b.Property<string>("Version")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("TemplateId");

                    b.HasIndex("TestScriptId");

                    b.ToTable("TestResults");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.TestScript", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("TestScripts");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.TestStep", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Action")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TestSteps");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.Panel", b =>
                {
                    b.HasOne("Automation_logger_extended.Models.Template", "Template")
                        .WithMany("Panels")
                        .HasForeignKey("TemplateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Automation_logger_extended.Models.TestScript", "TestScript")
                        .WithMany("Panels")
                        .HasForeignKey("TestScriptId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Template");

                    b.Navigation("TestScript");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.TestActionValue", b =>
                {
                    b.HasOne("Automation_logger_extended.Models.TestStep", "TestStep")
                        .WithMany("TestActionValues")
                        .HasForeignKey("TestStepId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TestStep");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.TestResult", b =>
                {
                    b.HasOne("Automation_logger_extended.Models.Template", "Template")
                        .WithMany("TestResults")
                        .HasForeignKey("TemplateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Automation_logger_extended.Models.TestScript", "TestScript")
                        .WithMany("TestResults")
                        .HasForeignKey("TestScriptId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Template");

                    b.Navigation("TestScript");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.Template", b =>
                {
                    b.Navigation("Panels");

                    b.Navigation("TestResults");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.TestScript", b =>
                {
                    b.Navigation("Panels");

                    b.Navigation("TestResults");
                });

            modelBuilder.Entity("Automation_logger_extended.Models.TestStep", b =>
                {
                    b.Navigation("TestActionValues");
                });
#pragma warning restore 612, 618
        }
    }
}
