import * as Debug from "../compiler/debug";
import * as ts from "./_namespaces/ts";

// enable deprecation logging
declare const console: any;

if (typeof console !== "undefined") {
    Debug.setLoggingHost({
        log(level, s) {
            switch (level) {
                case Debug.LogLevel.Error: return console.error(s);
                case Debug.LogLevel.Warning: return console.warn(s);
                case Debug.LogLevel.Info: return console.log(s);
                case Debug.LogLevel.Verbose: return console.log(s);
            }
        }
    });
}

export = ts;
