import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootloader } from '@angularclass/hmr';

if(process.env.ENV === 'Prod')
    enableProdMode();

export function main(){
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

//boot on document ready
bootloader(main);