using DAL;
using Microsoft.EntityFrameworkCore;
using Model;
using Repository.Common;

namespace Repository;

public class UserRepository : IUserRepository
{
    private readonly TodoDbContext _todoDb;

    public UserRepository(TodoDbContext todoDb)
    {
        _todoDb = todoDb;
    }
    public async Task CreateUserAsync(User user)
    {
        await _todoDb.Users.AddAsync(user);
    }

    public async Task<User?> GetUserByApiKeyAsync(string apiKey)
    {
        return await _todoDb.Users.FirstOrDefaultAsync(u => u.ApiKey == apiKey);
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _todoDb.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
}