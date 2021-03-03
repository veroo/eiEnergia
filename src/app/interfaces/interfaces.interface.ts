export interface BalanceInterface {
    min: number;
    parentName: string;
}

export interface DeudasTiempoInterface {
    debe: ParentsInterface;
    aQuienDebe: ParentsInterface;
    duration: number;
}

export interface CaresInterface {
    caretakerId: number;
    caretakerName: string;
    duration: number;
    observations: string;
    parentId: number;
    parentName: string;
    startDate: string;
}

export interface ParentsInterface {
    id: number;
    name: string;
}