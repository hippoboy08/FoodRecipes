import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  saveData() {
    this.dataStorageService.storeRecipes()
    .subscribe(
      (response) => console.log('Successfully saved:', response),
      (error: Error) => console.log(error)
    );
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getData() {
    this.dataStorageService.getRecipes().subscribe();
  }

  logout() {
    this.authService.signoutUser();
  }
}
