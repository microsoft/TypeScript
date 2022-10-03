module M {
    export interface I {
        salt:number;
        pepper:number;
    }

    export function f(i:I) {
    }

    f({salt:2,pepper:0});
}
