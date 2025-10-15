import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModuleService } from '../services/module.service';
import { UserService } from '../services/user.service';
import { Module } from '../models/module.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteModules: Module[] = [];
  filteredFavorites: Module[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadFavoriteModules();
  }

  loadFavoriteModules() {
    this.isLoading = true;
    this.errorMessage = '';

    this.moduleService.getAllModules().subscribe({
      next: (allModules) => {
        this.favoriteModules = allModules.filter(module => module.favorited);
        this.filteredFavorites = [...this.favoriteModules];
        this.isLoading = false;
        console.log('✅ Favorite modules loaded for comparison:', this.favoriteModules);
      },
      error: (error) => {
        console.error('❌ Error loading favorite modules:', error);
        this.errorMessage = 'Kon favorieten niet laden. Controleer of de backend API draait.';
        this.isLoading = false;
      }
    });
  }

  removeFavorite(module: Module) {
    this.userService.removeFavorite(module.id).subscribe({
      next: () => {
        // Update lokaal
        module.favorited = false;
        this.favoriteModules = this.favoriteModules.filter(m => m.id !== module.id);
        this.filteredFavorites = this.filteredFavorites.filter(m => m.id !== module.id);
        console.log('✅ Removed from favorites');
      },
      error: (error) => {
        console.error('❌ Error removing favorite:', error);
      }
    });
  }

  viewReflections(moduleId: string) {
    this.router.navigate(['/modules', moduleId, 'reflections']);
  }

  goToModules() {
    this.router.navigate(['/modules']);
  }


  trackByModule(index: number, module: Module): string {
    return module.id;
  }
}