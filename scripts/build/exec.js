// @ts-check
const { Duplex } = require("stream");
const cp = require("child_process");
const Vinyl = require("vinyl");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
const isWin = /^win/.test(process.platform);
const { addColor, color } = require("./colors");
module.exports = exports = exec;

/**
 * Execute the provided command
 * @param {string} cmd
 * @param {(string|ExecArg)[]} args
 */
function exec(cmd, args) {
    switch (getArity(args)) {
        case "one": return execEach(cmd, /**@type {(string|ExecArgEach)[]}*/(args));
        case "many": return execAll(cmd, /**@type {(string|ExecArgAll)[]}*/(args));
        case "underspecified": throw new Error("Supplied arguments do not specify input file arity.")
        case "overspecified": throw new Error("Supplied arguments have a conflicting arity.");
    }
}
exports.exec = exec;

/**
 * Executes the provided command once with the supplied arguments.
 * @param {string} cmd
 * @param {string[]} args
 * @param {object} [options]
 * @param {boolean} [options.ignoreExitCode]
 */
function execAsync(cmd, args, options = {}) {
    switch (getArity(args)) {
        case "underspecified": break;
        case "one": break;
        case "many":
        case "overspecified": throw new Error("Supplied arguments have the wrong arity.");
    }

    return /**@type {Promise<{exitCode: number}>}*/(new Promise((resolve, reject) => {
        log(addColor(`${cmd} ${args.join(" ")}`, color.gray));
        // TODO (weswig): Update child_process types to add windowsVerbatimArguments to the type definition
        const subshellFlag = isWin ? "/c" : "-c";
        const command = isWin ? [possiblyQuote(cmd), ...args] : [`${cmd} ${args.join(" ")}`];
        const ex = cp.spawn(isWin ? "cmd" : "/bin/sh", [subshellFlag, ...command], { stdio: "inherit", windowsVerbatimArguments: true });
        ex.on("exit", exitCode => {
            if (exitCode === 0 || options.ignoreExitCode) {
                resolve({ exitCode });
            }
            else {
                reject(new Error(`Process exited with code: ${exitCode}`));
            }
        });
        ex.on("error", reject);
    }));
}
exports.execAsync = execAsync;

/**
 * Execute the provided command once for each input file.
 * @param {string} cmd
 * @param {(string|ExecArgEach)[]} args
 */
function execEach(cmd, args) {
    switch (getArity(args)) {
        case "one": break;
        case "underspecified": 
            args = [...args, each.path];
            break;

        case "many":
        case "overspecified": throw new Error("Supplied arguments have the wrong arity.");
    }

    const duplex = new Duplex({
        objectMode: true,
        /**
         * @param {string|Buffer|File} file
         * @param {(err?: Error) => void} cb
         */
        write(file, _, cb) {
            if (!Vinyl.isVinyl(file)) throw new Error();
            execAsync(cmd, getExecArgs(args, [file])).then(() => cb(), cb);
        },
        final(cb) {
            duplex.push(null);
            cb();
        },
        read() {
        }
    });

    return duplex;
}
exports.execEach = execEach;

/**
 * Execute the provided command once for all input files.
 * @param {string} cmd
 * @param {(string|ExecArgAll)[]} args
 */
function execAll(cmd, args) {
    switch (getArity(args)) {
        case "many": break;
        case "underspecified": 
            args = [...args, all.path];
            break;

        case "one":
        case "overspecified": throw new Error("Supplied arguments have the wrong arity.");
    }

    /** @type {File[]} */
    const files = [];
    const duplex = new Duplex({
        objectMode: true,
        /**
         * @param {string|Buffer|File} file
         * @param {(err?: Error) => void} cb
         */
        write(file, _, cb) {
            if (!Vinyl.isVinyl(file)) throw new Error();
            files.push(file);
            cb();
        },
        final(cb) {
            execAsync(cmd, getExecArgs(args, files)).then(() => {
                duplex.push(null);
                cb();
            }, cb);
        },
        read() {
        }
    });

    return duplex;
}
exports.execAll = execAll;

/**
 * @param {(string|ExecArg)[]} args
 * @param {File[]} files
 */
function getExecArgs(args, files) {
    /**@type {string[]}*/
    let execArgs = [];
    for (const arg of args) {
        if (typeof arg === "object" && isExecArg(arg)) {
            const kind = arg.kind;
            execArgs = execArgs.concat(files.map(file => file[kind]));
        }
        else {
            execArgs.push("" + arg);
        }
    }
    return execArgs;
}

/**
 * @param {string} cmd
 */
function possiblyQuote(cmd) {
    return cmd.indexOf(" ") >= 0 ? `"${cmd}"` : cmd;
}

class ExecArgBase {
    /**
     * @param {ExecArgKind} kind
     */
    constructor(kind) {
        this.kind = kind;
    }
}

class ExecArgEach extends ExecArgBase {
    /**
     * @param {ExecArgKind} kind
     */
    constructor(kind) {
        super(kind);
        /** @type {"one"} */
        this.arity = "one";
        Object.freeze(this);
    }
}

class ExecArgAll extends ExecArgBase {
    /**
     * @param {ExecArgKind} kind
     */
    constructor(kind) {
        super(kind);
        /** @type {"many"} */
        this.arity = "many";
        Object.freeze(this);
    }
}

const each = exports.each = Object.freeze({
    path: new ExecArgEach("path"),
    dirname: new ExecArgEach("dirname"),
    basename: new ExecArgEach("basename"),
    extname: new ExecArgEach("extname"),
});

const all = exports.all = Object.freeze({
    path: new ExecArgAll("path"),
    dirname: new ExecArgAll("dirname"),
    basename: new ExecArgAll("basename"),
    extname: new ExecArgAll("extname"),
});

/**
 * @param {string|ExecArg} arg 
 */
function isExecArg(arg) {
    return !!arg && typeof arg === "object" && "kind" in arg;
}

/**
 * @param {string|ExecArg} arg 
 */
function isExecArgOne(arg) {
    return !!arg && typeof arg === "object" && "kind" in arg && arg.arity === "one";
}

/**
 * @param {string|ExecArg} arg 
 */
function isExecArgMany(arg) {
    return !!arg && typeof arg === "object" && "kind" in arg && arg.arity === "many";
}

/**
 * @param {(string | ExecArg)[]} args
 */
function getArity(args) {
    let arity = /** @type {"underspecified"|"one"|"many"} */("underspecified");
    for (const arg of args) {
        if (isExecArgOne(arg)) {
            if (arity === "many") return "overspecified";
            arity = "one";
        }
        else if (isExecArgMany(arg)) {
            if (arity === "one") return "overspecified";
            arity = "many";
        }
    }
    return arity;
}

/**
 * @typedef {import("vinyl")} File
 * 
 * @typedef {"path"|"dirname"|"basename"|"extname"} ExecArgKind
 * 
 * @typedef {ExecArgEach|ExecArgAll} ExecArg
 */
void 0;