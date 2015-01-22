/// <reference path="..\compiler\types.ts"/>

var ActiveXObject: { new(...args: any[]): any }

module WScript {
    var fso: any = new ActiveXObject("Scripting.FileSystemObject");
    var stdout = fso.GetStandardStream(1);
    export module Arguments {
        export function Item(n: number): any {
            throw new Error("NYI");
        }
        export var length: number = 0;
    }

    export module StdOut {
        export function Write(s: string): void {
            stdout.Write(s);
        }
    }

    export var FileName: string = "tsc.js";
    export var ScriptFullName: string = "tsc.js";

    export function Quit(n: number): void {
    }
}