currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/fields.d.ts] *new* 
export type Fields<T> = T extends { a: infer A; b: infer B; c: infer C; d: infer D; e: infer E; f: infer F; g: infer G; h: infer H; i: infer I; j: infer J; k: infer K; l: infer L } ? [A, B, C, D, E, F, G, H, I, J, K, L] : never;
//// [/home/src/workspaces/project/gadget.d.ts] *new* 
export interface Gadget {
    id: number;
}
//// [/home/src/workspaces/project/locales/ar.d.ts] *new* 
declare const _default: () => { locale: "ar" };
export = _default;

//// [/home/src/workspaces/project/locales/de.d.ts] *new* 
declare const _default: () => { locale: "de" };
export = _default;

//// [/home/src/workspaces/project/locales/en.d.ts] *new* 
declare const _default: () => { locale: "en" };
export = _default;

//// [/home/src/workspaces/project/locales/es.d.ts] *new* 
declare const _default: () => { locale: "es" };
export = _default;

//// [/home/src/workspaces/project/locales/fr.d.ts] *new* 
declare const _default: () => { locale: "fr" };
export = _default;

//// [/home/src/workspaces/project/locales/he.d.ts] *new* 
declare const _default: () => { locale: "he" };
export = _default;

//// [/home/src/workspaces/project/locales/index.d.ts] *new* 
export { default as ar } from "./ar";
export { default as de } from "./de";
export { default as en } from "./en";
export { default as es } from "./es";
export { default as fr } from "./fr";
export { default as he } from "./he";
export { default as it } from "./it";
export { default as ja } from "./ja";
export { default as ko } from "./ko";
export { default as nl } from "./nl";
export { default as pl } from "./pl";
export { default as pt } from "./pt";

//// [/home/src/workspaces/project/locales/it.d.ts] *new* 
declare const _default: () => { locale: "it" };
export = _default;

//// [/home/src/workspaces/project/locales/ja.d.ts] *new* 
declare const _default: () => { locale: "ja" };
export = _default;

//// [/home/src/workspaces/project/locales/ko.d.ts] *new* 
declare const _default: () => { locale: "ko" };
export = _default;

//// [/home/src/workspaces/project/locales/nl.d.ts] *new* 
declare const _default: () => { locale: "nl" };
export = _default;

//// [/home/src/workspaces/project/locales/pl.d.ts] *new* 
declare const _default: () => { locale: "pl" };
export = _default;

//// [/home/src/workspaces/project/locales/pt.d.ts] *new* 
declare const _default: () => { locale: "pt" };
export = _default;

//// [/home/src/workspaces/project/main.ts] *new* 
import * as parts from "./parts/index";
import { Fields } from "./fields";
import { makeWidget } from "./widget";

export const fields: Fields<{ a: 1; b: 2; c: 3; d: 4; e: 5; f: 6; g: 7; h: 8; i: 9; j: 10; k: 11; l: 12 }> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const allParts = parts;
export const widget = makeWidget();
//// [/home/src/workspaces/project/parts/alpha.d.ts] *new* 
export declare const alpha: { name: "alpha" };

//// [/home/src/workspaces/project/parts/beta.d.ts] *new* 
export declare const beta: { name: "beta" };

//// [/home/src/workspaces/project/parts/delta.d.ts] *new* 
export declare const delta: { name: "delta" };

//// [/home/src/workspaces/project/parts/epsilon.d.ts] *new* 
export declare const epsilon: { name: "epsilon" };

//// [/home/src/workspaces/project/parts/eta.d.ts] *new* 
export declare const eta: { name: "eta" };

//// [/home/src/workspaces/project/parts/gamma.d.ts] *new* 
export declare const gamma: { name: "gamma" };

//// [/home/src/workspaces/project/parts/index.d.ts] *new* 
import * as alpha from "./alpha";
import * as beta from "./beta";
import * as gamma from "./gamma";
import * as delta from "./delta";
import * as epsilon from "./epsilon";
import * as zeta from "./zeta";
import * as eta from "./eta";
import * as theta from "./theta";
import * as iota from "./iota";
import * as kappa from "./kappa";
import * as lambda from "./lambda";
import * as mu from "./mu";
export { alpha, beta, gamma, delta, epsilon, zeta, eta, theta, iota, kappa, lambda, mu };

//// [/home/src/workspaces/project/parts/iota.d.ts] *new* 
export declare const iota: { name: "iota" };

//// [/home/src/workspaces/project/parts/kappa.d.ts] *new* 
export declare const kappa: { name: "kappa" };

//// [/home/src/workspaces/project/parts/lambda.d.ts] *new* 
export declare const lambda: { name: "lambda" };

//// [/home/src/workspaces/project/parts/mu.d.ts] *new* 
export declare const mu: { name: "mu" };

//// [/home/src/workspaces/project/parts/theta.d.ts] *new* 
export declare const theta: { name: "theta" };

//// [/home/src/workspaces/project/parts/zeta.d.ts] *new* 
export declare const zeta: { name: "zeta" };

//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "skipLibCheck": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "outDir": "out"
    },
    "files": ["main.ts", "locales/index.d.ts"]
}
//// [/home/src/workspaces/project/widget.d.ts] *new* 
import { Gadget } from "./gadget";
export declare function makeWidget(): Gadget;

tsgo --generateTrace /home/src/workspaces/project/trace --singleThreaded
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/out/main.d.ts] *new* 
import * as parts from "./parts/index";
import { Fields } from "./fields";
export declare const fields: Fields<{
    a: 1;
    b: 2;
    c: 3;
    d: 4;
    e: 5;
    f: 6;
    g: 7;
    h: 8;
    i: 9;
    j: 10;
    k: 11;
    l: 12;
}>;
export declare const allParts: typeof parts;
export declare const widget: import("./gadget").Gadget;

