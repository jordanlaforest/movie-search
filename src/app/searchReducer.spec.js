import reducer, {
  refineSearch,
  fetchSearch
} from './searchReducer';

describe('search reducer', () => {
  const initialState = {
    results: [],
    filter: '',
    lastQuery: '',
    lastPageFetched: 0,
    totalPages: 0,
    status: 'idle',
    error: ''
  };
  const resettableState = {
    results: ['result1', 'result2'],
    filter: 'filter',
    lastQuery: 'query',
    lastPageFetched: 5,
    totalPages: 10,
    status: 'idle',
    error: 'error'
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle refineSearch correctly', () => {
    expect(reducer(initialState, refineSearch({query: 'refine'}))).toEqual({
      ...initialState,
      filter: 'refine'
    });
  });

  describe('thunk actions', () => {
    it('should set status to loading and reset state on fetchRequest.pending if meta.arg.page === undefined (page 1)', () => {
      expect(reducer(resettableState, 
        fetchSearch.pending('', {query: 'test'}))
        ).toEqual({
          ...initialState,
          filter: 'filter', //We don't reset filter
          lastQuery: 'test',
          status: 'loading'
        });
    });

    it('should set status to loading but not reset state on fetchRequest.pending for pages > 1', () => {
      expect(reducer(resettableState, 
        fetchSearch.pending('', {query: 'query', page: 6}))
        ).toEqual({
          ...resettableState,
          status: 'loading'
        });
    });

    it('should append to results on fetchRequest.fulfilled and update lastPageFetched', () => {
      expect(reducer(resettableState, 
        fetchSearch.fulfilled({results: ['result3', 'result4'], page: 6, total_pages: 10}))
        ).toEqual({
          ...resettableState,
          lastPageFetched: 6,
          results: ['result1', 'result2', 'result3', 'result4']
        });
    });

    it('it should set an error message on fetchRequest.rejected', () => {
      expect(reducer(initialState,
        fetchSearch.rejected('error msg'))
      ).toEqual({
        ...initialState,
        error: 'error msg'
      });

    });
  });
});