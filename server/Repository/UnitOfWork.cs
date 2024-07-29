using DAL;
using Repository.Common;

namespace Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly TodoDbContext _dbContext;

    public UnitOfWork(TodoDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task CommitUnitOfWorkAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}