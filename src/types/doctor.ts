export interface DoctorAddress {
  country?: string;
  city: string;
  district: string;
}

export interface Doctor {
  id: string;
  type: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  onlineAppointment: boolean;
  nextAvailableSlot: string;
  insurance: string[];
  address: DoctorAddress;
  distanceKm: number;
  phone: string;
  imageUrl: string;
}
