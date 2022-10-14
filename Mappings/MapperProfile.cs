using AutoMapper;
using Automation_logger_extended.Models;
using Automation_logger_extended.ViewModels;

namespace Automation_logger_extended.Mappings
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<TestScript, TestScriptViewModel>();
            CreateMap<TestStep, TestStepViewModel>();
            CreateMap<TestStepViewModel, TestStep>();
            CreateMap<TestActionValueViewModel, TestActionValue>();
            CreateMap<TestActionValue, TestActionValueViewModel>();
        }
    }
}
