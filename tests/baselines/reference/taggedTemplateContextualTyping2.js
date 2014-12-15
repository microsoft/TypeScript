//// [taggedTemplateContextualTyping2.ts]

function tempTag2(templateStrs: TemplateStringsArray, f: (x: number) => number, x: number): number;
function tempTag2(templateStrs: TemplateStringsArray, f: (x: string) => string, h: (y: string) => string, x: string): string;
function tempTag2(...rest: any[]): any {
    return undefined;
}

tempTag2 `${ x => x }${ 0 }`;
tempTag2 `${ x => x }${ y => y }${ "hello" }`;
tempTag2 `${ x => x }${ 0 }`;

//// [taggedTemplateContextualTyping2.js]
function tempTag2() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i - 0] = arguments[_i];
    }
    return undefined;
}
tempTag2 `${function (x) { return x; }}${0}`;
tempTag2 `${function (x) { return x; }}${function (y) { return y; }}${"hello"}`;
tempTag2 `${function (x) { return x; }}${0}`;
