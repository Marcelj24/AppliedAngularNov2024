import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NavLinkComponent } from './components/nav-link.component';
import { NavLinkModel } from './components/types';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NavLinkComponent],
  providers: [Title],
  template: `
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">{{ siteName() }}</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          @for (link of links(); track link.text) {
            <li>
              <app-link [link]="link" (navigated)="onNavigation($event)" />
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavBarComponent implements OnInit {
  #titleservice = inject(Title);
  siteName = signal('Applied Angular');

  ngOnInit(): void {
    this.#titleservice.setTitle(this.siteName());
  }
  links = signal<NavLinkModel[]>([
    {
      text: 'Home',
      path: 'home',
    },
    {
      text: 'About Us',
      path: 'about',
    },
  ]);

  onNavigation(item: NavLinkModel) {
    this.#titleservice.setTitle(`${this.siteName()} | ${item.text}`);
  }
}
