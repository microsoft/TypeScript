import { combinePaths, getAnyExtensionFromPath, getBaseFileName, getDirectoryPath, removeExtension, sys, Tag, Tagged } from "../_namespaces/ts";
import { isNodeLikeSystem, noop } from "../core";
import { Debug } from "../debug";
import { Deque } from "../sharing/collections/deque";
import { Shared, SharedStructBase } from "../sharing/structs/sharedStruct";
import { Worker, workerThreads, WorkerThreadsHost } from "../workerThreads";
import { Condition } from "./condition";
import { Mutex } from "./mutex";
import { spin } from "./spin";
import { UniqueLock } from "./uniqueLock";

// temporary options to control various behaviors of the thread pool while experimenting.
const WORK_STEALING = true;
const PER_THREAD_QUEUE = true;

/**
 * A task scheduled on the thread pool.
 */
@Shared()
class Task extends SharedStructBase {
    @Shared() readonly name: string;
    @Shared() readonly arg: Shareable;

    constructor(name: string, arg?: Shareable) {
        super();
        this.name = name;
        this.arg = arg;
    }
}

/**
 * A task queue for a thread pool thread. The thread that owns the pool and the worker thread that owns the queue can
 * push new tasks. Only the worker thread that owns the queue can pop tasks, while other threads may steal tasks.
 * 
 * The queue is operated using two {@link Deque|deques}: An input deque maintained by the thread that owns the thread
 * pool, and an output {@link Deque|deque} maintained by the worker thread that owns the pool. When the worker thread
 * requests a task, if no tasks are in the output queue, a chunk of tasks are stolen from the input queue and added to
 * the output queue.
 */
@Shared()
class TaskQueue extends SharedStructBase {
    @Shared() private mutex = new Mutex();
    @Shared() private condition = new Condition();
    @Shared() private inputDeque = new Deque<Task>();
    @Shared() outputDeque: Deque<Task> | undefined; // output deque is assigned (and owned) by the worker thread.
    @Shared() done = false;

    /**
     * Push a new task onto the queue. This can only be invoked from either the thread that owns the thread pool or the
     * worker thread that owns the queue.
     */
    static push(self: TaskQueue, task: Task) {
        Debug.assert(!self.done, "Cannot push new work if the queue is done.");
        const threadId = workerThreads?.threadId ?? 0;

        // only the thead that originated the thread pool can add work to the input deque.
        // only the thread that owns the queue can add work to the output deque.
        const deque =
            threadId === self.inputDeque.threadId ? self.inputDeque :
            threadId === self.outputDeque?.threadId ? self.outputDeque :
            Debug.fail("wrong thread.");

        Deque.push(deque, task);
        Condition.notify(self.condition, 1); // wake up the thread if it is sleeping.
    }

    /**
     * Try to take any immediately available work off the deque. This can only be invoked from the worker thread that
     * owns the queue.
     */
    static tryPop(self: TaskQueue) {
        Debug.assert(self.outputDeque);
        while (true) {
            // try to take work off our own queue
            const done = self.done;
            const task = Deque.pop(self.outputDeque);
            if (task || done) {
                return task;
            }

            // try to take a chunk of work off of the input deque
            const stolen = Deque.stealMany(self.inputDeque, 32);
            if (stolen.length) {
                Deque.pushMany(self.outputDeque, stolen);

                // we've successfully moved a chunk of work off of the input deque,
                // spin and try to pop from the output deque again
                continue;
            }

            // we failed to take work from the deque and there's no immediate work to be had
            return undefined;
        }
    }

    /**
     * Pop a work item off the deque. If no work is available, the thread is suspended until either new work becomes
     * available or the queue exits. This can only be invoked from the worker thread that owns the queue.
     */
    static pop(self: TaskQueue) {
        // We read 'done' before reading 'task' to avoid a race. If we read 'done' after we try to pop a task, we may be
        // preempted by a thread that both adds a new task and sets 'done' before were to read it. By reading 'done'
        // first we will have ensured that the queue was actually 'done' by the time we read any remaining tasks.
        const done = self.done;
        const task = TaskQueue.tryPop(self);
        if (task || done) {
            return task;
        }

        using lck = new UniqueLock(self.mutex);
        while (true) {
            const done = self.done; // read 'done' before 'task' to avoid a race, see above for rationale.
            const task = TaskQueue.tryPop(self);
            if (task || done) {
                return task;
            }

            // no work to do, put the thread to sleep
            Condition.wait(self.condition, lck);
        }
    }

    /**
     * Try to steal a task from this thread's output deque. If no task was available, try to steal a task from this
     * threads input deque.
     */
    static steal(self: TaskQueue) {
        return self.outputDeque && Deque.steal(self.outputDeque) || Deque.steal(self.inputDeque);
    }

    /**
     * Marks the queue as 'done'. No more tasks can be added to the queue.
     */
    static done(self: TaskQueue) {
        self.done = true;
        Condition.notify(self.condition);
    }
}

/**
 * A task scheduler for a thread pool. Tasks are scheduled on a given thread in a round-robin fashion.
 */
