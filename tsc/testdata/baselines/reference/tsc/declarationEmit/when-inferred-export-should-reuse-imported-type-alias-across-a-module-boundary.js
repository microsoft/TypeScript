currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *new* 
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
type Partial<T> = {
    [K in keyof T]?: T[K];
};
//// [/home/src/workspaces/project/a.ts] *new* 
interface ISettings {
    age: number;
}

export type Settings = Partial<ISettings>;
//// [/home/src/workspaces/project/factory.ts] *new* 
import type { Settings } from "./a";

export const makeObj = () => ({
    fn: (s?: Settings): Settings | undefined => s,
});
//// [/home/src/workspaces/project/state.ts] *new* 
import { makeObj } from "./factory";

export const obj = makeObj();
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "target": "es2022",
        "module": "esnext",
    },
    "files": ["./a.ts", "./factory.ts", "./state.ts"],
}

tsgo --p tsconfig.json
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *new* 
interface ISettings {
    age: number;
}
export type Settings = Partial<ISettings>;
export {};

//// [/home/src/workspaces/project/factory.d.ts] *new* 
import type { Settings } from "./a";
export declare const makeObj: () => {
    fn: (s?: Settings) => Settings | undefined;
};

//// [/home/src/workspaces/project/state.d.ts] *new* 
export declare const obj: {
    fn: (s?: import("./a").Settings) => import("./a").Settings | undefined;
};


