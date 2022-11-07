/* @internal */
namespace ts {
// enable deprecation logging
declare const console: any;
if (typeof console !== "undefined") {
    ts.Debug.loggingHost = {
        log(level, s) {
            switch (level) {
                case ts.LogLevel.Error: return console.error(s);
                case ts.LogLevel.Warning: return console.warn(s);
                case ts.LogLevel.Info: return console.log(s);
                case ts.LogLevel.Verbose: return console.log(s);
            }
        }
    };
}
}
