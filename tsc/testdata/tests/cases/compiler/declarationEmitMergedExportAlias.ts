// @declaration: true
// @emitDeclarationOnly: true
// @module: commonjs, nodenext, preserve

// @filename: route.d.ts
export class Route<T> {
    private parts;
    readonly schema: T;
    constructor(schema: T);
}

// @filename: reexport.ts
export { Route as Factory } from "./route";
export declare namespace Factory {
    export type Schema = { value: number };
}

// @filename: index.ts
import { Factory } from "./reexport";
export const route = new Factory<Factory.Schema>({ value: 0 });
export const constructor = Factory;