//// [/home/src/workspaces/project/trace/legend.json] *new* 
[
  {
    "configFilePath": "/home/src/workspaces/project/tsconfig.json",
    "tracePath": "/home/src/workspaces/project/trace/trace.json",
    "typesPath": "/home/src/workspaces/project/trace/types_0.json",
    "checkerId": 0
  }
]
//// [/home/src/workspaces/project/trace/trace.json] *new* 
[
{"pid":1,"tid":1,"ph":"M","cat":"__metadata","ts":1,"name":"process_name","args":{"name":"tsgo"}},
{"pid":1,"tid":1,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"Main"}},
{"pid":1,"tid":1,"ph":"M","cat":"disabled-by-default-devtools.timeline","ts":1,"name":"TracingStartedInBrowser"},
{"pid":1,"tid":1,"ph":"B","cat":"program","ts":2,"name":"createProgram","args":{"configFilePath":"/home/src/workspaces/project/tsconfig.json"}},
{"pid":1,"tid":181085097,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts"}},
{"pid":1,"tid":181085097,"ph":"B","cat":"parse","ts":3,"name":"createSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts"}},
{"pid":1,"tid":181085097,"ph":"E","cat":"parse","ts":4,"name":"createSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts"}},
{"pid":1,"tid":373807619,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/index.d.ts"}},
{"pid":1,"tid":373807619,"ph":"B","cat":"parse","ts":5,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/index.d.ts"}},
{"pid":1,"tid":373807619,"ph":"E","cat":"parse","ts":6,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/index.d.ts"}},
{"pid":1,"tid":872471718,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/pt.d.ts"}},
{"pid":1,"tid":872471718,"ph":"B","cat":"parse","ts":7,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/pt.d.ts"}},
{"pid":1,"tid":872471718,"ph":"E","cat":"parse","ts":8,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/pt.d.ts"}},
{"pid":1,"tid":944314902,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/pl.d.ts"}},
{"pid":1,"tid":944314902,"ph":"B","cat":"parse","ts":9,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/pl.d.ts"}},
{"pid":1,"tid":944314902,"ph":"E","cat":"parse","ts":10,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/pl.d.ts"}},
{"pid":1,"tid":255493617,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/nl.d.ts"}},
{"pid":1,"tid":255493617,"ph":"B","cat":"parse","ts":11,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/nl.d.ts"}},
{"pid":1,"tid":255493617,"ph":"E","cat":"parse","ts":12,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/nl.d.ts"}},
{"pid":1,"tid":376655012,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/ko.d.ts"}},
{"pid":1,"tid":376655012,"ph":"B","cat":"parse","ts":13,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/ko.d.ts"}},
{"pid":1,"tid":376655012,"ph":"E","cat":"parse","ts":14,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/ko.d.ts"}},
{"pid":1,"tid":345504644,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/ja.d.ts"}},
{"pid":1,"tid":345504644,"ph":"B","cat":"parse","ts":15,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/ja.d.ts"}},
{"pid":1,"tid":345504644,"ph":"E","cat":"parse","ts":16,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/ja.d.ts"}},
{"pid":1,"tid":450563598,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/it.d.ts"}},
{"pid":1,"tid":450563598,"ph":"B","cat":"parse","ts":17,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/it.d.ts"}},
{"pid":1,"tid":450563598,"ph":"E","cat":"parse","ts":18,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/it.d.ts"}},
{"pid":1,"tid":141527137,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/he.d.ts"}},
{"pid":1,"tid":141527137,"ph":"B","cat":"parse","ts":19,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/he.d.ts"}},
{"pid":1,"tid":141527137,"ph":"E","cat":"parse","ts":20,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/he.d.ts"}},
{"pid":1,"tid":883991556,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/fr.d.ts"}},
{"pid":1,"tid":883991556,"ph":"B","cat":"parse","ts":21,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/fr.d.ts"}},
{"pid":1,"tid":883991556,"ph":"E","cat":"parse","ts":22,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/fr.d.ts"}},
{"pid":1,"tid":455027228,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/es.d.ts"}},
{"pid":1,"tid":455027228,"ph":"B","cat":"parse","ts":23,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/es.d.ts"}},
{"pid":1,"tid":455027228,"ph":"E","cat":"parse","ts":24,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/es.d.ts"}},
{"pid":1,"tid":616565165,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/en.d.ts"}},
{"pid":1,"tid":616565165,"ph":"B","cat":"parse","ts":25,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/en.d.ts"}},
{"pid":1,"tid":616565165,"ph":"E","cat":"parse","ts":26,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/en.d.ts"}},
{"pid":1,"tid":930019567,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/de.d.ts"}},
{"pid":1,"tid":930019567,"ph":"B","cat":"parse","ts":27,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/de.d.ts"}},
{"pid":1,"tid":930019567,"ph":"E","cat":"parse","ts":28,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/de.d.ts"}},
{"pid":1,"tid":743285103,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/locales/ar.d.ts"}},
{"pid":1,"tid":743285103,"ph":"B","cat":"parse","ts":29,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/ar.d.ts"}},
{"pid":1,"tid":743285103,"ph":"E","cat":"parse","ts":30,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/locales/ar.d.ts"}},
{"pid":1,"tid":100209852,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/main.ts"}},
{"pid":1,"tid":100209852,"ph":"B","cat":"parse","ts":31,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/main.ts"}},
{"pid":1,"tid":100209852,"ph":"E","cat":"parse","ts":32,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/main.ts"}},
{"pid":1,"tid":540121770,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/widget.d.ts"}},
{"pid":1,"tid":540121770,"ph":"B","cat":"parse","ts":33,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/widget.d.ts"}},
{"pid":1,"tid":540121770,"ph":"E","cat":"parse","ts":34,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/widget.d.ts"}},
{"pid":1,"tid":411501950,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/gadget.d.ts"}},
{"pid":1,"tid":411501950,"ph":"B","cat":"parse","ts":35,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/gadget.d.ts"}},
{"pid":1,"tid":411501950,"ph":"E","cat":"parse","ts":36,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/gadget.d.ts"}},
{"pid":1,"tid":454685436,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/fields.d.ts"}},
{"pid":1,"tid":454685436,"ph":"B","cat":"parse","ts":37,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/fields.d.ts"}},
{"pid":1,"tid":454685436,"ph":"E","cat":"parse","ts":38,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/fields.d.ts"}},
{"pid":1,"tid":911467565,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/index.d.ts"}},
{"pid":1,"tid":911467565,"ph":"B","cat":"parse","ts":39,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/index.d.ts"}},
{"pid":1,"tid":911467565,"ph":"E","cat":"parse","ts":40,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/index.d.ts"}},
{"pid":1,"tid":3296854,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/mu.d.ts"}},
{"pid":1,"tid":3296854,"ph":"B","cat":"parse","ts":41,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/mu.d.ts"}},
{"pid":1,"tid":3296854,"ph":"E","cat":"parse","ts":42,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/mu.d.ts"}},
{"pid":1,"tid":172708103,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/lambda.d.ts"}},
{"pid":1,"tid":172708103,"ph":"B","cat":"parse","ts":43,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/lambda.d.ts"}},
{"pid":1,"tid":172708103,"ph":"E","cat":"parse","ts":44,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/lambda.d.ts"}},
{"pid":1,"tid":887942961,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/kappa.d.ts"}},
{"pid":1,"tid":887942961,"ph":"B","cat":"parse","ts":45,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/kappa.d.ts"}},
{"pid":1,"tid":887942961,"ph":"E","cat":"parse","ts":46,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/kappa.d.ts"}},
{"pid":1,"tid":757955809,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/iota.d.ts"}},
{"pid":1,"tid":757955809,"ph":"B","cat":"parse","ts":47,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/iota.d.ts"}},
{"pid":1,"tid":757955809,"ph":"E","cat":"parse","ts":48,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/iota.d.ts"}},
{"pid":1,"tid":909662959,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/theta.d.ts"}},
{"pid":1,"tid":909662959,"ph":"B","cat":"parse","ts":49,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/theta.d.ts"}},
{"pid":1,"tid":909662959,"ph":"E","cat":"parse","ts":50,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/theta.d.ts"}},
{"pid":1,"tid":86181510,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/eta.d.ts"}},
{"pid":1,"tid":86181510,"ph":"B","cat":"parse","ts":51,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/eta.d.ts"}},
{"pid":1,"tid":86181510,"ph":"E","cat":"parse","ts":52,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/eta.d.ts"}},
{"pid":1,"tid":813403241,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/zeta.d.ts"}},
{"pid":1,"tid":813403241,"ph":"B","cat":"parse","ts":53,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/zeta.d.ts"}},
{"pid":1,"tid":813403241,"ph":"E","cat":"parse","ts":54,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/zeta.d.ts"}},
{"pid":1,"tid":758077059,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/epsilon.d.ts"}},
{"pid":1,"tid":758077059,"ph":"B","cat":"parse","ts":55,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/epsilon.d.ts"}},
{"pid":1,"tid":758077059,"ph":"E","cat":"parse","ts":56,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/epsilon.d.ts"}},
{"pid":1,"tid":424664868,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/delta.d.ts"}},
{"pid":1,"tid":424664868,"ph":"B","cat":"parse","ts":57,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/delta.d.ts"}},
{"pid":1,"tid":424664868,"ph":"E","cat":"parse","ts":58,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/delta.d.ts"}},
{"pid":1,"tid":562550315,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/gamma.d.ts"}},
{"pid":1,"tid":562550315,"ph":"B","cat":"parse","ts":59,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/gamma.d.ts"}},
{"pid":1,"tid":562550315,"ph":"E","cat":"parse","ts":60,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/gamma.d.ts"}},
{"pid":1,"tid":212488040,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/beta.d.ts"}},
{"pid":1,"tid":212488040,"ph":"B","cat":"parse","ts":61,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/beta.d.ts"}},
{"pid":1,"tid":212488040,"ph":"E","cat":"parse","ts":62,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/beta.d.ts"}},
{"pid":1,"tid":180310947,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"file:/home/src/workspaces/project/parts/alpha.d.ts"}},
{"pid":1,"tid":180310947,"ph":"B","cat":"parse","ts":63,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/alpha.d.ts"}},
{"pid":1,"tid":180310947,"ph":"E","cat":"parse","ts":64,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/parts/alpha.d.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"program","ts":65,"name":"createProgram","args":{"configFilePath":"/home/src/workspaces/project/tsconfig.json"}},
{"pid":1,"tid":1,"ph":"B","cat":"bind","ts":66,"name":"bindSourceFiles"},
{"pid":1,"tid":373807619,"ph":"B","cat":"bind","ts":67,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/index.d.ts"}},
{"pid":1,"tid":373807619,"ph":"E","cat":"bind","ts":68,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/index.d.ts"}},
{"pid":1,"tid":872471718,"ph":"B","cat":"bind","ts":69,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/pt.d.ts"}},
{"pid":1,"tid":872471718,"ph":"E","cat":"bind","ts":70,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/pt.d.ts"}},
{"pid":1,"tid":944314902,"ph":"B","cat":"bind","ts":71,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/pl.d.ts"}},
{"pid":1,"tid":944314902,"ph":"E","cat":"bind","ts":72,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/pl.d.ts"}},
{"pid":1,"tid":255493617,"ph":"B","cat":"bind","ts":73,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/nl.d.ts"}},
{"pid":1,"tid":255493617,"ph":"E","cat":"bind","ts":74,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/nl.d.ts"}},
{"pid":1,"tid":376655012,"ph":"B","cat":"bind","ts":75,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/ko.d.ts"}},
{"pid":1,"tid":376655012,"ph":"E","cat":"bind","ts":76,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/ko.d.ts"}},
{"pid":1,"tid":345504644,"ph":"B","cat":"bind","ts":77,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/ja.d.ts"}},
{"pid":1,"tid":345504644,"ph":"E","cat":"bind","ts":78,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/ja.d.ts"}},
{"pid":1,"tid":450563598,"ph":"B","cat":"bind","ts":79,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/it.d.ts"}},
{"pid":1,"tid":450563598,"ph":"E","cat":"bind","ts":80,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/it.d.ts"}},
{"pid":1,"tid":141527137,"ph":"B","cat":"bind","ts":81,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/he.d.ts"}},
{"pid":1,"tid":141527137,"ph":"E","cat":"bind","ts":82,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/he.d.ts"}},
{"pid":1,"tid":883991556,"ph":"B","cat":"bind","ts":83,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/fr.d.ts"}},
{"pid":1,"tid":883991556,"ph":"E","cat":"bind","ts":84,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/fr.d.ts"}},
{"pid":1,"tid":455027228,"ph":"B","cat":"bind","ts":85,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/es.d.ts"}},
{"pid":1,"tid":455027228,"ph":"E","cat":"bind","ts":86,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/es.d.ts"}},
{"pid":1,"tid":616565165,"ph":"B","cat":"bind","ts":87,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/en.d.ts"}},
{"pid":1,"tid":616565165,"ph":"E","cat":"bind","ts":88,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/en.d.ts"}},
{"pid":1,"tid":930019567,"ph":"B","cat":"bind","ts":89,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/de.d.ts"}},
{"pid":1,"tid":930019567,"ph":"E","cat":"bind","ts":90,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/de.d.ts"}},
{"pid":1,"tid":743285103,"ph":"B","cat":"bind","ts":91,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/ar.d.ts"}},
{"pid":1,"tid":743285103,"ph":"E","cat":"bind","ts":92,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/locales/ar.d.ts"}},
{"pid":1,"tid":100209852,"ph":"B","cat":"bind","ts":93,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/main.ts"}},
{"pid":1,"tid":100209852,"ph":"E","cat":"bind","ts":94,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/main.ts"}},
{"pid":1,"tid":540121770,"ph":"B","cat":"bind","ts":95,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/widget.d.ts"}},
{"pid":1,"tid":540121770,"ph":"E","cat":"bind","ts":96,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/widget.d.ts"}},
{"pid":1,"tid":411501950,"ph":"B","cat":"bind","ts":97,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/gadget.d.ts"}},
{"pid":1,"tid":411501950,"ph":"E","cat":"bind","ts":98,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/gadget.d.ts"}},
{"pid":1,"tid":454685436,"ph":"B","cat":"bind","ts":99,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/fields.d.ts"}},
{"pid":1,"tid":454685436,"ph":"E","cat":"bind","ts":100,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/fields.d.ts"}},
{"pid":1,"tid":911467565,"ph":"B","cat":"bind","ts":101,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/index.d.ts"}},
{"pid":1,"tid":911467565,"ph":"E","cat":"bind","ts":102,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/index.d.ts"}},
{"pid":1,"tid":3296854,"ph":"B","cat":"bind","ts":103,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/mu.d.ts"}},
{"pid":1,"tid":3296854,"ph":"E","cat":"bind","ts":104,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/mu.d.ts"}},
{"pid":1,"tid":172708103,"ph":"B","cat":"bind","ts":105,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/lambda.d.ts"}},
{"pid":1,"tid":172708103,"ph":"E","cat":"bind","ts":106,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/lambda.d.ts"}},
{"pid":1,"tid":887942961,"ph":"B","cat":"bind","ts":107,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/kappa.d.ts"}},
{"pid":1,"tid":887942961,"ph":"E","cat":"bind","ts":108,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/kappa.d.ts"}},
{"pid":1,"tid":757955809,"ph":"B","cat":"bind","ts":109,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/iota.d.ts"}},
{"pid":1,"tid":757955809,"ph":"E","cat":"bind","ts":110,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/iota.d.ts"}},
{"pid":1,"tid":909662959,"ph":"B","cat":"bind","ts":111,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/theta.d.ts"}},
{"pid":1,"tid":909662959,"ph":"E","cat":"bind","ts":112,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/theta.d.ts"}},
{"pid":1,"tid":86181510,"ph":"B","cat":"bind","ts":113,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/eta.d.ts"}},
{"pid":1,"tid":86181510,"ph":"E","cat":"bind","ts":114,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/eta.d.ts"}},
{"pid":1,"tid":813403241,"ph":"B","cat":"bind","ts":115,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/zeta.d.ts"}},
{"pid":1,"tid":813403241,"ph":"E","cat":"bind","ts":116,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/zeta.d.ts"}},
{"pid":1,"tid":758077059,"ph":"B","cat":"bind","ts":117,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/epsilon.d.ts"}},
{"pid":1,"tid":758077059,"ph":"E","cat":"bind","ts":118,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/epsilon.d.ts"}},
{"pid":1,"tid":424664868,"ph":"B","cat":"bind","ts":119,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/delta.d.ts"}},
{"pid":1,"tid":424664868,"ph":"E","cat":"bind","ts":120,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/delta.d.ts"}},
{"pid":1,"tid":562550315,"ph":"B","cat":"bind","ts":121,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/gamma.d.ts"}},
{"pid":1,"tid":562550315,"ph":"E","cat":"bind","ts":122,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/gamma.d.ts"}},
{"pid":1,"tid":212488040,"ph":"B","cat":"bind","ts":123,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/beta.d.ts"}},
{"pid":1,"tid":212488040,"ph":"E","cat":"bind","ts":124,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/beta.d.ts"}},
{"pid":1,"tid":180310947,"ph":"B","cat":"bind","ts":125,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/alpha.d.ts"}},
{"pid":1,"tid":180310947,"ph":"E","cat":"bind","ts":126,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/parts/alpha.d.ts"}},
{"pid":1,"tid":181085097,"ph":"B","cat":"bind","ts":127,"name":"bindSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts"}},
{"pid":1,"tid":181085097,"ph":"E","cat":"bind","ts":128,"name":"bindSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"bind","ts":129,"name":"bindSourceFiles"},
{"pid":1,"tid":1,"ph":"B","cat":"check","ts":130,"name":"checkSourceFiles"},
{"pid":1,"tid":2,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"checker:0"}},
{"pid":1,"tid":2,"ph":"B","cat":"check","ts":131,"name":"checkSourceFile","args":{"checkerId":0,"path":"/home/src/workspaces/project/main.ts"}},
{"pid":1,"tid":2,"ph":"E","cat":"check","ts":132,"name":"checkSourceFile","args":{"checkerId":0,"path":"/home/src/workspaces/project/main.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"check","ts":133,"name":"checkSourceFiles"},
{"pid":1,"tid":1,"ph":"B","cat":"emit","ts":134,"name":"emit"},
{"pid":1,"tid":100209852,"ph":"B","cat":"emit","ts":135,"name":"emit","args":{"path":"/home/src/workspaces/project/main.ts"}},
{"pid":1,"tid":1,"ph":"B","cat":"emit","ts":136,"name":"emitDeclarationFileOrBundle","args":{"declarationFilePath":"/home/src/workspaces/project/out/main.d.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"emit","ts":137,"name":"emitDeclarationFileOrBundle","args":{"declarationFilePath":"/home/src/workspaces/project/out/main.d.ts"}},
{"pid":1,"tid":100209852,"ph":"E","cat":"emit","ts":138,"name":"emit","args":{"path":"/home/src/workspaces/project/main.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"emit","ts":139,"name":"emit"}
]

//// [/home/src/workspaces/project/trace/types_0.json] *new* 
[{"id":1,"intrinsicName":"any","recursionId":0,"flags":["Any"]},
{"id":2,"intrinsicName":"any","recursionId":1,"flags":["Any"]},
{"id":3,"intrinsicName":"any","recursionId":2,"flags":["Any"]},
{"id":4,"intrinsicName":"any","recursionId":3,"flags":["Any"]},
{"id":5,"intrinsicName":"error","recursionId":4,"flags":["Any"]},
{"id":6,"intrinsicName":"unresolved","recursionId":5,"flags":["Any"]},
{"id":7,"intrinsicName":"any","recursionId":6,"flags":["Any"]},
{"id":8,"intrinsicName":"intrinsic","recursionId":7,"flags":["Any"]},
{"id":9,"intrinsicName":"unknown","recursionId":8,"flags":["Unknown"]},
{"id":10,"intrinsicName":"undefined","recursionId":9,"flags":["Undefined"]},
{"id":11,"intrinsicName":"undefined","recursionId":10,"flags":["Undefined"]},
{"id":12,"intrinsicName":"undefined","recursionId":11,"flags":["Undefined"]},
{"id":13,"intrinsicName":"null","recursionId":12,"flags":["Null"]},
{"id":14,"intrinsicName":"string","recursionId":13,"flags":["String"]},
{"id":15,"intrinsicName":"number","recursionId":14,"flags":["Number"]},
{"id":16,"intrinsicName":"bigint","recursionId":15,"flags":["BigInt"]},
{"id":17,"recursionId":16,"flags":["BooleanLiteral"],"display":"false"},
{"id":18,"recursionId":17,"flags":["BooleanLiteral"],"display":"false"},
{"id":19,"recursionId":18,"flags":["BooleanLiteral"],"display":"true"},
{"id":20,"recursionId":19,"flags":["BooleanLiteral"],"display":"true"},
{"id":21,"recursionId":20,"unionTypes":[17,19],"flags":["Boolean","Union"],"display":"boolean"},
{"id":22,"intrinsicName":"symbol","recursionId":21,"flags":["ESSymbol"]},
{"id":23,"intrinsicName":"void","recursionId":22,"flags":["Void"]},
{"id":24,"intrinsicName":"never","recursionId":23,"flags":["Never"]},
{"id":25,"intrinsicName":"never","recursionId":24,"flags":["Never"]},
{"id":26,"intrinsicName":"never","recursionId":25,"flags":["Never"]},
{"id":27,"intrinsicName":"never","recursionId":26,"flags":["Never"]},
{"id":28,"intrinsicName":"object","recursionId":27,"flags":["NonPrimitive"]},
{"id":29,"recursionId":28,"unionTypes":[14,15],"flags":["Union"],"display":"string | number"},
{"id":30,"recursionId":29,"unionTypes":[14,15,22],"flags":["Union"],"display":"string | number | symbol"},
{"id":31,"recursionId":30,"unionTypes":[15,16],"flags":["Union"],"display":"number | bigint"},
{"id":32,"recursionId":31,"flags":["TemplateLiteral"],"display":"`${number}`"},
{"id":33,"recursionId":32,"unionTypes":[10,13,14,15,16,17,19],"flags":["Union"],"display":"string | number | bigint | boolean | null | undefined"},
{"id":34,"intrinsicName":"never","recursionId":33,"flags":["Never"]},
{"id":35,"recursionId":34,"flags":["Object"],"display":"{}"},
{"id":36,"recursionId":35,"flags":["Object"],"display":"{}"},
{"id":37,"recursionId":36,"flags":["Object"],"display":"{}"},
{"id":38,"symbolName":"__type","recursionId":37,"flags":["Object"],"display":"{}"},
{"id":39,"recursionId":38,"flags":["Object"],"display":"{}"},
{"id":40,"recursionId":39,"unionTypes":[10,13,39],"flags":["Union"],"display":"{} | null | undefined"},
{"id":41,"recursionId":40,"flags":["Object"],"display":"{}"},
{"id":42,"recursionId":41,"flags":["Object"],"display":"{}"},
{"id":43,"recursionId":42,"flags":["Object"],"display":"{}"},
{"id":44,"recursionId":43,"flags":["Object"],"display":"{}"},
{"id":45,"recursionId":44,"flags":["Object"],"display":"{}"},
{"id":46,"recursionId":45,"flags":["TypeParameter"]},
{"id":47,"recursionId":46,"flags":["TypeParameter"]},
{"id":48,"recursionId":47,"flags":["TypeParameter"]},
{"id":49,"recursionId":48,"flags":["TypeParameter"]},
{"id":50,"recursionId":49,"flags":["TypeParameter"]},
{"id":51,"recursionId":50,"flags":["StringLiteral"],"display":"\"\""},
{"id":52,"recursionId":51,"flags":["NumberLiteral"],"display":"0"},
{"id":53,"recursionId":52,"flags":["BigIntLiteral"],"display":"0n"},
{"id":54,"recursionId":53,"flags":["StringLiteral"],"display":"\"bigint\""},
{"id":55,"recursionId":54,"flags":["StringLiteral"],"display":"\"boolean\""},
{"id":56,"recursionId":55,"flags":["StringLiteral"],"display":"\"function\""},
{"id":57,"recursionId":56,"flags":["StringLiteral"],"display":"\"number\""},
{"id":58,"recursionId":57,"flags":["StringLiteral"],"display":"\"object\""},
{"id":59,"recursionId":58,"flags":["StringLiteral"],"display":"\"string\""},
{"id":60,"recursionId":59,"flags":["StringLiteral"],"display":"\"symbol\""},
{"id":61,"recursionId":60,"flags":["StringLiteral"],"display":"\"undefined\""},
{"id":62,"recursionId":61,"unionTypes":[54,55,56,57,58,59,60,61],"flags":["Union"],"display":"\"bigint\" | \"boolean\" | \"function\" | \"number\" | \"object\" | \"string\" | \"symbol\" | \"undefined\""},
{"id":63,"symbolName":"IArguments","recursionId":62,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":6,"character":1},"end":{"line":6,"character":24}},"flags":["Object"]},
{"id":64,"symbolName":"globalThis","recursionId":63,"flags":["Object"],"display":"typeof globalThis"},
{"id":65,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[66],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":66,"symbolName":"T","recursionId":65,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":11,"character":17},"end":{"line":11,"character":18}},"flags":["TypeParameter"]},
{"id":67,"symbolName":"Array","recursionId":64,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["TypeParameter"]},
{"id":68,"symbolName":"Object","recursionId":66,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":8,"character":1},"end":{"line":8,"character":20}},"flags":["Object"]},
{"id":69,"symbolName":"Function","recursionId":67,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":3,"character":1},"end":{"line":3,"character":22}},"flags":["Object"]},
{"id":70,"symbolName":"CallableFunction","recursionId":68,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":4,"character":1},"end":{"line":4,"character":30}},"flags":["Object"]},
{"id":71,"symbolName":"NewableFunction","recursionId":69,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":5,"character":1},"end":{"line":5,"character":29}},"flags":["Object"]},
{"id":72,"symbolName":"String","recursionId":70,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":10,"character":1},"end":{"line":10,"character":34}},"flags":["Object"]},
{"id":73,"symbolName":"Number","recursionId":71,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":7,"character":1},"end":{"line":7,"character":41}},"flags":["Object"]},
{"id":74,"symbolName":"Boolean","recursionId":72,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":2,"character":1},"end":{"line":2,"character":21}},"flags":["Object"]},
{"id":75,"symbolName":"RegExp","recursionId":73,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":9,"character":1},"end":{"line":9,"character":20}},"flags":["Object"]},
{"id":76,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[1],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":77,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[2],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":78,"symbolName":"ReadonlyArray","recursionId":74,"instantiatedType":78,"typeArguments":[79],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":12,"character":1},"end":{"line":12,"character":30}},"flags":["Object"]},
{"id":79,"symbolName":"T","recursionId":75,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":12,"character":25},"end":{"line":12,"character":26}},"flags":["TypeParameter"]},
{"id":80,"symbolName":"ReadonlyArray","recursionId":74,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":12,"character":1},"end":{"line":12,"character":30}},"flags":["TypeParameter"]},
{"id":81,"symbolName":"ReadonlyArray","recursionId":74,"instantiatedType":78,"typeArguments":[1],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":12,"character":1},"end":{"line":12,"character":30}},"flags":["Object"]},
{"id":82,"symbolName":"\"/home/src/workspaces/project/parts/index\"","recursionId":76,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/index.d.ts","start":{"line":1,"character":1},"end":{"line":14,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/index\")"},
{"id":83,"symbolName":"\"/home/src/workspaces/project/parts/alpha\"","recursionId":77,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/alpha.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/alpha\")"},
{"id":84,"symbolName":"\"/home/src/workspaces/project/parts/beta\"","recursionId":78,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/beta.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/beta\")"},
{"id":85,"symbolName":"\"/home/src/workspaces/project/parts/gamma\"","recursionId":79,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/gamma.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/gamma\")"},
{"id":86,"symbolName":"\"/home/src/workspaces/project/parts/delta\"","recursionId":80,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/delta.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/delta\")"},
{"id":87,"symbolName":"\"/home/src/workspaces/project/parts/epsilon\"","recursionId":81,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/epsilon.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/epsilon\")"},
{"id":88,"symbolName":"\"/home/src/workspaces/project/parts/zeta\"","recursionId":82,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/zeta.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/zeta\")"},
{"id":89,"symbolName":"\"/home/src/workspaces/project/parts/eta\"","recursionId":83,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/eta.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/eta\")"},
{"id":90,"symbolName":"\"/home/src/workspaces/project/parts/theta\"","recursionId":84,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/theta.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/theta\")"},
{"id":91,"symbolName":"\"/home/src/workspaces/project/parts/iota\"","recursionId":85,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/iota.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/iota\")"},
{"id":92,"symbolName":"\"/home/src/workspaces/project/parts/kappa\"","recursionId":86,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/kappa.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/kappa\")"},
{"id":93,"symbolName":"\"/home/src/workspaces/project/parts/lambda\"","recursionId":87,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/lambda.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/lambda\")"},
{"id":94,"symbolName":"\"/home/src/workspaces/project/parts/mu\"","recursionId":88,"firstDeclaration":{"path":"/home/src/workspaces/project/parts/mu.d.ts","start":{"line":1,"character":1},"end":{"line":2,"character":1}},"flags":["Object"],"display":"typeof import(\"/home/src/workspaces/project/parts/mu\")"},
{"id":95,"recursionId":89,"flags":["NumberLiteral"],"display":"1"},
{"id":96,"recursionId":90,"flags":["NumberLiteral"],"display":"1"},
{"id":97,"recursionId":91,"flags":["NumberLiteral"],"display":"2"},
{"id":98,"recursionId":92,"flags":["NumberLiteral"],"display":"2"},
{"id":99,"recursionId":93,"flags":["NumberLiteral"],"display":"3"},
{"id":100,"recursionId":94,"flags":["NumberLiteral"],"display":"3"},
{"id":101,"recursionId":95,"flags":["NumberLiteral"],"display":"4"},
{"id":102,"recursionId":96,"flags":["NumberLiteral"],"display":"4"},
{"id":103,"recursionId":97,"flags":["NumberLiteral"],"display":"5"},
{"id":104,"recursionId":98,"flags":["NumberLiteral"],"display":"5"},
{"id":105,"recursionId":99,"flags":["NumberLiteral"],"display":"6"},
{"id":106,"recursionId":100,"flags":["NumberLiteral"],"display":"6"},
{"id":107,"recursionId":101,"flags":["NumberLiteral"],"display":"7"},
{"id":108,"recursionId":102,"flags":["NumberLiteral"],"display":"7"},
{"id":109,"recursionId":103,"flags":["NumberLiteral"],"display":"8"},
{"id":110,"recursionId":104,"flags":["NumberLiteral"],"display":"8"},
{"id":111,"recursionId":105,"flags":["NumberLiteral"],"display":"9"},
{"id":112,"recursionId":106,"flags":["NumberLiteral"],"display":"9"},
{"id":113,"recursionId":107,"flags":["NumberLiteral"],"display":"10"},
{"id":114,"recursionId":108,"flags":["NumberLiteral"],"display":"10"},
{"id":115,"recursionId":109,"flags":["NumberLiteral"],"display":"11"},
{"id":116,"recursionId":110,"flags":["NumberLiteral"],"display":"11"},
{"id":117,"recursionId":111,"flags":["NumberLiteral"],"display":"12"},
{"id":118,"recursionId":112,"flags":["NumberLiteral"],"display":"12"},
{"id":119,"symbolName":"__type","recursionId":113,"firstDeclaration":{"path":"/home/src/workspaces/project/main.ts","start":{"line":5,"character":29},"end":{"line":5,"character":106}},"flags":["Object"],"display":"{ a: 1; b: 2; c: 3; d: 4; e: 5; f: 6; g: 7; h: 8; i: 9; j: 10; k: 11; l: 12; }"},
{"id":120,"symbolName":"T","recursionId":114,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":20},"end":{"line":1,"character":21}},"flags":["TypeParameter"]},
{"id":121,"symbolName":"T","recursionId":114,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":20},"end":{"line":1,"character":21}},"flags":["TypeParameter"]},
{"id":122,"symbolName":"__type","recursionId":115,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":35},"end":{"line":1,"character":181}},"flags":["Object"],"display":"{ a: A; b: B; c: C; d: D; e: E; f: F; g: G; h: H; i: I; j: J; k: K; l: L; }"},
{"id":123,"symbolName":"A","recursionId":116,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":46},"end":{"line":1,"character":47}},"flags":["TypeParameter"]},
{"id":124,"symbolName":"B","recursionId":117,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":58},"end":{"line":1,"character":59}},"flags":["TypeParameter"]},
{"id":125,"symbolName":"C","recursionId":118,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":70},"end":{"line":1,"character":71}},"flags":["TypeParameter"]},
{"id":126,"symbolName":"D","recursionId":119,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":82},"end":{"line":1,"character":83}},"flags":["TypeParameter"]},
{"id":127,"symbolName":"E","recursionId":120,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":94},"end":{"line":1,"character":95}},"flags":["TypeParameter"]},
{"id":128,"symbolName":"F","recursionId":121,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":106},"end":{"line":1,"character":107}},"flags":["TypeParameter"]},
{"id":129,"symbolName":"G","recursionId":122,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":118},"end":{"line":1,"character":119}},"flags":["TypeParameter"]},
{"id":130,"symbolName":"H","recursionId":123,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":130},"end":{"line":1,"character":131}},"flags":["TypeParameter"]},
{"id":131,"symbolName":"I","recursionId":124,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":142},"end":{"line":1,"character":143}},"flags":["TypeParameter"]},
{"id":132,"symbolName":"J","recursionId":125,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":154},"end":{"line":1,"character":155}},"flags":["TypeParameter"]},
{"id":133,"symbolName":"K","recursionId":126,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":166},"end":{"line":1,"character":167}},"flags":["TypeParameter"]},
{"id":134,"symbolName":"L","recursionId":127,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":178},"end":{"line":1,"character":179}},"flags":["TypeParameter"]},
{"id":135,"symbolName":"__type","recursionId":115,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":35},"end":{"line":1,"character":181}},"flags":["Object"],"display":"{ a: unknown; b: unknown; c: unknown; d: unknown; e: unknown; f: unknown; g: unknown; h: unknown; i: unknown; j: unknown; k: unknown; l: unknown; }"},
{"id":136,"symbolName":"Fields","recursionId":128,"aliasTypeArguments":[120],"conditionalCheckType":121,"conditionalExtendsType":122,"conditionalTrueType":-1,"conditionalFalseType":-1,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":1},"end":{"line":1,"character":229}},"flags":["Conditional"]},
{"id":137,"symbolName":"__type","recursionId":115,"firstDeclaration":{"path":"/home/src/workspaces/project/fields.d.ts","start":{"line":1,"character":35},"end":{"line":1,"character":181}},"flags":["Object"],"display":"{ a: 1; b: 2; c: 3; d: 4; e: 5; f: 6; g: 7; h: 8; i: 9; j: 10; k: 11; l: 12; }"},
{"id":138,"recursionId":129,"flags":["TypeParameter"]},
{"id":139,"recursionId":130,"flags":["TypeParameter"]},
{"id":140,"recursionId":131,"flags":["TypeParameter"]},
{"id":141,"recursionId":132,"flags":["TypeParameter"]},
{"id":142,"recursionId":133,"flags":["TypeParameter"]},
{"id":143,"recursionId":134,"flags":["TypeParameter"]},
{"id":144,"recursionId":135,"flags":["TypeParameter"]},
{"id":145,"recursionId":136,"flags":["TypeParameter"]},
{"id":146,"recursionId":137,"flags":["TypeParameter"]},
{"id":147,"recursionId":138,"flags":["TypeParameter"]},
{"id":148,"recursionId":139,"flags":["TypeParameter"]},
{"id":149,"recursionId":140,"flags":["TypeParameter"]},
{"id":150,"recursionId":141,"isTuple":true,"instantiatedType":150,"typeArguments":[138,139,140,141,142,143,144,145,146,147,148,149],"flags":["Object"]},
{"id":151,"recursionId":142,"flags":["TypeParameter"]},
{"id":152,"recursionId":143,"instantiatedType":150,"typeArguments":[123,124,125,126,127,128,129,130,131,132,133,134],"flags":["Object"]},
{"id":153,"recursionId":141,"instantiatedType":150,"typeArguments":[95,97,99,101,103,105,107,109,111,113,115,117],"flags":["Object"]},
{"id":154,"recursionId":144,"instantiatedType":150,"typeArguments":[95,97,99,101,103,105,107,109,111,113,115,117],"flags":["Object"]},
{"id":155,"recursionId":145,"unionTypes":[138,139,140,141,142,143,144,145,146,147,148,149],"flags":["Union"],"display":"? | ? | ? | ? | ? | ? | ? | ? | ? | ? | ? | ?"},
{"id":156,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[155],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":157,"recursionId":146,"unionTypes":[95,97,99,101,103,105,107,109,111,113,115,117],"flags":["Union"],"display":"1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12"},
{"id":158,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[157],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":159,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[157,153],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":160,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[157,154],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2026.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":161,"symbolName":"makeWidget","recursionId":147,"firstDeclaration":{"path":"/home/src/workspaces/project/widget.d.ts","start":{"line":2,"character":1},"end":{"line":2,"character":46}},"flags":["Object"],"display":"() => Gadget"},
{"id":162,"symbolName":"Gadget","recursionId":148,"firstDeclaration":{"path":"/home/src/workspaces/project/gadget.d.ts","start":{"line":1,"character":1},"end":{"line":3,"character":2}},"flags":["Object"]},
{"id":163,"symbolName":"__type","recursionId":149,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/ar.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"ar\"; }"},
{"id":164,"symbolName":"__type","recursionId":150,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/de.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"de\"; }"},
{"id":165,"symbolName":"__type","recursionId":151,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/en.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"en\"; }"},
{"id":166,"symbolName":"__type","recursionId":152,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/es.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"es\"; }"},
{"id":167,"symbolName":"__type","recursionId":153,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/fr.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"fr\"; }"},
{"id":168,"symbolName":"__type","recursionId":154,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/he.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"he\"; }"},
{"id":169,"symbolName":"__type","recursionId":155,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/it.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"it\"; }"},
{"id":170,"symbolName":"__type","recursionId":156,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/ja.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"ja\"; }"},
{"id":171,"symbolName":"__type","recursionId":157,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/ko.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"ko\"; }"},
{"id":172,"symbolName":"__type","recursionId":158,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/nl.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"nl\"; }"},
{"id":173,"symbolName":"__type","recursionId":159,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/pl.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"pl\"; }"},
{"id":174,"symbolName":"__type","recursionId":160,"firstDeclaration":{"path":"/home/src/workspaces/project/locales/pt.d.ts","start":{"line":1,"character":25},"end":{"line":1,"character":47}},"flags":["Object"],"display":"() => { locale: \"pt\"; }"}]


