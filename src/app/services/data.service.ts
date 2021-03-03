import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

    private sourceParent = new BehaviorSubject(false);
    private sourceCare = new BehaviorSubject(false);
    currentParent = this.sourceParent.asObservable();
    currentCare = this.sourceCare.asObservable();

    constructor() { }

    changeParent(flag: boolean) {
        this.sourceParent.next(flag);
    }

    changeCare(flag: boolean) {
        this.sourceCare.next(flag);
    }

}