 interface IArguments {}

 declare namespace M {
    export function RegExp(pattern: string): RegExp;
    export function RegExp(pattern: string, flags: string): RegExp;
    export class RegExp {
        constructor(pattern: string);
        constructor(pattern: string, flags: string);
        exec(string: string): string[];
        test(string: string): boolean;
        source: string;
        global: boolean;
        ignoreCase: boolean;
        multiline: boolean;
        lastIndex: boolean;
    }
}
