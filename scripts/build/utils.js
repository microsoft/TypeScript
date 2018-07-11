// @ts-check
const fs = require("fs");
const File = require("./vinyl");
const { Readable } = require("stream");

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
            this.push(null);
        }
    });
}
exports.streamFromBuffer = streamFromBuffer;