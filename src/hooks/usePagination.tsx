import { useState, useCallback } from 'react';
import { getSlidingWindow } from '../utils/utils';
import { fetchPropertySearchData } from '../services/property.service';
import { useSearchParams } from 'react-router-dom';

export function usePagination() {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTotal, setSearchTotal] = useState(0);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [pageList, setPageList] = useState<number[]>([1, 2]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState('list-tab');


  const updatePagination =  useCallback( async (total: number, currentPage: number) => {
    setIsLoadingPage(true);
    const data = await fetchPropertySearchData({ searchParams, pageNumber, pageSize: currentTab === 'list-tab' ? 30 : 4 });
    setSearchTotal(total);
    setPageNumber(currentPage);
    const {
        startIndex,
        endIndex,
        totalPages
      } = getSlidingWindow(pageNumber, data.metadata.total);
      // Generate the sliding window array
      setPageList(Array.from({ length: totalPages }, (_, index) => index + 1).slice(startIndex - 1, endIndex));
      setIsLoadingPage(false);
  }, []);

  return { pageNumber, setPageNumber, searchTotal, isLoadingPage, pageList, updatePagination, currentTab, setCurrentTab};
}
