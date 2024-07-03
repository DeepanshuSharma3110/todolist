import { createSlice } from "@reduxjs/toolkit";

const SelectUser = createSlice({
    name:'SelectUser',
    initialState:{userId:null},
    reducers:{
        addUser:(state,action)=>{
            state.userId=action.payload;
        }
    }
})

export default SelectUser.reducer;
export const  {addUser} = SelectUser.actions;