@Shared()
class TaskScheduler extends SharedStructBase {
    @Shared() queues: SharedArray<TaskQueue>;
    @Shared() nextTaskId = 0;
    @Shared() mutex = new Mutex();

    constructor(poolSize: number) {
        super();
        this.queues = new SharedArray(PER_THREAD_QUEUE ? poolSize : 1);
        const queueCount = this.queues.length;
        for (let i = 0; i < queueCount; i++) {
            this.queues[i] = new TaskQueue();
        }
    }

    /**
     * Shutdown the scheduler, marking all task queues as done.
     */
    static shutdown(self: TaskScheduler) {
        const queueCount = self.queues.length;
        for (let i = 0; i < queueCount; i++) {
            TaskQueue.done(self.queues[i]);
        }
    }

    /**
     * Schedules a task on the thread poool.
     */
    static scheduleTask(self: TaskScheduler, task: Task) {
        const queueCount = self.queues.length;
        let spinCounter = 0;

        let queueId: number;
        while (true) {
            const previousValue = Atomics.load(self, "nextTaskId");
            const nextValue = (previousValue + 1) >>> 0; // u32 wrapping add
            if (Atomics.compareExchange(self, "nextTaskId", previousValue, nextValue) === previousValue) {
                queueId = previousValue % queueCount;
                break;
            }
            // spin when there is contention.
            spinCounter = spin(spinCounter);
        }

        TaskQueue.push(self.queues[queueId], task);

        // TODO: wake all threads to steal work? If the selected thread already has work and the other threads are
        // sleeping, then the other threads won't be able to take up the slack.
    }

    /**
     * Take a task off of the selected queue. Must only be called by the thread that owns the queue indicated by
     * provided `queueId`.
     */
    static takeTask(self: TaskScheduler, queueId: number) {
        const queues = self.queues;

        // first, try to take work from our queue
        const done = queues[queueId].done;
        const task = TaskQueue.tryPop(queues[queueId]);
        if (task || done) {
            return task;
        }

        if (WORK_STEALING && PER_THREAD_QUEUE) {
            // next, try to steal work from an open queue
            const queueCount = queues.length;
            for (let i = 1; i < queueCount; i++) {
                const queue = queues[(queueId + i) % queueCount];
                const task = TaskQueue.steal(queue);
                if (task) {
                    return task;
                }
            }
        }

        // finally, if that fails, perform a blocking dequeue on our queue. blocking isn't preferable, however, as
        // there may be work added to other queues that cannot be stolen while this thread is suspended.
        return TaskQueue.pop(queues[queueId]);
    }
}

/**
 * Creates a thread pool of one or more worker threads. A {@link ThreadPool} can only be created on the main thread.
 * @internal
 */
export class ThreadPool implements Disposable {
    readonly poolSize: number;

    private readonly _host: WorkerThreadsHost;
    private readonly _generateCpuProfile: string | undefined;
    private _workers: Worker[] = [];
    private _threads: Thread[] = [];
    private _scheduler: TaskScheduler | undefined;
    private _listening = false;
    private _onUncaughtException = () => {
        if (this._scheduler) {
            this.abort();
        }
    };

    /**
     * Creates a new {@link ThreadPool} instance.
     * @param poolSize The number of thread pool threads to add to the pool.
     * @param host The {@link WorkerThreadsHost} associated with the pool.
     * @param generateCpuProfile Whether to generate a CPU profile in the thread pool thread.
     */
    constructor(poolSize: number, host = workerThreads ?? Debug.fail("Worker threads not available."), generateCpuProfile?: string) {
        Debug.assert(poolSize >= 1);
        Debug.assert(host.isMainThread(), "A new thread pool can only be created on the main thread.");
        this.poolSize = poolSize;
        this._generateCpuProfile = generateCpuProfile;
        this._scheduler = new TaskScheduler(poolSize);
        this._host = host;
    }

    /**
     * Starts all threads in the thread pool.
     */
    start(): void {
        Debug.assert(this._scheduler, "Object is disposed");

        if (this._workers.length < this.poolSize) {
            this._startListening();
        }

        const queueCount = this._scheduler.queues.length;
        for (let i = this._workers.length; i < this.poolSize; i++) {
            const thread = new Thread(this._scheduler, i % queueCount, this._generateCpuProfile);
            this._threads[i] = thread;

            const worker = this._host.createWorker({ name: "ThreadPool Thread", workerData: thread });
            this._workers[i] = worker;
        }
    }

    /**
     * Disable the addition of new work items in the thread pool and wait for threads to terminate gracefully.
     */
    shutdown() {
        if (!this._scheduler) {
            return;
        }

        this._stopListening();

        const scheduler = this._scheduler;
        const threads = this._threads.slice();

        this._scheduler = undefined;
        this._threads.length = 0;
        this._workers.length = 0;

        // mark all queues as done
        TaskScheduler.shutdown(scheduler);

        // join all threads
        for (const thread of threads) {
            Thread.join(thread);
        }

        Debug.log.trace("Thread pool shut down.");
    }

