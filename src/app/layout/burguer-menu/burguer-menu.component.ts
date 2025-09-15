import { Component, inject } from '@angular/core';
import { ThemeStore } from '../../store/theme-store';
import { LayoutStore } from '../../store/layout-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-burguer-menu',
  imports: [CommonModule],
  templateUrl: './burguer-menu.component.html',
  styleUrl: './burguer-menu.component.scss'
})
export class BurguerMenuComponent {
  themeStore = inject(ThemeStore)
  layoutStore = inject(LayoutStore)

  toggleBurguerMenu() {
    this.layoutStore.toggleSidebar()
  }
}
