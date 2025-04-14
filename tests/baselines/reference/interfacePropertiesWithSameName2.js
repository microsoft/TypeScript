//// [tests/cases/compiler/interfacePropertiesWithSameName2.ts] ////

//// [interfacePropertiesWithSameName2.ts]
interface Mover {
    move(): void;
    getStatus(): { speed: number; };
}
interface Shaker {
    shake(): void;
    getStatus(): { frequency: number; };
}

interface MoverShaker extends Mover, Shaker {

}

// Inside a module
declare module MoversAndShakers {
    export class Mover {
        move(): void;
        getStatus(): { speed: number; };
    }
    export interface Shaker {
        shake(): void;
        getStatus(): { frequency: number; };
    }
}

interface MoverShaker2 extends MoversAndShakers.Mover, MoversAndShakers.Shaker { } // error

interface MoverShaker3 extends MoversAndShakers.Mover, MoversAndShakers.Shaker {
    getStatus(): { speed: number; frequency: number; }; // ok because this getStatus overrides the conflicting ones above
}

//// [interfacePropertiesWithSameName2.js]
