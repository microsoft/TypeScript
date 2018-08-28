// @ts-check
const { CancelToken } = require("./cancellation");

class Countdown {
    constructor(initialCount = 0) {
        if (initialCount < 0) throw new Error();
        this._remainingCount = initialCount;
        this._promise = undefined;
        this._resolve = undefined;
    }

    get remainingCount() {
        return this._remainingCount;
    }

    add(count = 1) {
        if (count < 1 || !isFinite(count) || Math.trunc(count) !== count) throw new Error();
        if (this._remainingCount === 0) {
            this._promise = undefined;
            this._resolve = undefined;
        }

        this._remainingCount += count;
    }

    signal(count = 1) {
        if (count < 1 || !isFinite(count) || Math.trunc(count) !== count) throw new Error();
        if (this._remainingCount - count < 0) throw new Error();
        this._remainingCount -= count;
        if (this._remainingCount == 0) {
            if (this._resolve) {
                this._resolve();
            }
            return true;
        }
        return false;
    }

    /** @param {CancelToken} [token] */
    wait(token) {
        if (!this._promise) {
            this._promise = new Promise(resolve => { this._resolve = resolve; });
        }
        if (this._remainingCount === 0) {
            this._resolve();
        }
        if (!token) return this._promise;
        return new Promise((resolve, reject) => {
            const subscription = token.subscribe(reject);
            this._promise.then(
                value => {
                    subscription.unsubscribe();
                    resolve(value);
                }, 
                error => {
                    subscription.unsubscribe();
                    reject(error);
                });
        });
    }
}
exports.Countdown = Countdown;