import { combinePaths, getAnyExtensionFromPath, getBaseFileName, getDirectoryPath, isTaggedStruct, removeExtension, sys, Tag, Tagged } from "../_namespaces/ts";
import { isNodeLikeSystem, noop } from "../core";
import { Debug } from "../debug";
import { Deque } from "../sharing/collections/deque";
import { Shared, SharedStructBase } from "../sharing/structs/sharedStruct";
import { Worker, workerThreads, WorkerThreadsHost } from "../workerThreads";
import { Condition } from "./condition";
import { Mutex } from "./mutex";
import { SpinWait } from "./spinWait";
import { UniqueLock } from "./uniqueLock";

const WORK_STEALING = true;
const PER_THREAD_QUEUE = true;

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

@Shared()
class TaskQueue extends SharedStructBase {
    @Shared() private mutex = new Mutex();
    @Shared() private condition = new Condition();
    @Shared() private dequeue = new Deque<Task>();
    @Shared() done = false;

    static tryDequeue(self: TaskQueue) {
        return Deque.popBottom(self.dequeue);
    }

    static dequeue(self: TaskQueue) {
        const done = self.done;
        const task = TaskQueue.tryDequeue(self);
        if (task || done) {
            return task;
        }

        using lck = new UniqueLock(self.mutex);
        while (true) {
            const done = self.done;
            const task = TaskQueue.tryDequeue(self);
            if (task || done) {
                return task;
            }
            Condition.wait(self.condition, lck);
        }
    }

    static steal(self: TaskQueue) {
        return Deque.steal(self.dequeue);
    }

    static enqueue(self: TaskQueue, task: Task) {
        Debug.assert(!self.done);
        Deque.pushBottom(self.dequeue, task);
        Condition.notify(self.condition, 1);
    }

    static done(self: TaskQueue) {
        self.done = true;
        Condition.notify(self.condition);
    }
}

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

    static shutdown(self: TaskScheduler) {
        const queueCount = self.queues.length;
        for (let i = 0; i < queueCount; i++) {
            TaskQueue.done(self.queues[i]);
        }
    }

    static scheduleTask(self: TaskScheduler, task: Task) {
        const queueCount = self.queues.length;
        const spin = new SpinWait();

        let queueId: number;
        while (true) {
            const previousValue = Atomics.load(self, "nextTaskId");
            const nextValue = (previousValue + 1) >>> 0;
            if (Atomics.compareExchange(self, "nextTaskId", previousValue, nextValue) === previousValue) {
                queueId = previousValue % queueCount;
                break;
            }
            spin.spinOnce();
        }

        TaskQueue.enqueue(self.queues[queueId], task);
        // TODO: wake all queues to steal work?
    }

    static takeTask(self: TaskScheduler, queueId: number) {
        const queues = self.queues;

        // first, try to take work from our queue
        const done = queues[queueId].done;
        const task = TaskQueue.tryDequeue(queues[queueId]);
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

        // finally, if that fails, perform a blocking dequeue on our queue
        return TaskQueue.dequeue(queues[queueId]);
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
     * Immediately stop all threads in the thread pool and wait for them to terminate.
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

    static join(self: Thread) {
        using lck = new UniqueLock(self.mutex);
        Condition.wait(self.condition, lck, () => self.state === ThreadState.Exited);
    }

    static [Symbol.hasInstance](value: unknown) {
        return isTaggedStruct(value, Tag.Thread);
    }

    static {
        function runLoop(thread: Thread, processTask: (name: string, arg: Shareable) => void) {
            let task: Task | undefined;
            while (task = TaskScheduler.takeTask(thread.scheduler, thread.queueId)) {
                processTask(task.name, task.arg);
            }
        }

        runThread = function (processTask) {
            Debug.assert(workerThreads?.isWorkerThread() && workerThreads.workerData instanceof Thread, "This function may only be called from a thread pool thread.");
            const thread = workerThreads.workerData;

            const state = thread.state;
            Debug.assert(state === ThreadState.NotStarted);
            Debug.assert(state === Atomics.compareExchange(thread, "state", state, ThreadState.Running));
            try {
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
                Debug.log.trace(e);
            }
            finally {
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
