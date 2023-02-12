import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  vehicles = [
    { make: 'Honda', model: 'Civic', year: 2020, type: 'Sedan', color: 'Preto' },
    { make: 'Toyota', model: 'Corolla', year: 2021, type: 'Sedan', color: 'Branco' },
    { make: 'Jeep', model: 'Wrangler', year: 2022, type: 'SUV', color: 'Verde' },
    { make: 'Tesla', model: 'Model S', year: 2022, type: 'Sedan', color: 'Vermelho' }
  ];

  newVehicle = { make: '', model: '', year: 0, type: '', color: '' };

  filteredVehicles = this.vehicles;

  applyFilter(filterValue: string) {
    this.filteredVehicles = this.vehicles.filter(vehicle => {
      return vehicle.make.toLowerCase().includes(filterValue.toLowerCase()) ||
             vehicle.model.toLowerCase().includes(filterValue.toLowerCase()) ||
             vehicle.year.toString().includes(filterValue) ||
             vehicle.type.toLowerCase().includes(filterValue.toLowerCase()) ||
             vehicle.color.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  addVehicle() {
    this.vehicles.push(this.newVehicle);
    this.newVehicle = { make: '', model: '', year: 0, type: '', color: '' };
  }

  removeVehicle(vehicle: { make: string; model: string; year: number; type: string; color: string }) {
    this.vehicles = this.vehicles.filter((v) => v !== vehicle);
  }
}
