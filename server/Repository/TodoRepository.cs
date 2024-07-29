using DAL;
using Microsoft.EntityFrameworkCore;
using Model;
using Repository.Common;

namespace Repository;

public class TodoRepository : ITodoRepository
{
    private readonly TodoDbContext _todoDb;

    public TodoRepository(TodoDbContext todoDb)
    {
        _todoDb = todoDb;
    }

    public async Task CreateTodoAsync(Todo todo)
    {
        await _todoDb.Todos.AddAsync(todo);
    }

    public async Task UpdateTodoAsync(Todo todo, Todo newTodo)
    {
        await Task.Run(() => _todoDb.Entry(todo).CurrentValues.SetValues(newTodo));
    }

    public async Task DeleteTodoAsync(Todo todo)
    {
        await Task.Run(() => _todoDb.Todos.Remove(todo));
    }

    public async Task<Todo?> ReadTodoAsync(Guid todoId, Guid userId)
    {
        return await _todoDb.Todos.Where(t => t.Id == todoId).Where(t => t.UserId == userId).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Todo>> ReadTodosAsync(Guid userId)
    {
        return await _todoDb.Todos.Where(t => t.UserId == userId).ToListAsync();
    }
}