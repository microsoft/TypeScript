module Underscore {
    export interface Iterator<T, U> {
        (value: T, index: any, list: any): U;
    }
    export interface Static {
        all<T>(list: T[], iterator?: Iterator<T, boolean>, context?: any): T;
        identity<T>(value: T): T;
    }
}
declare var _: Underscore.Static;

var r = _.all([true, 1, null, 'yes'], _.identity);
var r2 = _.all([true], _.identity);
var r3 = _.all([], _.identity);
var r4 = _.all([<any>true], _.identity);
