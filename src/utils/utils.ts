

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
    return process.env.NODE_ENV === 'development' ? process.env.API_URL : process.env.PROD_API_URL
}