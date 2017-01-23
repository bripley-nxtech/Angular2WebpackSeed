import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('App: ', function() {
   describe('Component: ', function () {
       beforeEach( function() {
           TestBed.configureTestingModule({
               imports: [RouterTestingModule,MaterialModule.forRoot()],
               declarations: [AppComponent],
               providers : []
           });
       });

       it('should have a title', function() {
           var component = TestBed.createComponent(AppComponent);
           component.detectChanges();
           expect(component.debugElement.componentInstance.title).toBeDefined();
       })
   })
});