namespace Common.Todo;

public class UpdateTodoResource
{
    public Guid Id { get; set; }
    public bool IsDone { get; set; } = false;
    public Guid UserId { get; set; }
}