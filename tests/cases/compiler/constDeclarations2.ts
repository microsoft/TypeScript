// @target: ES6
// @declaration: true

// No error
module M {
    export const c1 = false;
    export const c2: number = 23;
    export const c3 = 0, c4 :string = "", c5 = null;
}
