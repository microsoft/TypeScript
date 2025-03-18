//// [tests/cases/compiler/constructorOverloads4.ts] ////

//// [constructorOverloads4.ts]
declare module M {    
    export class Function {
        constructor(...args: string[]);
    }
    export function Function(...args: any[]): any;
    export function Function(...args: string[]): Function;
}


(new M.Function("return 5"))();
M.Function("yo");


//// [constructorOverloads4.js]
(new M.Function("return 5"))();
M.Function("yo");
