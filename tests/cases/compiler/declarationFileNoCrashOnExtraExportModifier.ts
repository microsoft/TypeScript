// @filename: input.ts
export = exports;
declare class exports {
    constructor(p: number);
    t: number;
}
export class Sub {
    instance!: {
        t: number;
    };
}
declare namespace exports {
    export { Sub };
}