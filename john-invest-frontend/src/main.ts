import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app.config';
import {AppComponent} from './app.component';
import {$t} from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const goldPalette = {
    50: '#f7f2eb',
    100: '#f0e9dc',
    200: '#e1d7bd',
    300: '#d2c59d',
    400: '#c3b47e',
    500: '#bfa57c',
    600: '#a68f6a',
    700: '#8c7858',
    800: '#736246',
    900: '#594b34',
    950: '#3f3523'
};

bootstrapApplication(AppComponent, appConfig)
.then(() => {
    $t()
    .preset(Aura)
    .preset({
        semantic: {
            primary: goldPalette,
            colorScheme: {
                light: {
                    primary: {
                        color: goldPalette[500],
                        contrastColor: '#ffffff',
                        hoverColor: goldPalette[600],
                        activeColor: goldPalette[700]
                    },
                    highlight: {
                        background: goldPalette[50],
                        focusBackground: goldPalette[100],
                        color: goldPalette[700],
                        focusColor: goldPalette[800]
                    }
                },
                dark: {
                    primary: {
                        color: goldPalette[300],
                        contrastColor: '#000000',
                        hoverColor: goldPalette[200],
                        activeColor: goldPalette[100]
                    },
                    highlight: {
                        background: goldPalette[300],
                        focusBackground: goldPalette[200],
                        color: '#ffffff',
                        focusColor: '#ffffff'
                    }
                }
            }
        }
    })
    .use({useDefaultOptions: true});
})
.catch((err) => console.error(err));

