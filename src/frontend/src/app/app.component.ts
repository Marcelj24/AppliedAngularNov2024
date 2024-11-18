import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar />
    <main class="container mx-auto"></main>
  `,
  styles: [],
  imports: [NavBarComponent],
})
export class AppComponent {}
