/**
 * formConfigs.js – Configuration objects for the reusable BookingForm.
 * Each config defines the fields, labels, validation and CTA text for a specific service.
 * Replace / extend fields as needed.
 */
import { locationNames } from './locations';

// Shared validation helpers
const required = (v) => (!v || v.toString().trim() === '' ? 'This field is required' : '');
const validPhone = (v) => {
  if (!v) return 'Phone number is required';
  const cleaned = v.replace(/\D/g, '');
  return cleaned.length >= 10 ? '' : 'Enter a valid 10-digit phone number';
};
const validEmail = (v) => {
  if (!v) return 'Email is required';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address';
};
const optionalEmail = (v) => {
  if (!v || v.trim() === '') return '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address';
};

// ---- RESERVATION ----
export const reservationConfig = {
  title: 'Reserve a Table',
  subtitle: 'Your Table Awaits.',
  serviceType: 'reservation',
  ctaText: 'Review Booking',
  fields: [
    { name: 'location', label: 'Location', type: 'select', options: locationNames, validate: required },
    { name: 'date', label: 'Preferred Date', type: 'date', validate: required },
    { name: 'time', label: 'Preferred Time', type: 'time', validate: required },
    { name: 'guests', label: 'Number of Guests', type: 'number', min: 1, max: 50, validate: required },
    { name: 'name', label: 'Your Name', type: 'text', validate: required },
    { name: 'phone', label: 'Phone Number', type: 'tel', validate: validPhone },
    { name: 'occasion', label: 'Special Occasion', type: 'select', options: ['None', 'Birthday', 'Anniversary', 'Date Night', 'Business Dinner', 'Other'], validate: () => '' },
    { name: 'seatingRequests', label: 'Special Seating Requests', type: 'textarea', placeholder: 'e.g. window seat, private corner, outdoor...', validate: () => '' },
  ],
  pricing: {
    label: 'Table Reservation',
    basePrice: 0,
    deposit: 500,
    depositLabel: 'Advance Deposit (adjustable against bill)',
  },
};

// ---- WORKSHOP ----
export const workshopConfig = {
  title: 'Book a Workshop',
  subtitle: 'Create. Connect. Celebrate.',
  serviceType: 'workshop',
  ctaText: 'Review Booking',
  fields: [
    { name: 'workshopName', label: 'Workshop', type: 'select', options: [], validate: required }, // options filled dynamically
    { name: 'location', label: 'Location', type: 'select', options: locationNames, validate: required },
    { name: 'date', label: 'Preferred Date', type: 'date', validate: required },
    { name: 'guests', label: 'Number of Guests', type: 'number', min: 1, max: 30, validate: required },
    { name: 'name', label: 'Your Name', type: 'text', validate: required },
    { name: 'phone', label: 'Phone Number', type: 'tel', validate: validPhone },
    { name: 'email', label: 'Email', type: 'email', validate: validEmail },
    { name: 'specialRequirements', label: 'Special Requirements', type: 'textarea', placeholder: 'Allergies, accessibility, group details...', validate: () => '' },
  ],
  pricing: {
    label: 'Workshop Booking',
    perPerson: true,
    basePrice: 0, // filled dynamically from workshop data
    taxRate: 0.18,
  },
};

// ---- KITTY PARTY ----
export const kittyConfig = {
  title: 'Book Your Kitty Party',
  subtitle: 'Your Kitty, Our Table.',
  serviceType: 'kitty',
  ctaText: 'Review Booking',
  fields: [
    { name: 'location', label: 'Location', type: 'select', options: locationNames, validate: required },
    { name: 'date', label: 'Preferred Date', type: 'date', validate: required },
    { name: 'time', label: 'Preferred Time', type: 'time', validate: required },
    { name: 'guests', label: 'Number of Guests', type: 'number', min: 5, max: 50, validate: required },
    { name: 'menuPreference', label: 'Menu Preference', type: 'select', options: [], validate: required },
    { name: 'packageType', label: 'Package', type: 'select', options: ['Silver', 'Gold', 'Platinum'], validate: required },
    { name: 'decorRequirements', label: 'Décor Requirements', type: 'textarea', placeholder: 'Theme, colour preferences, special requests...', validate: () => '' },
    { name: 'name', label: 'Your Name', type: 'text', validate: required },
    { name: 'phone', label: 'Phone Number', type: 'tel', validate: validPhone },
    { name: 'email', label: 'Email', type: 'email', validate: optionalEmail },
  ],
  pricing: {
    label: 'Kitty Party Package',
    perPerson: true,
    basePrice: 0,
    taxRate: 0.18,
  },
};

