using Model;

namespace Repository.Common;

public interface ITodoRepository
{
    Task CreateTodoAsync(Todo todo);
    Task UpdateTodoAsync(Todo todo, Todo newTodo);
    Task DeleteTodoAsync(Todo todo);
    Task<Todo?> ReadTodoAsync(Guid todoId, Guid userId);
    Task<IEnumerable<Todo>> ReadTodosAsync(Guid userId);
}