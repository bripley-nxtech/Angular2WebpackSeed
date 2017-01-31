import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
               schemas: [CUSTOM_ELEMENTS_SCHEMA],
               providers : []
           });
       });

       it('should have a title', function() {
           //Arrange
           var component = TestBed.createComponent(AppComponent);

           //Act
           component.detectChanges();

           //Assert
           expect(component.debugElement.componentInstance.title).toBeDefined();
       });

       it('should change the title to newTitle',function(){
           //Arrange
           var component = TestBed.createComponent(AppComponent);

           //Act
           component.debugElement.componentInstance.setNewTitle('Hello');
           component.debugElement.componentInstance.updateTitle();
           component.detectChanges();

           //Assert
           expect(component.debugElement.componentInstance.title).toBe('Hello');
       });

       it('should update the slider value',function(){
           //Arrange
           var component = TestBed.createComponent(AppComponent);

           //Act
           component.debugElement.componentInstance.updateSliderValue(2);
           component.detectChanges();

           //Assert
           expect(component.debugElement.componentInstance.sliderValue).toBe(2);
       })
   })
});