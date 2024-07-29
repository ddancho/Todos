namespace Common.Todo;

public class TodoResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsDone { get; set; } = false;
    public string CreatedAt { get; set; } = string.Empty;
    public string UpdatedAt { get; private set; } = string.Empty;
}