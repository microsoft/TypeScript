/// <reference path="..\compiler\types.ts"/>

var ActiveXObject: { new(...args: any[]): any }

module WScript {
    export module Arguments {
        export function Item(n: number): any {
            throw new Error("NYI");
        }
        export var length: number = 0;
    }

    export module StdOut {
        export function Write(s: string): void {
        }
    }

    export var FileName: string = "tsc.js";
    export var ScriptFullName: string = "tsc.js";

    export function Quit(n: number): void {
    }
}