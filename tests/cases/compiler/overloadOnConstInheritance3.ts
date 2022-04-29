interface Base {
    addEventListener(x: string): any;
}
interface Deriver extends Base {
    // shouldn't need to redeclare the string overload
    addEventListener(x: 'bar'): string;
    addEventListener(x: 'foo'): string;
}
