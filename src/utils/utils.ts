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

export const PAGE_SIZE = 30;

export const parseImages = (images: string) : string[] => {
    if(Array.isArray(images)) return images
    const parsedImages = JSON.parse(images)
    return parsedImages
  }

export const getEnvionmentApiUrl = () => {
    return process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_PROD_API_URL
}

export const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

 export const getSlidingWindow = (currentPage : number, resultsTotal: number) : {startIndex: number, endIndex: number, totalPages: number} => {
    const totalPages = Math.ceil(resultsTotal / PAGE_SIZE); // Total number of pages

    console.log(
        `currentPage: ${currentPage}, 
        resultsTotal: ${resultsTotal}, 
        totalPages: ${totalPages}`
    );
    
    const windowSize = 2; // The size of the sliding window

    // Calculate the start index for the slice
    let startIndex = currentPage  - Math.floor(windowSize / 2);
    startIndex = Math.max(startIndex + 1 , 1); // Ensure start index is not less than 1

    // Adjust the start index if we're near the end of the page range
    
    if (startIndex > totalPages - windowSize + 1) {
      startIndex = totalPages - windowSize + 1;
    }
    console.log(
        `startIndex: ${startIndex}
        endIndex: ${startIndex + windowSize}`
    );
    

    // Ensure the end index does not exceed the total pages
    let endIndex = startIndex + windowSize;
    endIndex = Math.min(endIndex, totalPages);

 return {
   startIndex,
   endIndex,
   totalPages
 }
}