import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../../services/data.service';

@Component({
    selector: 'app-new-parent',
    templateUrl: './new-parent.component.html'
})
export class NewParentComponent {
    @Input() newParent: boolean = false;
    @Output() emitParent = new EventEmitter<string>();
    nameParent: string = ''
    constructor(private sharedService: SharedService) {
    }
    addNewParent() {
        this.emitParent.emit(this.nameParent);
        this.changeParent(false)
    }

    changeParent(flag: boolean) {
        this.sharedService.changeParent(flag);
    }

}




