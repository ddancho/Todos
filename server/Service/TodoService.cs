using Common;
using Common.Todo;
using Model;
using Repository.Common;
using Service.Common;

namespace Service;

public class TodoService : ITodoService
{
    private readonly ITodoRepository _todoRepository;
    private readonly IUnitOfWork _unitOfWork;

    public TodoService(ITodoRepository todoRepository, IUnitOfWork unitOfWork)
    {
        _todoRepository = todoRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ApiResponse> CreateTodoAsync(CreateTodoResource todoResource)
    {
        Todo todo = new Todo(todoResource.Title, todoResource.Content, todoResource.IsDone, todoResource.UserId);

        try
        {
            await _todoRepository.CreateTodoAsync(todo);
            await _unitOfWork.CommitUnitOfWorkAsync();

            return new ApiResponse("success", "Todo is created successfully");
        }
        catch (System.Exception)
        {
            return new ApiResponse(null, "Ups, something went wrong, try again later");
        }
    }

    public async Task<ApiResponse> UpdateTodoAsync(UpdateTodoResource todoResource)
    {
        var todo = await _todoRepository.ReadTodoAsync(todoResource.Id, todoResource.UserId);
        if (todo == null)
        {
            return new ApiResponse(null, "Ups, something went wrong, try again later");
        }

        try
        {
            todo.UpdateDateTime();
            await _todoRepository.UpdateTodoAsync(todo, todo.UpdateTodo(todoResource.IsDone));
            await _unitOfWork.CommitUnitOfWorkAsync();

            return new ApiResponse("success", "Todo is updated successfully");
        }
        catch (System.Exception)
        {
            return new ApiResponse(null, "Ups, something went wrong, try again later");
        }
    }

    public async Task<ApiResponse> DeleteTodoAsync(DeleteTodoResource todoResource)
    {
        var todo = await _todoRepository.ReadTodoAsync(todoResource.Id, todoResource.UserId);
        if (todo == null)
        {
            return new ApiResponse(null, "Ups, something went wrong, try again later");
        }

        try
        {
            await _todoRepository.DeleteTodoAsync(todo);
            await _unitOfWork.CommitUnitOfWorkAsync();

            return new ApiResponse("success", "Todo is deleted successfully");
        }
        catch (System.Exception)
        {
            return new ApiResponse(null, "Ups, something went wrong, try again later");
        }
    }

    public async Task<IEnumerable<Todo>> GetTodosAsync(Guid userId)
    {
        return await _todoRepository.ReadTodosAsync(userId);
    }

    public async Task<Todo?> GetTodoAsync(Guid todoId, Guid userId)
    {
        return await _todoRepository.ReadTodoAsync(todoId, userId);
    }
}