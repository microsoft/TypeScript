// @declaration: true
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
