import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CattleAnimal } from '../../../models/agro.models';
import { AgroCampoDataService } from '../../../services/agrocampo-data.service';

@Component({
  selector: 'app-ganado-screen',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, TableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ganado-screen.html',
  styleUrl: './ganado-screen.scss',
})
export class GanadoScreen {
  readonly data = inject(AgroCampoDataService);
  readonly openNewAnimal = output<void>();
  readonly openWeighModal = output<void>();
  readonly searchTerm = signal('');
  readonly selectedCategory = signal('todos');
  readonly selectedAnimal = signal(this.data.cattle()[0]);
  readonly filteredCattle = computed(() => {
    const search = this.searchTerm().trim().toLocaleLowerCase();
    return this.data.cattle().filter((animal) => {
      const matchesSearch =
        animal.caravana.toLocaleLowerCase().includes(search) ||
        animal.potrero.toLocaleLowerCase().includes(search) ||
        animal.breed.toLocaleLowerCase().includes(search);
      return matchesSearch &&
        (this.selectedCategory() === 'todos' || animal.category === this.selectedCategory());
    });
  });

  selectAnimal(animal: CattleAnimal): void {
    this.selectedAnimal.set(animal);
  }
}
