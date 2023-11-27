export type Property = {
  id: string;
  parcel_id: string;
  address: string;
  city: string;
  zip: string;
  property_class: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  lot_size: number;
  features: Object;
  featured: boolean;
  year_built: string;
  stories: number;
  garage: string;
  coords: string;
  images: string;
}