import { useState } from "react";

const UpdateConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;
    
    const [name,setName] = useState('')
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
          <p className="mb-6">{message}</p>
          <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter the category name" />
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={()=>{onConfirm(name)}}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UpdateConfirmationModal;