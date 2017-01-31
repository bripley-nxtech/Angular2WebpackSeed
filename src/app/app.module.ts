import '../public/index.scss';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import '../shared/app-logo';

import { AppComponent } from './app.component';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
    imports: [BrowserModule,HttpModule,FormsModule,MaterialModule.forRoot()],
    declarations: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(public appRef: ApplicationRef){}
    // The following is used for hot module replacement in webpack
    hmrOnInit(store){
        console.log('HMR store',store);
    }
    hmrOnDestroy(store){
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        store.disposeOldHosts = createNewHosts(cmpLocation);

        removeNgStyles();
    }
    hmrAfterDestroy(store){
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}