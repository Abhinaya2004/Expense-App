import { useState, useContext, useEffect } from 'react'; 
import { format } from 'date-fns'

import { ExpenseContext } from '../contexts/ExpenseContext';
import axios from 'axios'; 

const formInitialValue = { 
    expenseDate: '',
    title: '',
    amount: '',
    category: '',
    description: ''
};

export default function ExpenseForm(){
    const { categories, expensesDispatch, expenses} = useContext(ExpenseContext)
    const [form, setForm] = useState(formInitialValue); 
    const [clientErrors, setClientErrors] = useState({}); 
    const errors = {}; 

    useEffect(() => {
        if(expenses.editId) {
            const expense = expenses.data.find(ele => ele._id == expenses.editId)
            const formattedDate = format(new Date(expense.expenseDate), 'yyyy-MM-dd')
            setForm({
                expenseDate: formattedDate, // yyyy-mm-dd
                title: expense.title,
                amount: expense.amount,
                category: expense.category,
                description: expense.description
            });
        }
    }, [expenses.editId]);

    const runClientValidations = () => {
        if(form.expenseDate.length == 0) {
            errors.expenseDate = 'expense date cannot blank'; 
        } else if(new Date(form.expenseDate) > new Date()) {
            errors.expenseDate = 'expense date cannot greater than tody';
        }

        if(form.title.trim().length == 0) {
            errors.title = 'title cannot be blank'; 
        }

        if(form.amount.trim().length == 0) {
            errors.amount = 'amount cannot be blank'; 
        } else if(Number(form.amount.trim()) < 1) {
            errors.amount = 'amount should be atleast 1rs'
        }

        if(form.category.length == 0) {
            errors.category = 'category should be selected'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runClientValidations();

        if(Object.keys(errors).length != 0){
            setClientErrors(errors);
        } else {
            setClientErrors({ }); 
            if(expenses.editId) {
                axios.put(`http://localhost:3030/expenses/${expenses.editId}`, form)
                    .then((response) => {
                        const result = response.data; 
                        alert('expense udpated');
                        expensesDispatch({ type: 'update_expense', payload: result});
                        setForm(formInitialValue); 
                    })
                    .catch((err) => {
                        console.log(err); 
                    })
            } else {
                axios.post('http://localhost:3030/expenses', form)
                    .then((response) => {
                        const result = response.data 
                        expensesDispatch({ type: 'add_expense', payload: result })
                        setForm(formInitialValue); 
                    })
                    .catch((err) => {
                        console.log(err) 
                    })
            } 
        }
    }

    return (
        <div>
            <h2>{ expenses.editId ? 'Edit' : 'Add' } Expense</h2>
            <form onSubmit={handleSubmit}>
                <label>Enter Expense Date</label>
                <input 
                    type="date" 
                    value={form.expenseDate} 
                    onChange={(e) => { setForm({...form, expenseDate: e.target.value })}} 
                /> 
                { clientErrors.expenseDate && <span style={{ color: 'red' }}> { clientErrors.expenseDate } </span>}
                <br /> 

                <label>Enter title</label>
                <input 
                    type="text" 
                    value={form.title} 
                    onChange={(e) => { setForm({...form, title: e.target.value })}} 
                /><br />

                <label>Enter Amount</label> 
                <input 
                    type="text" 
                    value={form.amount}
                    onChange={(e) => { setForm({...form, amount: e.target.value }) }}
                /> <br /> 

                <label>Select Category</label> 
                <select value={form.category} onChange={(e) => { setForm({ ...form, category: e.target.value }) }}>
                    <option value="">Select</option>
                    { categories.map((ele) => {
                        return <option key={ele._id} value={ele._id}>{ ele.name }</option>
                    })}
                </select>
                 <br /> 

                 <label>Enter Description</label> 
                 <textarea value={form.description} onChange={(e) => { setForm({...form, description: e.target.value })}}></textarea><br /> 
                 <input type="submit" />
            </form>
        </div>
    )
}