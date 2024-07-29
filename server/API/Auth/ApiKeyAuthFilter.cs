using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.VisualBasic;
using Model;
using Service.Common;

namespace API.Auth;

public class ApiKeyAuthFilter : IAsyncAuthorizationFilter
{
    private const string HeaderName = "x-api-key";
    private readonly IAuthService _authService;

    public ApiKeyAuthFilter(IAuthService authService)
    {
        _authService = authService;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        if (CheckRequestPathForUnauthorizedAllowedAccess(context, out var apiKey))
        {
            return;
        }

        if (apiKey == null)
        {
            context.Result = new UnauthorizedObjectResult("ApiKey Missing");
            return;
        }

        User? user = await _authService.GetUserByApiKeyAsync(apiKey);
        if (user == null)
        {
            context.Result = new UnauthorizedObjectResult("Invalid ApiKey");
            return;
        }

        context.HttpContext.Items.Add("user", user);
    }

    private static bool CheckRequestPathForUnauthorizedAllowedAccess(AuthorizationFilterContext context, out string? apiKey)
    {
        const string registerPath = "/api/auth/register";
        const string loginPath = "/api/auth/login";

        var path = context.HttpContext.Request.Path;

        context.HttpContext.Request.Headers.TryGetValue(HeaderName, out var ak);
        apiKey = ak;

        if ((path.Equals(registerPath) || path.Equals(loginPath)) && apiKey == null)
        {
            return true;
        }

        return false;
    }
}










