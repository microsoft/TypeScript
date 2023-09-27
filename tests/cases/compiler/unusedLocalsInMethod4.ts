// @strict: true

function f<T, NonNull extends {}>() {
    let x1: number[]; // should error
    let x2: number[] | null; // should error
    let x3: number[] | undefined; // should not error
    let x4: number[] | undefined | null; // should not error
    let x5!: number[]; // should not error
    let x6: any; // should not error
    let x7: unknown; // should not error
    let x8: T; // should error
    let x9: NonNull; // should error

    function foo() {
        console.log(x1);
        console.log(x2);
        console.log(x3);
        console.log(x4);
        console.log(x5);
        console.log(x6);
        console.log(x7);
        console.log(x8);
        console.log(x9);
    }
    foo();
}

function f2<T, NonNull extends {}>() {
    let x1: number[]; // should error
    let x2: number[] | null; // should error
    let x3: number[] | undefined; // should not error
    let x4: number[] | undefined | null; // should not error
    let x5!: number[]; // should not error
    let x6: any; // should not error
    let x7: unknown; // should not error
    let x8: T; // should error
    let x9: NonNull; // should error

    console.log(x1);
    console.log(x2);
    console.log(x3);
    console.log(x4);
    console.log(x5);
    console.log(x6);
    console.log(x7);
    console.log(x8);
    console.log(x9);
}

function f3() {
    let x: number[];    // should error
    function foo() {
        x.toString();
    }
    foo();
}

function f4() {
    let x: number;  // should error
    return {
        foo() {
            return x.toString();
        }
    };
}

declare let x: number;  // should error
function f5() {
    x.toString();
}
export default {};

