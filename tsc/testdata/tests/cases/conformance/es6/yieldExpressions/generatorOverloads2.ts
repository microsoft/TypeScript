//@target: ES6
declare namespace M {
    function* f(s: string): Iterable<any>;
    function* f(s: number): Iterable<any>;
    function* f(s: any): Iterable<any>;
}