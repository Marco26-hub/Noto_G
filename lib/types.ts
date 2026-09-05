export type PropertyStatus = "disponibile" | "riservato" | "venduto";

export interface Property {
  id: string;
  reference: string;
  title: string;
  description: string;
  propertyType: string;
  contract: "vendita";
  price: number;
  city: string;
  address: string;
  zip: string;
  province: string;
  latitude?: number;
  longitude?: number;
  rooms: number;
  bathrooms: number;
  area: number;
  floor?: string;
  totalFloors?: number;
  yearBuilt?: number;
  energyClass: string;
  epgValue?: number;
  heating?: string;
  condition?: string;
  expenses?: number;
  status: PropertyStatus;
  featured: boolean;
  newConstruction: boolean;
  elevator: boolean;
  amenities: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export type LeadType = "contatto" | "appuntamento" | "immobile";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: LeadType;
  date?: string;
  propertyRef?: string;
  message: string;
  createdAt: string;
}
