/// <reference path="node.d.ts" />
/// <reference path="session.ts" />
// used in fs.writeSync
/* tslint:disable:no-null */

namespace ts.server {
    const readline: NodeJS.ReadLine = require("readline");
    const fs: typeof NodeJS.fs = require("fs");

    // TODO: "net" module not defined in local node.d.ts
    const net: any = require("net");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    // Need to write directly to stdout, else rl.write also causes an input "line" event
    // See https://github.com/joyent/node/issues/4243
    let writeHost = (data: string) => process.stdout.write(data);

    // Stubs for I/O
    const onInput = (input: string) => { return; };
    const onClose = () => { return; };

    // Use a socket for comms if defined
    const tss_debug: string = process.env["TSS_DEBUG"];
    let tcp_port = 0;
    if (tss_debug) {
        tss_debug.split(" ").forEach( param => {
            if (param.indexOf("port=") === 0) {
                tcp_port = parseInt(param.substring(5));
            }
        });
        if (tcp_port) {
            net.createServer( (socket: any) => {
                // Called once a connection is made
                socket.setEncoding("utf8");
                // Wire up the I/O handers to the socket
                writeHost = (data: string) => {
                    socket.write(data);
                    return true;
                };
                socket.on("data", (data: string) => {
                    // May get multiple requests in one network read
                    if (data) {
                        data.trim().split(/(\r\n)|\n/).forEach(line => onInput(line));
                    }
                });
                socket.on("end", onClose);

            }).listen(tcp_port);
        }
    }
    if (!tcp_port) {
        // If not using tcp, wire up the I/O handler to stdin/stdout
        rl.on("line", (input: string) => onInput(input));
        rl.on("close", () => onClose());
    }

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
                const prefix = Logger.padStringRight(type + " " + this.seq.toString(), "          ");
                if (this.firstInGroup) {
                    s = prefix + s;
                    this.firstInGroup = false;
                }
                if (!this.inGroup) {
                    this.seq++;
                    this.firstInGroup = true;
                }
                const buf = new Buffer(s);
                fs.writeSync(this.fd, buf, 0, buf.length, null);
            }
        }
    }

    class IOSession extends Session {
        constructor(host: ServerHost, logger: ts.server.Logger) {
            super(host, Buffer.byteLength, process.hrtime, logger);
        }

        exit() {
            this.projectService.log("Exiting...", "Info");
            this.projectService.closeLog();
            process.exit(0);
        }

        listen() {
            rl.on("line", (input: string) => {
                const message = input.trim();
                this.onMessage(message);
            });

            rl.on("close", () => {
                this.exit();
            });
        }
    }

    interface LogOptions {
        file?: string;
        detailLevel?: string;
    }

    function parseLoggingEnvironmentString(logEnvStr: string): LogOptions {
        const logEnv: LogOptions = {};
        const args = logEnvStr.split(" ");
        for (let i = 0, len = args.length; i < (len - 1); i += 2) {
            const option = args[i];
            const value = args[i + 1];
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
        let fileName: string = undefined;
        let detailLevel = "normal";
        const logEnvStr = process.env["TSS_LOG"];
        if (logEnvStr) {
            const logEnv = parseLoggingEnvironmentString(logEnvStr);
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

    const logger = createLoggerFromEnv();

    const pending: string[] = [];
    let canWrite = true;
    function writeMessage(s: string) {
        if (!canWrite) {
            pending.push(s);
        }
        else {
            canWrite = false;
            process.stdout.write(new Buffer(s, "utf8"), setCanWriteFlagAndWriteMessageIfNecessary);
        }
    }

    function setCanWriteFlagAndWriteMessageIfNecessary() {
        canWrite = true;
        if (pending.length) {
            writeMessage(pending.shift());
        }
    }

    // Override sys.write because fs.writeSync is not reliable on Node 4
    ts.sys.write = (s: string) => writeMessage(s);

    const ioSession = new IOSession(ts.sys, logger);
    process.on("uncaughtException", function(err: Error) {
        ioSession.logError(err, "unknown");
    });
    // Start listening
    ioSession.listen();
}