//@module: amd
export declare function exports(): number;

export declare function require(): string[];
    
declare module m1 {
    function exports(): string;
    function require(): number;
}
module m2 {
    export declare function exports(): string;
    export declare function require(): string[];
    var a = 10;
}