// @ts-check
const { Duplex } = require("stream");
const path = require("path");
const Vinyl = require("vinyl");
const del = require("del");

module.exports = rm;

/**
 * @param {string | ((file: File) => string) | Options} [dest]
 * @param {Options} [opts]
 */
function rm(dest, opts) {
    if (dest && typeof dest === "object") opts = dest, dest = undefined;
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
            processDeleted();
            if (pending.length) {
                Promise
                    .all(pending.map(entry => entry.promise))
                    .then(() => processDeleted())
                    .then(() => cb(), cb);
                return;
            }
            cb();
        },
        read() {
        }
    });
    return duplex;
}

/**
 * @typedef {import("vinyl")} File
 * 
 * @typedef Options
 * @property {string} [cwd]
 */
void 0;