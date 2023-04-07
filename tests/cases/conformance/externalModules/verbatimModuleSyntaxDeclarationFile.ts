// @verbatimModuleSyntax: true

// @Filename: type1.d.ts
declare namespace NS {
    type A = object;
}

export = NS;
export as namespace MyTypes;

// @Filename: type2.d.ts
import type * as NS from './type1';

export = NS;
export as namespace ModuleATypes;
