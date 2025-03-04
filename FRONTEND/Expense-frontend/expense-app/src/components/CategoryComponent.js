import CategoryTable from './CategoryTable.js'
import CategoryForm from './CategoryForm.js'

const CategoryComponent = () => {
  return (
    <div className="max-w-6xl mx-auto my-5 p-6 bg-cColor shadow-md rounded-lg border border-gray-300 flex justify-around gap-6">
        <CategoryTable />
        <CategoryForm />        

    </div>
  )
}

export default CategoryComponent