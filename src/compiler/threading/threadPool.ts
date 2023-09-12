import { WorkerThreadsHost, Worker, workerThreads } from "../workerThreads";
import { SharedLinkedList } from "../sharing/collections/sharedLinkedList";
import { Shared, SharedStructBase } from "../sharing/structs/sharedStruct";
import { Mutex } from "./mutex";
import { Condition } from "./condition";
import { UniqueLock } from "./uniqueLock";
import { Debug } from "../debug";
import { isNodeLikeSystem } from "../core";
import { CountdownEvent } from "./countdownEvent";

@Shared()
class ThreadPoolWorkItem extends SharedStructBase {
    @Shared() readonly name: string;
    @Shared() readonly arg: Shareable;

    constructor(name: string, arg?: Shareable) {
        super();
        this.name = name;
        this.arg = arg;
    }
}

/** @internal */
@Shared()
export class ThreadPoolState extends SharedStructBase {
    @Shared() mutex = new Mutex();
    @Shared() condition = new Condition();
    @Shared() countdown = new CountdownEvent(1);
    @Shared() queue = new SharedLinkedList<ThreadPoolWorkItem>();
    @Shared() active = 0;
    @Shared() done = false;
    @Shared() error: string | undefined;
}

/**
 * Creates a thread pool of one or more worker threads. A {@link ThreadPool} can only be created on the main thread.
 * @internal
 */
export class ThreadPool {
    readonly poolSize: number;

    private readonly _host: WorkerThreadsHost;
    private _workers: Worker[] = [];
    private _state = new ThreadPoolState();

    private _listening = false;
    private _onUncaughtException = () => {
        if (!this._state.done) {
            this.abort();
        }
    };

    constructor(poolSize: number, host = workerThreads ?? Debug.fail("Worker threads not available.")) {
        Debug.assert(poolSize >= 1);
        Debug.assert(host.isMainThread(), "A new thread pool can only be created on the main thread.");
        this.poolSize = poolSize;
        this._host = host;
    }

    /**
     * Starts all threads in the thread pool.
     */
    start(): void {
        if (this._workers.length < this.poolSize) {
            this._startListening();
        }
        for (let i = this._workers.length; i < this.poolSize; i++) {
            this._workers.push(this._host.createWorker({
                name: "ThreadPool Thread",
                workerData: { type: "ThreadPoolThread", state: this._state }
            }));
        }
    }

    /**
     * Disable the addition of new work items in the thread pool and wait for threads to terminate gracefully.
     */
    stop(timeout?: number) {
        this._shutdown();
        return CountdownEvent.wait(this._state.countdown, timeout);
    }

    /**
     * Immediately stop all threads in the thread pool and wait for them to terminate.
     */
    async abort() {
        this._shutdown();
        const workers = this._workers.splice(0, this._workers.length);
        await Promise.all(workers.map(worker => worker.terminate()));
    }

    /**
     * Queues a work item to execute in a worker thread.
     * @param name The name of the work item to execute.
     * @param arg An argument passed to the work item that can be used to communicate and coordinate with the background
     * thread.
     */
    queueWorkItem(name: string, arg?: Shareable) {
        {
            using _ = new UniqueLock(this._state.mutex);
            SharedLinkedList.push(this._state.queue, new ThreadPoolWorkItem(name, arg));
        }

        Condition.notify(this._state.condition, 1);
    }

    private _shutdown() {
        this._stopListening();

        Debug.log.trace("Shutting down thread pool");
        if (!this._state.done) {
            using _ = new UniqueLock(this._state.mutex);
            this._state.done = true;
            Condition.notify(this._state.condition);
            CountdownEvent.signal(this._state.countdown, 1);
        }
    }

    private _startListening() {
        if (isNodeLikeSystem()) {
            if (this._listening) {
                return;
            }
            this._listening = true;
            process.on("uncaughtExceptionMonitor", this._onUncaughtException);
        }
    }

    private _stopListening() {
        if (isNodeLikeSystem()) {
            if (!this._listening) {
                return;
            }
            process.off("uncaughtExceptionMonitor", this._onUncaughtException);
        }
    }
}

/**
 * Represents a thread in a {@link ThreadPool} and can be used to process work items. A {@link ThreadPoolThread} should
 * only be used in a worker thread.
 * @internal
 */
export class ThreadPoolThread {
    private _state: ThreadPoolState;
    private _processWorkItem: (name: string, arg: Shareable) => void;

    constructor(state: ThreadPoolState, processWorkItem: (name: string, arg: Shareable) => void) {
        this._state = state;
        this._processWorkItem = processWorkItem;
    }

    /**
     * Runs the thread pool thread until the {@link ThreadPool} signals the thread should shut down.
     */
    run() {
        let running = true;
        let started = false;
        try {
            const processWorkItem = this._processWorkItem;
            if (!CountdownEvent.tryAdd(this._state.countdown, 1)) {
                Debug.log.trace("thread pool is already shut down");
                return;
            }

            while (running) {
                let workItem: ThreadPoolWorkItem | undefined;
                {
                    using lck = new UniqueLock(this._state.mutex);

                    // decrement the active thread counter before we start waiting for work
                    if (started) {
                        this._state.active--;
                    }

                    // wait until we have work to do
                    Condition.wait(this._state.condition, lck, () => this._state.queue.size > 0 || this._state.done);

                    // stop the thread if the thread pool is closed
                    if (this._state.done) {
                        if (started) {
                            this._state.active--;
                        }
                        running = false;
                        break;
                    }

                    // increment the active thread counter before we start processing a work item
                    this._state.active++;
                    started = true;
                    workItem = SharedLinkedList.shift(this._state.queue);
                }

                // process the workitem
                if (workItem) {
                    try {
                        processWorkItem(workItem.name, workItem.arg);
                    }
                    catch (e) {
                        Debug.log.trace(e);
                        running = false;
                        using _ = new UniqueLock(this._state.mutex);
                        this._state.active--;
                        break;
                    }
                }
            }
        }
        catch (e) {
            Debug.log.trace(e);
        }

        // Debug.log.trace(`shutting down.`);
        CountdownEvent.signal(this._state.countdown);
    }

    /**
     * Queue additional work to be performed in another thread.
     */
    queueWorkItem(name: string, arg?: Shareable) {
        Debug.assert(!this._state.done);

        {
            using _ = new UniqueLock(this._state.mutex);
            Debug.assert(!this._state.done);
            SharedLinkedList.push(this._state.queue, new ThreadPoolWorkItem(name, arg));
        }

        Condition.notify(this._state.condition, 1);
    }
}
