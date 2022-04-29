//// [assignFromStringInterface2.ts]
interface String {
    doStuff(): string;
}

interface NotString {
    doStuff(): string;
    toString(): string;
    charAt(pos: number): string;
    charCodeAt(index: number): number;
    concat(...strings: string[]): string;
    indexOf(searchString: string, position?: number): number;
    lastIndexOf(searchString: string, position?: number): number;
    localeCompare(that: string): number;
    match(regexp: string): string[];
    match(regexp: RegExp): string[];
    replace(searchValue: string, replaceValue: string): string;
    replace(searchValue: string, replaceValue: (substring: string, ...args: any[]) => string): string;
    replace(searchValue: RegExp, replaceValue: string): string;
    replace(searchValue: RegExp, replaceValue: (substring: string, ...args: any[]) => string): string;
    search(regexp: string): number;
    search(regexp: RegExp): number;
    slice(start?: number, end?: number): string;
    split(separator: string, limit?: number): string[];
    split(separator: RegExp, limit?: number): string[];
    substring(start: number, end?: number): string;
    toLowerCase(): string;
    toLocaleLowerCase(): string;
    toUpperCase(): string;
    toLocaleUpperCase(): string;
    trim(): string;
    length: number;
    substr(from: number, length?: number): string;
    valueOf(): string;
    [index: number]: string;
}

var x = '';
var a: String;
var b: NotString;

a = x; 
a = b; 

b = a; 
b = x; 

x = a; // expected error
x = b; // expected error



//// [assignFromStringInterface2.js]
var x = '';
var a;
var b;
a = x;
a = b;
b = a;
b = x;
x = a; // expected error
x = b; // expected error
