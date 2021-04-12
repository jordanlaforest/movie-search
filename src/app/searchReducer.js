import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchAPIRequest } from './searchAPI';

const initialState = {
  results: [],
  filter: '',
  lastQuery: '',
  lastPageFetched: 0,
  totalPages: 0,
  status: 'idle'
};

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async (args) => {
    const page = args.page ? args.page : 1;
    const response = await searchAPIRequest(args.query, page);
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
      state.filter = action.payload.query;
    },
    clearFilter(state){
      state.filter = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state, action) => {
        state.status = 'loading';
        state.lastQuery = action.meta.arg.query;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.status = 'idle';
        state.lastPageFetched = action.payload.page;
        state.totalPages = action.payload.total_pages;

        if(action.payload.page === 1){ //If it's the first page that means it's a new search
          state.results = action.payload.results;
        }else{ //if page is > 1 then the request was from infinite scroll
          state.results = state.results.concat(action.payload.results);
        }
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.status = 'idle';
        //Store error in state
      });
  },
});

export const { refineSearch, clearFilter } = searchSlice.actions;

export const selectSearchResults = (state) => state.search.results;
export const selectStatus = (state) => state.search.status;
export const selectNoMorePages = (state) => state.search.lastPageFetched >= state.search.totalPages;
export const selectNotSearched = (state) => state.search.lastPageFetched === 0;
export const selectFilter = (state) => state.search.filter;

export default searchSlice.reducer;
