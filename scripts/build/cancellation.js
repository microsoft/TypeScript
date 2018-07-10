// @ts-check
const symSource = Symbol("CancelToken.source");
const symToken = Symbol("CancelSource.token");
const symCancellationRequested = Symbol("CancelSource.cancellationRequested");
const symCancellationCallbacks = Symbol("CancelSource.cancellationCallbacks");

class CancelSource {
    constructor() {
        this[symCancellationRequested] = false;
        this[symCancellationCallbacks] = [];
    }

    /** @type {CancelToken} */
    get token() {
        return this[symToken] || (this[symToken] = new CancelToken(this));
    }

    cancel() {
        if (!this[symCancellationRequested]) {
            this[symCancellationRequested] = true;
            for (const callback of this[symCancellationCallbacks]) {
                callback();
            }
        }
    }
}
exports.CancelSource = CancelSource;

class CancelToken {
    /**
     * @param {CancelSource} source
     */
    constructor(source) {
        if (source[symToken]) return source[symToken];
        this[symSource] = source;
    }

    /** @type {boolean} */
    get cancellationRequested() {
        return this[symSource][symCancellationRequested];
    }

    /**
     * @param {() => void} callback
     */
    subscribe(callback) {
        const source = this[symSource];
        if (source[symCancellationRequested]) {
            callback();
            return;
        }

        source[symCancellationCallbacks].push(callback);

        return {
            unsubscribe() {
                const index = source[symCancellationCallbacks].indexOf(callback);
                if (index !== -1) source[symCancellationCallbacks].splice(index, 1);
            }
        };
    }
}
exports.CancelToken = CancelToken;

class CancelError extends Error {
    constructor(message = "Operation was canceled") {
        super(message);
        this.name = "CancelError";
    }
}
exports.CancelError = CancelError;