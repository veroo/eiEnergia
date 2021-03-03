import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaresInterface, ParentsInterface } from '../../interfaces/interfaces.interface';
import { SharedService } from '../../services/data.service';

@Component({
    selector: 'app-new-care',
    templateUrl: './new-care.component.html'
})

export class NewCareComponent {
    @Input() parents: ParentsInterface[] = [];
    @Input() newCare: boolean = false;
    @Output() emitCares = new EventEmitter<CaresInterface>();
    newCareData = {} as CaresInterface;
    caretaker = {} as ParentsInterface;
    parentName = {} as ParentsInterface;

    constructor(private sharedService: SharedService) {
    }

    addNewCare() {
        this.newCareData.caretakerId = this.caretaker.id;
        this.newCareData.caretakerName = this.caretaker.name;
        this.newCareData.parentId = this.parentName.id;
        this.newCareData.parentName = this.parentName.name;

        this.emitCares.emit(this.newCareData);
        this.changeCare(false);
    }

    changeCare(flag: boolean) {
        this.sharedService.changeCare(flag);
    }

}




