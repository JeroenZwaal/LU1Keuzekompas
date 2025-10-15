import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModuleService } from '../services/module.service';
import { UserService } from '../services/user.service';
import { Module } from '../models/module.model';

@Component({
  selector: 'app-module-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {
  module: Module | null = null;
  isLoading = true;
  errorMessage = '';
  moduleId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.moduleId = params['id'];
      this.loadModule();
    });
  }

  loadModule() {
    this.isLoading = true;
    this.errorMessage = '';

    this.moduleService.getModuleById(this.moduleId).subscribe({
      next: (module) => {
        this.module = module;
        this.isLoading = false;
        console.log('Module loaded:', module);
      },
      error: (error) => {
        console.error('Error loading module:', error);
        this.errorMessage = 'Module kon niet worden geladen.';
        this.isLoading = false;
      }
    });
  }

  toggleFavorite() {
    if (!this.module) return;

    if (this.isFavorite()) {
      this.userService.removeFavorite(this.module.id).subscribe({
        next: () => {
          if (this.module) {
            this.module.favorited = false;
          }
          console.log('Removed from favorites');
        },
        error: (error) => {
          console.error('Error removing favorite:', error);
        }
      });
    } else {
      const favorite = {
        moduleId: this.module.id,
        moduleName: this.module.name,
        studycredit: this.module.studycredit,
        location: this.module.location
      };

      this.userService.addFavorite(favorite).subscribe({
        next: () => {
          if (this.module) {
            this.module.favorited = true;
          }
          console.log('Added to favorites');
        },
        error: (error) => {
          console.error('Error adding favorite:', error);
        }
      });
    }
  }

  isFavorite(): boolean {
    return this.module ? this.module.favorited : false;
  }

  viewReflections() {
    if (this.module) {
      this.router.navigate(['/modules', this.module.id, 'reflections']);
    }
  }

}