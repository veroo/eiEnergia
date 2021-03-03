export interface CaresInterface {
    caretakerId: number;
    caretakerName: string;
    duration: number;
    observations: string;
    parentId: number;
    parentName: string;
    startDate: string;
}

export const cares: CaresInterface[] = [
    {
        caretakerId: 1,
        caretakerName: "Alan Turing",
        duration: 90,
        observations: "Ada quería ir al cine",
        parentId: 0,
        parentName: "Ada Lovelace",
        startDate: "2020-08-17T17:00:00.000Z"
    },
    {
        caretakerId: 3,
        caretakerName: "Ángela Ruiz Robles",
        duration: 150,
        observations: "Alan tenía cena de trabajo",
        parentId: 1,
        parentName: "Alan Turing",
        startDate: "2020-08-16T20:00:00.000Z"
    },
    {
        caretakerId: 2,
        caretakerName: "Hedy Lamarr",
        duration: 120,
        observations: "",
        parentId: 3,
        parentName: "Ángela Ruiz Robles",
        startDate: "2020-08-15T18:30:00.000Z"
    },
    {
        caretakerId: 3,
        caretakerName: "Ángela Ruiz Robles",
        duration: 90,
        observations: "",
        parentId: 2,
        parentName: "Hedy Lamarr",
        startDate: "2020-08-16T15:00:00.000Z"
    }
]