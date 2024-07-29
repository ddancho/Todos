using Microsoft.EntityFrameworkCore;
using Model;

namespace DAL;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Todo> Todos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Id).ValueGeneratedNever();
            entity.HasIndex(u => u.Id).IsUnique(true);

            entity.Property(u => u.Name).IsRequired(true).HasMaxLength(255);
            entity.Property(u => u.Email).IsRequired(true).HasMaxLength(255);
            entity.Property(u => u.Password).IsRequired(true).HasMaxLength(255);
            entity.Property(u => u.PasswordSalt).IsRequired(true).HasMaxLength(255);
            entity.Property(u => u.CreatedAt).IsRequired(true);
            entity.Property(u => u.UpdatedAt).IsRequired(true);

            entity.Property(u => u.ApiKey).IsRequired(false).HasMaxLength(128);
            entity.HasIndex(u => u.ApiKey).IsUnique(true);

            entity.HasIndex(u => u.Email).IsUnique(true);
        });

        var t = modelBuilder.Entity<Todo>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Id).ValueGeneratedNever();
            entity.HasIndex(t => t.Id).IsUnique(true);

            entity.Property(t => t.Title).IsRequired(true).HasMaxLength(30);
            entity.Property(t => t.Content).IsRequired(true).HasMaxLength(255);
            entity.Property(t => t.IsDone).IsRequired(true);
            entity.Property(t => t.CreatedAt).IsRequired(true);
            entity.Property(t => t.UpdatedAt).IsRequired(true);
        });
    }
}