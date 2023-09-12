import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'n6yy9762',
  dataset: 'production',
  apiVersion: '1',
  useCdn: true,
  token:
    'skftLPv5SWQTvNIoCQNwhmLIFWITIBZab2i4jkn0QBhl80ktXTa8LVaIf7yVKC08ngG37kDGTQWxSUcwQyXOEkNUefeZkB5Kz6jZHIePqngVOgcX2aLgrTyNWnAvDaCmUWxLAf7vpajnsgC5fUfKUYKWZjQ6mORnipEfg4xSKknaSqnbGmPy',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
