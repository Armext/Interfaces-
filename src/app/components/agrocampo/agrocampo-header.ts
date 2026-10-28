import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FarmAlert, TabId, WeatherData } from '../../models/agro.models';
import { AgrocampoNavigation } from './agrocampo-navigation';

export type AgroDialogKind = 'labor' | 'animal' | 'item' | 'task';

@Component({
  selector: 'app-agrocampo-header',
  standalone: true,
  imports: [AgrocampoNavigation, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agrocampo-header.html',
  styleUrl: './agrocampo-header.scss',
})
export class AgrocampoHeader {
  readonly activeTab = input.required<TabId>();
  readonly weather = input.required<WeatherData>();
  readonly alerts = input.required<FarmAlert[]>();
  readonly campaign = input.required<string>();
  readonly tabSelected = output<TabId>();
  readonly campaignSelected = output<string>();
  readonly dialogRequested = output<AgroDialogKind>();
  readonly alertsRequested = output<void>();

  readonly quickActionsOpen = signal(false);
  readonly campaignMenuOpen = signal(false);

  selectCampaign(campaign: string): void {
    this.campaignSelected.emit(campaign);
    this.campaignMenuOpen.set(false);
  }

  openDialog(kind: AgroDialogKind): void {
    this.dialogRequested.emit(kind);
    this.quickActionsOpen.set(false);
  }
}
