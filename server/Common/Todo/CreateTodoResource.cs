namespace Common.Todo;

public class CreateTodoResource
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsDone { get; set; } = false;
    public Guid UserId { get; set; }
}