// ---- GRAZING TABLE ----
export const grazingConfig = {
  title: 'Book a Grazing Table',
  subtitle: 'A Feast Worth Gathering Around.',
  serviceType: 'grazing',
  ctaText: 'Review Booking',
  fields: [
    { name: 'location', label: 'Location', type: 'select', options: locationNames, validate: required },
    { name: 'date', label: 'Event Date', type: 'date', validate: required },
    { name: 'guests', label: 'Number of Guests', type: 'number', min: 20, max: 200, validate: required },
    { name: 'packageName', label: 'Package', type: 'select', options: ['Classic Grazing Table', 'Premium Grazing Table', 'Luxury Grazing Experience'], validate: required },
    { name: 'stylingRequirements', label: 'Styling Requirements', type: 'textarea', placeholder: 'Theme, colour palette, special dietary needs...', validate: () => '' },
    { name: 'name', label: 'Your Name', type: 'text', validate: required },
    { name: 'phone', label: 'Phone Number', type: 'tel', validate: validPhone },
    { name: 'email', label: 'Email', type: 'email', validate: validEmail },
  ],
  pricing: {
    label: 'Grazing Table',
    perPerson: true,
    basePrice: 0,
    taxRate: 0.18,
  },
};

// ---- EVENTS (Enquiry-based, optional advance) ----
export const eventConfig = {
  title: 'Plan Your Event',
  subtitle: 'Your Event. Your Way.',
  serviceType: 'event',
  ctaText: 'Submit Enquiry',
  isEnquiry: true,
  fields: [
    { name: 'eventType', label: 'Event Type', type: 'select', options: ['Birthday Celebration', 'Anniversary', 'Corporate Event', 'Brand Event', 'Family Gathering', 'Private Party', 'Launch Event', 'Social Event', 'Other'], validate: required },
    { name: 'location', label: 'Preferred Location', type: 'select', options: locationNames, validate: required },
    { name: 'date', label: 'Preferred Date', type: 'date', validate: required },
    { name: 'guests', label: 'Expected Guests', type: 'number', min: 1, max: 500, validate: required },
    { name: 'services', label: 'Services Needed', type: 'textarea', placeholder: 'Catering, décor, grazing table, dessert table, etc.', validate: () => '' },
    { name: 'budget', label: 'Approximate Budget (₹)', type: 'text', placeholder: 'e.g. ₹50,000 – ₹1,00,000', validate: () => '' },
    { name: 'name', label: 'Your Name', type: 'text', validate: required },
    { name: 'phone', label: 'Phone Number', type: 'tel', validate: validPhone },
    { name: 'email', label: 'Email', type: 'email', validate: validEmail },
    { name: 'message', label: 'Additional Details', type: 'textarea', placeholder: 'Tell us more about your event...', validate: () => '' },
  ],
};

// ---- CATERING (Enquiry only, no payment) ----
export const cateringConfig = {
  title: 'Enquire for Catering',
  subtitle: 'Farm to Fork, Wherever You Celebrate.',
  serviceType: 'catering',
  ctaText: 'Request a Quote',
  isEnquiry: true,
  fields: [
    { name: 'eventType', label: 'Event Type', type: 'select', options: ['Corporate Event', 'Wedding', 'Private Party', 'Birthday Celebration', 'Family Function', 'Brand Event', 'Large Gathering', 'Other'], validate: required },
    { name: 'location', label: 'Event Location / City', type: 'text', validate: required },
    { name: 'date', label: 'Event Date', type: 'date', validate: required },
    { name: 'guests', label: 'Expected Guests', type: 'number', min: 10, max: 1000, validate: required },
    { name: 'menuPreferences', label: 'Menu Preferences', type: 'textarea', placeholder: 'Veg / Non-veg / Both, cuisine preferences...', validate: () => '' },
    { name: 'budget', label: 'Approximate Budget (₹)', type: 'text', placeholder: 'e.g. ₹1,00,000+', validate: () => '' },
    { name: 'name', label: 'Your Name', type: 'text', validate: required },
    { name: 'phone', label: 'Phone Number', type: 'tel', validate: validPhone },
    { name: 'email', label: 'Email', type: 'email', validate: validEmail },
    { name: 'message', label: 'Additional Requirements', type: 'textarea', placeholder: 'Staffing, equipment, dietary restrictions...', validate: () => '' },
  ],
};

