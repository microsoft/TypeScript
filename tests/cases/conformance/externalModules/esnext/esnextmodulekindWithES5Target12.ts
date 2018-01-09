// @target: es5
// @module: esnext

export class C {
}

export namespace C {
    export const x = 1;
}

export enum E {
    w = 1
}

export enum E {
    x = 2
}

export namespace E {
    export const y = 1;
}

export namespace E {
    export const z = 1;
}

export namespace N {
}

export namespace N {
    export const x = 1;
}

export function F() {
}

export namespace F {
    export const x = 1;
}