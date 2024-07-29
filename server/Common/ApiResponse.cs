namespace Common;

public record ApiResponse(string? Status, string Message)
{
    public string? Response =>
        Status switch
        {
            "success" => Message,
            null => Message,
            _ => throw new NotImplementedException()
        };
}
