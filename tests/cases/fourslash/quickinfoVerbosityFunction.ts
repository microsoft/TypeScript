/// <reference path='fourslash.ts'/>


//// interface Apple {
////     color: string;
////     size: number;
//// }

//// interface Orchard {
////     takeOneApple(a: Apple): void;

////     getApple(): Apple;
////     getApple(size: number): Apple[];
//// }

//// const o/*o*/: Orchard = {} as any;

//// declare function isApple/*f*/(x: unknown): x is Apple;

//// type SomeType = {
////     prop1: string;
//// }
//// function someFun(a: SomeType): SomeType {
////     return a;
//// }
//// someFun/*s*/.what = 'what';


verify.baselineQuickInfo({
    "o": [0, 1, 2],
    "f": [0, 1],
    "s": [0, 1]
});