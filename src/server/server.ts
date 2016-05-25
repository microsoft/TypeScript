/// <reference path="node.d.ts" />
/// <reference path="session.ts" />
// used in fs.writeSync
/* tslint:disable:no-null-keyword */

namespace ts.server {
    const readline: NodeJS.ReadLine = require("readline");
    const fs: typeof NodeJS.fs = require("fs");

    const rl = readline.createInterface({
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

    // average async stat takes about 30 microseconds
    // set chunk size to do 30 files in < 1 millisecond
    function createPollingWatchedFileSet(interval = 2500, chunkSize = 30) {
        let watchedFiles: WatchedFile[] = [];
        let nextFileToCheck = 0;
        let watchTimer: any;

        function getModifiedTime(fileName: string): Date {
            return fs.statSync(fileName).mtime;
        }

        function poll(checkedIndex: number) {
            const watchedFile = watchedFiles[checkedIndex];
            if (!watchedFile) {
                return;
            }

            fs.stat(watchedFile.fileName, (err: any, stats: any) => {
                if (err) {
                    watchedFile.callback(watchedFile.fileName);
                }
                else if (watchedFile.mtime.getTime() !== stats.mtime.getTime()) {
                    watchedFile.mtime = getModifiedTime(watchedFile.fileName);
                    watchedFile.callback(watchedFile.fileName, watchedFile.mtime.getTime() === 0);
                }
            });
        }

        // this implementation uses polling and
        // stat due to inconsistencies of fs.watch
        // and efficiency of stat on modern filesystems
        function startWatchTimer() {
            watchTimer = setInterval(() => {
                let count = 0;
                let nextToCheck = nextFileToCheck;
                let firstCheck = -1;
                while ((count < chunkSize) && (nextToCheck !== firstCheck)) {
                    poll(nextToCheck);
                    if (firstCheck < 0) {
                        firstCheck = nextToCheck;
                    }
                    nextToCheck++;
                    if (nextToCheck === watchedFiles.length) {
                        nextToCheck = 0;
                    }
                    count++;
                }
                nextFileToCheck = nextToCheck;
            }, interval);
        }

        function addFile(fileName: string, callback: FileWatcherCallback): WatchedFile {
            const file: WatchedFile = {
                fileName,
                callback,
                mtime: getModifiedTime(fileName)
            };

            watchedFiles.push(file);
            if (watchedFiles.length === 1) {
                startWatchTimer();
            }
            return file;
        }

        function removeFile(file: WatchedFile) {
            watchedFiles = copyListRemovingItem(file, watchedFiles);
        }

        return {
            getModifiedTime: getModifiedTime,
            poll: poll,
            startWatchTimer: startWatchTimer,
            addFile: addFile,
            removeFile: removeFile
        };
    }

    // REVIEW: for now this implementation uses polling.
    // The advantage of polling is that it works reliably
    // on all os and with network mounted files.
    // For 90 referenced files, the average time to detect
    // changes is 2*msInterval (by default 5 seconds).
    // The overhead of this is .04 percent (1/2500) with
    // average pause of < 1 millisecond (and max
    // pause less than 1.5 milliseconds); question is
    // do we anticipate reference sets in the 100s and
    // do we care about waiting 10-20 seconds to detect
    // changes for large reference sets? If so, do we want
    // to increase the chunk size or decrease the interval
    // time dynamically to match the large reference set?
    const pollingWatchedFileSet = createPollingWatchedFileSet();
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

    const sys = <ServerHost>ts.sys;

    // Override sys.write because fs.writeSync is not reliable on Node 4
    sys.write = (s: string) => writeMessage(s);
    sys.watchFile = (fileName, callback) => {
        const watchedFile = pollingWatchedFileSet.addFile(fileName, callback);
        return {
            close: () => pollingWatchedFileSet.removeFile(watchedFile)
        };
    };

    sys.setTimeout = setTimeout;
    sys.clearTimeout = clearTimeout;

    const ioSession = new IOSession(sys, logger);
    process.on("uncaughtException", function(err: Error) {
        ioSession.logError(err, "unknown");
    });
    // Start listening
    ioSession.listen();
}