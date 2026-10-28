import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-ajustes-screen',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, InputTextModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ajustes-screen.html',
  styleUrl: './ajustes-screen.scss',
})
export class AjustesScreen {
  private readonly formBuilder = inject(FormBuilder);
  readonly savedNotification = signal(false);
  readonly settingsForm = this.formBuilder.nonNullable.group({
    establishmentName: ['Establecimiento San Isidro', Validators.required],
    location: ['Pergamino, Buenos Aires, Argentina', Validators.required],
    cuit: ['30-71289410-8', Validators.required],
    totalHectares: [1450, [Validators.required, Validators.min(1)]],
    metricUnit: ['metric' as 'metric' | 'imperial'],
    offlineSync: [true],
    windAlertLimit: [15, [Validators.required, Validators.min(0)]],
  });

  saveSettings(): void {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }
    this.savedNotification.set(true);
    setTimeout(() => this.savedNotification.set(false), 2500);
  }

  exportCsv(reportType: string): void {
    const settings = this.settingsForm.getRawValue();
    const content = [
      `Reporte Oficial,${reportType}`,
      `Establecimiento,${settings.establishmentName}`,
      `RENSPA,${settings.cuit}`,
      `Superficie,${settings.totalHectares} ha`,
      `Fecha Generación,${new Date().toLocaleDateString('es-AR')}`,
      'Estado Servidor,Sincronizado 100%',
      '',
    ].join('\n');
    const link = document.createElement('a');
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(content)}`;
    link.download = `reporte_${reportType.toLocaleLowerCase().replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
