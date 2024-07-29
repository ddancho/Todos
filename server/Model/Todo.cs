using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model;

public class Todo
{
    [Key]
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Content { get; private set; } = string.Empty;
    public bool IsDone { get; private set; } = false;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; private set; } = DateTime.UtcNow;
    public Guid? UserId { get; set; }
    [ForeignKey("UserId")]
    public virtual User? User { get; set; }

    public Todo()
    {
    }

    public Todo(string title, string content, bool isDone, Guid userId)
    {
        Id = Guid.NewGuid();
        Title = title;
        Content = content;
        IsDone = isDone;
        UserId = userId;
    }

    public void UpdateDateTime()
    {
        UpdatedAt = DateTime.UtcNow;
    }

    public Todo UpdateTodo(bool isDone)
    {
        IsDone = isDone;

        return this;
    }
}