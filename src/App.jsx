/**
 * App.jsx – Root component with all routes defined.
 * Uses React Router v6 for client-side navigation.
 */
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocationModal from './components/LocationModal';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Workshops from './pages/Workshops';
import KittyParties from './pages/KittyParties';
import Events from './pages/Events';
import DIYKits from './pages/DIYKits';
import GourmetPlatters from './pages/GourmetPlatters';
import GrazingTables from './pages/GrazingTables';
import Catering from './pages/Catering';
import Contact from './pages/Contact';
import BookingFlow from './pages/BookingFlow';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* First-visit location picker modal */}
      <LocationModal />

      {/* Cart drawer for DIY Kits / Platters */}
      <CartDrawer />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/kitty-parties" element={<KittyParties />} />
          <Route path="/events" element={<Events />} />
          <Route path="/diy-kits" element={<DIYKits />} />
          <Route path="/gourmet-platters" element={<GourmetPlatters />} />
          <Route path="/grazing-tables" element={<GrazingTables />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/contact" element={<Contact />} />
          {/* Unified booking flow for all services */}
          <Route path="/booking/:serviceType" element={<BookingFlow />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}