declare global {
    interface Window {
      googleMapsCallback: () => void;
    }
  }
  
  export {};