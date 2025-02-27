import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {
  private scriptLoaded = false;

  constructor() {}

  load(): Promise<any> {
    if (this.scriptLoaded) {
      return Promise.resolve(google); // Si el script ya está cargado, devuelve la promesa resuelta.
    }

    return new Promise((resolve, reject) => {
      if (window['googleMapsCallback']) {
        console.log('entra y valor de google:', google)
        resolve(google);
      } else {
        window['googleMapsCallback'] = () => {
          this.scriptLoaded = true;
          console.log('Google Maps script loaded');
          resolve(google);
        };

        // Verificar si el script ya está en el documento
        const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&callback=googleMapsCallback`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        } else {
          resolve(google); // Si el script ya está cargado, resuelve directamente
        }
      }
    });
  }
}