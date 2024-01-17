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