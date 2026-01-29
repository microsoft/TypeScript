// @module: commonjs
// @target: es2015
//@declaration: true

declare var something: string;
export const dataSomething = `data-${something}` as const;

export class WithData {
    [dataSomething]?() {
        return "something";
    }
}

export const a = (new WithData())["ahahahaahah"]!();