import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import CategoryContext from '../context/CategoryContext'
import { useContext } from 'react'
const CategoryForm = () => {
    const {categoryDispatch} = useContext(CategoryContext)
    const [name,setName] = useState("")
    const [clientValidations,setClientValidations]=useState({})
    const [serverValidations,setServerValidations] = useState(null)

    const runClientValidations =()=> {
        const errors = {}
        if(name.trim().length == 0){
            errors.name = 'Name cannot be blank'
        }else if(name.trim().length < 3 && name.trim().length > 20){
            errors.name = 'Name is either too long or too short'
        }

        return errors
    }

    const handleSubmit =async (e)=>{
        e.preventDefault()
        const errors = runClientValidations()
        const formData = {
            name:name
        }
        if(Object.keys(errors).length == 0){
            try{
                const result = await axios.post('http://localhost:3030/categories',formData)
           
                categoryDispatch({type:'ADD-CATGORY' , payload:result.data})
                setName("")
            }catch(err){
                console.log(err)
                setServerValidations(err.response.data.errors)
            }

        }else{
            setClientValidations(errors)
        }
    }
  return (
    <div >
        <h2 className="text-3xl font-semibold mb-4 text-bColor">Category Form</h2>
        {serverValidations && <ul>
            {serverValidations.map((ele)=>{
                return <li className='text-red-500'>{ele.msg}</li>
            })}
        </ul>}
        <form onSubmit={handleSubmit}  className="border border-gray-500 rounded-md shadow-sm p-4 ">
            <label htmlFor=""  className="block text-left px-2 text-m font-medium text-gray-600 mb-1">Name:</label>
            <input  className=" px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bColor focus:outline-none"
            placeholder="Enter category name"
            required type="text" value={name}  onChange={(e)=>{setName(e.target.value)}} />
            {clientValidations && <p className='text-red-500'>{clientValidations.name}</p>}
            <input type="submit" className="w-full bg-bColor text-white px-4 py-2 my-2 rounded-md hover:bg-greenish transition"/>
        </form>

    </div>
  )
}

export default CategoryForm