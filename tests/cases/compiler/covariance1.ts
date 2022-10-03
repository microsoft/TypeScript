module M {

    interface X { m1:number; }
    export class XX implements X { constructor(public m1:number) { } }

    interface Y { x:X; }

    export function f(y:Y) { }

    var a:X;
    f({x:a}); // ok

    var b:XX;
    f({x:b}); // ok covariant subtype
}

