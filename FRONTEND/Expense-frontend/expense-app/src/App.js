import { useReducer } from 'react'
import './App.css'
import CategoryComponent from './components/CategoryComponent'
import CategoryContext from './context/CategoryContext'
import CategoryReducer from './reducers/CategoryReducer'
import { useEffect } from 'react'
import axios from 'axios'
const App = () => {
  const [categoryState,categoryDispatch] = useReducer(CategoryReducer,[])
  console.log(categoryState)
  useEffect(()=>{
    axios.get('http://localhost:3030/categories')
    .then((response)=>{
      const result = response.data
      console.log(result)
      categoryDispatch({type:'SET-CATGORIES',payload:result})
    })
    .catch((err)=>{
      console.log(err.message)
    })
  },[])
  return (
    <div className="App h-screen w-screen bg-bgColor">
      <h1 className='text-5xl pt-2 font-semibold text-greenish'>Expense Tracker</h1>
      <CategoryContext.Provider value={{ categoryState,categoryDispatch}}>
          <CategoryComponent/>
      </CategoryContext.Provider>
      

    </div>
  )
}

export default App