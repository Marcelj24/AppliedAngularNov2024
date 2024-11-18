import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  template: `
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">{{ siteName() }}</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a>Link</a></li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavBarComponent {
  siteName = signal('Applied Angular Training 2');
}
