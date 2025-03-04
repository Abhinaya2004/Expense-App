const CategoryReducer = (state,action)=>{
    switch(action.type){

        case 'SET-CATGORIES':{
            return [...state,...action.payload]
        }
        case 'ADD-CATGORY': {
            return [...state, action.payload];
        }

        case 'DELETE-CATEGORY': {
            
            return state.filter((category) => category._id !== action.payload);
          }

        default : {
            return [...state]
        }
    }
}
export default CategoryReducer