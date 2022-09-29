import stream from "stream";
import ts from "../../lib/typescript.js";
import fs from "fs";
import { base64VLQFormatEncode } from "./sourcemaps.mjs";

/**
 * @param {string | ((file: import("vinyl")) => string)} data
 */
export function prepend(data) {
    return new stream.Transform({
        objectMode: true,
        /**
         * @param {string | Buffer | import("vinyl")} input
         * @param {(error: Error | null, data?: any) => void} cb
         */
        transform(input, _, cb) {
            if (typeof input === "string" || Buffer.isBuffer(input)) return cb(new Error("Only Vinyl files are supported."));
            if (!input.isBuffer()) return cb(new Error("Streams not supported."));
            try {
                const output = input.clone();
                const prependContent = typeof data === "function" ? data(input) : data;
                output.contents = Buffer.concat([Buffer.from(prependContent, "utf8"), input.contents]);
                if (input.sourceMap) {
                    if (typeof input.sourceMap === "string") input.sourceMap = /**@type {import("./sourcemaps.mjs").RawSourceMap}*/(JSON.parse(input.sourceMap));
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
                // eslint-disable-next-line local/boolean-trivia, no-null/no-null
                return cb(null, output);
            }
            catch (e) {
                return cb(/** @type {Error} */(e));
            }
        }
    });
}

/**
 * @param {string | ((file: import("vinyl")) => string)} file
 */
export function prependFile(file) {
    const data = typeof file === "string" ? fs.readFileSync(file, "utf8") :
        (/** @type {import("vinyl")} */ vinyl) => fs.readFileSync(file(vinyl), "utf8");
    return prepend(data);
}
