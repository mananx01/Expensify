"use client";
import { db } from "@/utils/dbConfig";
import { budgets, expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, desc, eq, getTableColumns, param, sql } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpensesListTable from "../_components/ExpensesListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

// params is promise not a plain object 
function ExpensesScreen({ params: paramsPromise }) {
  const { user, isSignedIn } = useUser();
  const [error, setError] = useState(false);
  const route = useRouter();

  const [budgetInfo, setBudgetinfo] = useState([]);
  const [expensesList, setExpenseList] = useState([]);

  // unwrap the params using React.use()
  const params = use(paramsPromise);

  const getBudgetInfo = async () => {
    try {
      if (!isSignedIn) {
        throw new Error("User not signed in!");
      }

      const res = await db
        .select({
          ...getTableColumns(budgets), // getting all columns of budgets table
          totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
          totalItems: sql`count(${expenses.id})`.mapWith(Number),
        })
        .from(budgets)
        .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
        .where(
          and(
            eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress),
            eq(budgets.id, params.id)
          )
        )
        .groupBy(budgets.id);

      if (res.length === 0) throw new Error("No budget found for this user");

      setBudgetinfo(res[0]);
      setError(false);
      console.log("avavsdv", res);

      getExpensesList();
    } catch (err) {
      setError(true);
    }
  };

  const getExpensesList = async () => {
    try {
      const res = await db
        .select()
        .from(expenses)
        .where(eq(expenses.budgetId, params.id))
        .orderBy(desc(expenses.id));

      console.log(res);
      if (res) {
        setExpenseList(res);
      } else {
        throw new Error("Cannot Fetch Data!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBudget = async () => {
    // we cannot directly delete budgets, first we have to delete expenses and then delete the budget
    const deleteBudgetExpenses = await db
      .delete(expenses)
      .where(eq(expenses.budgetId, params.id))
      .returning();

    if (deleteBudgetExpenses) {
      const res = await db
        .delete(budgets)
        .where(eq(budgets.id, params.id))
        .returning();

      if (res) {
        toast.success("Budget Deleted Successfully");
        route.replace("/dashboard/budgets");
      }
    }
  };

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-tl from-slate-100 to-gray-200 via-slate-400">
      <header className="text-3xl font-bold flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <ArrowLeft
            onClick={() => route.back()}
            className="cursor-pointer"
          />
          <span>My Expenses</span>
        </div>

        <div className="flex gap-2 items-center">
            <EditBudget refreshData={() => getBudgetInfo()} budgetInfo={budgetInfo} />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex gap-2 items-center cursor-pointer hover:bg-red-700">
                    Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your current
                        budget along with all expenses.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteBudget()}>
                        Continue
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
      </header>

      <section className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {error ? (
          <div className="text-red-500">Unauthorized access or data not found.</div>
        ) : budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] bg-slate-200 rounded-lg animate-pulse"></div>
        )}

        {!error && budgetInfo && (
          <AddExpense budget={budgetInfo} refreshData={() => getBudgetInfo()} />
        )}
      </section>

      <section className="mt-4">
        <ExpensesListTable
          expenseList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </section>
    </div>
  );
}

export default ExpensesScreen;
