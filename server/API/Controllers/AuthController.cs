using API.Auth;
using API.Validations;
using AutoMapper;
using Common.User;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Service.Common;

namespace API.Controllers;

[ApiController]
[Route("api/auth")]
[ServiceFilter(typeof(ApiKeyAuthFilter))]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthController(IAuthService authService, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        _authService = authService;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser(
        RegisterUserDto registerUserDto,
        [FromServices] IValidator<RegisterUserDto> validator)
    {
        var validationResult = validator.Validate(registerUserDto);
        if (!validationResult.IsValid)
        {
            var modelStateDictionary = ValidationProblemError.Response(validationResult);

            return ValidationProblem(modelStateDictionary);
        }

        var userResource = _mapper.Map<RegisterUserResource>(registerUserDto);

        var apiResponse = await _authService.RegisterUserAsync(userResource);
        if (apiResponse.Response == null)
        {
            return BadRequest();
        }

        return CreatedAtAction(nameof(RegisterUser), new { Name = userResource.Name });
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginUser(
        LoginUserDto loginUserDto,
        [FromServices] IValidator<LoginUserDto> validator)
    {
        var validationResult = validator.Validate(loginUserDto);
        if (!validationResult.IsValid)
        {
            var modelStateDictionary = ValidationProblemError.Response(validationResult);

            return ValidationProblem(modelStateDictionary);
        }

        var userResource = _mapper.Map<LoginUserResource>(loginUserDto);

        var user = await _authService.LoginUserAsync(userResource);

        if (user == null)
        {
            return BadRequest();
        }

        var userResponse = _mapper.Map<LoginUserResponse>(user);

        return Ok(userResponse);
    }

    [HttpPost("logout")]
    public async Task<IActionResult> LogoutUser()
    {
        var user = Utils.GetUser(_httpContextAccessor);
        if (user == null)
        {
            return Unauthorized();
        }

        // it can't be null here ffs
        var apiResponse = await _authService.LogoutUserAsync(user.ApiKey!);
        if (apiResponse.Response == null)
        {
            return BadRequest();
        }

        return NoContent();
    }
}