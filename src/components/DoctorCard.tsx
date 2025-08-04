import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, DollarSign } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const getStatusBadge = (status: Doctor['availabilityStatus']) => {
    const styles = {
      available: 'bg-green-100 text-green-800 border-green-200',
      busy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      offline: 'bg-red-100 text-red-800 border-red-200'
    };

    const labels = {
      available: 'Available Today',
      busy: 'Busy',
      offline: 'Offline'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          {getStatusBadge(doctor.availabilityStatus)}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
          </div>
        </div>
        
        <p className="text-sky-600 font-medium mb-2">{doctor.specialization}</p>
        <p className="text-gray-600 text-sm mb-4">{doctor.experience} years experience</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-500">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm">${doctor.consultationFee}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">30 min</span>
          </div>
        </div>
        
        <Link
          to={`/doctor/${doctor.id}`}
          className="block w-full bg-sky-600 hover:bg-sky-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;