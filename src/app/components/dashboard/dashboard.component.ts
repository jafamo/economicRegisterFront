import { OnInit, AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsLoaderService } from '../../services/google-maps/google-maps-loader_service';

declare var google: any; // Asegura que Angular reconozca 'google'

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    GoogleMapsModule,
    MatAccordion,
    MatExpansionModule,
    MatButtonModule,    
    MatIconModule,
  ], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  accordion = viewChild.required(MatAccordion);
  mapOptions: google.maps.MapOptions = {    
    center: { lat: 39.4754, lng: -0.3472 },
    zoom: 14,
    mapTypeId: 'roadmap'
  };

  hospitals = [
    { name: 'Hospital Universitari i Politècnic La Fe', lat: 39.4754, lng: -0.3472 },
    { name: 'Hospital Clínico Universitario de Valencia', lat: 39.4753, lng: -0.3445 },
    { name: 'Hospital General Universitario de Valencia', lat: 39.4751, lng: -0.3760 },
    { name: 'Hospital de la Malvarrosa', lat: 39.4824, lng: -0.3375 }
  ];

  constructor(private googleMapsLoaderService: GoogleMapsLoaderService ) {}

  ngOnInit(): void {
    //console.log('entra en el dashboard', google);
  }

  // Método que se ejecuta después de que la vista se ha inicializado
  ngAfterViewInit(): void {
    //console.log('antes de ejecutarse', google);
    this.googleMapsLoaderService.load().then((google) => {
      //console.log('Google Maps loaded', google); // Verifica si Google Maps se carga correctamente
      const map = new google.maps.Map(document.getElementById('google-map') as HTMLElement, this.mapOptions);
      this.createMarkers(map);
    }).catch((error) => {
      console.error('Error loading Google Maps', error);
    });
  }

   // Crear los marcadores usando google.maps.Marker
   
   createMarkers(map: google.maps.Map): void {
    this.hospitals.forEach((hospital) => {
      //console.log(`Creating marker for: ${hospital.name}`);
      const marker = new google.maps.Marker({
        position: { lat: hospital.lat, lng: hospital.lng },
        map: map,
        title: hospital.name,
        content: `<div><strong>${hospital.name}</strong><br>Lat: ${hospital.lat}, Lng: ${hospital.lng}</div>`,
      });
      //console.log(`Marker created for: ${hospital.name}`);
      
      const infowindow = new google.maps.InfoWindow({
        content: `<div><strong>${hospital.name}</strong><br>Lat: ${hospital.lat}, Lng: ${hospital.lng}</div>`
      });
  
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    });
  }

}
