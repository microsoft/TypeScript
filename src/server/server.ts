/// <reference path="node.d.ts" />
/// <reference path="protocol.ts" />

module ts.server {
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

        constructor(public logFilename: string) {
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

        msg(s: string, type = "Err") {
            if (this.fd < 0) {
                this.fd = fs.openSync(this.logFilename, "w");
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
            super(host, logger);
        }

        listen() {
            rl.on('line',(input: string) => {
                var message = input.trim();
                this.onMessage(message);
            });

            rl.on('close',() => {
                this.projectService.closeLog();
                this.projectService.log("Exiting...");
                process.exit(0);
            });
        }
    }

    // This places log file in the directory containing editorServices.js
    // TODO: check that this location is writable
    var logger = new Logger(__dirname + "/.log" + process.pid.toString());

    // Start listening
    new IOSession(ts.sys, logger).listen();
}