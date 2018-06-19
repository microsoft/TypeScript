// @ts-check
const { PassThrough } = require("stream");

/**
 * @returns {NodeJS.ReadWriteStream}
 */
function pass() {
    return new PassThrough({ objectMode: true });
}

module.exports = pass;