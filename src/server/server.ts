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
        protocol: NodeJS._debugger.Protocol;

        constructor(host: ServerHost, logger: ts.server.Logger, useProtocol: boolean, prettyJSON: boolean) {
            super(host, logger, useProtocol, prettyJSON);
            if (useProtocol) {
                this.initProtocol();
            }
        }

        initProtocol() {
            this.protocol = new nodeproto.Protocol();
            // note: onResponse was named by nodejs authors; we are re-purposing the Protocol
            // class in this case so that it supports a server instead of a client
            this.protocol.onResponse = (pkt) => {
                this.handleRequest(pkt);
            };
        }

        handleRequest(req: NodeJS._debugger.Packet) {
            this.projectService.log("Got JSON msg:\n" + req.raw);
        }

        listen() {
            rl.on('line',(input: string) => {
                var cmd = input.trim();
                if (cmd.indexOf("{") == 0) {
                    // assumption is JSON on single line
                    // plan is to also carry this protocol
                    // over tcp, in which case JSON would
                    // have a Content-Length header
                    this.executeJSONcmd(cmd);
                }
                else {
                    this.executeCmd(cmd);
                }
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

    var host: ServerHost = ts.sys;

    // Wire the debugging interface
    if (!host.getDebuggerClient) {
        host.getDebuggerClient = () => new nodeproto.Client();
    }

    // Start listening
    new IOSession(host, logger, /* useProtocol */ true, /* prettyJSON */ false).listen();
}