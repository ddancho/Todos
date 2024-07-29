using Common.Todo;
using FluentValidation;

namespace API.Validations;

public class CreateTodoValidator : AbstractValidator<CreateTodoDto>
{
    public CreateTodoValidator()
    {
        RuleFor(t => t.Title).NotEmpty().Length(4, 30);
        RuleFor(t => t.Content).NotEmpty().Length(4, 255);
    }
}