using System.ComponentModel.DataAnnotations;

namespace Model;

public class User
{
    [Key]
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string Password { get; private set; } = string.Empty;
    public string PasswordSalt { get; private set; } = string.Empty;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; private set; } = DateTime.UtcNow;
    public string? ApiKey { get; private set; }
    public virtual ICollection<Todo>? Todo { get; set; }

    public User()
    {
    }

    public User(string name, string email, string password, string passwordSalt)
    {
        Id = Guid.NewGuid();
        Name = name;
        Email = email.ToLower();
        Password = password;
        PasswordSalt = passwordSalt;
    }

    public void UpdateApiKey(string? apiKey)
    {
        ApiKey = apiKey;
    }

    public void UpdateDateTime()
    {
        UpdatedAt = DateTime.UtcNow;
    }
}