import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    @Input() status = {
        message: '',
        importance: ''
    };
    constructor() { }

    ngOnInit(): void {
    }
    backgroundColor(): string {
        switch (this.status.importance) {
            case 'primary': return '#9999CC';
            case 'warn': return '#FFCC66';
            case 'danger': return '#FF3300';

            default: return 'inherit';
        }
    }
}
