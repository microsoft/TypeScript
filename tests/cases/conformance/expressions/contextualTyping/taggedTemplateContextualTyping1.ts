// @target: ES6

function tempTag1<T>(templateStrs: TemplateStringsArray, f: (x: T) => T, x: T): T;
function tempTag1<T>(templateStrs: TemplateStringsArray, f: (x: T) => T, h: (y: T) => T, x: T): T;
function tempTag1<T>(...rest: any[]): T {
    return undefined;
}

tempTag1 `${ x => x }${ 10 }`;
tempTag1 `${ x => x }${ y => y }${ 10 }`;
tempTag1 `${ x => x }${ (y: number) => y }${ undefined }`;
tempTag1 `${ (x: number) => x }${ y => y }${ undefined }`;
