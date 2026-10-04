// @strict: true
// @target: esnext
// @declaration: true

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
