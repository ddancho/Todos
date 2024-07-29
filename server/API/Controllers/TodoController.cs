using Api.Profiles;
using API.Auth;
using API.Validations;
using AutoMapper;
using Common.Todo;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Service.Common;

namespace API.Controllers;

[ApiController]
[Route("api/todos")]
[ServiceFilter(typeof(ApiKeyAuthFilter))]
public class TodoController : ControllerBase
{
    private readonly ITodoService _todoService;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TodoController(ITodoService todoService, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        _todoService = todoService;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public async Task<IActionResult> GetTodos()
    {
        var user = Utils.GetUser(_httpContextAccessor);
        if (user == null)
        {
            return Unauthorized();
        }

        var todos = await _todoService.GetTodosAsync(user.Id);

        var todosResponse = _mapper.Map<List<TodoResponseDto>>(todos);

        return Ok(todosResponse);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetTodo(Guid id)
    {
        var user = Utils.GetUser(_httpContextAccessor);
        if (user == null)
        {
            return Unauthorized();
        }

        var todo = await _todoService.GetTodoAsync(id, user.Id);

        var todoResponse = _mapper.Map<TodoResponseDto>(todo);

        return Ok(todoResponse);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateTodo(
        CreateTodoDto createTodoDto,
        [FromServices] IValidator<CreateTodoDto> validator
    )
    {
        var user = Utils.GetUser(_httpContextAccessor);
        if (user == null)
        {
            return Unauthorized();
        }

        var validationResult = validator.Validate(createTodoDto);
        if (!validationResult.IsValid)
        {
            var modelStateDictionary = ValidationProblemError.Response(validationResult);

            return ValidationProblem(modelStateDictionary);
        }

        var todoResource = _mapper.Map<CreateTodoResource>(createTodoDto);

        todoResource.UserId = user.Id;

        var apiResponse = await _todoService.CreateTodoAsync(todoResource);

        return Ok(apiResponse.Response);
    }

    [HttpPut("update/{id:guid}")]
    public async Task<IActionResult> UpdateTodo(
        Guid id,
        UpdateTodoDto updateTodoDto,
        [FromServices] IValidator<UpdateTodoDto> validator
    )
    {
        var user = Utils.GetUser(_httpContextAccessor);
        if (user == null)
        {
            return Unauthorized();
        }

        var validationResult = validator.Validate(updateTodoDto);
        if (!validationResult.IsValid)
        {
            var modelStateDictionary = ValidationProblemError.Response(validationResult);

            return ValidationProblem(modelStateDictionary);
        }

        var todoResource = _mapper.Map<UpdateTodoResource>(updateTodoDto);
        todoResource.Id = id;

        todoResource.UserId = user.Id;

        var apiResponse = await _todoService.UpdateTodoAsync(todoResource);

        return Ok(apiResponse.Response);
    }

    [HttpPost("delete/{id:guid}")]
    public async Task<IActionResult> DeleteTodo(Guid id)
    {
        var user = Utils.GetUser(_httpContextAccessor);
        if (user == null)
        {
            return Unauthorized();
        }

        DeleteTodoResource todoResource = new DeleteTodoResource(id, user.Id);

        var apiResponse = await _todoService.DeleteTodoAsync(todoResource);

        return Ok(apiResponse.Response);
    }
}