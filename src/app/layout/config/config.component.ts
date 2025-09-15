import { Component, effect, inject } from '@angular/core';
import { LayoutStore } from '../../store/layout-store';
import { CommonModule } from '@angular/common';
import { ThemeStore } from '../../store/theme-store';
import { updatePrimaryPalette } from '@primeuix/themes';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { RadioButton } from 'primeng/radiobutton';
@Component({
  selector: 'app-config',
  imports: [CommonModule,SelectButton, FormsModule, RadioButton],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
 
layoutStore = inject(LayoutStore)
themeStore = inject(ThemeStore)
constructor(){
  effect(()=>{
    updatePrimaryPalette(this.themeStore.primaryColor())
  })
}

}
