import { createSlice } from "@reduxjs/toolkit";



const counterSlice=createSlice({
    name:'counter',
    initialState:{
        counter:10
        
    },
    reducers:{
        incremant:(state)=>{state.counter +=1 ;   },
        dercreament:(state)=>{state.counter-=1;},
        increamentByAmount:(state,action)=>{state.counter+=action.payload}
}})
export const counterReducer=counterSlice.reducer
export const {incremant,dercreament,increamentByAmount}=counterSlice.actions