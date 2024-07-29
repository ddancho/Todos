using Common.User;
using FluentValidation;

namespace API.Validations;

public class LoginUserValidator : AbstractValidator<LoginUserDto>
{
    public LoginUserValidator()
    {
        RuleFor(u => u.Email).EmailAddress().NotEmpty();
        RuleFor(u => u.Password).NotEmpty().Length(6, 255);
    }
}