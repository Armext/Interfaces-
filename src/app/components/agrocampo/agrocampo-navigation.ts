import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TabId } from '../../models/agro.models';

interface NavigationItem {
  id: TabId;
  label: string;
  description: string;
}

@Component({
  selector: 'app-agrocampo-navigation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agrocampo-navigation.html',
  styleUrl: './agrocampo-navigation.scss',
})
export class AgrocampoNavigation {
  readonly activeTab = input.required<TabId>();
  readonly unreadAlertsCount = input(0);
  readonly variant = input<'top' | 'bottom' | 'sidebar'>('top');
  readonly tabSelected = output<TabId>();

  readonly items: NavigationItem[] = [
    { id: 'inicio', label: 'Inicio', description: 'Dashboard y clima' },
    { id: 'campo', label: 'Campo', description: 'Lotes, cultivos y maquinaria' },
    { id: 'ganado', label: 'Ganado', description: 'Rodeo y caravanas' },
    { id: 'galpones', label: 'Galpones', description: 'Silos, sensores y stock' },
    { id: 'ajustes', label: 'Ajustes', description: 'Configuración y reportes' },
  ];
}
