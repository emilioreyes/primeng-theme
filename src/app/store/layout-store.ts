import { effect, inject, signal } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { StorageService } from '../core/service/storage.service';
import { constants } from "../core/const"

type LayoutState = {
  sidebarCollapsed: boolean;
  sidebarConfigCollapsed: boolean;
  isMobile: boolean;
  subMenuCollapsed: boolean;
}

const initialState: LayoutState = {
  sidebarCollapsed: true,
  isMobile: false,
  sidebarConfigCollapsed: true,
  subMenuCollapsed: true
}
export const LayoutStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, storageService = inject(StorageService)) => ({

    toggleSidebar() {
      patchState(store,
        { sidebarCollapsed: !store.sidebarCollapsed() })
    },

    setIsMobile() {
      patchState(store,
        { isMobile: window.innerWidth <= 768 })
    },

    toggleSidebarConfig() {
      patchState(store,
        { sidebarConfigCollapsed: !store.sidebarConfigCollapsed() })
    },
    toogleSubMenu() {
      patchState(store, {
        subMenuCollapsed: !store.subMenuCollapsed()
      })
    },
    loadSavedState() {

      if (storageService.exists(constants.SIDEBAR_COLLAPSED)) {
        patchState(store, {
          sidebarCollapsed: storageService.getItem(constants.SIDEBAR_COLLAPSED)
        })
      }

      if (storageService.exists(constants.SUBMENU_COLLAPSED)) {
        patchState(store, {
          subMenuCollapsed: storageService.getItem(constants.SUBMENU_COLLAPSED)
        })
      }
    }
  })),

  withHooks((store, storageService = inject(StorageService)) => {

    const prevSidebarCollapsed = signal(store.sidebarCollapsed());

    effect(() => {
      const current = store.sidebarCollapsed();
      const prev = prevSidebarCollapsed();

      if (current !== prev) {
        storageService.setItem(constants.SIDEBAR_COLLAPSED, current);
        prevSidebarCollapsed.set(current);
      }
    });

    return {};
  })
)