import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AgroDialogKind } from '../agrocampo-header';
import {
  CattleAnimal,
  FarmTask,
  InventoryItem,
  Lote,
  NewCattleAnimal,
  NewFarmTask,
  NewInventoryItem,
} from '../../../models/agro.models';

@Component({
  selector: 'app-agrocampo-dialogs',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputNumberModule, InputTextModule, ReactiveFormsModule, SelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agrocampo-dialogs.html',
  styleUrl: './agrocampo-dialogs.scss',
})
export class AgrocampoDialogs {
  private readonly formBuilder = inject(FormBuilder);
  readonly dialog = input<AgroDialogKind | null>(null);
  readonly lotes = input.required<Lote[]>();
  readonly loteOptions = computed(() =>
    this.lotes().map((lote) => ({
      label: `${lote.name} (${lote.crop} · ${lote.hectares} ha)`,
      value: lote.id,
    })),
  );
  readonly laborTypes = [
    'Pulverización preventiva',
    'Fertilización líquida / granulada',
    'Siembra directa',
    'Monitoreo de plagas',
    'Cosecha / Trilla',
  ];
  readonly cattleCategories: CattleAnimal['category'][] = [
    'Vaca de Cría',
    'Novillo',
    'Ternero',
    'Vaquillona',
    'Toro',
  ];
  readonly cattleBreeds: CattleAnimal['breed'][] = [
    'Angus Negro',
    'Angus Colorado',
    'Hereford',
    'Braford',
    'Holando',
  ];
  readonly inventoryCategories: InventoryItem['category'][] = [
    'Fitosanitarios',
    'Fertilizantes',
    'Semillas',
    'Alimento & Rollos',
    'Repuestos',
  ];
  readonly priorities: FarmTask['priority'][] = ['Alta', 'Media', 'Baja'];
  readonly selectOverlayOptions = { autoZIndex: true, baseZIndex: 1200 };
  readonly closed = output<void>();
  readonly addLabor = output<{ loteId: string; laborText: string }>();
  readonly addAnimal = output<NewCattleAnimal>();
  readonly addItem = output<NewInventoryItem>();
  readonly addTask = output<NewFarmTask>();

  readonly laborForm = this.formBuilder.nonNullable.group({
    loteId: ['lote-1', Validators.required],
    laborType: ['Pulverización preventiva', Validators.required],
    details: ['', Validators.required],
  });
  readonly animalForm = this.formBuilder.nonNullable.group({
    caravana: ['AR-9', Validators.required],
    category: ['Novillo' as CattleAnimal['category'], Validators.required],
    breed: ['Angus Negro' as CattleAnimal['breed'], Validators.required],
    weightKg: [380, [Validators.required, Validators.min(1)]],
    potrero: ['Potrero 2 - Confinamiento', Validators.required],
  });
  readonly itemForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    category: ['Fitosanitarios' as InventoryItem['category'], Validators.required],
    quantity: [100, [Validators.required, Validators.min(0)]],
    unit: ['Litros', Validators.required],
  });
  readonly taskForm = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    assignee: ['Lucas Almada', Validators.required],
    priority: ['Alta' as FarmTask['priority'], Validators.required],
    location: ['Lote 1', Validators.required],
  });

  submitLabor(): void {
    if (this.laborForm.invalid) {
      this.laborForm.markAllAsTouched();
      return;
    }
    const { loteId, laborType, details } = this.laborForm.getRawValue();
    this.addLabor.emit({ loteId, laborText: `${laborType}: ${details}` });
    this.closed.emit();
  }

  submitAnimal(): void {
    if (this.animalForm.invalid) {
      this.animalForm.markAllAsTouched();
      return;
    }
    const { caravana, category, breed, weightKg, potrero } = this.animalForm.getRawValue();
    this.addAnimal.emit({
      caravana: caravana.toUpperCase(),
      category,
      breed,
      sex: category === 'Vaca de Cría' || category === 'Vaquillona' ? 'Hembra' : 'Macho',
      weightKg,
      lastWeighDate: new Date().toLocaleDateString('es-AR'),
      dailyWeightGainKg: 0.85,
      reproductiveStatus: category === 'Novillo' ? 'Engorde' : 'En Servicio',
      potrero,
      healthStatus: 'Al día',
      birthDate: '2024',
    });
    this.closed.emit();
  }

  submitItem(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }
    const { name, category, quantity, unit } = this.itemForm.getRawValue();
    this.addItem.emit({
      facilityId: 'fac-2',
      name,
      category,
      quantity,
      unit,
      batch: `LOTE-${Math.floor(1000 + Math.random() * 9000)}`,
      expirationDate: '12/2026',
      reorderLevel: 20,
    });
    this.closed.emit();
  }

  submitTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const { title, assignee, priority, location } = this.taskForm.getRawValue();
    this.addTask.emit({ title, type: 'Campo', assignee, date: 'Hoy', priority, location });
    this.closed.emit();
  }
}
