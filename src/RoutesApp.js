import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/header';
import Appointments from './Pages/Appointment';
import Order from './Pages/Order';

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schedule" element={<Appointments />} />
                <Route path="/order" element={<Order />} />
            </Routes>
        </BrowserRouter>
    );
}