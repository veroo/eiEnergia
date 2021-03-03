import { cares } from './../../../mocks/cares';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DateTime } from 'luxon';
import { BalanceInterface, CaresInterface, DeudasTiempoInterface, ParentsInterface } from '../../interfaces/interfaces.interface';

@Component({
    selector: 'app-cuidados',
    templateUrl: './cuidados.component.html'
})
export class CuidadosComponent implements OnChanges {
    @Input() cares: CaresInterface[] = []
    balances: BalanceInterface[] = [];
    deudasTiempo: DeudasTiempoInterface[] = [];

    ngOnInit(): void {
        this.sortCares(this.cares);
        this.balance();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.cares.currentValue) {
            this.sortCares(this.cares);
            this.balance();
        }
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

}




