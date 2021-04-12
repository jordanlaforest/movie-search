import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchAPIRequest } from './searchAPI';

const initialState = {
  results: [],
  filter: '',
  lastQuery: '',
  lastPageFetched: 0,
  totalPages: 0,
  status: 'idle',
  error: ''
};

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async ({query, page=1}) => {
    const response = await searchAPIRequest(query, page);
    return response;
  }
);

export const fetchNextPage = createAsyncThunk(
  'search/fetchNextPage',
  async (args, thunkAPI) => {
    const state = thunkAPI.getState().search;
    const nextPage = state.lastPageFetched + 1;
    thunkAPI.dispatch(fetchSearch({query: state.lastQuery, page: nextPage}));
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    refineSearch(state, action){
      state.filter = action.payload.query.toLowerCase();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state, action) => {
        state.status = 'loading';
        
        /* This is kinda weird, if we're requesting the first page we reset the state first
         *  but since we use a default value for the page arg it doesn't get passed along here.
         *  Therefore if action.meta.arg.page is undefined this a request for page 1 and we reset state
         */
        if(!action.meta.arg.page){
          state.results = [];
          state.lastPageFetched = 0;
          state.totalPages = 0;
          state.error = '';
        }
        state.lastQuery = action.meta.arg.query;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.status = 'idle';
        state.lastPageFetched = action.payload.page;
        state.totalPages = action.payload.total_pages;

        state.results = state.results.concat(action.payload.results);
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export const { refineSearch, clearFilter } = searchSlice.actions;

export const selectSearchResults = (state) => state.search.results;
export const selectStatus = (state) => state.search.status;
export const selectNoMorePages = (state) => state.search.lastPageFetched >= state.search.totalPages;
export const selectNotSearched = (state) => state.search.lastPageFetched === 0;
export const selectFilter = (state) => state.search.filter;
export const selectError = (state) => state.search.error;

export default searchSlice.reducer;
