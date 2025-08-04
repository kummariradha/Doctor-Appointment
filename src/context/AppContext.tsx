import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, Appointment, BookingFormData } from '../types';
import { mockDoctors } from '../data/mockData';

interface AppContextType {
  doctors: Doctor[];
  appointments: Appointment[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  bookAppointment: (doctorId: string, bookingData: BookingFormData) => Promise<boolean>;
  getDoctorById: (id: string) => Doctor | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const bookAppointment = async (doctorId: string, bookingData: BookingFormData): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newAppointment: Appointment = {
        id: Date.now().toString(),
        doctorId,
        patientName: bookingData.patientName,
        patientEmail: bookingData.patientEmail,
        date: bookingData.selectedDate,
        time: bookingData.selectedTime,
        status: 'confirmed'
      };

      setAppointments(prev => [...prev, newAppointment]);
      return true;
    } catch (error) {
      console.error('Error booking appointment:', error);
      return false;
    }
  };

  const getDoctorById = (id: string): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === id);
  };

  const value: AppContextType = {
    doctors,
    appointments,
    searchTerm,
    setSearchTerm,
    bookAppointment,
    getDoctorById
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};