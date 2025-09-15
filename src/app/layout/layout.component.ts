import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { BurguerMenuComponent } from './burguer-menu/burguer-menu.component';
import { ThemeStore } from '../store/theme-store';
import { LayoutStore } from '../store/layout-store';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { fromEvent, Subscription } from 'rxjs';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-layout',
  imports: [BurguerMenuComponent, CommonModule, ConfigComponent, MenuComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  themeStore = inject(ThemeStore)
  layoutStore = inject(LayoutStore)
  private resizeSubscripcion!:Subscription

  ngOnInit(): void {
    this.layoutStore.setIsMobile()
    this.resizeSubscripcion=fromEvent(window,'resize').subscribe(()=>{
      this.layoutStore.setIsMobile()
    })
    this.themeStore.loadSavedState()
    this.layoutStore.loadSavedState()
  }
  ngOnDestroy(): void {
    if(this.resizeSubscripcion){
      this.resizeSubscripcion.unsubscribe()
    }
  }
   closeSidebarOnMobile() {
    if (this.layoutStore.isMobile()) {
      this.layoutStore.toggleSidebar();
    }
  }
  toggleConfigSidebar() {
    this.layoutStore.toggleSidebarConfig();
  }
  
}
