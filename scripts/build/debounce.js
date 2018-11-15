// @ts-check
module.exports = debounce;

/**
 * @param {() => void} cb
 * @param {number} timeout
 * @param {DebounceOptions} [opts]
 *
 * @typedef DebounceOptions
 * @property {number} [max]
 */
function debounce(cb, timeout, opts = {}) {
    if (timeout < 10) timeout = 10;
    let max = opts.max || 10;
    if (max < timeout) max = timeout;
    let minTimer;
    let maxTimer;
    return trigger;

    function trigger() {
        if (max > timeout && !maxTimer) maxTimer = setTimeout(done, max);
        if (minTimer) clearTimeout(minTimer);
        minTimer = setTimeout(done, timeout);
    }

    function done() {
        if (maxTimer) maxTimer = void clearTimeout(maxTimer);
        if (minTimer) minTimer = void clearTimeout(minTimer);
        cb();
    }
}