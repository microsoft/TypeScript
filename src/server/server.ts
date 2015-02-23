/// <reference path="node.d.ts" />
/// <reference path="session.ts" />

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

    interface WatchedFile {
        fileName: string;
        callback: (fileName: string) => void;
        mtime: Date;
    }

    class WatchedFileSet {
        private watchedFiles: WatchedFile[] = [];
        private nextFileToCheck = 0;
        private watchTimer: NodeJS.Timer;
        private static fileDeleted = 34;

        // average async stat takes about 30 microseconds
        // set chunk size to do 30 files in < 1 millisecond
        constructor(public interval = 2500, public chunkSize = 30) {
        }

        private static copyListRemovingItem<T>(item: T, list: T[]) {
            var copiedList: T[] = [];
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i] != item) {
                    copiedList.push(list[i]);
                }
            }
            return copiedList;
        }

        private static getModifiedTime(fileName: string): Date {
            return fs.statSync(fileName).mtime;
        }

        private poll(checkedIndex: number) {
            var watchedFile = this.watchedFiles[checkedIndex];
            if (!watchedFile) {
                return;
            }

            fs.stat(watchedFile.fileName,(err, stats) => {
                if (err) {
                    var msg = err.message;
                    if (err.errno) {
                        msg += " errno: " + err.errno.toString();
                    }
                    if (err.errno == WatchedFileSet.fileDeleted) {
                        watchedFile.callback(watchedFile.fileName);
                    }
                }
                else if (watchedFile.mtime.getTime() != stats.mtime.getTime()) {
                    watchedFile.mtime = WatchedFileSet.getModifiedTime(watchedFile.fileName);
                    watchedFile.callback(watchedFile.fileName);
                }
            });
        }

        // this implementation uses polling and
        // stat due to inconsistencies of fs.watch
        // and efficiency of stat on modern filesystems
        private startWatchTimer() {
            this.watchTimer = setInterval(() => {
                var count = 0;
                var nextToCheck = this.nextFileToCheck;
                var firstCheck = -1;
                while ((count < this.chunkSize) && (nextToCheck != firstCheck)) {
                    this.poll(nextToCheck);
                    if (firstCheck < 0) {
                        firstCheck = nextToCheck;
                    }
                    nextToCheck++;
                    if (nextToCheck === this.watchedFiles.length) {
                        nextToCheck = 0;
                    }
                    count++;
                }
                this.nextFileToCheck = nextToCheck;
            }, this.interval);
        }

        addFile(fileName: string, callback: (fileName: string) => void ): WatchedFile {
            var file: WatchedFile = {
                fileName,
                callback,
                mtime: WatchedFileSet.getModifiedTime(fileName)
            };

            this.watchedFiles.push(file);
            if (this.watchedFiles.length === 1) {
                this.startWatchTimer();
            }
            return file;
        }

        removeFile(file: WatchedFile) {
            this.watchedFiles = WatchedFileSet.copyListRemovingItem(file, this.watchedFiles);
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
    var watchedFileSet = new WatchedFileSet();
    ts.sys.watchFile = function (fileName, callback) {
        var watchedFile = watchedFileSet.addFile(fileName, callback);
        return {
            close: () => watchedFileSet.removeFile(watchedFile)
        }

    };

    // Start listening
    new IOSession(ts.sys, logger).listen();
}