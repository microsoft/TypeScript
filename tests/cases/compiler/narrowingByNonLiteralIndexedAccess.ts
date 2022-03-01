// @strict: true

interface IEye {
    visibility: number | undefined
}

interface IPirate {
    hands: number | undefined,
    eyes: IEye[]
}

const pirates: IPirate[] = [];

const index: number = 1;

pirates[index].hands++;
if (pirates[index].hands) pirates[index].hands++;

pirates[index].eyes[index].visibility++;
if (pirates[index].eyes[index].visibility) pirates[index].eyes[index].visibility++;
