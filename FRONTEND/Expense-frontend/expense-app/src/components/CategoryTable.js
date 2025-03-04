import axios from "axios"
import CategoryContext from "../context/CategoryContext"
import { useContext,useState } from "react"
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal"
import UpdateConfirmationModal from "../modal/UpdateConfirmDelete"
const CategoryTable = () => {
    const {categoryState,categoryDispatch} = useContext(CategoryContext)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);


    const handleDeleteClick = (id) => {
      setSelectedCategoryId(id);
      setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        console.log("Confirm button clicked!");
        try {
          await axios.delete(`http://localhost:3030/categories/${selectedCategoryId}`);
          categoryDispatch({ type: 'DELETE-CATEGORY', payload: selectedCategoryId });
          setIsDeleteModalOpen(false);
        } catch (err) {
          console.error('Error deleting category:', err);
        }
      };

      const handleConfirmUpdate = async (name) => {
        const formData = {
            name:name
        }
        console.log("Confirm button clicked!");
        try {
          await axios.update(`http://localhost:3030/categories/${selectedCategoryId}`,formData);
          categoryDispatch({ type: 'UPDATE-CATEGORY', payload: selectedCategoryId });
          setIsUpdateModalOpen(false);
        } catch (err) {
          console.error('Error deleting category:', err);
        }
      };
    
  return (
    <div>
        <h2 className="text-3xl font-semibold mb-4 text-bColor">Category Table</h2>
        <table className="table-auto border-collapse border border-gray-400 w-full text-center">
  <thead>
    <tr className="bg-gray-200">
      <th className="border text-greenish border-gray-400 px-4 py-2">Sl. No</th>
      <th className="border border-gray-400 px-4 py-2 text-greenish">Category Name</th>
      <th colSpan='2' className="border border-gray-400 px-4 py-2 text-greenish">Actions</th>
    </tr>
  </thead>
  <tbody>
  
        {categoryState && categoryState.map((user,i)=>{
            return <tr key={i}>
                <td className="border border-gray-400 px-4 py-2">{i+1}</td>
                <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                <td className="border border-gray-400 px-4 py-2"><button  className="text-bColor hover:underline">Edit</button></td>
                <td className="border border-gray-400 px-4 py-2"><button    onClick={() => handleDeleteClick(user._id)} className="text-bColor hover:underline">Delete</button></td>

            </tr>
        })}
        

 
  </tbody>
</table>

<DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this category?"
      />

<UpdateConfirmationModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        message="Are you sure you want to delete this category?"
      />
    </div>
  )
}

export default CategoryTable