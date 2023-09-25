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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilterManager = void 0;
    var FilterManager = /** @class */ (function () {
        function FilterManager() {
        }
        return FilterManager;
    }());
    exports.FilterManager = FilterManager;
});
