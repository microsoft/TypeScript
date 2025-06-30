// @declaration: true
declare const x: string;
declare const y: "y";

export class Test {
    [x] = 10;
    [y] = 10;
}