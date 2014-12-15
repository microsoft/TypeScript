// @target: ES6

function tempTag2(templateStrs: TemplateStringsArray, f: (x: number) => number, x: number): number;
function tempTag2(templateStrs: TemplateStringsArray, f: (x: string) => string, h: (y: string) => string, x: string): string;
function tempTag2(...rest: any[]): any {
    return undefined;
}

tempTag2 `${ x => x }${ 0 }`;
tempTag2 `${ x => x }${ y => y }${ "hello" }`;
tempTag2 `${ x => x }${ 0 }`;