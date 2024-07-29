using Common.User;
using DAL;
using FluentValidation;

namespace API.Validations;

public class RegisterUserValidator : AbstractValidator<RegisterUserDto>
{
    private readonly TodoDbContext _dbContext;

    public RegisterUserValidator(TodoDbContext dbContext)
    {
        _dbContext = dbContext;

        RuleFor(u => u.Name).NotEmpty().Length(4, 255);
        RuleFor(u => u.Email).EmailAddress().NotEmpty().MaximumLength(255).Must(IsEmailUnique).WithMessage("This email is taken");
        RuleFor(u => u.Password).NotEmpty().Length(6, 255);
        RuleFor(u => u.ConfirmPassword).NotEmpty().Equal(u => u.Password).WithMessage("Password and Confirm Password must be equal");
    }

    private bool IsEmailUnique(string e)
    {
        string email = e.ToLower();

        if (_dbContext.Users.SingleOrDefault(u => u.Email == email) == null)
        {
            return true;
        }

        return false;
    }
}