// ---- CONTACT / GENERAL ENQUIRY ----
export const contactConfig = {
  title: 'Contact Us',
  subtitle: "Let's Plan Something Delicious.",
  serviceType: 'contact',
  ctaText: 'Submit Enquiry',
  isEnquiry: true,
  fields: [
    { name: 'name', label: 'Name', type: 'text', validate: required },
    { name: 'phone', label: 'Phone Number', type: 'tel', validate: validPhone },
    { name: 'email', label: 'Email', type: 'email', validate: validEmail },
    { name: 'serviceRequired', label: 'Service Required', type: 'select', options: ['Workshop', 'Kitty Party', 'Reservation', 'Event', 'DIY Kit', 'Gourmet Platter', 'Grazing Table', 'Catering', 'General Enquiry'], validate: required },
    { name: 'location', label: 'Preferred Location', type: 'select', options: locationNames, validate: required },
    { name: 'date', label: 'Preferred Date', type: 'date', validate: () => '' },
    { name: 'guests', label: 'Number of Guests', type: 'number', min: 1, validate: () => '' },
    { name: 'time', label: 'Preferred Time', type: 'time', validate: () => '' },
    { name: 'message', label: 'Message / Requirements', type: 'textarea', placeholder: 'Tell us what you need...', validate: () => '' },
  ],
};

// DIY Kits & Gourmet Platters use cart-based checkout, so they have a simpler config
export const diyCheckoutConfig = {
  title: 'DIY Kit Checkout',
  subtitle: 'Delivery Details',
  serviceType: 'diy',
  ctaText: 'Review Order',
  fields: [
    { name: 'name', label: 'Full Name', type: 'text', validate: required },
    { name: 'phone', label: 'Phone Number', type: 'tel', validate: validPhone },
    { name: 'email', label: 'Email', type: 'email', validate: validEmail },
    { name: 'address', label: 'Delivery Address', type: 'textarea', placeholder: 'House/flat number, street, area...', validate: required },
    { name: 'city', label: 'City', type: 'text', validate: required },
    { name: 'pincode', label: 'PIN Code', type: 'text', validate: required },
    { name: 'notes', label: 'Delivery Notes', type: 'textarea', placeholder: 'Landmark, instructions...', validate: () => '' },
  ],
};

export const platterCheckoutConfig = {
  title: 'Platter Order Checkout',
  subtitle: 'Delivery / Pickup Details',
  serviceType: 'platter',
  ctaText: 'Review Order',
  fields: [
    { name: 'name', label: 'Full Name', type: 'text', validate: required },
    { name: 'phone', label: 'Phone Number', type: 'tel', validate: validPhone },
    { name: 'email', label: 'Email', type: 'email', validate: optionalEmail },
    { name: 'deliveryType', label: 'Delivery / Pickup', type: 'select', options: ['Delivery', 'Pickup from Store'], validate: required },
    { name: 'location', label: 'Location', type: 'select', options: locationNames, validate: required },
    { name: 'date', label: 'Required Date', type: 'date', validate: required },
    { name: 'time', label: 'Required Time', type: 'time', validate: required },
    { name: 'address', label: 'Delivery Address (if delivery)', type: 'textarea', placeholder: 'Full address...', validate: () => '' },
    { name: 'notes', label: 'Special Instructions', type: 'textarea', placeholder: 'Allergies, customization...', validate: () => '' },
  ],
};