import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Lote } from '../../../models/agro.models';
import { AgroCampoDataService } from '../../../services/agrocampo-data.service';

type CampoView = 'lotes' | 'maquinaria' | 'calculadora';
type MapLayer = 'ndvi' | 'humedad' | 'rinde';

@Component({
  selector: 'app-campo-screen',
  standalone: true,
  imports: [ButtonModule, DecimalPipe, FormsModule, InputNumberModule, InputTextModule, TableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './campo-screen.html',
  styleUrl: './campo-screen.scss',
})
export class CampoScreen {
  readonly data = inject(AgroCampoDataService);
  readonly openNewLabor = output<void>();
  readonly openNewMachinery = output<void>();
  readonly subTab = signal<CampoView>('lotes');
  readonly selectedLote = signal(this.data.lotes()[0]);
  readonly filterCrop = signal('todos');
  readonly mapLayer = signal<MapLayer>('ndvi');
  readonly calcTankLiters = signal(3000);
  readonly calcDoseLitersHa = signal(100);
  readonly calcProductDoseHa = signal(2.5);
  readonly totalHectares = computed(() =>
    this.data.lotes().reduce((total, lote) => total + lote.hectares, 0),
  );
  readonly filteredLotes = computed(() => {
    const filter = this.filterCrop().toLowerCase();
    return this.data.lotes().filter((lote) => filter === 'todos' || lote.crop.toLowerCase() === filter);
  });
  readonly hectaresPerTank = computed(() => {
    const liters = this.calcTankLiters();
    const dose = this.calcDoseLitersHa();
    return liters > 0 && dose > 0 ? liters / dose : 0;
  });
  readonly productPerTank = computed(() => this.hectaresPerTank() * this.calcProductDoseHa());

  selectLote(lote: Lote): void {
    this.selectedLote.set(lote);
  }

  exportHistory(): void {
    window.alert(`Historial completo de ${this.selectedLote().name} exportado a la consola de reportes.`);
  }
}
