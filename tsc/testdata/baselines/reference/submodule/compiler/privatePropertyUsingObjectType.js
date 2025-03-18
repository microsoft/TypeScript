//// [tests/cases/compiler/privatePropertyUsingObjectType.ts] ////

//// [privatePropertyUsingObjectType.ts]
export class FilterManager {
    private _filterProviders: { index: IFilterProvider; };
    private _filterProviders2: { [index: number]: IFilterProvider; };
    private _filterProviders3: { (index: number): IFilterProvider; };
    private _filterProviders4: (index: number) => IFilterProvider;
}
export interface IFilterProvider {
}


//// [privatePropertyUsingObjectType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterManager = void 0;
class FilterManager {
    _filterProviders;
    _filterProviders2;
    _filterProviders3;
    _filterProviders4;
}
exports.FilterManager = FilterManager;
