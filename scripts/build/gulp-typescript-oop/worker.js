// @ts-check
const fs = require("fs");
const tsc = require("gulp-typescript");
const { Readable, Writable } = require("stream");
const protocol = require("./protocol");

/** @type {tsc.Project} */
let project;

/** @type {Readable} */
let inputStream;

/** @type {Writable} */
let outputStream;

/** @type {tsc.CompileStream} */
let compileStream;

process.on("message", (/**@type {protocol.HostMessage}*/ message) => {
    try {
        switch (message.method) {
            case "createProject": {
                const { tsConfigFileName, settings, options } = message.params;
                if (options.typescript) {
                    settings.typescript = require(options.typescript);
                }

                project = tsConfigFileName === undefined
                    ? tsc.createProject(settings)
                    : tsc.createProject(tsConfigFileName, settings);

                inputStream = new Readable({
                    objectMode: true,
                    read() {}
                });

                outputStream = new Writable({
                    objectMode: true,
                    /**
                     * @param {*} file
                     */
                    write(file, _, callback) {
                        process.send(protocol.message.write(file));
                        callback();
                    },
                    final(callback) {
                        process.send(protocol.message.final());
                        callback();
                    }
                });
                compileStream = project({
                    error(error) { process.send(protocol.message.reporter.error(error)); },
                    finish(results) { process.send(protocol.message.reporter.finish(results)); }
                });
                compileStream.on("error", error => {
                    process.send(protocol.message.error(error));
                });
                outputStream.on("error", () => {
                    /* do nothing */
                });
                inputStream.pipe(compileStream).pipe(outputStream);
                break;
            }
            case "write": {
                const file = protocol.vinylFromJson(message.params);
                if (!file.isBuffer()) file.contents = fs.readFileSync(file.path);
                inputStream.push(file);
                break;
            }
            case "final": {
                inputStream.push(null);
                break;
            }
        }
    }
    catch (e) {
        process.send(protocol.message.error(e));
    }
});