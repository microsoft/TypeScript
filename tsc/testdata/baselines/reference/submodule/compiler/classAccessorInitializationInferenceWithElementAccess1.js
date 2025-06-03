//// [tests/cases/compiler/classAccessorInitializationInferenceWithElementAccess1.ts] ////

//// [classAccessorInitializationInferenceWithElementAccess1.ts]
export class Cls {
    accessor x;
    accessor y;
    accessor z;

    accessor 0;

    constructor(seed: number) {
        this['x'] = [seed];
        this['y'] = { seed };
        this['z'] = `${seed}`;

        this[0] = [seed];
    }
}


//// [classAccessorInitializationInferenceWithElementAccess1.js]
export class Cls {
    accessor x;
    accessor y;
    accessor z;
    accessor 0;
    constructor(seed) {
        this['x'] = [seed];
        this['y'] = { seed };
        this['z'] = `${seed}`;
        this[0] = [seed];
    }
}


//// [classAccessorInitializationInferenceWithElementAccess1.d.ts]
export declare class Cls {
    accessor x: any;
    accessor y: any;
    accessor z: any;
    accessor 0: any;
    constructor(seed: number);
}
