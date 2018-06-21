// @ts-check
const mkdirp = require("mkdirp");

module.exports = exports = mkdirpAsync;

/**
 * @param {string} dir 
 * @param {mkdirp.Mode | mkdirp.Options} [opts] 
 */
function mkdirpAsync(dir, opts) {
    return new Promise((resolve, reject) => mkdirp(dir, opts, (err, made) => err ? reject(err) : resolve(made)));
}

exports.sync = mkdirp.sync;