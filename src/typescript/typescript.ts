import {
    Debug,
} from "./_namespaces/ts";
import * as ts from "./_namespaces/ts";

// enable deprecation logging
declare const console: any;
if (typeof console !== "undefined") {
    Debug.setLoggingHost({
        log(level, s) {
            switch (level) {
                case ts.Debug.LogLevel.Error: return console.error(s);
                case ts.Debug.LogLevel.Warning: return console.warn(s);
                case ts.Debug.LogLevel.Info: return console.log(s);
                case ts.Debug.LogLevel.Verbose: return console.log(s);
            }
        }
    });
}

export = ts;
