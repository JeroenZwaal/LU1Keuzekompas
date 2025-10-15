import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModuleService } from '../services/module.service';
import { UserService } from '../services/user.service';
import { Module } from '../models/module.model';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css'],
})
export class ModuleListComponent implements OnInit {
  currentUser: any = null;
  modules: Module[] = [];
  filteredModules: Module[] = [];
  isLoading = true;
  errorMessage = '';
  userFavorites: string[] = [];

  filters = {
    name: '',
    location: '',
    studycredit: '',
    level: ''
  };

  private filterTimeout: any;

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private userService: UserService
  ) {
    this.loadCurrentUser();
  }

  ngOnInit() {
    this.loadModules();
    this.loadUserFavorites();
  }

  loadCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }
  }

  loadModules() {
    this.isLoading = true;
    this.errorMessage = '';

    this.moduleService.getAllModules().subscribe({
      next: (modules) => {
        console.log('Modules loaded from API:', modules);
        this.modules = modules;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading modules:', error);
        this.errorMessage = 'Kon modules niet laden. Controleer of de backend API draait.';
        this.isLoading = false;
      }
    });
  }

  loadUserFavorites() {
    if (!this.currentUser) return;

    this.userFavorites = this.currentUser.favorites.map((fav: any) => fav.moduleId);
    console.log('User favorites loaded:', this.userFavorites);
    
  }

  onFilterChange() {
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.applyFilters();
    }, 300);
  }

  applyFilters() {
    console.log('🔍 Applying filters:', this.filters);

    // Check of er filters zijn
    const hasFilters = this.filters.name || this.filters.location || 
                      this.filters.studycredit || this.filters.level;

    if (!hasFilters) {
      // Geen filters, toon alle modules
      this.filteredModules = [...this.modules];
      return;
    }

    // Maak filter object voor backend
    const backendFilters: any = {};
    
    if (this.filters.name) backendFilters.name = this.filters.name;
    if (this.filters.location) backendFilters.location = this.filters.location;
    if (this.filters.studycredit) backendFilters.studycredit = parseInt(this.filters.studycredit);
    if (this.filters.level) backendFilters.level = this.filters.level;


    // Doe backend request
    this.moduleService.filterModules(backendFilters).subscribe({
      next: (modules) => {
        this.filteredModules = modules;
      },
      error: (error) => {
        this.errorMessage = 'Kon modules niet filteren.';
      }
    });
    }

    clearFilters() {
      this.filters = {
        name: '',
        location: '',
        studycredit: '',
        level: ''
      };
    this.applyFilters();
  }

  isFavorite(moduleId: string): boolean {
    const module = this.modules.find(mod => mod.id === moduleId);
    return module ? module.favorited : false;
  }

  toggleFavorite(module: Module) {
    if (this.isFavorite(module.id)) {
      this.userService.removeFavorite(module.id).subscribe({
        next: () => {
          // Update lokaal
          const moduleInModules = this.modules.find(m => m.id === module.id);
          const moduleInFiltered = this.filteredModules.find(m => m.id === module.id);
          
          if (moduleInModules) moduleInModules.favorited = false;
          if (moduleInFiltered) moduleInFiltered.favorited = false;
          
          this.userFavorites = this.userFavorites.filter(id => id !== module.id);
          console.log('Removed from favorites');
        },
        error: (error) => {
          console.error('Error removing favorite:', error);
        }
      });
    } else {
      const favorite = {
        moduleId: module.id,
        moduleName: module.name,
        studycredit: module.studycredit,
        location: module.location
      };

      this.userService.addFavorite(favorite).subscribe({
        next: () => {
          const moduleInModules = this.modules.find(m => m.id === module.id);
          const moduleInFiltered = this.filteredModules.find(m => m.id === module.id);
          
          if (moduleInModules) moduleInModules.favorited = true;
          if (moduleInFiltered) moduleInFiltered.favorited = true;
          
          this.userFavorites.push(module.id);
          console.log('Added to favorites');
        },
        error: (error) => {
          console.error('Error adding favorite:', error);
        }
      });
    }
  }

  viewModule(id: string) {
    this.router.navigate(['/modules', id]);
  }

  viewReflections(moduleId: string) {
    this.router.navigate(['/modules', moduleId, 'reflections']);
  }

  // Voeg deze method toe voor trackBy
  trackByModule(index: number, module: Module): string {
    return module.id;
  }
}