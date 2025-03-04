import axios from "axios"
export default function ExpenseTable({expenses,expensesDispatch}){
    const handleRemove = (id)=>{
        console.log(id)
        axios.delete(`http://localhost:3030/expenses/${id}`)
            .then((response)=>{
                const result = response.data
                console.log(response)
                expensesDispatch({type:'remove-expense',payload:result._id})
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }

    const handleAssignEditId = (id)=>{
        console.log(id)
        expensesDispatch({type:'assign_edit_id',payload:id})
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Expense Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.data.map((ele)=>{
                        return <tr>
                             <td>{ele.expenseDate}</td>
                             <td>{ele.title}</td>
                             <td>{ele.amount}</td>
                             <td>{ele.category}</td>
                             <td>
                                <button onClick={()=>{handleAssignEditId(ele._id)}}>edit</button>
                                <button onClick={()=>{handleRemove(ele._id)}}>remove</button>
                             </td>
                        </tr>
                    })}
                </tbody>
            </table>
            
        </div>
    )
}