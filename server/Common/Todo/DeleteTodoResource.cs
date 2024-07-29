namespace Common.Todo;

public class DeleteTodoResource
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }

    public DeleteTodoResource(Guid id, Guid userId)
    {
        Id = id;
        UserId = userId;
    }
}