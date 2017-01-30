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
    @Input() sliderValue: number;

    updateTitle() {
        this.title = this.newTitle;
    }

    setNewTitle(value){
        this.newTitle = value;
    }

    updateSliderValue(value){
        this.sliderValue = value;
    }
}