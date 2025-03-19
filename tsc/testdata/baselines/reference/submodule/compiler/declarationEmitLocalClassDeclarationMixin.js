//// [tests/cases/compiler/declarationEmitLocalClassDeclarationMixin.ts] ////

//// [declarationEmitLocalClassDeclarationMixin.ts]
interface Constructor<C> { new (...args: any[]): C; }

function mixin<B extends Constructor<{}>>(Base: B) {
    class PrivateMixed extends Base {
        bar = 2;
    }
    return PrivateMixed;
}

export class Unmixed {
    foo = 1;
}

export const Mixed = mixin(Unmixed);

function Filter<C extends Constructor<{}>>(ctor: C) {
    abstract class FilterMixin extends ctor {
        abstract match(path: string): boolean;
        // other concrete methods, fields, constructor
        thing = 12;
    }
    return FilterMixin;
}

export class FilteredThing extends Filter(Unmixed) {
    match(path: string) {
        return false;
    }
}


//// [declarationEmitLocalClassDeclarationMixin.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteredThing = exports.Mixed = exports.Unmixed = void 0;
function mixin(Base) {
    class PrivateMixed extends Base {
        bar = 2;
    }
    return PrivateMixed;
}
class Unmixed {
    foo = 1;
}
exports.Unmixed = Unmixed;
exports.Mixed = mixin(Unmixed);
function Filter(ctor) {
    class FilterMixin extends ctor {
        // other concrete methods, fields, constructor
        thing = 12;
    }
    return FilterMixin;
}
class FilteredThing extends Filter(Unmixed) {
    match(path) {
        return false;
    }
}
exports.FilteredThing = FilteredThing;
