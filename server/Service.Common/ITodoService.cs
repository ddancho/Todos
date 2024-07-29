using Common;
using Common.Todo;
using Model;

namespace Service.Common;

public interface ITodoService
{
    Task<ApiResponse> CreateTodoAsync(CreateTodoResource todoResource);
    Task<ApiResponse> UpdateTodoAsync(UpdateTodoResource todoResource);
    Task<ApiResponse> DeleteTodoAsync(DeleteTodoResource todoResource);
    Task<IEnumerable<Todo>> GetTodosAsync(Guid userId);
    Task<Todo?> GetTodoAsync(Guid todoId, Guid userId);
}