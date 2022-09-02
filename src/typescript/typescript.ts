import * as ts from "./_namespaces/ts";
import { Debug, LogLevel } from "./_namespaces/ts";

// TODO(jakebailey): replace const enum with enum in d.ts

// enable deprecation logging
declare const console: any;
if (typeof console !== "undefined") {
    Debug.loggingHost = {
        log(level, s) {
            switch (level) {
                case LogLevel.Error: return console.error(s);
                case LogLevel.Warning: return console.warn(s);
                case LogLevel.Info: return console.log(s);
                case LogLevel.Verbose: return console.log(s);
            }
        }
    };
}

export = ts;
