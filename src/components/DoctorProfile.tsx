import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, DollarSign, Languages, GraduationCap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getDoctorById } = useAppContext();
  
  const doctor = getDoctorById(id!);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Doctor not found</h2>
          <Link to="/" className="text-sky-600 hover:text-sky-700">
            Go back to doctors list
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: typeof doctor.availabilityStatus) => {
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
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to doctors
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Doctor Header */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 rounded-xl object-cover"
              />
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                    <p className="text-xl text-sky-600 font-medium">{doctor.specialization}</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    {getStatusBadge(doctor.availabilityStatus)}
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                    <span className="font-medium">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>${doctor.consultationFee} consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Doctor Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed">{doctor.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-2 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-sky-600" />
                      Education
                    </h4>
                    <p className="text-gray-600">{doctor.education}</p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-2 flex items-center">
                      <Languages className="h-5 w-5 mr-2 text-sky-600" />
                      Languages
                    </h4>
                    <p className="text-gray-600">{doctor.languages.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Appointment Booking */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Appointment</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="font-semibold text-gray-900">${doctor.consultationFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">30 minutes</span>
                  </div>
                </div>

                <Link
                  to={`/book/${doctor.id}`}
                  className="block w-full bg-sky-600 hover:bg-sky-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Book Appointment
                </Link>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  You'll be able to select your preferred date and time in the next step
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;