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
      createdAt: table.timestamp('createdAt').defaultNow()
   }
})