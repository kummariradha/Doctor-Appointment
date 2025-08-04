import { Doctor, TimeSlot } from '../types';

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const dates = ['2024-12-30', '2024-12-31', '2025-01-01', '2025-01-02', '2025-01-03'];
  const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  
  dates.forEach(date => {
    times.forEach(time => {
      slots.push({
        id: `${date}-${time}`,
        date,
        time,
        available: Math.random() > 0.3 // 70% chance of being available
      });
    });
  });
  
  return slots;
};

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: 12,
    rating: 4.8,
    availabilityStatus: 'available',
    description: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating heart conditions. She specializes in preventive cardiology and cardiac interventions.',
    education: 'MD from Harvard Medical School',
    languages: ['English', 'Spanish'],
    consultationFee: 200,
    availableSlots: generateTimeSlots()
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    image: 'https://images.pexels.com/photos/6749771/pexels-photo-6749771.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: 8,
    rating: 4.9,
    availabilityStatus: 'available',
    description: 'Dr. Michael Chen is a dermatologist specializing in medical and cosmetic dermatology. He has extensive experience in treating skin conditions and aesthetic procedures.',
    education: 'MD from Stanford University',
    languages: ['English', 'Mandarin'],
    consultationFee: 150,
    availableSlots: generateTimeSlots()
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: 10,
    rating: 4.7,
    availabilityStatus: 'busy',
    description: 'Dr. Emily Rodriguez is a pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence.',
    education: 'MD from Johns Hopkins University',
    languages: ['English', 'Spanish', 'Portuguese'],
    consultationFee: 180,
    availableSlots: generateTimeSlots()
  },
  {
    id: '4',
    name: 'Dr. David Kim',
    specialization: 'Orthopedics',
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: 15,
    rating: 4.6,
    availabilityStatus: 'available',
    description: 'Dr. David Kim is an orthopedic surgeon specializing in sports medicine and joint replacement surgery. He has helped numerous athletes return to peak performance.',
    education: 'MD from UCLA Medical School',
    languages: ['English', 'Korean'],
    consultationFee: 250,
    availableSlots: generateTimeSlots()
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Neurology',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: 11,
    rating: 4.9,
    availabilityStatus: 'offline',
    description: 'Dr. Lisa Thompson is a neurologist with expertise in treating neurological disorders including epilepsy, migraines, and movement disorders.',
    education: 'MD from Mayo Clinic',
    languages: ['English', 'French'],
    consultationFee: 220,
    availableSlots: generateTimeSlots()
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    specialization: 'Internal Medicine',
    image: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: 9,
    rating: 4.5,
    availabilityStatus: 'available',
    description: 'Dr. James Wilson is an internist focused on preventive care and management of chronic diseases in adults.',
    education: 'MD from Yale School of Medicine',
    languages: ['English'],
    consultationFee: 160,
    availableSlots: generateTimeSlots()
  }
];