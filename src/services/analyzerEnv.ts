/// <reference path="..\compiler\types.ts"/>

var ActiveXObject: { new(...args: any[]): any }

declare module Intl {
    interface CollatorOptions {
        usage?: string;
        localeMatcher?: string;
        numeric?: boolean;
        caseFirst?: string;
        sensitivity?: string;
        ignorePunctuation?: boolean;
    }
}

interface String {
    /**
      * Determines whether two strings are equivalent in the current locale.
      * @param that String to compare to target string
      * @param locales An array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
      * @param options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.
      */
    localeCompare(that: string, locales: string[], options?: Intl.CollatorOptions): number;

    /**
      * Determines whether two strings are equivalent in the current locale.
      * @param that String to compare to target string
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
      * @param options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.
      */
    localeCompare(that: string, locale: string, options?: Intl.CollatorOptions): number;
}

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