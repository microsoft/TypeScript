//// [interfacePropertiesWithSameName1.ts]
interface Mover {
    move(): void;
    getStatus(): { speed: number; };
}
interface Shaker {
    shake(): void;
    getStatus(): { frequency: number; };
}

interface MoverShaker extends Mover, Shaker {
    getStatus(): { speed: number; frequency: number; };
}


//// [interfacePropertiesWithSameName1.js]
