module A {
    export class A {
        id: number;
        name: string;
    }

    export class AG<T, U>{
        id: T;
        name: U;
    }

    class A2 {
        id: number;
        name: string;
    }

    class AG2<T, U>{
        id: T;
        name: U;
    }
}

// no errors expected, these are all exported
var a: { id: number; name: string };
var a = new A.A();

var AG = new A.AG<number, string>()

// errors expected, these are not exported
var a2 = new A.A2();
var ag2 = new A.A2<string, number>();

