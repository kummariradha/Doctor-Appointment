export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  experience: number;
  rating: number;
  availabilityStatus: 'available' | 'busy' | 'offline';
  description: string;
  education: string;
  languages: string[];
  consultationFee: number;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface BookingFormData {
  patientName: string;
  patientEmail: string;
  selectedDate: string;
  selectedTime: string;
}