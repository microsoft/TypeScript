/// <reference path="..\compiler\types.ts"/>

var ActiveXObject: { new(...args: any[]): any }

declare module WScript {
    export module Arguments {
        export function Item(n: number): any;
        export var length: number;
    }

    export module StdOut {
        export function Write(s: string): void;
    }

    export var FileName: string;
    export var ScriptFullName: string;

    export function Quit(n: number): void;
}