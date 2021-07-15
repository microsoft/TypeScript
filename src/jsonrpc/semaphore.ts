/* eslint-disable @typescript-eslint/prefer-function-type */
/*@internal*/
namespace ts.server.rpc {
    interface Thunk<T> {
        (): T;
    }

    interface Waiting<T> {
        thunk: Thunk<T | PromiseLike<T>>;
        resolve: (value: T | PromiseLike<T>) => void;
        reject: (reason?: any) => void;
    }

    export class Semaphore<T = void> {

        private _capacity: number;
        private _active: number;
        private _waiting: Waiting<T>[];

        public constructor(capacity = 1) {
            if (capacity <= 0) {
                throw new Error("Capacity must be greater than 0");
            }
            this._capacity = capacity;
            this._active = 0;
            this._waiting = [];
        }

        public lock(thunk: () => T | PromiseLike<T>): Promise<T> {
            return new Promise((resolve, reject) => {
                this._waiting.push({ thunk, resolve, reject });
                this.runNext();
            });
        }

        public get active(): number {
            return this._active;
        }

        private runNext(): void {
            if (this._waiting.length === 0 || this._active === this._capacity) {
                return;
            }
            RAL().timer.setImmediate(() => this.doRunNext());
        }

        private doRunNext(): void {
            if (this._waiting.length === 0 || this._active === this._capacity) {
                return;
            }
            const next = this._waiting.shift()!;
            this._active++;
            if (this._active > this._capacity) {
                throw new Error(`To many thunks active`);
            }
            try {
                const result = next.thunk();
                if (result instanceof Promise) {
                    result.then((value) => {
                        this._active--;
                        next.resolve(value);
                        this.runNext();
                    }, (err) => {
                        this._active--;
                        next.reject(err);
                        this.runNext();
                    });
                }
                else {
                    this._active--;
                    next.resolve(result);
                    this.runNext();
                }
            }
            catch (err) {
                this._active--;
                next.reject(err);
                this.runNext();
            }
        }
    }
}
