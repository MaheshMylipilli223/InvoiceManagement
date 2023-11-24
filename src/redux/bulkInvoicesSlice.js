import { createSlice } from "@reduxjs/toolkit";


import { updateInvoice } from "./invoicesSlice";



const bulkInvoicesSlice = createSlice({
  name: "bulkInvoices",
  initialState: {
    multiInvoices: []
  },
  reducers: {
    addBulkInvoices: (state, action) => {
        state.multiInvoices = state.multiInvoices.concat(action.payload)
        state.multiInvoices = [...new Set(state.multiInvoices)]
    },
    clearInvoices: (state, action) => {
        state.multiInvoices = []
    }
  },
});

export const editSelectedInvoices = (updatedInvoices) => (dispatch) => {
        updatedInvoices?.forEach((invoice) => {
        dispatch(
            updateInvoice({
                id: invoice.id,
                updatedInvoice: invoice,
            })
        );
    });
};


export const {
  addBulkInvoices,
  clearInvoices
} = bulkInvoicesSlice.actions;


export default bulkInvoicesSlice.reducer;
