/**
 * locations.js – Café branch data.
 * Replace with client data when ready.
 */
export const locations = [
  {
    id: 'karnal',
    name: 'Karnal',
    address: 'SCO 12-13, Sector 12, HUDA Market, Karnal, Haryana 132001',
    phone: '+91 98765 43210',
    email: 'karnal@farmtofork.in',
    timings: '9:00 AM – 11:00 PM',
    mapUrl: 'https://maps.google.com',
  },
  {
    id: 'panipat',
    name: 'Panipat',
    address: 'Shop 5, GT Road, Model Town, Panipat, Haryana 132103',
    phone: '+91 98765 43211',
    email: 'panipat@farmtofork.in',
    timings: '9:00 AM – 11:00 PM',
    mapUrl: 'https://maps.google.com',
  },
  {
    id: 'gharaunda',
    name: 'Gharaunda',
    address: 'Near Bus Stand, Main Market, Gharaunda, Haryana 132114',
    phone: '+91 98765 43212',
    email: 'gharaunda@farmtofork.in',
    timings: '10:00 AM – 10:00 PM',
    mapUrl: 'https://maps.google.com',
  },
];

export const locationNames = locations.map((l) => l.name);