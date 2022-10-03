module A {
    export class Point {
        constructor(public x: number, public y: number) { }
    }
    export var Origin = new Point(0, 0);
}

// no code gen expected
module B {

    import a = A; //Error generates 'var <Alias> = <EntityName>;'
}
// no code gen expected
module C {

    import a = A; //Error generates 'var <Alias> = <EntityName>;'
    var m: typeof a;
    var p: a.Point;
    var p = { x: 0, y: 0 };
}
