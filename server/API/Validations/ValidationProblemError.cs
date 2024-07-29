using ValidationResult = FluentValidation.Results.ValidationResult;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace API.Validations;

public class ValidationProblemError
{
    public static ModelStateDictionary Response(ValidationResult validationResult)
    {
        var modelStateDictionary = new ModelStateDictionary();

        foreach (var error in validationResult.Errors)
        {
            modelStateDictionary.AddModelError(
                error.PropertyName,
                error.ErrorMessage);
        }

        return modelStateDictionary;
    }
}