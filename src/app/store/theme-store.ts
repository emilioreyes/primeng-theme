import { effect, inject, signal } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { StorageService } from "../core/service/storage.service";
import { constants } from "../core/const"
import { ColorShades, Options } from "../core/schemas/models";

type ThemeState = {
    useDarkTheme: boolean;
    userPrimaryColor: boolean,
    colorShades: ColorShades[],
    stateOptions: Options[],
    primaryColor: object,
    menuType: Options[]
    themes: Options[],
    menuItems: any[]
}

const initialState: ThemeState = {
    useDarkTheme: false,
    userPrimaryColor: false,
    colorShades: constants.DATA_COLOR,
    stateOptions: constants.STATE_OPTIONS,
    primaryColor: {},
    menuType: constants.MENU_TYPE,
    themes: constants.THEMES,
    menuItems: constants.MENU_ITEMS
}

export const ThemeStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withMethods((store, storageService = inject(StorageService)) => ({
        changeDarkTheme() {
            const element = document.querySelector('html');
            element?.classList.toggle('my-app-dark');
        },

        changePrimaryColor(shade: object) {
            patchState(store, {
                primaryColor: shade
            }),
                storageService.setItem(constants.PRIMARY_COLOR, store.primaryColor())
        },

        loadSavedState() {
            if (storageService.exists(constants.USE_DARK_THEME)) {
                patchState(store, {
                    useDarkTheme: storageService.getItem(constants.USE_DARK_THEME)
                })
                if (storageService.getItem(constants.USE_DARK_THEME)) {
                    this.changeDarkTheme()
                }
            }
            if (storageService.exists(constants.USE_PRIMARY_COLOR)) {
                patchState(store, {
                    userPrimaryColor: storageService.getItem(constants.USE_PRIMARY_COLOR)
                })
            }
            if (storageService.exists(constants.PRIMARY_COLOR)) {
                patchState(store, {
                    primaryColor: storageService.getItem(constants.PRIMARY_COLOR)
                })
            }
        }
    })),

    withHooks((store, storageService = inject(StorageService)) => {

        const prevUserPrimaryColor = signal(store.userPrimaryColor());
        const prevColorSchema = signal(store.useDarkTheme());

        effect(() => {
            const current = store.userPrimaryColor();
            const prev = prevUserPrimaryColor();

            if (current !== prev) {
                storageService.setItem(constants.USE_PRIMARY_COLOR, current);
                prevUserPrimaryColor.set(current);
            }
            const currentCS = store.useDarkTheme();
            const prevCS = prevColorSchema();

            if (currentCS !== prevCS) {
                storageService.setItem(constants.USE_DARK_THEME, currentCS);
                prevColorSchema.set(currentCS);
            }

        });

        return {};
    })
)


