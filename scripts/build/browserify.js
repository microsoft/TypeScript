// @ts-check
const browserify = require("browserify");
const Vinyl = require("./vinyl");
const { Transform } = require("stream");
const { streamFromFile } = require("./utils");
const { replaceContents } = require("./sourcemaps");

module.exports = browserifyFile;

/**
 * @param {import("browserify").Options} [opts]
 */
function browserifyFile(opts) {
    return new Transform({
        objectMode: true,
        /**
         * @param {string | Buffer | Vinyl} input
         */
        transform(input, _, cb) {
            if (typeof input === "string" || Buffer.isBuffer(input)) return cb(new Error("Only Vinyl files are supported."));
            try {
                browserify(Object.assign({}, opts, { debug: !!input.sourceMap, basedir: input.base }))
                    .add(streamFromFile(input), { file: input.path, basedir: input.base })
                    .bundle((err, contents) => {
                        if (err) return cb(err);
                        cb(null, replaceContents(input, contents));
                    });
            }
            catch (e) {
                cb(e);
            }
        }
    });
}