// @ts-check
const path = require("path");
const child_process = require("child_process");
const tsc = require("gulp-typescript");
const Vinyl = require("vinyl");
const { Duplex, Readable } = require("stream");

/**
 * @param {string | undefined} tsConfigFileName
 * @param {tsc.Settings} settings
 * @param {Object} options
 * @param {string} [options.typescript]
 */
function createProject(tsConfigFileName, settings, options) {
    settings = Object.assign({}, settings);
    options = Object.assign({}, options);
    if (settings.typescript) throw new Error();

    const localSettings = Object.assign({}, settings);
    if (options.typescript) {
        options.typescript = path.resolve(options.typescript);
        localSettings.typescript = require(options.typescript);
    }

    const project = tsConfigFileName === undefined ? tsc.createProject(localSettings) : tsc.createProject(tsConfigFileName, localSettings);
    const wrappedProject = /** @type {tsc.Project} */(() => {
        const proc = child_process.fork(require.resolve("./main.js"), [], { 
            // Prevent errors when debugging gulpfile due to the same debug port being passed to forked children.
            execArgv: [] 
        });
        /** @type {Duplex & { js?: Readable, dts?: Readable }} */
        const compileStream = new Duplex({
            objectMode: true,
            read() {},
            /** @param {*} file */
            write(file, _encoding, callback) {
                proc.send({ method: "write", params: { path: file.path, cwd: file.cwd, base: file.base, sourceMap: file.sourceMap }});
                callback();
            },
            final(callback) {
                proc.send({ method: "final" });
                callback();
            }
        });
        const jsStream = compileStream.js = new Readable({
            objectMode: true,
            read() {}
        });
        const dtsStream = compileStream.dts = new Readable({
            objectMode: true,
            read() {}
        });
        proc.send({ method: "createProject", params: { tsConfigFileName, settings, options } });
        proc.on("message", ({ method, params }) => {
            if (method === "write") {
                const file = new Vinyl({
                    path: params.path,
                    cwd: params.cwd,
                    base: params.base,
                    contents: Buffer.from(params.contents, "utf8")
                });
                if (params.sourceMap) file.sourceMap = params.sourceMap
                compileStream.push(file);;
                if (file.path.endsWith(".d.ts")) {
                    dtsStream.push(file);
                }
                else {
                    jsStream.push(file);
                }
            }
            else if (method === "final") {
                compileStream.push(null);
                jsStream.push(null);
                dtsStream.push(null);
                proc.kill();
            }
            else if (method === "error") {
                const error = new Error();
                error.name = params.name;
                error.message = params.message;
                error.stack = params.stack;
                compileStream.emit("error", error);
                proc.kill();
            }
        });
        return /** @type {*} */(compileStream);
    });
    return Object.assign(wrappedProject, project);
}

exports.createProject = createProject;