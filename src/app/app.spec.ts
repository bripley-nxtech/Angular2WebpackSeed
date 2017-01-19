import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('App: ', () => {
   describe('Component: ', () => {
       beforeEach(() => {
           TestBed.configureTestingModule({
               imports: [RouterTestingModule],
               declarations: [AppComponent],
               providers : []
           });
       });

       it('should have a title', () => {
           let component = TestBed.createComponent(AppComponent);
           component.detectChanges();
           expect(component.debugElement.componentInstance.title).toBeDefined();
       })
   })
});