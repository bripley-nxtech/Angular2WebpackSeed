import 'hammerjs';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})

export class AppComponent {
    title = 'Angular 2 Proof Of Concept';
    newTitle: string;

    updateTitle() {
        this.title = this.newTitle;
    }

    setNewTitle(event){
        this.newTitle = event.target.value  
    }

    updateSliderValue(){
        console.log('Stuff');
    }
}