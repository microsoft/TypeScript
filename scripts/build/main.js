// @ts-check
const path = require("path");
const fs = require("fs");
const tsc = require("gulp-typescript");
const Vinyl = require("vinyl");
const { Readable, Writable } = require("stream");

/** @type {tsc.Project} */
let project;

/** @type {Readable} */
let inputStream;

/** @type {Writable} */
let outputStream;

/** @type {tsc.CompileStream} */
let compileStream;

process.on("message", ({ method, params }) => {
    try {
        if (method === "createProject") {
            const { tsConfigFileName, settings, options } = params;
            if (options.typescript) {
                settings.typescript = require(options.typescript);
            }
            project = tsc.createProject(tsConfigFileName, settings);
            inputStream = new Readable({
                objectMode: true,
                read() {}
            });
            outputStream = new Writable({
                objectMode: true,
                /**
                 * @param {*} file
                 */
                write(file, encoding, callback) {
                    process.send({
                        method: "write",
                        params: {
                            path: file.path,
                            cwd: file.cwd,
                            base: file.base,
                            contents: file.contents.toString(),
                            sourceMap: file.sourceMap
                        }
                    });
                    callback();
                },
                final(callback) {
                    process.send({ method: "final" });
                    callback();
                }
            });
            outputStream.on("error", error => {
                process.send({
                    method: "error",
                    params: {
                        name: error.name,
                        message: error.message,
                        stack: error.stack
                    }
                });
            });
            compileStream = project();
            inputStream.pipe(compileStream).pipe(outputStream);
        }
        else if (method === "write") {
            const file = new Vinyl({
                path: params.path,
                cwd: params.cwd,
                base: params.base
            });
            file.contents = fs.readFileSync(file.path);
            inputStream.push(/** @type {*} */(file));
        }
        else if (method === "final") {
            inputStream.push(null);
        }
    }
    catch (e) {
        process.send({
            method: "error",
            params: {
                name: e.name,
                message: e.message,
                stack: e.stack
            }
        });
    }
});