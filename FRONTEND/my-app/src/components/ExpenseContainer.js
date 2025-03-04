import { useMemo } from "react";
import ExpenseForm from "./ExpenseForm.js";
import ExpenseTable from "./ExpenseTable.js";

export default function ExpenseContainer({expenses,categories,expensesDispatch}){
    const expensesSum = useMemo(()=>{
        return expenses.data.reduce((acc,cv)=>{
            return acc + cv.amount
        },0)
    },[expenses.data]) 
    return (
        <div>
            <h2>Total - {expensesSum}</h2>
            <h2>Listing Expenses - {(expenses.data).length} </h2>
            
            <ExpenseTable expenses={expenses} expensesDispatch={expensesDispatch} />
            <ExpenseForm categories={categories} expensesDispatch={expensesDispatch}/>
        </div>
    )
}