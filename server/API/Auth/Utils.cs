using Model;

namespace API.Auth;

public static class Utils
{
    public static User? GetUser(IHttpContextAccessor httpContextAccessor)
    {
        var httpContext = httpContextAccessor.HttpContext;
        if (httpContext == null)
        {
            return null;
        }

        if (!httpContext.Items.TryGetValue("user", out var u))
        {
            return null;
        }

        User? user = (User?)u;
        if (user == null || user.ApiKey == null)
        {
            return null;
        }

        return user;
    }
}