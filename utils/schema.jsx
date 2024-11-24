import { varchar, serial, numeric } from "drizzle-orm/mysql-core";
import { pgTable , timestamp} from "drizzle-orm/pg-core";

export const budgets = pgTable('budgets', (table) => {
   
   return {
      id: table.serial('id').primaryKey(),
      name: table.varchar('name').notNull(),
      amount: table.varchar('amount').notNull(),
      icon: table.varchar('icon'),
      createdBy: table.varchar('createdBy').notNull()
   };

});


export const expenses = pgTable('expenses', (table) => { 
   return {
      id: table.serial('id').primaryKey(),
      name: table.varchar('name').notNull(),
      amount: table.numeric('amount').notNull().default(0),
      budgetId: table.integer('budgetId').references(()=> budgets.id),
      createdAt: table.timestamp('createdAt').defaultNow(),
      paid: table.boolean('paid').default(false)
   }
})



export const groupMembers = pgTable('groupMembers', (table) => { 
   return {
      id: table.serial('id').primaryKey(),
      name: table.varchar('name').notNull(),
      amount: table.numeric('amount').notNull().default(0), // Total contribution
   };
});


// Group Expenses Table
export const groupExpenses = pgTable('groupExpenses', (table) => { 
   return {
      id: table.serial('id').primaryKey(),
      name: table.varchar('name').notNull(), // Expense name (e.g., Dinner)
      amount: table.numeric('amount').notNull().default(0), // Total amount for the expense
   };
});


export const expenseMembers = pgTable('expenseMembers', (table) => { 
   return {
      id: table.serial('id').primaryKey(),
      expenseId: table
         .integer('expense_id')
         .references(() => groupExpenses.id)
         .notNull(), // Foreign key to groupExpenses
      memberId: table
         .integer('member_id')
         .references(() => groupMembers.id)
         .notNull(), // Foreign key to groupMembers
      share: table.numeric('share').notNull().default(0), // Individual share of the expense
   };
});

