using Common.Todo;
using FluentValidation;

namespace API.Validations;

public class UpdateTodoValidator : AbstractValidator<UpdateTodoDto>
{
    public UpdateTodoValidator()
    {
        RuleFor(t => t.IsDone).NotNull();
    }
}