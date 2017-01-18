import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootloader } from '@angularclass/hmr';
import 'core-js/client/shim';
require('zone.js/dist/zone');
import 'reflect-metadata';



export function main(){
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

//boot on document ready
bootloader(main);