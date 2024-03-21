export enum cities {
    GrandBlanc = 'Grand Blanc',
    Flint = 'Flint',
    Flushing = 'Flushing',
    Burton = 'Burton',
    Davison = 'Davison',
    Fenton = 'Fenton',
    Goodrich = 'Goodrich',
    Linden = 'Linden',
    MtMorris = 'Mt. Morris',
}

export const sortOptions = [
  {
    name: 'Newest',
    sortFilter: 'year_built,DESC',
    current: false,
  },
  {
    name: 'Sq. Feet: Low to High',
    sortFilter: 'square_feet,ASC',
    current: false,
  },
  {
    name: 'Sq. Feet: High to Low',
    sortFilter: 'square_feet,DESC',
    current: false,
  },
  {
    name: 'Price: Low to High',
    sortFilter: 'price,ASC',
    current: false,
  },
  {
    name: 'Price: High to Low',
    sortFilter: 'price,DESC',
    current: false,
  },
];

export interface SubCategory {
  name: string;
  filterParams: { [key: string]: string | string[] | number[] };
}

export const subCategories  :SubCategory[] = [
  { 
    name: 'Featured Properties',
    filterParams: { featured: 'true' }
  },
  { 
    name: 'Ready For Rehab',
    filterParams: { propertyClass: 'Res Imp', bedrooms: '1', featured: 'true' }
  },
  { 
    name: 'Commercial Opportunities',
    filterParams: { propertyClass: 'Ind Imp,Com Vac Lot,Com Imp,Ind Vac Lot', featured: 'true' }
  }
];


export const filterIds = [
  'city',
  'zip',
  'propertyClass',
  'price',
  'sqft',
  'lotSize',
  'sort',
  'featured',
  'bedrooms',
  'bathrooms'
]

type FilterOption = {
  value: string;
  label: string;
  checked: boolean;
};

type FilterFormData = {
  id: string;
  name: string;
  options: FilterOption[];
};

export const filtersFormData : FilterFormData[] = [
  {
    id: 'propertyClass',
    name: 'Property Class',
    options: [
      { value: 'Res Imp', label: 'Res Imp', checked: false },
      { value: 'Res Vac Lot', label: 'Res Vac Lot', checked: false },
      { value: 'Com Imp', label: 'Com Imp', checked: false },
      { value: 'Com Vac Lot', label: 'Com Vac Lot', checked: false },
      { value: 'Ind Imp', label: 'Ind Imp', checked: true },
      { value: 'Ind Vac Lot', label: 'Ind Vac Lot', checked: false },
    ],
  },
  {
    id: 'city',
    name: 'City',
    options: Object.values(cities).map((city: any) => {
      return { value: city, label: city, checked: false }
    }),
  },
]


export const PAGE_SIZE = 30;

export const parseImages = (images: string) : string[] => {
    if(Array.isArray(images)) return images
    const parsedImages = JSON.parse(images)
    return parsedImages
  }

export const getEnvironmentApiUrl = () => {
    return process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_PROD_API_URL
}

export const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

 export const formatIsoStringToCalendar = (isoString: string) : string =>  {
    // Extract the date and time parts from the ISO string
    const [datePart, timePart] = isoString.split('T');
    // Remove dashes from the date part and colons from the time part
    const formattedDate = datePart.replace(/-/g, '');
    const formattedTime = timePart.replace(/:/g, '').substring(0, 6); // Taking only HHMMSS part

    return `${formattedDate}T${formattedTime}`;
}

 export const getSlidingWindow = (currentPage : number, resultsTotal: number) : {startIndex: number, endIndex: number, totalPages: number} => {
    const totalPages = Math.ceil(resultsTotal / PAGE_SIZE); // Total number of pages

    const windowSize = 2; // The size of the sliding window

    // Calculate the start index for the slice
    let startIndex = currentPage - Math.floor(windowSize / 2);
    startIndex = Math.max(startIndex, 1); // Ensure start index is not less than 1

    // Adjust the start index if we're near the end of the page range
    if (startIndex > totalPages - windowSize + 1) {
      startIndex = totalPages - windowSize + 1;
    }

    // Ensure the end index does not exceed the total pages
    let endIndex = startIndex + windowSize;
    endIndex = Math.min(endIndex, totalPages);

 return {
   startIndex,
   endIndex,
   totalPages
 }
}