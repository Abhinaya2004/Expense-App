import "./styles.css"
import axios from 'axios'
// import { useState } from "react"
import { useReducer,useEffect } from "react"
import CategoryContainer from "./components/CategoryContainer.js"
import ExpenseContainer from "./components/ExpenseContainer.js"
import { CategoryContext } from "./contexts/CategoryContext.js"
import { ExpenseContext } from "./contexts/ExpenseContext.js"

const expenseInitialState = {
  data : [],
  editId : null,
  serverError : null
}

const expenseReducer = (state , action)=>{
  switch(action.type){
    case 'set_expenses': {
      return {...state,data:action.payload}
    }
    case 'add_expense':{
      return {...state,data:[...state.data,action.payload]}
    }
    case 'remove-expense':{
      const newArr = state.data.filter((ele)=>ele._id !== action.payload)
      return {...state,data:newArr}
    }
    case 'assign_edit_id':{
      return {...state,editId:action.payload}
      
    }
    default:{
      return {...state}
    }
  }
}

const categoryReducer = (state , action)=>{
  switch(action.type){
    case 'set_categories': {
      return action.payload
    }
    case 'add-category':{
      return [...state,action.payload]
    }
    case 'remove-category':{
      const newArr = state.filter((ele)=>ele._id != action.payload)
      return newArr
    }
    default:{
      return {...state}
    }
  }
}
function App() {
  const [categories,categoriesDispatch] = useReducer(categoryReducer,[])
  const [expenses,expensesDispatch] = useReducer(expenseReducer,expenseInitialState)


  useEffect(()=>{
    axios.get('http://localhost:3030/categories')
    .then((response)=>{
      const result = response.data
      console.log(result)
      categoriesDispatch({type:'set_categories',payload:result})
    })
    .catch((err)=>{
      console.log(err.message)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:3030/expenses')
    .then((response)=>{
      const result = response.data
      console.log(result)
      expensesDispatch({type:'set_expenses',payload:result})
    })
    .catch((err)=>{
      console.log(err.message)
    })
  },[])


 
 


  // const handleAddCategory = (category)=>{
  //   setCategories([...categories,category])
  // }

  // const handleRemoveCategory = (id)=>{
  //   const newArr = categories.filter((ele)=>ele._id != id)
  //   setCategories(newArr)
  // }
  return (
    <div className="App">
      <h1>Expense App</h1>
      
      
      <CategoryContext.Provider value={{categories,categoriesDispatch}}>
      <CategoryContainer categories={categories} categoriesDispatch={categoriesDispatch}/>
      </CategoryContext.Provider>
      
      <hr/>
      <ExpenseContext.Provider value={{categories,expenses,expensesDispatch}}>
        <ExpenseContainer expenses={expenses} categories={categories} expensesDispatch={expensesDispatch} />
      </ExpenseContext.Provider>
      

    </div>
  );
}

export default App;
