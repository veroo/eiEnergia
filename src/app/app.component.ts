import { parents } from './../mocks/parents';
import { Component } from '@angular/core';
import { CaresInterface, ParentsInterface } from './interfaces/interfaces.interface';
import { cares } from '../mocks/cares';
import { Subscription } from 'rxjs';
import { SharedService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ei-energia';
  cares: CaresInterface[] = [];
  parents: ParentsInterface[] = [];
  newParent: boolean = false;
  newCare: boolean = false;
  subscriptionParent: Subscription;
  subscriptionCare: Subscription;
  nameParent: string = '';
  newCareData = {} as CaresInterface;
  caretaker = {} as ParentsInterface;
  parentName = {} as ParentsInterface;

  constructor(private sharedService: SharedService) {
    this.subscriptionParent = this.sharedService.currentParent.subscribe(flag => this.newParent = flag)
    this.subscriptionCare = this.sharedService.currentCare.subscribe(flag => this.newCare = flag)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const caresStorage = localStorage.getItem('cares');
    const parentsStorage = localStorage.getItem('parents');
    if (caresStorage != null) {
      this.cares = JSON.parse(caresStorage);
    } else {
      this.cares = [...cares];
    }
    if (parentsStorage != null) {
      this.parents = JSON.parse(parentsStorage);
    } else {
      this.parents = [...parents];
    }

  }

  ngOnDestroy() {
    this.subscriptionParent.unsubscribe();
    this.subscriptionCare.unsubscribe();
  }

  clearData() {
    this.sharedService.changeParent(false);
    this.sharedService.changeCare(false);
    this.nameParent = '';
    this.newCareData = {} as CaresInterface;
    this.caretaker = {} as ParentsInterface;
    this.parentName = {} as ParentsInterface;
    this.cares = [...cares];
    console.log("🚀 ~ file: app.component.ts ~ line 63 ~ AppComponent ~ clearData ~ cares", cares)
    this.parents = [...parents];
    console.log("🚀 ~ file: app.component.ts ~ line 65 ~ AppComponent ~ clearData ~ parents", parents)
    localStorage.setItem('cares', JSON.stringify(cares));
    localStorage.setItem('parents', JSON.stringify(parents));
  }

  changeStateNewParent() {
    this.sharedService.changeParent(!this.newParent);
    this.sharedService.changeCare(false);
    this.nameParent = '';
  }

  changeStateNewCare() {
    this.sharedService.changeParent(false);
    this.sharedService.changeCare(!this.newCare);
    this.newCareData = {} as CaresInterface;
    this.caretaker = {} as ParentsInterface;
    this.parentName = {} as ParentsInterface;
  }

  addNewCare(event: any) {
    this.cares.push(event);
    localStorage.setItem('cares', JSON.stringify(this.cares));
  }

  addNewParent(event: any) {
    const parent: ParentsInterface = {
      id: this.parents.length,
      name: event
    }
    this.parents.push(parent);
    localStorage.setItem('parents', JSON.stringify(this.parents));
  }

}




