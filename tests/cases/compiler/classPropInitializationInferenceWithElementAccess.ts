// @noEmit: true
// @strict: true

// repro #49339
export class Cls {
    x;
    y;
    z;
    
    0;

    constructor(seed: number) {
        this['x'] = [seed];
        this['y'] = { seed };
        this['z'] = `${seed}`;

        this[0] = [seed];
    }
}