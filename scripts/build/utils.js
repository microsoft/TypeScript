// @ts-check

/* eslint-disable no-restricted-globals */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../types/ambient.d.ts" />

const fs = require("fs");
const path = require("path");
const log = require("fancy-log");
const mkdirp = require("mkdirp");
const del = require("del");
const File = require("vinyl");
const ts = require("../../lib/typescript");
const chalk = require("chalk");
const which = require("which");
const { spawn } = require("child_process");
const { CancellationToken, CancelError, Deferred } = require("prex");
const { Readable, Duplex } = require("stream");

/**
 * Executes the provided command once with the supplied arguments.
 * @param {string} cmd
 * @param {string[]} args
 * @param {ExecOptions} [options]
 *
 * @typedef ExecOptions
 * @property {boolean} [ignoreExitCode]
 * @property {import("prex").CancellationToken} [cancelToken]
 * @property {boolean} [hidePrompt]
 * @property {boolean} [waitForExit=true]
 */
async function exec(cmd, args, options = {}) {
    return /**@type {Promise<{exitCode: number}>}*/(new Promise((resolve, reject) => {
        const { ignoreExitCode, cancelToken = CancellationToken.none, waitForExit = true } = options;
        cancelToken.throwIfCancellationRequested();

        if (!options.hidePrompt) log(`> ${chalk.green(cmd)} ${args.join(" ")}`);
        const proc = spawn(which.sync(cmd), args, { stdio: waitForExit ? "inherit" : "ignore" });
        const registration = cancelToken.register(() => {
            log(`${chalk.red("killing")} '${chalk.green(cmd)} ${args.join(" ")}'...`);
            proc.kill("SIGINT");
            proc.kill("SIGTERM");
            reject(new CancelError());
        });
        if (waitForExit) {
            proc.on("exit", exitCode => {
                registration.unregister();
                if (exitCode === 0 || ignoreExitCode) {
                    resolve({ exitCode });
                }
                else {
                    reject(new Error(`Process exited with code: ${exitCode}`));
                }
            });
            proc.on("error", error => {
                registration.unregister();
                reject(error);
            });
        }
        else {
            proc.unref();
            // wait a short period in order to allow the process to start successfully before Node exits.
            setTimeout(() => resolve({ exitCode: undefined }), 100);
        }
    }));
}
exports.exec = exec;

/**
 * @param {ts.Diagnostic[]} diagnostics
 * @param {{ cwd?: string, pretty?: boolean }} [options]
 */
function formatDiagnostics(diagnostics, options) {
    return options && options.pretty
        ? ts.formatDiagnosticsWithColorAndContext(diagnostics, getFormatDiagnosticsHost(options && options.cwd))
        : ts.formatDiagnostics(diagnostics, getFormatDiagnosticsHost(options && options.cwd));
}
exports.formatDiagnostics = formatDiagnostics;

/**
 * @param {ts.Diagnostic[]} diagnostics
 * @param {{ cwd?: string }} [options]
 */
function reportDiagnostics(diagnostics, options) {
    log(formatDiagnostics(diagnostics, { cwd: options && options.cwd, pretty: process.stdout.isTTY }));
}
exports.reportDiagnostics = reportDiagnostics;

/**
 * @param {string | undefined} cwd
 * @returns {ts.FormatDiagnosticsHost}
 */
function getFormatDiagnosticsHost(cwd) {
    return {
        getCanonicalFileName: fileName => fileName,
        getCurrentDirectory: () => cwd,
        getNewLine: () => ts.sys.newLine,
    };
}
exports.getFormatDiagnosticsHost = getFormatDiagnosticsHost;

/**
 * Reads JSON data with optional comments using the LKG TypeScript compiler
 * @param {string} jsonPath
 */
function readJson(jsonPath) {
    const jsonText = fs.readFileSync(jsonPath, "utf8");
    const result = ts.parseConfigFileTextToJson(jsonPath, jsonText);
    if (result.error) {
        reportDiagnostics([result.error]);
        throw new Error("An error occurred during parse.");
    }
    return result.config;
}
exports.readJson = readJson;

/**
 * @param {File} file
 */
function streamFromFile(file) {
    return file.isBuffer() ? streamFromBuffer(file.contents) :
        file.isStream() ? file.contents :
        fs.createReadStream(file.path, { autoClose: true });
}
exports.streamFromFile = streamFromFile;

/**
 * @param {Buffer} buffer
 */
