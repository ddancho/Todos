namespace Repository.Common;

public interface IUnitOfWork
{
    Task CommitUnitOfWorkAsync();
}