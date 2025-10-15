import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReflectionService } from '../services/reflection.service';
import { ModuleService } from '../services/module.service';
import { Reflection, CreateReflectionDto } from '../models/reflection.model';
import { Module } from '../models/module.model';

@Component({
  selector: 'app-reflection-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reflection-form.component.html',
  styleUrls: ['./reflection-form.component.css']
})
export class ReflectionFormComponent implements OnInit {
  moduleId: string = '';
  module: Module | null = null;
  reflection: Reflection | null = null;
  isLoading = true;
  isSaving = false;
  errorMessage = '';
  successMessage = '';

  // Form data
  formData: CreateReflectionDto = {
    content: '',
    rating: 1
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reflectionService: ReflectionService,
    private moduleService: ModuleService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.moduleId = params['moduleId'];
      this.loadModule();
      this.loadReflection();
    });
  }

  loadModule() {
    this.moduleService.getModuleById(this.moduleId).subscribe({
      next: (module) => {
        this.module = module;
        console.log('Module loaded for reflection:', module);
      },
      error: (error) => {
        console.error('Error loading module:', error);
        this.errorMessage = 'Module kon niet worden geladen.';
      }
    });
  }

loadReflection() {
  this.isLoading = true;
  this.errorMessage = '';

  this.reflectionService.getMyModuleReflection(this.moduleId).subscribe({
    next: (reflection) => {
      if (reflection) {
        // Bestaande reflectie gevonden
        this.reflection = reflection;
        this.formData = {
          content: reflection.content,
          rating: reflection.rating
        };
      } else {
        // Geen reflectie gevonden - nieuwe aanmaken
        this.reflection = null;
        this.formData = {
          content: '',
          rating: 1
        };
      }
      this.isLoading = false;
    },
    error: (error) => {
      // Bij error, ga uit van nieuwe reflectie
      this.reflection = null;
      this.formData = {
        content: '',
        rating: 1
      };
      this.isLoading = false;
    }
  });
}

  onSubmit() {
    if (!this.isValidForm()) {
        return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.reflection) {
        // Update bestaande reflectie
        this.reflectionService.updateReflection(this.moduleId, this.reflection.id, this.formData).subscribe({
        next: (response) => {
            this.successMessage = 'Reflectie succesvol bijgewerkt!';
            this.isSaving = false;
            console.log('Reflection updated');
            
            setTimeout(() => {
            this.goBack();
            }, 300);
        },
        error: (error) => {
            console.error('Error updating reflection:', error);
            this.errorMessage = 'Er ging iets mis bij het bijwerken van de reflectie.' + error.message;
            this.isSaving = false;
        }
        });
    } else {
        // Nieuwe reflectie aanmaken
        this.reflectionService.saveReflection(this.moduleId, this.formData).subscribe({
        next: (response) => {
            this.successMessage = 'Reflectie succesvol opgeslagen!';
            this.isSaving = false;
            console.log('New reflection created');
            
            setTimeout(() => {
            this.goBack();
            }, 300);
        },
        error: (error) => {
            console.error('Error creating reflection:', error);
            this.errorMessage = 'Er ging iets mis bij het opslaan van de reflectie.' + error.message;
            this.isSaving = false;
        }
        });
    }
}

onDelete() {
    if (!this.reflection) return;

    if (confirm('Weet je zeker dat je deze reflectie wilt verwijderen?')) {
        this.reflectionService.deleteReflection(this.moduleId, this.reflection.id).subscribe({
        next: () => {
            console.log('Reflection deleted');
            this.goBack();
        },
        error: (error) => {
            console.error('Error deleting reflection:', error);
            this.errorMessage = 'Er ging iets mis bij het verwijderen van de reflectie. ';
        }
        });
    }
}

  setRating(rating: number) {
    this.formData.rating = rating;
  }

  isValidForm(): boolean {
    return this.formData.content.trim().length > 0 && 
           this.formData.rating >= 1 && 
           this.formData.rating <= 5;
  }

  goBack() {
    this.router.navigate(['/modules', this.moduleId]);
  }

  getStarClass(starNumber: number): string {
    return starNumber <= this.formData.rating ? 'fas fa-star active' : 'far fa-star';
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}