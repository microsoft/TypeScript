/* @internal */
namespace ts {
    declare function setTimeout<A extends any[]>(handler: (...args: A) => void, timeout: number, ...args: A): any;

    export interface Promise<T> extends globalThis.Promise<T> {
    }

    export interface PromiseConstructor extends PromiseConstructorLike {
        new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason: unknown) => void) => void): Promise<T>;
        resolve<T>(value: T | PromiseLike<T>): Promise<T>;
        resolve(): Promise<void>;
        reject<T = never>(reason: unknown): Promise<T>;
        all<T>(promises: (T | PromiseLike<T>)[]): Promise<T[]>;
        race<T>(promises: (T | PromiseLike<T>)[]): Promise<T>;
    }

    export function createPromiseShim(): PromiseConstructor {
        class Promise<T> implements ts.Promise<T> {
            private _state: "pending" | "fulfilled" | "rejected" = "pending";
            private _result: unknown;
            private _reactions: PromiseReaction[] = [];

            constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason: any) => void) => void) {
                const { resolve, reject } = createResolvingFunctions(this);
                try {
                    executor(resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }

            then<TResult1 = T, TResult2 = never>(
                onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
                onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
            ): Promise<TResult1 | TResult2> {
                return new Promise<TResult1 | TResult2>((resolve, reject) => {
                    const reaction: PromiseReaction = { resolve, reject, onfulfilled, onrejected };
                    if (this._state === "pending") {
                        this._reactions.push(reaction);
                    }
                    else {
                        setTimeout(promiseReactionJob, 0, reaction, this._state === "fulfilled" ? "fulfill" : "reject", this._result);
                    }
                });
            }

            catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
                return this.then(/*onfulfilled*/ undefined, onrejected);
            }

            static resolve(): Promise<void>;
            static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
            static resolve<T>(value?: T | PromiseLike<T>): Promise<T> {
                return value instanceof this && value.constructor === this ? value : new Promise<T>(resolve => resolve(value));
            }

            static reject<T = never>(reason: any): Promise<T> {
                return new Promise<T>((_, reject) => reject(reason));
            }

            static all<T>(promises: (T | PromiseLike<T>)[]): Promise<T[]> {
                return new Promise<T[]>((resolve, reject) => {
                    let count = promises.length;
                    const values: T[] = Array<T>(count);
                    for (let i = 0; i < promises.length; i++) {
                        let called = false;
                        this.resolve(promises[i]).then(
                            value => {
                                if (!called) {
                                    called = true;
                                    values[i] = value;
                                    count--;
                                    if (count === 0) {
                                        resolve(values);
                                    }
                                }
                            },
                            reject);
                    }
                });
            }

            static race<T>(promises: (T | PromiseLike<T>)[]): Promise<T> {
                return new Promise<T>((resolve, reject) => {
                    for (const promise of promises) {
                        this.resolve(promise).then(resolve, reject);
                    }
                });
            }
        }

        interface PromiseReaction {
            resolve: (value: unknown) => void;
            reject: (reason: unknown) => void;
            onfulfilled?: ((value: unknown) => unknown) | null;
            onrejected?: ((reason: unknown) => unknown) | null;
        }

        function createResolvingFunctions<T>(promise: Promise<T>) {
            let called = false;
            return {
                resolve: (value: T | Promise<T>) => {
                    if (!called) {
                        called = true;
                        try {
                            if (promise === value) throw new TypeError();
                            // eslint-disable-next-line no-null/no-null
                            const then = typeof value === "object" && value !== null && (<Promise<unknown>>value).then;
                            if (typeof then !== "function") {
                                settlePromise(promise, "fulfill", value);
                            }
                            else {
                                setTimeout(resolveThenableJob, 0, promise, value, then);
                            }
                        }
                        catch (e) {
                            settlePromise(promise, "reject", e);
                        }
                    }
                },
                reject: (reason: any) => {
                    if (!called) {
                        called = true;
                        settlePromise(promise, "reject", reason);
                    }
                }
            };
        }

        function settlePromise(promise: Promise<unknown>, verb: "fulfill" | "reject", value: unknown) {
            /* eslint-disable dot-notation */
            const reactions = promise["_reactions"];
            promise["_result"] = value;
            promise["_reactions"] = undefined!;
            promise["_state"] = verb === "fulfill" ? "fulfilled" : "rejected";
            for (const reaction of reactions) {
                setTimeout(promiseReactionJob, 0, reaction, verb, value);
            }
            /* eslint-enable dot-notation */
        }

        function resolveThenableJob<T>(promiseToResolve: Promise<T>, thenable: T, thenAction: Promise<T>["then"]) {
            const { resolve, reject } = createResolvingFunctions(promiseToResolve);
            try {
                thenAction.call(thenable, resolve, reject);
            }
            catch (e) {
                reject(e);
            }
        }

        function promiseReactionJob(reaction: PromiseReaction, verb: "fulfill" | "reject", argument: unknown) {
            const handler = verb === "fulfill" ? reaction.onfulfilled : reaction.onrejected;
            if (handler) {
                try {
                    argument = handler(argument);
                    verb = "fulfill";
                }
                catch (e) {
                    argument = e;
                    verb = "reject";
                }
            }

            const action = verb === "fulfill" ? reaction.resolve : reaction.reject;
            action(argument);
        }

        return Promise;
    }
}