// @target: ES6

type FuncType = (x: <T>(p: T) => T) => typeof x;

function tempTag1<T>(templateStrs: TemplateStringsArray, f: FuncType, x: T): T;
function tempTag1<T>(templateStrs: TemplateStringsArray, f: FuncType, h: FuncType, x: T): T;
function tempTag1<T>(...rest: any[]): T {
    return undefined;
}

// If contextual typing takes place, these functions should work.
// Otherwise, the arrow functions' parameters will be typed as 'any',
// and it is an error to invoke an any-typed value with type arguments,
// so this test will error.
tempTag1 `${ x => { x<number>(undefined); return x; }                   }${ 10 }`;
tempTag1 `${ x => { x<number>(undefined); return x; }                   }${ y => { y<number>(undefined); return y; }                  }${ 10 }`;
tempTag1 `${ x => { x<number>(undefined); return x; }                   }${ (y: <T>(p: T) => T) => { y<number>(undefined); return y } }${ undefined }`;
tempTag1 `${ (x: <T>(p: T) => T) => { x<number>(undefined); return x; } }${ y => { y<number>(undefined); return y; }                  }${ undefined }`;
