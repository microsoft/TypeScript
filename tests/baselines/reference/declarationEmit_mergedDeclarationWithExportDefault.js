//// [declarationEmit_mergedDeclarationWithExportDefault.ts]

class Logger {
  public logLevel = Logger.LogLevel.Info;
}

namespace Logger {
  export enum LogLevel {
    Verbose,
    Info
  }
}


export default Logger;


//// [declarationEmit_mergedDeclarationWithExportDefault.js]
"use strict";
var Logger = (function () {
    function Logger() {
        this.logLevel = Logger.LogLevel.Info;
    }
    return Logger;
}());
var Logger;
(function (Logger) {
    (function (LogLevel) {
        LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
        LogLevel[LogLevel["Info"] = 1] = "Info";
    })(Logger.LogLevel || (Logger.LogLevel = {}));
    var LogLevel = Logger.LogLevel;
})(Logger || (Logger = {}));
exports.__esModule = true;
exports["default"] = Logger;


//// [declarationEmit_mergedDeclarationWithExportDefault.d.ts]
declare class Logger {
    logLevel: default.LogLevel;
}
declare namespace Logger {
    enum LogLevel {
        Verbose = 0,
        Info = 1,
    }
}
export default Logger;


//// [DtsFileErrors]


tests/cases/compiler/declarationEmit_mergedDeclarationWithExportDefault.d.ts(2,15): error TS1110: Type expected.
tests/cases/compiler/declarationEmit_mergedDeclarationWithExportDefault.d.ts(2,22): error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.


==== tests/cases/compiler/declarationEmit_mergedDeclarationWithExportDefault.d.ts (2 errors) ====
    declare class Logger {
        logLevel: default.LogLevel;
                  ~~~~~~~
!!! error TS1110: Type expected.
                         ~
!!! error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
    }
    declare namespace Logger {
        enum LogLevel {
            Verbose = 0,
            Info = 1,
        }
    }
    export default Logger;
    