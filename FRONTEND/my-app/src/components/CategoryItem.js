import axios from "axios"
import { useContext } from "react"
import { CategoryContext } from "../contexts/CategoryContext.js"

export default function CategoryItem({name,_id}){
    const {categoriesDispatch} = useContext(CategoryContext)
    const deleteCategory=()=>{
        axios.delete(`http://localhost:3030/categories/${_id}`)
            .then((response)=>{
                const result = response.data
                console.log(result)
                categoriesDispatch({type:'remove-category',payload:result._id})
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    return (
        <li>{name}<button onClick={deleteCategory}>Remove</button></li>
    )
}
