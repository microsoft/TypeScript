// @ts-check
/// <reference path="../types/ambient.d.ts" />

const path = require("path");
const convertMap = require("convert-source-map");
const applySourceMap = require("vinyl-sourcemaps-apply");
const through2 = require("through2");

/**
 * @param {import("vinyl")} input
 * @param {string | Buffer} contents
 * @param {string | RawSourceMap} [sourceMap]
 */
function replaceContents(input, contents, sourceMap) {
    const output = input.clone();
    output.contents = typeof contents === "string" ? Buffer.from(contents, "utf8") : contents;
    if (input.sourceMap) {
        output.sourceMap = typeof input.sourceMap === "string" ? /**@type {RawSourceMap}*/(JSON.parse(input.sourceMap)) : input.sourceMap;
        if (typeof sourceMap === "string") {
            sourceMap = /** @type {RawSourceMap} */(JSON.parse(sourceMap));
        }
        else if (sourceMap === undefined) {
            const stringContents = typeof contents === "string" ? contents : contents.toString("utf8");
            const newSourceMapConverter = convertMap.fromSource(stringContents);
            if (newSourceMapConverter) {
                sourceMap = /** @type {RawSourceMap} */(newSourceMapConverter.toObject());
                output.contents = new Buffer(convertMap.removeMapFileComments(stringContents), "utf8");
            }
        }
        if (sourceMap) {
            const cwd = input.cwd || process.cwd();
            const base = input.base || cwd;
            const sourceRoot = output.sourceMap.sourceRoot;
            makeAbsoluteSourceMap(cwd, base, output.sourceMap);
            makeAbsoluteSourceMap(cwd, base, /** @type {RawSourceMap} */(sourceMap));
            applySourceMap(output, sourceMap);
            makeRelativeSourceMap(cwd, base, sourceRoot, output.sourceMap);
        }
        else {
            output.sourceMap = undefined;
        }
    }
    return output;
}
exports.replaceContents = replaceContents;

function removeSourceMaps() {
    return through2.obj((/**@type {import("vinyl")}*/file, _, cb) => {
        if (file.isBuffer()) {
            file.contents = Buffer.from(convertMap.removeMapFileComments(file.contents.toString("utf8")), "utf8");
            if (file.sourceMap) {
                file.sourceMap = undefined;
            }
        }
        cb(null, file);
    });
}
exports.removeSourceMaps = removeSourceMaps;

/**
 * @param {string | undefined} cwd
 * @param {string | undefined} base
 * @param {RawSourceMap} sourceMap
 *
 * @typedef {object} RawSourceMap
 * @property {string} version
 * @property {string} file
 * @property {string} [sourceRoot]
 * @property {string[]} sources
 * @property {string[]} [sourcesContent]
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
exports.makeAbsoluteSourceMap = makeAbsoluteSourceMap;

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
exports.makeRelativeSourceMap = makeRelativeSourceMap;

/**
 * @param {string} message
 * @returns {never}
 */
function fail(message) {
    throw new Error(message);
}

/**
 * @param {number} value
 */
function base64FormatEncode(value) {
    return value < 0 ? fail("Invalid value") :
        value < 26 ? 0x41 /*A*/ + value :
        value < 52 ? 0x61 /*a*/ + value - 26 :
        value < 62 ? 0x30 /*0*/ + value - 52 :
        value === 62 ? 0x2B /*+*/ :
        value === 63 ? 0x2F /*/*/ :
        fail("Invalid value");
}

/**
 * @param {number} value
 */
function base64VLQFormatEncode(value) {
    if (value < 0) {
        value = ((-value) << 1) + 1;
    }
    else {
        value = value << 1;
    }

    // Encode 5 bits at a time starting from least significant bits
    let result = "";
    do {
        let currentDigit = value & 31; // 11111
        value = value >> 5;
        if (value > 0) {
            // There are still more digits to decode, set the msb (6th bit)
            currentDigit = currentDigit | 32;
        }
        result += String.fromCharCode(base64FormatEncode(currentDigit));
    } while (value > 0);

    return result;
}
exports.base64VLQFormatEncode = base64VLQFormatEncode;