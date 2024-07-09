module A {
    export enum Color { Red, Blue }
    enum Day { Monday, Tuesday }
}

// not an error since exported
var a: A.Color = A.Color.Red;

// error not exported
var b = A.Day.Monday;
