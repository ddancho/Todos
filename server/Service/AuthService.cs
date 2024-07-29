using System.Security.Cryptography;
using Common;
using Common.User;
using Model;
using Repository.Common;
using Service.Common;

namespace Service;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AuthService(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ApiResponse> RegisterUserAsync(RegisterUserResource userResource)
    {
        CreatePasswordHash(userResource.Password, out string passwordHash, out string passwordSalt);

        User user = new User(userResource.Name, userResource.Email, passwordHash, passwordSalt);

        try
        {
            await _userRepository.CreateUserAsync(user);
            await _unitOfWork.CommitUnitOfWorkAsync();

            return new ApiResponse("success", "User is sign up successfully");
        }
        catch (System.Exception)
        {
            return new ApiResponse(null, "Ups, registration failed, try again later");
        }
    }

    public async Task<User?> LoginUserAsync(LoginUserResource userResource)
    {
        var user = await _userRepository.GetUserByEmailAsync(userResource.Email);

        if (user == null)
        {
            return null;
        }

        if (!VerifyPasswordHash(userResource.Password, user.Password, user.PasswordSalt))
        {
            return null;
        }

        try
        {
            user.UpdateApiKey(GenerateApiKey());
            user.UpdateDateTime();

            await _unitOfWork.CommitUnitOfWorkAsync();

        }
        catch (System.Exception)
        {
            return null;
        }

        return user;
    }

    public async Task<ApiResponse> LogoutUserAsync(string apiKey)
    {
        var user = await _userRepository.GetUserByApiKeyAsync(apiKey);
        if (user == null)
        {
            return new ApiResponse(null, "Ups, something went wrong");
        }

        try
        {
            user.UpdateApiKey(null);
            user.UpdateDateTime();

            await _unitOfWork.CommitUnitOfWorkAsync();
        }
        catch (System.Exception)
        {
            return new ApiResponse(null, "Ups, something went wrong");
        }

        return new ApiResponse("success", "User sign out successfully");

    }

    public async Task<User?> GetUserByApiKeyAsync(string apiKey)
    {
        return await _userRepository.GetUserByApiKeyAsync(apiKey);
    }

    private static string GenerateApiKey()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }

    private static bool VerifyPasswordHash(string password, string passwordHash, string passwordSalt)
    {
        var storedSalt = Convert.FromBase64String(passwordSalt);
        var storedHash = Convert.FromBase64String(passwordHash);

        using var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt);
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != storedHash[i]) return false;
        }

        return true;
    }

    private static void CreatePasswordHash(string password, out string passwordHash, out string passwordSalt)
    {
        using var hmac = new HMACSHA512();

        var key = hmac.Key;
        var hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

        passwordSalt = Convert.ToBase64String(key);
        passwordHash = Convert.ToBase64String(hash);
    }
}