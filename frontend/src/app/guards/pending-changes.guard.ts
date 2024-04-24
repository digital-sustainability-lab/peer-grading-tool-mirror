import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';
import { WarnDialogComponent } from '../warn-dialog/warn-dialog.component';
import { DeactivatableComponent } from '../interfaces';
import { map } from 'rxjs';

export const pendingChangesGuard: CanDeactivateFn<DeactivatableComponent> = (
  component: DeactivatableComponent
) => {
  const dialog: MatDialog = inject(MatDialog);

  if (component.canDeactivate) {
    if (!component.canDeactivate()) {
      return dialog
        .open(WarnDialogComponent, {
          data: {
            text: $localize`Sie sind in Begriff die Seite zu verlassen. Nicht gespeicherte Daten gehen verloren.`,
            affirmButton: $localize`Verlassen`,
          },
        })
        .afterClosed()
        .pipe(
          map((shouldExit: boolean) => {
            if (shouldExit == undefined) {
              return false;
            }
            return shouldExit;
          })
        );
    } else {
      return true;
    }
  }
  return true;
};
