import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AgroCampoDataService } from '../../../services/agrocampo-data.service';
import { TabId } from '../../../models/agro.models';

@Component({
  selector: 'app-inicio-screen',
  standalone: true,
  imports: [ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inicio-screen.html',
  styleUrl: './inicio-screen.scss',
})
export class InicioScreen {
  readonly data = inject(AgroCampoDataService);
  readonly navigateTab = output<TabId>();
  readonly openNewTask = output<void>();
  readonly taskFilter = signal<'todos' | 'pendientes' | 'completadas'>('todos');
  readonly totalHectares = computed(() =>
    this.data.lotes().reduce((total, lote) => total + lote.hectares, 0),
  );
  readonly activeMachinery = computed(() =>
    this.data.machinery().filter((machine) =>
      machine.status === 'En Campo' || machine.status === 'Operativo',
    ).length,
  );
  readonly pendingTasks = computed(() => this.data.tasks().filter((task) => !task.completed));
  readonly filteredTasks = computed(() =>
    this.data.tasks().filter((task) => {
      if (this.taskFilter() === 'pendientes') return !task.completed;
      if (this.taskFilter() === 'completadas') return task.completed;
      return true;
    }),
  );
}
