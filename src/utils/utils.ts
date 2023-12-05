import * as dotenv from 'dotenv'

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
    const imagesArray = ['']
    const parsedImages = JSON.parse(images).replace(/\\/g, '').replace(/"/g, '').replace('[', '').replace(']', '').split(',')
    console.log(parsedImages);
    return Array.from(parsedImages)
  }

export const getEnvionmentApiUrl = () => {
    return process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_PROD_API_URL
}