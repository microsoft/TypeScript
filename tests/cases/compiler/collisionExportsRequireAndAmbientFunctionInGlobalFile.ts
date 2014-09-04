declare function exports(): number;
declare function require(): string;
declare module m3 {
    function exports(): string[];
    function require(): number[];
}
module m4 {
    export declare function exports(): string;
    export declare function require(): string;
    var a = 10;
}