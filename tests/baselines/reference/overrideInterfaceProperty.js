//// [overrideInterfaceProperty.ts]
interface Mup<K, V> {
    readonly size: number;
}
interface MupConstructor {
    new(): Mup<any, any>;
    new<K, V>(entries?: readonly (readonly [K, V])[] | null): Mup<K, V>;
    readonly prototype: Mup<any, any>;
}
declare var Mup: MupConstructor;

class Sizz extends Mup {
    // ok, because Mup is an interface
    get size() { return 0 }
}
class Kasizz extends Mup {
    size = -1
}


//// [overrideInterfaceProperty.js]
class Sizz extends Mup {
    // ok, because Mup is an interface
    get size() { return 0; }
}
class Kasizz extends Mup {
    constructor() {
        super(...arguments);
        this.size = -1;
    }
}
