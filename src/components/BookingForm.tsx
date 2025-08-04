import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BookingFormData } from '../types';

const BookingForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDoctorById, bookAppointment } = useAppContext();
  
  const doctor = getDoctorById(id!);
  
  const [formData, setFormData] = useState<BookingFormData>({
    patientName: '',
    patientEmail: '',
    selectedDate: '',
    selectedTime: ''
  });
  
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  const availableDates = Array.from(new Set(
    doctor.availableSlots
      .filter(slot => slot.available)
      .map(slot => slot.date)
  )).sort();

  const availableTimesForDate = doctor.availableSlots
    .filter(slot => slot.date === formData.selectedDate && slot.available)
    .map(slot => slot.time)
    .sort();

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};
    
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }
    
    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Please enter a valid email address';
    }
    
    if (!formData.selectedDate) {
      newErrors.selectedDate = 'Please select a date';
    }
    
    if (!formData.selectedTime) {
      newErrors.selectedTime = 'Please select a time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await bookAppointment(doctor.id, formData);
      if (success) {
        setIsConfirmed(true);
      }
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment with <strong>{doctor.name}</strong> has been successfully booked for{' '}
            <strong>{new Date(formData.selectedDate).toLocaleDateString()}</strong> at{' '}
            <strong>{formData.selectedTime}</strong>.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to <strong>{formData.patientEmail}</strong>
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate(`/doctor/${doctor.id}`)}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              View Doctor Profile
            </button>
            <Link
              to="/"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Back to Doctors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to={`/doctor/${doctor.id}`}
            className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to doctor profile
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                <p className="text-sky-600">{doctor.specialization}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Consultation Fee</span>
                <span className="font-semibold">${doctor.consultationFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold">30 minutes</span>
              </div>
              {formData.selectedDate && formData.selectedTime && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-semibold">
                      {new Date(formData.selectedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-semibold">{formData.selectedTime}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Appointment</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2 text-sky-600" />
                  Patient Information
                </h3>
                
                <div>
                  <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.patientName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.patientName && (
                    <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="patientEmail"
                    value={formData.patientEmail}
                    onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.patientEmail ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.patientEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.patientEmail}</p>
                  )}
                </div>
              </div>

              {/* Appointment Schedule */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-sky-600" />
                  Select Date & Time
                </h3>

                <div>
                  <label htmlFor="selectedDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date *
                  </label>
                  <select
                    id="selectedDate"
                    value={formData.selectedDate}
                    onChange={(e) => {
                      handleInputChange('selectedDate', e.target.value);
                      handleInputChange('selectedTime', ''); // Reset time when date changes
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.selectedDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a date</option>
                    {availableDates.map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                  {errors.selectedDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.selectedDate}</p>
                  )}
                </div>

                {formData.selectedDate && (
                  <div>
                    <label htmlFor="selectedTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time *
                    </label>
                    <select
                      id="selectedTime"
                      value={formData.selectedTime}
                      onChange={(e) => handleInputChange('selectedTime', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.selectedTime ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a time</option>
                      {availableTimesForDate.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.selectedTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.selectedTime}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Booking Appointment...
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 mr-2" />
                      Book Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;