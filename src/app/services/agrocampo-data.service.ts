import { Injectable, signal } from '@angular/core';
import {
  FarmTask,
  NewCattleAnimal,
  NewFarmTask,
  NewInventoryItem,
  CattleAnimal,
  InventoryItem,
} from '../models/agro.models';
import {
  initialAlerts,
  initialCattle,
  initialFacilities,
  initialInventory,
  initialLotes,
  initialMachinery,
  initialTasks,
  initialWeather,
} from '../data/initial-data';

@Injectable({ providedIn: 'root' })
export class AgroCampoDataService {
  readonly weather = signal(initialWeather);
  readonly lotes = signal(initialLotes);
  readonly machinery = signal(initialMachinery);
  readonly cattle = signal(initialCattle);
  readonly facilities = signal(initialFacilities);
  readonly inventory = signal(initialInventory);
  readonly tasks = signal(initialTasks);
  readonly alerts = signal(initialAlerts);

  toggleTask(taskId: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  addLabor(loteId: string, laborText: string): void {
    this.lotes.update((lotes) =>
      lotes.map((lote) =>
        lote.id === loteId ? { ...lote, lastActivity: laborText } : lote,
      ),
    );
  }

  addAnimal(animalData: NewCattleAnimal): void {
    const animal: CattleAnimal = {
      ...animalData,
      id: `cat-${this.cattle().length + 1}`,
    };
    this.cattle.update((animals) => [animal, ...animals]);
  }

  addItem(itemData: NewInventoryItem): void {
    const item: InventoryItem = {
      ...itemData,
      id: `inv-${this.inventory().length + 1}`,
    };
    this.inventory.update((items) => [item, ...items]);
  }

  addTask(taskData: NewFarmTask): void {
    const task: FarmTask = {
      ...taskData,
      id: `task-${this.tasks().length + 1}`,
      completed: false,
    };
    this.tasks.update((tasks) => [task, ...tasks]);
  }
}
