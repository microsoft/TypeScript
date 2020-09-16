/* @internal */
namespace ts {
    interface PerformanceHooksShim {
        performance: PerformanceShim;
        PerformanceObserver: PerformanceObserverShimConstructor;
    }

    interface PerformanceShim {
        clearMarks(name?: string): void;
        mark(name: string): void;
        measure(name: string, startMark?: string, endMark?: string): void;
        now(): number;
        timeOrigin: number;
    }

    interface PerformanceEntryShim {
        name: string;
        entryType: string;
        startTime: number;
        duration: number;
    }

    interface PerformanceObserverEntryListShim {
        getEntries(): PerformanceEntryListShim;
        getEntriesByName(name: string, type?: string): PerformanceEntryListShim;
        getEntriesByType(type: string): PerformanceEntryListShim;
    }

    interface PerformanceObserverShim {
        disconnect(): void;
        observe(options: { entryTypes: readonly string[] }): void;
    }

    type PerformanceObserverShimConstructor = new (callback: (list: PerformanceObserverEntryListShim, observer: PerformanceObserverShim) => void) => PerformanceObserverShim;

    type PerformanceEntryListShim = PerformanceEntryShim[];

    interface PerformanceObserverList {
        readonly head: PerformanceObserverNode;
        tail: PerformanceObserverNode;
    }

    interface PerformanceObserverNode {
        observer: PerformanceObserverData;
        entryTypes: readonly string[];
        prev: PerformanceObserverNode | undefined;
        next: PerformanceObserverNode | undefined;
    }

    interface PerformanceObserverData {
        buffer: PerformanceEntryShim[];
        node: PerformanceObserverNode | undefined;
    }

    /* @internal */
    export namespace ShimPerformance {
        export function createPerformanceHooksShim(now: () => number): PerformanceHooksShim {
            const timeOrigin = now();
            const observerList = createObserverList();
            let marks = createDictionary<number>();

            function clearMarks(name?: string) {
                if (name !== undefined) {
                    delete marks[name];
                }
                else {
                    marks = createDictionary();
                }
            }

            function mark(markName: string) {
                const timestamp = now();
                marks[markName] = timestamp;
                if (observerList.head) {
                    emit(createPerformanceEntry(markName, "mark", timestamp, 0));
                }
            }

            function measure(measureName: string, startMark?: string, endMark?: string) {
                if (observerList.head) {
                    const end = (endMark !== undefined ? marks[endMark] : undefined) ?? now();
                    const start = (startMark !== undefined ? marks[startMark] : undefined) ?? timeOrigin;
                    emit(createPerformanceEntry(measureName, "measure", start, end - start));
                }
            }

            function emit(entry: PerformanceEntryShim) {
                let node: PerformanceObserverNode | undefined = observerList.head;
                while (node) {
                    node = node.next;
                    if (node) {
                        if (node.entryTypes.indexOf(entry.entryType) !== -1) {
                            node.observer.buffer.push(entry);
                        }
                    }
                }
            }

            function createDictionary<T>(): Record<string, T | undefined> {
                // eslint-disable-next-line boolean-trivia, no-null/no-null
                const obj = Object.create(null);
                obj.__ = undefined;
                delete obj.__;
                return obj;
            }

            function createObserverList(): PerformanceObserverList {
                const sentinel = {} as PerformanceObserverNode;
                sentinel.prev = sentinel;
                return { head: sentinel, tail: sentinel };
            }

            function createObserverNode(observer: PerformanceObserverData, entryTypes: readonly string[]): PerformanceObserverNode {
                return { observer, entryTypes, prev: undefined, next: undefined };
            }

            function createObserverData(): PerformanceObserverData {
                return { node: undefined, buffer: [] };
            }

            function createPerformanceEntry(name: string, entryType: string, startTime: number, duration: number): PerformanceEntryShim {
                return { name, entryType, startTime, duration };
            }

            class PerformanceObserverEntryList implements PerformanceObserverEntryListShim {
                private _data: PerformanceObserverData;

                constructor(ref: PerformanceObserverData) {
                    this._data = ref;
                }

                getEntries(): PerformanceEntryShim[] {
                    return this._data.buffer.slice();
                }

                getEntriesByName(name: string, type?: string): PerformanceEntryShim[] {
                    return this._data.buffer.filter(event => event.name === name && (type === undefined || event.entryType === type));
                }

                getEntriesByType(type: string): PerformanceEntryShim[] {
                    return this._data.buffer.filter(event => event.entryType === type);
                }
            }

            class PerformanceObserver implements PerformanceObserverShim {
                private _data = createObserverData();

                constructor(callback: (list: PerformanceObserverEntryListShim, observer: PerformanceObserver) => void) {
                    const list = new PerformanceObserverEntryList(this._data);
                    callback(list, this);
                }

                observe(options: { entryTypes: readonly string[] }) {
                    let entryTypes = options.entryTypes;
                    entryTypes = entryTypes.filter(entryType => entryType === "mark" || entryType === "measure");
                    if (entryTypes.length === 0) return;
                    if (this._data.node) {
                        this._data.node.entryTypes = entryTypes;
                    }
                    else {
                        const node = createObserverNode(this._data, entryTypes);
                        node.prev = observerList.tail;
                        observerList.tail.next = node;
                        observerList.tail = node;
                        this._data.node = node;
                    }
                }

                disconnect() {
                    const node = this._data.node;
                    if (node) {
                        // all nodes in have a 'prev' pointer.
                        if (node.prev === undefined) throw new Error("Illegal state");
                        if (node.next) {
                            node.next.prev = node.prev;
                        }
                        else {
                            // a node in the list without a 'next' pointer must be the tail
                            if (observerList.tail !== node) throw new Error("Illegal state");
                            observerList.tail = node.prev;
                        }
                        node.prev.next = node.next;
                        node.next = node.prev;
                        node.prev = undefined;
                        this._data.node = undefined;
                        this._data.buffer.length = 0;
                    }
                }
            }

            return {
                performance: {
                    clearMarks,
                    mark,
                    measure,
                    now,
                    timeOrigin
                },
                PerformanceObserver
            };
        }
    }
}