import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-gifts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex gap-8">
      <a class="link" routerLink="people">People</a>
      <a class="link" routerLink="people-entry">Add A Person To Your List</a>
    </div>

    <router-outlet />
  `,
  styles: ``,
})
export class GiftsComponent {}
