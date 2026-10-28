import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BarnFacility } from '../../../models/agro.models';
import { AgroCampoDataService } from '../../../services/agrocampo-data.service';

@Component({
  selector: 'app-galpones-screen',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, TableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './galpones-screen.html',
  styleUrl: './galpones-screen.scss',
})
export class GalponesScreen {
  readonly data = inject(AgroCampoDataService);
  readonly openNewItem = output<void>();
  readonly openStockMovement = output<void>();
  readonly selectedFacilityId = signal('fac-2');
  readonly categoryFilter = signal('todos');
  readonly searchItem = signal('');
  readonly selectedFacility = computed(() =>
    this.data.facilities().find((facility) => facility.id === this.selectedFacilityId()) ??
    this.data.facilities()[0],
  );
  readonly filteredInventory = computed(() => {
    const search = this.searchItem().trim().toLocaleLowerCase();
    return this.data.inventory().filter((item) => {
      const matchesCategory =
        this.categoryFilter() === 'todos' || item.category === this.categoryFilter();
      return matchesCategory && item.name.toLocaleLowerCase().includes(search);
    });
  });

  selectFacility(facility: BarnFacility): void {
    this.selectedFacilityId.set(facility.id);
  }

  capacityPercent(facility: BarnFacility): number {
    return facility.capacityMax > 0
      ? Math.round((facility.capacityUsed / facility.capacityMax) * 100)
      : 0;
  }
}
