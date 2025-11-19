//@module: commonjs
export declare function exports(): number;

export declare function require(): string[];
    
declare namespace m1 {
    function exports(): string;
    function require(): number;
}
namespace m2 {
    export declare function exports(): string;
    export declare function require(): string[];
    var a = 10;
}