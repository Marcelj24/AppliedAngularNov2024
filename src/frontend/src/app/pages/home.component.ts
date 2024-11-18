import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Welcome home!</p> `,
  styles: ``,
})
export class HomeComponent {}
