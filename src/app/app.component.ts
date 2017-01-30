import 'hammerjs';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})

export class AppComponent {
    title = 'Some Cool Stuff Happening Here';
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