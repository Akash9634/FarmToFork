/**
 * AppContext.jsx – Global state management using React Context.
 * Manages: selected location, booking data, cart, booking flow step.
 */
import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

// Initial state
const initialState = {
  // Selected café location (Karnal / Panipat / Gharaunda)
  selectedLocation: null,
  // Whether the location modal has been shown
  locationModalShown: false,
  // Current booking data (form fields, service type, etc.)
  bookingData: null,
  // Current booking flow step: 'form' | 'review' | 'payment' | 'processing' | 'confirmation' | 'failed'
  bookingStep: 'form',
  // Service type for current booking
  bookingServiceType: null,
  // Cart items (for DIY Kits & Gourmet Platters)
  cart: [],
  // Whether the cart drawer is open
  cartOpen: false,
  // Generated booking ID for confirmation
  bookingId: null,
  // Simulate failure toggle
  simulateFailure: false,
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, selectedLocation: action.payload, locationModalShown: true };
    case 'SHOW_LOCATION_MODAL':
      return { ...state, locationModalShown: action.payload };
    case 'SET_BOOKING_DATA':
      return { ...state, bookingData: action.payload };
    case 'SET_BOOKING_STEP':
      return { ...state, bookingStep: action.payload };
    case 'SET_BOOKING_SERVICE_TYPE':
      return { ...state, bookingServiceType: action.payload };
    case 'SET_BOOKING_ID':
      return { ...state, bookingId: action.payload };
    case 'SET_SIMULATE_FAILURE':
      return { ...state, simulateFailure: action.payload };
    case 'RESET_BOOKING':
      return {
        ...state,
        bookingData: null,
        bookingStep: 'form',
        bookingServiceType: null,
        bookingId: null,
        simulateFailure: false,
      };
    // Cart actions
    case 'ADD_TO_CART': {
      const existing = state.cart.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          cartOpen: true,
        };
      }
      return { ...state, cart: [...state.cart, action.payload], cartOpen: true };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          (item) => !(item.id === action.payload.id && item.size === action.payload.size)
        ),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_CART':
      return { ...state, cartOpen: !state.cartOpen };
    case 'SET_CART_OPEN':
      return { ...state, cartOpen: action.payload };
    default:
      return state;
  }
}

// Generate a booking ID like FTF-2026-0001
let bookingCounter = 0;
function generateBookingId() {
  bookingCounter++;
  const year = new Date().getFullYear();
  return `FTF-${year}-${String(bookingCounter).padStart(4, '0')}`;
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check localStorage for previously selected location
  useEffect(() => {
    const savedLocation = localStorage.getItem('ftf-location');
    if (savedLocation) {
      dispatch({ type: 'SET_LOCATION', payload: savedLocation });
    }
  }, []);

  // Save location to localStorage whenever it changes
  useEffect(() => {
    if (state.selectedLocation) {
      localStorage.setItem('ftf-location', state.selectedLocation);
    }
  }, [state.selectedLocation]);

  // Helper functions
  const setLocation = (location) => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  };

  const setBookingData = (data) => {
    dispatch({ type: 'SET_BOOKING_DATA', payload: data });
  };

  const setBookingStep = (step) => {
    dispatch({ type: 'SET_BOOKING_STEP', payload: step });
  };

  const setBookingServiceType = (type) => {
    dispatch({ type: 'SET_BOOKING_SERVICE_TYPE', payload: type });
  };

  const startBooking = (serviceType, initialData = {}) => {
    dispatch({ type: 'SET_BOOKING_SERVICE_TYPE', payload: serviceType });
    dispatch({
      type: 'SET_BOOKING_DATA',
      payload: { ...initialData, location: state.selectedLocation || 'Karnal' },
    });
    dispatch({ type: 'SET_BOOKING_STEP', payload: 'form' });
  };

  const completeBooking = () => {
    const id = generateBookingId();
    dispatch({ type: 'SET_BOOKING_ID', payload: id });
    dispatch({ type: 'SET_BOOKING_STEP', payload: 'confirmation' });
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id, size) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, size } });
  };

  const updateCartQuantity = (id, size, quantity) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const setCartOpen = (open) => {
    dispatch({ type: 'SET_CART_OPEN', payload: open });
  };

  const setSimulateFailure = (val) => {
    dispatch({ type: 'SET_SIMULATE_FAILURE', payload: val });
  };

  // Calculate cart total
  const cartTotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    ...state,
    setLocation,
    setBookingData,
    setBookingStep,
    setBookingServiceType,
    startBooking,
    completeBooking,
    resetBooking,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleCart,
    setCartOpen,
    setSimulateFailure,
    cartTotal,
    cartCount,
    generateBookingId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}