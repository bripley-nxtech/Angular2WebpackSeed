import { Component } from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})

export class AppComponent {
    title = 'Angular 2 Proof Of Concept';
    checked = false;

    checkTitle() {
        if(this.title == 'stuff')
            this.checked = true;
    }
}