//// [tests/cases/compiler/contextualOverloadListFromArrayUnion.ts] ////

//// [one.ts]
declare const y: never[] | string[];
export const yThen = y.map(item => item.length);
//// [two.ts]
declare const y: number[][] | string[];
export const yThen = y.map(item => item.length);
//// [three.ts]
// #42504
interface ResizeObserverCallback {
    (entries: ResizeObserverEntry[], observer: ResizeObserver): void;
}
interface ResizeObserverCallback { // duplicate for effect
    (entries: ResizeObserverEntry[], observer: ResizeObserver): void;
}

const resizeObserver = new ResizeObserver(([entry]) => {
    entry
});
// comment in #35501
interface Callback<T> {
    (error: null, result: T): unknown
    (error: Error, result: null): unknown
}

interface Task<T> {
    (callback: Callback<T>): unknown
}

export function series<T>(tasks: Task<T>[], callback: Callback<T[]>): void {
    let index = 0
    let results: T[] = []

    function next() {
        let task = tasks[index]
        if (!task) {
            callback(null, results)
        } else {
            task((error, result) => {
                if (error) {
                    callback(error, null)
                } else {
                    // must use postfix-!, since `error` and `result` don't have a
                    // causal relationship when the overloads are combined
                    results.push(result!)
                    next()
                }
            })
        }
    }
    next()
}

series([
    cb => setTimeout(() => cb(null, 1), 300),
    cb => setTimeout(() => cb(null, 2), 200),
    cb => setTimeout(() => cb(null, 3), 100),
], (error, results) => {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
    }
})


//// [one.js]
export const yThen = y.map(item => item.length);
//// [two.js]
export const yThen = y.map(item => item.length);
//// [three.js]
const resizeObserver = new ResizeObserver(([entry]) => {
    entry;
});
export function series(tasks, callback) {
    let index = 0;
    let results = [];
    function next() {
        let task = tasks[index];
        if (!task) {
            callback(null, results);
        }
        else {
            task((error, result) => {
                if (error) {
                    callback(error, null);
                }
                else {
                    // must use postfix-!, since `error` and `result` don't have a
                    // causal relationship when the overloads are combined
                    results.push(result);
                    next();
                }
            });
        }
    }
    next();
}
series([
    cb => setTimeout(() => cb(null, 1), 300),
    cb => setTimeout(() => cb(null, 2), 200),
    cb => setTimeout(() => cb(null, 3), 100),
], (error, results) => {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
    }
});
