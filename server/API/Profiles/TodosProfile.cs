using AutoMapper;
using Common.Todo;
using Common.User;
using Model;

namespace Api.Profiles;

public class TodosProfile : Profile
{
    public TodosProfile()
    {
        // User
        CreateMap<RegisterUserDto, RegisterUserResource>();
        CreateMap<LoginUserDto, LoginUserResource>();
        CreateMap<User, LoginUserResponse>();

        // Todo
        CreateMap<CreateTodoDto, CreateTodoResource>();
        CreateMap<UpdateTodoDto, UpdateTodoResource>();
        CreateMap<Todo, TodoResponseDto>()
        .ForMember(dest => dest.CreatedAt, o => o.MapFrom(src => src.CreatedAt.ToString("dd-MM-yyyy")))
        .ForMember(dest => dest.UpdatedAt, o => o.MapFrom(src => src.UpdatedAt.ToString("dd-MM-yyyy")));
    }
}