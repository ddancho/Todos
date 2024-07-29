using Common;
using Common.User;
using Model;

namespace Service.Common;

public interface IAuthService
{
    Task<ApiResponse> RegisterUserAsync(RegisterUserResource userResource);
    Task<User?> LoginUserAsync(LoginUserResource userResource);
    Task<ApiResponse> LogoutUserAsync(string apiKey);
    Task<User?> GetUserByApiKeyAsync(string apiKey);
}