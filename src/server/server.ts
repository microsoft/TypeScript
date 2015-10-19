/// <reference path="node.d.ts" />
/// <reference path="session.ts" />

namespace ts.server {
    var nodeproto: typeof NodeJS._debugger = require('_debugger');
    var readline: NodeJS.ReadLine = require('readline');
    var path: NodeJS.Path = require('path');
    var fs: typeof NodeJS.fs = require('fs');

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });  

    class Logger implements ts.server.Logger {
        fd = -1;
        seq = 0;
        inGroup = false;
        firstInGroup = true;

        constructor(public logFilename: string, public level: string) {
        }

        static padStringRight(str: string, padding: string) {
            return (str + padding).slice(0, padding.length);
        }

        close() {
            if (this.fd >= 0) {
                fs.close(this.fd);
            }
        }

        perftrc(s: string) {
            this.msg(s, "Perf");
        }

        info(s: string) {
            this.msg(s, "Info");
        }

        startGroup() {
            this.inGroup = true;
            this.firstInGroup = true;
        }

        endGroup() {
            this.inGroup = false;
            this.seq++;
            this.firstInGroup = true;
        }

        loggingEnabled() {
            return !!this.logFilename;
        }

        isVerbose() {
            return this.loggingEnabled() && (this.level == "verbose");
        }
        

        msg(s: string, type = "Err") {
            if (this.fd < 0) {
                if (this.logFilename) {
                    this.fd = fs.openSync(this.logFilename, "w");
                }
            }
            if (this.fd >= 0) {
                s = s + "\n";
                var prefix = Logger.padStringRight(type + " " + this.seq.toString(), "          ");
                if (this.firstInGroup) {
                    s = prefix + s;
                    this.firstInGroup = false;
                }
                if (!this.inGroup) {
                    this.seq++;
                    this.firstInGroup = true;
                }
                var buf = new Buffer(s);
                fs.writeSync(this.fd, buf, 0, buf.length, null);
            }
        }
    }

    class IOSession extends Session {
        constructor(host: ServerHost, logger: ts.server.Logger) {
            super(host, Buffer.byteLength, process.hrtime, logger);
        }

        exit() {
            this.projectService.log("Exiting...","Info");
            this.projectService.closeLog();
            process.exit(0);
        }

        listen() {
            rl.on('line',(input: string) => {
                var message = input.trim();
                this.onMessage(message);
            });

            rl.on('close',() => {
                this.exit();
            });
        }
    }

    interface LogOptions {
        file?: string;
        detailLevel?: string;
    }

    function parseLoggingEnvironmentString(logEnvStr: string): LogOptions {
        var logEnv: LogOptions = {};
        var args = logEnvStr.split(' ');
        for (var i = 0, len = args.length; i < (len - 1); i += 2) {
            var option = args[i];
            var value = args[i + 1];
            if (option && value) {
                switch (option) {
                    case "-file":
                        logEnv.file = value;
                        break;
                    case "-level":
                        logEnv.detailLevel = value;
                        break;
                }
            }
        }
        return logEnv;
    }

    // TSS_LOG "{ level: "normal | verbose | terse", file?: string}"
    function createLoggerFromEnv() {
        var fileName: string = undefined;
        var detailLevel = "normal";
        var logEnvStr = process.env["TSS_LOG"];
        if (logEnvStr) {
            var logEnv = parseLoggingEnvironmentString(logEnvStr);
            if (logEnv.file) {
                fileName = logEnv.file;
            }
            else {
                fileName = __dirname + "/.log" + process.pid.toString();
            }
            if (logEnv.detailLevel) {
                detailLevel = logEnv.detailLevel;
            }
        }
        return new Logger(fileName, detailLevel);
    }
    // This places log file in the directory containing editorServices.js
    // TODO: check that this location is writable

    var logger = createLoggerFromEnv();

    var ioSession = new IOSession(ts.sys, logger);
    process.on('uncaughtException', function(err: Error) {
        ioSession.logError(err, "unknown");
    });
    // Start listening
    ioSession.listen();
}