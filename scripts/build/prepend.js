// @ts-check
const stream = require("stream");
const Vinyl = require("vinyl");
const ts = require("../../lib/typescript");
const fs = require("fs");
const { base64VLQFormatEncode } = require("./sourcemaps");

/**
 * @param {string | ((file: import("vinyl")) => string)} data
 */
function prepend(data) {
    return new stream.Transform({
        objectMode: true,
        /**
         * @param {string | Buffer | import("vinyl")} input
         * @param {(error: Error, data?: any) => void} cb
         */
        transform(input, _, cb) {
            if (typeof input === "string" || Buffer.isBuffer(input)) return cb(new Error("Only Vinyl files are supported."));
            if (!input.isBuffer()) return cb(new Error("Streams not supported."));
            try {
                const output = input.clone();
                const prependContent = typeof data === "function" ? data(input) : data;
                output.contents = Buffer.concat([Buffer.from(prependContent, "utf8"), input.contents]);
                if (input.sourceMap) {
                    if (typeof input.sourceMap === "string") input.sourceMap = /**@type {import("./sourcemaps").RawSourceMap}*/(JSON.parse(input.sourceMap));
                    const lineStarts = /**@type {*}*/(ts).computeLineStarts(prependContent);
                    let prependMappings = "";
                    for (let i = 1; i < lineStarts.length; i++) {
                        prependMappings += ";";
                    }
                    const offset = prependContent.length - lineStarts[lineStarts.length - 1];
                    if (offset > 0) {
                        prependMappings += base64VLQFormatEncode(offset) + ",";
                    }
                    output.sourceMap = {
                        version: input.sourceMap.version,
                        file: input.sourceMap.file,
                        sources: input.sourceMap.sources,
                        sourceRoot: input.sourceMap.sourceRoot,
                        mappings: prependMappings + input.sourceMap.mappings,
                        names: input.names,
                        sourcesContent: input.sourcesContent
                    };
                }
                return cb(null, output);
            }
            catch (e) {
                return cb(e);
            }
        }
    })
}
exports.prepend = prepend;

/**
 * @param {string | ((file: import("vinyl")) => string)} file
 */
function prependFile(file) {
    const data = typeof file === "string" ? fs.readFileSync(file, "utf8") :
        vinyl => fs.readFileSync(file(vinyl), "utf8");
    return prepend(data)
}
exports.prependFile = prependFile;