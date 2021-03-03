import { parents, ParentsInterface } from './../mocks/parents';
import { cares, CaresInterface } from './../mocks/cares';
import { Component } from '@angular/core';
import { DateTime } from 'luxon';

interface BalanceInterface {
  min: number;
  parentName: string;
}

interface DeudasTiempoInterface {
  debe: ParentsInterface;
  aQuienDebe: ParentsInterface;
  duration: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ei-energia';
  cares: CaresInterface[] = [];
  parents: ParentsInterface[] = [];
  balances: BalanceInterface[] = [];
  newParent: boolean = false;
  newCare: boolean = false;
  nameParent: string = '';
  newCareData = {} as CaresInterface;
  caretaker = {} as ParentsInterface;
  parentName = {} as ParentsInterface;;
  deudasTiempo: DeudasTiempoInterface[] = []

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const caresStorage = localStorage.getItem('cares');
    const parentsStorage = localStorage.getItem('parents');
    if (caresStorage != null) {
      this.sortCares(JSON.parse(caresStorage));
    } else {
      this.sortCares(cares);
    }
    if (parentsStorage != null) {
      this.parents = JSON.parse(parentsStorage);
    } else {
      this.parents = parents;
    }

    this.balance();
  }

  changeStateNewParent() {
    this.newParent = !this.newParent;
    this.newCare = false;
    this.nameParent = '';
  }

  changeStateNewCare() {
    this.newCare = !this.newCare;
    this.newParent = false;
    this.newCareData = {} as CaresInterface;
    this.caretaker = {} as ParentsInterface;
    this.parentName = {} as ParentsInterface;
  }

  sortCares(caresToOrder: CaresInterface[]) {
    this.cares = caresToOrder.sort((a, b) => {
      const dateA: any = new Date(a.startDate);
      const dateB: any = new Date(b.startDate);
      return dateB - dateA;
    });
  }

  getHours(min: number) {
    const hour = Math.trunc(min / 60);
    const minutes = min % 60;
    return `${hour}h ${minutes} min`;
  }

  getHoursAbs(min: number) {
    return this.getHours(Math.abs(min));
  }

  formatDate(date: string) {
    const dt = DateTime.fromISO(date);
    return `${dt.toLocaleString()} ${dt.toFormat('T')}`;
  }

  balance() {
    this.balances = [];
    this.deudasTiempo = [];
    this.cares.map(care => {
      if (this.balances[care.caretakerId]) {
        this.balances[care.caretakerId].min = (this.balances[care.caretakerId].min ? this.balances[care.caretakerId].min : 0) + care.duration;
        //this.balances[care.caretakerId].parentName = care.caretakerName;
      } else {
        this.balances[care.caretakerId] = {
          min: care.duration,
          parentName: care.caretakerName
        }
      }
      if (this.balances[care.parentId]) {
        this.balances[care.parentId].min = (this.balances[care.parentId].min ? this.balances[care.parentId].min : 0) - care.duration;
        //this.balances[care.parentId].parentName = care.parentName;
      } else {
        this.balances[care.parentId] = {
          min: - care.duration,
          parentName: care.parentName
        }
      }
      let encontrado = false;
      let i = 0;
      while (!encontrado && this.deudasTiempo.length > i) {
        const deuda = this.deudasTiempo[i];
        if (deuda.debe.id === care.parentId && deuda.aQuienDebe.id === care.caretakerId) {
          deuda.duration = deuda.duration + care.duration;
          encontrado = true;
        }
        if (deuda.debe.id === care.caretakerId && deuda.aQuienDebe.id === care.parentId) {
          deuda.duration = deuda.duration - care.duration;
          encontrado = true;
        }
        i++;
      }
      if (!encontrado) {
        const debe: ParentsInterface = {
          id: care.parentId,
          name: care.parentName
        }
        const aQuienDebe: ParentsInterface = {
          id: care.caretakerId,
          name: care.caretakerName
        }
        const deuda: DeudasTiempoInterface = {
          debe: debe,
          aQuienDebe: aQuienDebe,
          duration: care.duration
        }
        this.deudasTiempo.push(deuda);
      }
    });
  }

  addNewParent() {
    const parent: ParentsInterface = {
      id: parents.length,
      name: this.nameParent
    }
    parents.push(parent);
    localStorage.setItem('parents', JSON.stringify(this.parents))
    this.newParent = false;
  }

  addNewCare() {
    this.newCareData.caretakerId = this.caretaker.id;
    this.newCareData.caretakerName = this.caretaker.name;
    this.newCareData.parentId = this.parentName.id;
    this.newCareData.parentName = this.parentName.name;

    this.cares.push(this.newCareData);
    localStorage.setItem('cares', JSON.stringify(this.cares));
    this.newCare = false;
    this.sortCares(this.cares);
    this.balance();
  }

}




