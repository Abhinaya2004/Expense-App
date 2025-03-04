import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { CategoryContext } from "../contexts/CategoryContext.js"
export default function CategoryForm(){
    const {categoriesDispatch}  = useContext(CategoryContext)
    const [name,setName] = useState('')
    const [clientErrors,setClientErrors] = useState({})
    const [serverErrors,setServerErrors] = useState([])
    const errors={}

    const runClientValidation = ()=>{
        if(name.trim().length == 0){
            errors.name = 'Name cannot be blank'
        }else if(name.trim().length < 3 || name.trim().length > 20){
            errors.name = 'name should be between 3- 30 characters long'
        }
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        const formData = {
            name:name
        }
        axios.post('http://localhost:3030/categories',formData)
            .then((response)=>{
                const result = response.data
                categoriesDispatch({type:'add-category',payload:result})
            })
            .catch((err)=>{
                setServerErrors(err.response.data.errors)
            })
        runClientValidation()
        if(Object.keys('errors').length != 0){
            setClientErrors(errors)
        }else{
            axios.post('http://localhost:3030/categories',formData)
            .then((response)=>{
                const result = response.data
                categoriesDispatch({type:'add-category',payload:result})
            })
            .catch((err)=>{
                setServerErrors(err.response.data.errors)
            })
        }
        
    }
    return(
        <div>
            <h2>Add Category</h2>
            {
                serverErrors && (
                    <div>
                        <ul>
                            {serverErrors.map((ele,i)=>{
                                return <li key={i}>{ele}</li>
                            })}
                        </ul>
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} id="name" />
                {clientErrors.name && <span style={{color:'red'}}>{clientErrors.name}</span>}
                <input type="submit" />
            </form>
        </div>
    )
}