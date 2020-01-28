using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{

    public class APIDB: DbContext
    {
        public APIDB(DbContextOptions<APIDB> options) : base(options)
        {

        }
        public DbSet<Bank> Banks { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }

    }
}
