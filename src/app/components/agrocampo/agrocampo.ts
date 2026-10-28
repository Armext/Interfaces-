import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TabId } from '../../models/agro.models';
import { AgroCampoDataService } from '../../services/agrocampo-data.service';
import { AgrocampoDialogs } from './dialogs/agrocampo-dialogs';
import { AgrocampoHeader, AgroDialogKind } from './agrocampo-header';
import { AgrocampoNavigation } from './agrocampo-navigation';
import { AjustesScreen } from './screens/ajustes-screen';
import { CampoScreen } from './screens/campo-screen';
import { GalponesScreen } from './screens/galpones-screen';
import { GanadoScreen } from './screens/ganado-screen';
import { InicioScreen } from './screens/inicio-screen';

@Component({
  selector: 'app-agrocampo',
  standalone: true,
  imports: [
    AjustesScreen,
    AgrocampoDialogs,
    AgrocampoHeader,
    AgrocampoNavigation,
    ButtonModule,
    CampoScreen,
    DialogModule,
    GalponesScreen,
    GanadoScreen,
    InicioScreen,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './agrocampo.scss',
  templateUrl: './agrocampo.html',
})
export class Agrocampo {
  readonly data = inject(AgroCampoDataService);
  readonly activeTab = signal<TabId>('campo');
  readonly campaign = signal('Campaña 2025/26');
  readonly activeDialog = signal<AgroDialogKind | null>(null);
  readonly alertsOpen = signal(false);

  openDialog(kind: AgroDialogKind): void {
    this.activeDialog.set(kind);
  }

  closeDialog(): void {
    this.activeDialog.set(null);
  }

  navigateTo(tab: TabId): void {
    this.activeTab.set(tab);
  }

  goToAlert(tab?: TabId): void {
    if (tab) this.navigateTo(tab);
    this.alertsOpen.set(false);
  }

  addLabor(event: { loteId: string; laborText: string }): void {
    this.data.addLabor(event.loteId, event.laborText);
  }
}
