using Model;

namespace Repository.Common;

public interface IUserRepository
{
    Task CreateUserAsync(User user);
    Task<User?> GetUserByEmailAsync(string email);
    Task<User?> GetUserByApiKeyAsync(string apiKey);
}