function streamFromBuffer(buffer) {
    return new Readable({
        read() {
            this.push(buffer);
            // eslint-disable-next-line no-null/no-null
            this.push(null);
        }
    });
}
exports.streamFromBuffer = streamFromBuffer;

/**
 * @param {string | string[]} source
 * @param {string | string[]} dest
 * @returns {boolean}
 */
function needsUpdate(source, dest) {
    if (typeof source === "string" && typeof dest === "string") {
        if (fs.existsSync(dest)) {
            const {mtime: outTime} = fs.statSync(dest);
            const {mtime: inTime} = fs.statSync(source);
            if (+inTime <= +outTime) {
                return false;
            }
        }
    }
    else if (typeof source === "string" && typeof dest !== "string") {
        const {mtime: inTime} = fs.statSync(source);
        for (const filepath of dest) {
            if (fs.existsSync(filepath)) {
                const {mtime: outTime} = fs.statSync(filepath);
                if (+inTime > +outTime) {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        return false;
    }
    else if (typeof source !== "string" && typeof dest === "string") {
        if (fs.existsSync(dest)) {
            const {mtime: outTime} = fs.statSync(dest);
            for (const filepath of source) {
                if (fs.existsSync(filepath)) {
                    const {mtime: inTime} = fs.statSync(filepath);
                    if (+inTime > +outTime) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            return false;
        }
    }
    else if (typeof source !== "string" && typeof dest !== "string") {
        for (let i = 0; i < source.length; i++) {
            if (!dest[i]) {
                continue;
            }
            if (fs.existsSync(dest[i])) {
                const {mtime: outTime} = fs.statSync(dest[i]);
                const {mtime: inTime} = fs.statSync(source[i]);
                if (+inTime > +outTime) {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        return false;
    }
    return true;
}
exports.needsUpdate = needsUpdate;

function getDiffTool() {
    const program = process.env.DIFF;
    if (!program) {
        log.warn("Add the 'DIFF' environment variable to the path of the program you want to use.");
        process.exit(1);
    }
    return program;
}
exports.getDiffTool = getDiffTool;

/**
 * Find the size of a directory recursively.
 * Symbolic links can cause a loop.
 * @param {string} root
 * @returns {number} bytes
 */
function getDirSize(root) {
    const stats = fs.lstatSync(root);

    if (!stats.isDirectory()) {
        return stats.size;
    }

    return fs.readdirSync(root)
        .map(file => getDirSize(path.join(root, file)))
        .reduce((acc, num) => acc + num, 0);
}
exports.getDirSize = getDirSize;

/**
 * Flattens a project with project references into a single project.
 * @param {string} projectSpec The path to a tsconfig.json file or its containing directory.
 * @param {string} flattenedProjectSpec The output path for the flattened tsconfig.json file.
 * @param {FlattenOptions} [options] Options used to flatten a project hierarchy.
 *
 * @typedef FlattenOptions
 * @property {string} [cwd] The path to use for the current working directory. Defaults to `process.cwd()`.
 * @property {import("../../lib/typescript").CompilerOptions} [compilerOptions] Compiler option overrides.
 * @property {boolean} [force] Forces creation of the output project.
 * @property {string[]} [exclude] Files to exclude (relative to `cwd`)
 */
function flatten(projectSpec, flattenedProjectSpec, options = {}) {
    const cwd = normalizeSlashes(options.cwd ? path.resolve(options.cwd) : process.cwd());
    const files = [];
    const resolvedOutputSpec = path.resolve(cwd, flattenedProjectSpec);
    const resolvedOutputDirectory = path.dirname(resolvedOutputSpec);
    const resolvedProjectSpec = resolveProjectSpec(projectSpec, cwd, /*referrer*/ undefined);
    const project = readJson(resolvedProjectSpec);
    const skipProjects = /**@type {Set<string>}*/(new Set());
    const skipFiles = new Set(options && options.exclude && options.exclude.map(file => normalizeSlashes(path.resolve(cwd, file))));
    recur(resolvedProjectSpec, project);

    if (options.force || needsUpdate(files, resolvedOutputSpec)) {
        const config = {
            extends: normalizeSlashes(path.relative(resolvedOutputDirectory, resolvedProjectSpec)),
            compilerOptions: options.compilerOptions || {},
            files: files.map(file => normalizeSlashes(path.relative(resolvedOutputDirectory, file)))
        };
        mkdirp.sync(resolvedOutputDirectory);
        fs.writeFileSync(resolvedOutputSpec, JSON.stringify(config, undefined, 2), "utf8");
    }

    /**
     * @param {string} projectSpec
     * @param {object} project
     */
    function recur(projectSpec, project) {
        if (skipProjects.has(projectSpec)) return;
        skipProjects.add(project);
        if (project.references) {
            for (const ref of project.references) {
                const referencedSpec = resolveProjectSpec(ref.path, cwd, projectSpec);
                const referencedProject = readJson(referencedSpec);
                recur(referencedSpec, referencedProject);
            }
        }
        if (project.include) {
            throw new Error("Flattened project may not have an 'include' list.");
        }
        if (!project.files) {
            throw new Error("Flattened project must have an explicit 'files' list.");
        }
        const projectDirectory = path.dirname(projectSpec);
        for (let file of project.files) {
            file = normalizeSlashes(path.resolve(projectDirectory, file));
            if (skipFiles.has(file)) continue;
            skipFiles.add(file);
            files.push(file);
        }
    }
}
exports.flatten = flatten;

/**
 * @param {string} file
 */
function normalizeSlashes(file) {
    return file.replace(/\\/g, "/");
}

/**
 * @param {string} projectSpec
 * @param {string} cwd
 * @param {string | undefined} referrer
 * @returns {string}
 */
function resolveProjectSpec(projectSpec, cwd, referrer) {
    const projectPath = normalizeSlashes(path.resolve(cwd, referrer ? path.dirname(referrer) : "", projectSpec));
    const stats = fs.statSync(projectPath);
    if (stats.isFile()) return normalizeSlashes(projectPath);
    return normalizeSlashes(path.resolve(cwd, projectPath, "tsconfig.json"));
}

/**
 * @param {string | ((file: File) => string) | { cwd?: string }} [dest]
 * @param {{ cwd?: string }} [opts]
 */
function rm(dest, opts) {
    if (dest && typeof dest === "object") {
        opts = dest;
        dest = undefined;
    }
    let failed = false;

    const cwd = path.resolve(opts && opts.cwd || process.cwd());

    /** @type {{ file: File, deleted: boolean, promise: Promise<any>, cb: Function }[]} */
    const pending = [];

    const processDeleted = () => {
        if (failed) return;
        while (pending.length && pending[0].deleted) {
            const { file, cb } = pending.shift();
            duplex.push(file);
            cb();
        }
    };

    const duplex = new Duplex({
        objectMode: true,
        /**
         * @param {string|Buffer|File} file
         */
        write(file, _, cb) {
            if (failed) return;
            if (typeof file === "string" || Buffer.isBuffer(file)) return cb(new Error("Only Vinyl files are supported."));
            const basePath = typeof dest === "string" ? path.resolve(cwd, dest) :
                typeof dest === "function" ? path.resolve(cwd, dest(file)) :
                file.base;
            const filePath = path.resolve(basePath, file.relative);
            file.cwd = cwd;
            file.base = basePath;
            file.path = filePath;
            const entry = {
                file,
                deleted: false,
                cb,
                promise: del(file.path).then(() => {
                    entry.deleted = true;
                    processDeleted();
                }, err => {
                    failed = true;
                    pending.length = 0;
                    cb(err);
                })
            };
            pending.push(entry);
        },
        final(cb) {
            // eslint-disable-next-line no-null/no-null
            const endThenCb = () => (duplex.push(null), cb()); // signal end of read queue
            processDeleted();
            if (pending.length) {
                Promise
                    .all(pending.map(entry => entry.promise))
                    .then(() => processDeleted())
                    .then(() => endThenCb(), endThenCb);
                return;
            }
            endThenCb();
        },
        read() {
        }
    });
    return duplex;
}
exports.rm = rm;

class Debouncer {
    /**
     * @param {number} timeout
     * @param {() => Promise<any>} action
     */
    constructor(timeout, action) {
        this._timeout = timeout;
        this._action = action;
    }

    enqueue() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = undefined;
        }

        if (!this._deferred) {
            this._deferred = new Deferred();
        }

        this._timer = setTimeout(() => this.run(), 100);
        return this._deferred.promise;
    }

    run() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = undefined;
        }

        const deferred = this._deferred;
        this._deferred = undefined;
        this._projects = undefined;
        try {
            deferred.resolve(this._action());
        }
        catch (e) {
            deferred.reject(e);
        }
    }
}
exports.Debouncer = Debouncer;
