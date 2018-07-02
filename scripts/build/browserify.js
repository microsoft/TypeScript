// @ts-check
const Browserify = require("browserify");
const Vinyl = require("vinyl");
const fs = require("fs");
const path = require("path");
const convertMap = require("convert-source-map");
const applySourceMap = require("vinyl-sourcemaps-apply");
const { Transform, Readable } = require("stream");

module.exports = browserify;

/**
 * @param {import("browserify").Options} [opts]
 */
function browserify(opts) {
    return new Transform({
        objectMode: true,
        /**
         * @param {string | Buffer | File} input
         */
        transform(input, _, cb) {
            if (typeof input === "string" || Buffer.isBuffer(input)) return cb(new Error("Only Vinyl files are supported."));
            try {
                const sourceMap = input.sourceMap;
                const cwd = input.cwd || process.cwd();
                const base = input.base || cwd;
                const output = /**@type {File}*/(new Vinyl({ path: input.path, base: input.base }));
                const stream = streamFromFile(input);
                const b = new Browserify(Object.assign({}, opts, { debug: !!sourceMap, basedir: input.base }));
                b.add(stream, { file: input.path, basedir: input.base });
                b.bundle((err, contents) => {
                    if (err) return cb(err);
                    output.contents = contents;
                    if (sourceMap) {
                        output.sourceMap = typeof sourceMap === "string" ? JSON.parse(sourceMap) : sourceMap;
                        const sourceRoot = output.sourceMap.sourceRoot;
                        makeAbsoluteSourceMap(cwd, base, output.sourceMap);
                        const stringContents = contents.toString("utf8");
                        const newSourceMapConverter = convertMap.fromSource(stringContents);
                        if (newSourceMapConverter) {
                            const newSourceMap = newSourceMapConverter.toObject();
                            makeAbsoluteSourceMap(cwd, base, newSourceMap);
                            applySourceMap(output, newSourceMap);
                            makeRelativeSourceMap(cwd, base, sourceRoot, output.sourceMap);
                            output.contents = new Buffer(convertMap.removeComments(stringContents), "utf8");
                        }
                    }
                    cb(null, output);
                });
            }
            catch (e) {
                cb(e);
            }
        }
    });
}

/**
 * @param {string | undefined} cwd
 * @param {string | undefined} base
 * @param {RawSourceMap} sourceMap
 *
 * @typedef RawSourceMap
 * @property {string} version
 * @property {string} file
 * @property {string} [sourceRoot]
 * @property {string[]} sources
 * @property {string[]} [sourcesContents]
 * @property {string} mappings
 * @property {string[]} [names]
 */
function makeAbsoluteSourceMap(cwd = process.cwd(), base = "", sourceMap) {
    const sourceRoot = sourceMap.sourceRoot || "";
    const resolvedBase = path.resolve(cwd, base);
    const resolvedSourceRoot = path.resolve(resolvedBase, sourceRoot);
    sourceMap.file = path.resolve(resolvedBase, sourceMap.file).replace(/\\/g, "/");
    sourceMap.sources = sourceMap.sources.map(source => path.resolve(resolvedSourceRoot, source).replace(/\\/g, "/"));
    sourceMap.sourceRoot = "";
}

/**
 * @param {string | undefined} cwd
 * @param {string | undefined} base
 * @param {string} sourceRoot
 * @param {RawSourceMap} sourceMap
 */
function makeRelativeSourceMap(cwd = process.cwd(), base = "", sourceRoot, sourceMap) {
    makeAbsoluteSourceMap(cwd, base, sourceMap);
    const resolvedBase = path.resolve(cwd, base);
    const resolvedSourceRoot = path.resolve(resolvedBase, sourceRoot);
    sourceMap.file = path.relative(resolvedBase, sourceMap.file).replace(/\\/g, "/");
    sourceMap.sources = sourceMap.sources.map(source => path.relative(resolvedSourceRoot, source).replace(/\\/g, "/"));
    sourceMap.sourceRoot = sourceRoot;
}

/**
 * @param {File} file
 */
function streamFromFile(file) {
    return file.isBuffer() ? streamFromBuffer(file.contents) :
        file.isStream() ? file.contents :
        fs.createReadStream(file.path, { autoClose: true });
}

/**
 * @param {Buffer} buffer
 */
function streamFromBuffer(buffer) {
    return new Readable({
        read() {
            this.push(buffer);
            this.push(null);
        }
    });
}

/**
 * @typedef {import("vinyl") & { sourceMap?: any }} File
 */
void 0;