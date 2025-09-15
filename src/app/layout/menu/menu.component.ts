import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutStore } from '../../store/layout-store';
import { ThemeStore } from '../../store/theme-store';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent  {
  layoutStore=inject(LayoutStore)
  themeStore=inject(ThemeStore)
  
  showSubmenu(menuItemElement: HTMLElement){
    const submenuList = menuItemElement.querySelector('ul') as HTMLElement;
    if (!submenuList) return;
    if(!this.layoutStore.isMobile() && this.layoutStore.sidebarCollapsed()){
       submenuList.classList?.toggle('block')
       this.layoutStore.toogleSubMenu()
      }
  }
  hideSubmenu(submenu: HTMLElement){
    submenu.classList?.toggle('block')
    this.layoutStore.toogleSubMenu()
  }
}
