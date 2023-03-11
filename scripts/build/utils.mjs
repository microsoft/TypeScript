import { CancelError } from "@esfx/canceltoken";
import assert from "assert";
import chalk from "chalk";
import { spawn } from "child_process";
import fs from "fs";
import JSONC from "jsonc-parser";
import path from "path";
import which from "which";

/**
 * Executes the provided command once with the supplied arguments.
 * @param {string} cmd
 * @param {string[]} args
 * @param {ExecOptions} [options]
 *
 * @typedef ExecOptions
 * @property {boolean} [ignoreExitCode]
 * @property {boolean} [hidePrompt]
 * @property {boolean} [waitForExit=true]
 * @property {import("@esfx/canceltoken").CancelToken} [token]
 */
export async function exec(cmd, args, options = {}) {
    return /**@type {Promise<{exitCode?: number}>}*/(new Promise((resolve, reject) => {
        const { ignoreExitCode, waitForExit = true } = options;

        if (!options.hidePrompt) console.log(`> ${chalk.green(cmd)} ${args.join(" ")}`);
        const proc = spawn(which.sync(cmd), args, { stdio: waitForExit ? "inherit" : "ignore" });
        if (waitForExit) {
            const onCanceled = () => {
                proc.kill();
            };
            const subscription = options.token?.subscribe(onCanceled);
            proc.on("exit", exitCode => {
                if (exitCode === 0 || ignoreExitCode) {
                    resolve({ exitCode: exitCode ?? undefined });
                }
                else {
                    const reason = options.token?.signaled ? options.token.reason ?? new CancelError() :
                        new Error(`Process exited with code: ${exitCode}`);
                    reject(reason);
                }
                subscription?.unsubscribe();
            });
            proc.on("error", error => {
                reject(error);
                subscription?.unsubscribe();
            });
        }
        else {
            proc.unref();
            // wait a short period in order to allow the process to start successfully before Node exits.
            setTimeout(() => resolve({ exitCode: undefined }), 100);
        }
    }));
}

/**
 * Reads JSON data with optional comments using the LKG TypeScript compiler
 * @param {string} jsonPath
 */
export function readJson(jsonPath) {
    const jsonText = fs.readFileSync(jsonPath, "utf8");
    return JSONC.parse(jsonText);
}

/**
 * @param {string | string[]} source
 * @param {string | string[]} dest
 * @returns {boolean}
 */
export function needsUpdate(source, dest) {
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

export function getDiffTool() {
    const program = process.env.DIFF;
    if (!program) {
        console.warn("Add the 'DIFF' environment variable to the path of the program you want to use.");
        process.exit(1);
    }
    return program;
}

/**
 * Find the size of a directory recursively.
 * Symbolic links can cause a loop.
 * @param {string} root
 * @returns {number} bytes
 */
export function getDirSize(root) {
    const stats = fs.lstatSync(root);

    if (!stats.isDirectory()) {
        return stats.size;
    }

    return fs.readdirSync(root)
        .map(file => getDirSize(path.join(root, file)))
        .reduce((acc, num) => acc + num, 0);
}

/**
 * @template T
 */
export class Deferred {
    constructor() {
        /** @type {Promise<T>} */
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

export class Debouncer {
    /**
     * @param {number} timeout
     * @param {() => Promise<any> | void} action
     */
    constructor(timeout, action) {
        this._timeout = timeout;
        this._action = action;
    }

    get empty() { return !this._deferred; }

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
        assert(deferred);
        this._deferred = undefined;
        try {
            deferred.resolve(this._action());
        }
        catch (e) {
            deferred.reject(e);
        }
    }
}

const unset = Symbol();
/**
 * @template T
 * @param {() => T} fn
 * @returns {() => T}
 */
export function memoize(fn) {
    /** @type {T | unset} */
    let value = unset;
    return () => {
        if (value === unset) {
            value = fn();
        }
        return value;
    };
}
