import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DoctorsList from './components/DoctorsList';
import DoctorProfile from './components/DoctorProfile';
import BookingForm from './components/BookingForm';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<DoctorsList />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/book/:id" element={<BookingForm />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
