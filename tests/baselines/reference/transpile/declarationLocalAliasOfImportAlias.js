//// [declarationLocalAliasOfImportAlias.ts] ////
import { Record } from "./a";
export type Foo<K extends string> = Record<K, number>;

export const obj = {
  doThing<K extends string>(_k: K): Foo<K> {
    return {} as any;
  },
};
//// [declarationLocalAliasOfImportAlias.js] ////
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = void 0;
exports.obj = {
    doThing: function (_k) {
        return {};
    },
};
