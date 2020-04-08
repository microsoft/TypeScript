//// [overloadResolutionWithAny.ts]
var func: {
    (s: string): number;
    (s: any): string;
};

func(""); // number
func(3); // string
var x: any;
func(x); // string

var func2: {
    (s: string, t: string): number;
    (s: any, t: string): boolean;
    (s: string, t: any): RegExp;
    (s: any, t: any): string;
}

func2(x, x); // string
func2("", ""); // number
func2(x, ""); // boolean
func2("", x); // RegExp

//// [overloadResolutionWithAny.js]
var func;
func(""); // number
func(3); // string
var x;
func(x); // string
var func2;
func2(x, x); // string
func2("", ""); // number
func2(x, ""); // boolean
func2("", x); // RegExp
