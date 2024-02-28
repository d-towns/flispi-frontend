import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchPropertySearchData, fetchZipCodes } from '../services/property.service';
import { Property } from '../models/Property.model';
import { getSlidingWindow, filterIds, filtersFormData, sortOptions } from '../utils/utils';



function usePropertySearch() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTotal, setSearchTotal] = useState(0);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [pageList, setPageList] = useState<number[]>([1, 2]);
  const [currentPage, setCurrentPage] = useState<Property[]>([]);
  const [currentTab, setCurrentTab] = useState('list-tab');
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchZipCodeData = useCallback(async () => {
    const response = await fetchZipCodes();
    setZipCodes(response);
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoadingPage(true);
    const data = await fetchPropertySearchData({ searchParams: searchParams, pageNumber, pageSize: currentTab === 'list-tab' ? 30 : 4 });
    if(data.errors) {
        setError(data.errors);
        setIsLoadingPage(false);
        return;
    }
    setCurrentPage(data.properties);
    setSearchTotal(data.metadata.total);
    const { startIndex, endIndex, totalPages } = getSlidingWindow(pageNumber, data.metadata.total);
    setPageList(Array.from({ length: totalPages }, (_, index) => index + 1).slice(startIndex - 1, endIndex));
    setIsLoadingPage(false);
  }, [searchParams, pageNumber, currentTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchZipCodeData();
  }, [fetchZipCodeData]);

  const setFilterParams = useCallback((filterId: string, filterValue: string | string[] | number[]) => {
    const filterString = Array.isArray(filterValue) ? filterValue.join(',') : filterValue;
    searchParams.set(filterId, filterString);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const clearFilterParams = useCallback(() => {
    filterIds.forEach((filter) => {
      searchParams.delete(filter);
    });
    setSearchParams(searchParams);
    navigate(0);
  }, [searchParams, setSearchParams, navigate]);

  const clearSort = useCallback(() => {
    searchParams.delete('sort');
    sortOptions.forEach((option) => {
      option.current = false;
    });
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    // Update the checked value for all filters based on search params
    filtersFormData.forEach((filter) => {
      const filterValues = searchParams.get(filter.id)?.split(',') || [];
      filter.options.forEach((option) => {
        option.checked = filterValues.includes(option.value);
      });
    });
  }, [searchParams]);

  return {
    mobileFiltersOpen,
    setMobileFiltersOpen,
    pageNumber,
    setPageNumber,
    searchTotal,
    isLoadingPage,
    zipCodes,
    pageList,
    currentPage,
    currentTab,
    setCurrentTab,
    setFilterParams,
    clearFilterParams,
    clearSort,
    error
  };
}

export default usePropertySearch;
