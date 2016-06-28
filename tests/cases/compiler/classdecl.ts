// @declaration: true
// @target: es5
class a {
    //constructor ();
    constructor (n: number);
    constructor (s: string);
    constructor (ns: any) {

    }

    public pgF() { }

    public pv;
    public get d() {
        return 30;
    }
    public set d(a: number) {
    }

    public static get p2() {
        return { x: 30, y: 40 };
    }

    private static d2() {
    }
    private static get p3() {
        return "string";
    }
    private pv3;

    private foo(n: number): string;
    private foo(s: string): string;
    private foo(ns: any) {
        return ns.toString();
    }
}

class b extends a {
}

module m1 {
    export class b {
    }
    class d {
    }


    export interface ib {
    }
}

module m2 {

    export module m3 {
        export class c extends b {
        }
        export class ib2 implements m1.ib {
        }
    }
}

class c extends m1.b {
}

class ib2 implements m1.ib {
}

declare class aAmbient {
    constructor (n: number);
    constructor (s: string);
    public pgF(): void;
    public pv;
    public d : number;
    static p2 : { x: number; y: number; };
    static d2();
    static p3;
    private pv3;
    private foo(s);
}

class d {
    private foo(n: number): string;
    private foo(s: string): string;
    private foo(ns: any) {
        return ns.toString();
    }    
}

class e {    
    private foo(s: string): string;
    private foo(n: number): string;
    private foo(ns: any) {
        return ns.toString();
    }
}