    /**
     * Immediately abort all threads in the thread pool and asynchronously wait for them to terminate.
     */
    async abort() {
        if (!this._scheduler) {
            return;
        }

        this._stopListening();

        const scheduler = this._scheduler;
        const workers = this._workers.slice();

        this._scheduler = undefined;
        this._threads.length = 0;
        this._workers.length = 0;

        // mark all queues as done
        TaskScheduler.shutdown(scheduler);

        // terminate all workers
        await Promise.all(workers.map(worker => worker.terminate()));
    }

    /**
     * Queues a work item to execute in a worker thread.
     * @param name The name of the work item to execute.
     * @param arg An argument passed to the work item that can be used to communicate and coordinate with the background
     * thread.
     */
    queueWorkItem(name: string, arg?: Shareable) {
        Debug.assert(this._scheduler, "Object is disposed");
        TaskScheduler.scheduleTask(this._scheduler, new Task(name, arg));
    }

    private _startListening() {
        // An uncaught exception will normally crash the process. However, open thread pool threads that are currently
        // sleeping may still prevent the process from exiting even if the worker is `unref`'d . In NodeJS we can
        // monitor for uncaught exceptions in the main thread and terminate all workers.
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

    [Symbol.dispose]() {
        this.shutdown();
    }
}

/**
 * Entrypoint method for a thread pool thread, invoking the `processTask` callback whenever a task is available. This
 * function only exits once its associated queue is done adding new tasks and is empty. This function is only available
 * from a worker thread.
 */
export let runThread: (processTask: (name: string, arg: Shareable) => void) => void;

/**
 * Queue a new task in a background thread in the thread pool. This function is only available from a worker thread.
 */
export let queueWorkItem: (name: string, arg?: Shareable) => void;

const enum ThreadState {
    NotStarted,
    Running,
    Exited,
}

/**
 * Data structure representing the state of a thread pool thread.
 */
@Shared()
class Thread extends Tagged(SharedStructBase, Tag.Thread) {
    @Shared() private mutex = new Mutex();
    @Shared() private condition = new Condition();
    @Shared() private scheduler: TaskScheduler;
    @Shared() private queueId: number;
    @Shared() private generateCpuProfile: string | undefined;
    @Shared() state = ThreadState.NotStarted;

    constructor(scheduler: TaskScheduler, queueId: number, generateCpuProfile?: string) {
        super();
        this.scheduler = scheduler;
        this.queueId = queueId;
        this.generateCpuProfile = generateCpuProfile;
    }

    /**
     * Waiting for a thread to exit gracefully.
     */
    static join(self: Thread) {
        using lck = new UniqueLock(self.mutex);
        Condition.wait(self.condition, lck, () => self.state === ThreadState.Exited);
    }

    static {
        /**
         * The run loop for a thread pool thread. Whenever a task becomes available it is passed to `processTask` to be
         * handled by the thread.
         */
        function runLoop(thread: Thread, processTask: (name: string, arg: Shareable) => void) {
            let task: Task | undefined;
            while (task = TaskScheduler.takeTask(thread.scheduler, thread.queueId)) {
                processTask(task.name, task.arg);
            }
        }

        runThread = function (processTask) {
            Debug.assert(workerThreads?.isWorkerThread() && workerThreads.workerData instanceof Thread, "This function may only be called from a thread pool thread.");
            const thread = workerThreads.workerData;
            const started = ThreadState.NotStarted === Atomics.compareExchange(thread, "state", ThreadState.NotStarted, ThreadState.Running);
            Debug.assert(started, "Illegal operation. Thread already started by a different worker.");
            try {
                // assign the output deque for this thread's task queue.
                thread.scheduler.queues[thread.queueId].outputDeque = new Deque();

                // Enable CPU profiling for the thread, if it was requested.
                if (thread.generateCpuProfile && sys.enableCPUProfiler && sys.disableCPUProfiler) {
                    const dirname = getDirectoryPath(thread.generateCpuProfile);
                    const basename = getBaseFileName(thread.generateCpuProfile);
                    const extname = getAnyExtensionFromPath(basename);
                    const basenameNoExtension = removeExtension(basename, extname);
                    const cpuProfilePath = combinePaths(dirname, `${basenameNoExtension}-${workerThreads.threadId}${extname}`);
                    sys.enableCPUProfiler(cpuProfilePath, noop);
                    try {
                        runLoop(thread, processTask);
                    }
                    finally {
                        sys.disableCPUProfiler(noop);
                    }
                }
                else {
                    runLoop(thread, processTask);
                }
            }
            catch (e) {
                // Log the error to stdout. There is currently no other way to report the error, and no way to crash the
                // main thread from a worker.
                Debug.log.error(e);
            }
            finally {
                // mark the thread as exited and notify the thread that owns the thread pool to unblock any joins.
                thread.state = ThreadState.Exited;
                Condition.notify(thread.condition);
            }
        };

        queueWorkItem = function (name, arg) {
            Debug.assert(workerThreads?.isWorkerThread() && workerThreads.workerData instanceof Thread, "This function may only be called from a thread pool thread.");
            const thread = workerThreads.workerData;
            TaskScheduler.scheduleTask(thread.scheduler, new Task(name, arg));
        };
    }
}
