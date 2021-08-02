//// [localTypeParameterInferencePriority.ts]
export type UnrollOnHover<O extends object> = O extends object ?
    { [K in keyof O]: O[K]; } :
    never;


export type Schema = Record<string, unknown>;
class Table<S extends Schema>  {
    __schema!: S;

    // Removing this line, removes the error 
    getRows<C extends keyof S>(): Array<UnrollOnHover<Pick<S, C>>> {
        return null!
    }
}

class ColumnSelectViewImp<S extends Schema> extends Table<S> { }


const ColumnSelectView1: new <S extends Schema>() => Table<UnrollOnHover<S>> = ColumnSelectViewImp;
const ColumnSelectView2: new <S extends Schema>() => Table<UnrollOnHover<S>> = Table;

//// [localTypeParameterInferencePriority.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Table = /** @class */ (function () {
    function Table() {
    }
    // Removing this line, removes the error 
    Table.prototype.getRows = function () {
        return null;
    };
    return Table;
}());
var ColumnSelectViewImp = /** @class */ (function (_super) {
    __extends(ColumnSelectViewImp, _super);
    function ColumnSelectViewImp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ColumnSelectViewImp;
}(Table));
var ColumnSelectView1 = ColumnSelectViewImp;
var ColumnSelectView2 = Table;
