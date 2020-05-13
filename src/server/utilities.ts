/* @internal */
namespace ts.server {
    export class ThrottledOperations {
        private readonly pendingTimeouts: Map<any> = createMap<any>();
        private readonly logger?: Logger | undefined;
        constructor(private readonly host: ServerHost, logger: Logger) {
            this.logger = logger.hasLevel(LogLevel.verbose) ? logger : undefined;
        }

        /**
         * Wait `number` milliseconds and then invoke `cb`.  If, while waiting, schedule
         * is called again with the same `operationId`, cancel this operation in favor
         * of the new one.  (Note that the amount of time the canceled operation had been
         * waiting does not affect the amount of time that the new operation waits.)
         */
        public schedule(operationId: string, delay: number, cb: () => void) {
            const pendingTimeout = this.pendingTimeouts.get(operationId);
            if (pendingTimeout) {
                // another operation was already scheduled for this id - cancel it
                this.host.clearTimeout(pendingTimeout);
            }
            // schedule new operation, pass arguments
            this.pendingTimeouts.set(operationId, this.host.setTimeout(ThrottledOperations.run, delay, this, operationId, cb));
            if (this.logger) {
                this.logger.info(`Scheduled: ${operationId}${pendingTimeout ? ", Cancelled earlier one" : ""}`);
            }
        }

        public cancel(operationId: string) {
            const pendingTimeout = this.pendingTimeouts.get(operationId);
            if (!pendingTimeout) return false;
            this.host.clearTimeout(pendingTimeout);
            return this.pendingTimeouts.delete(operationId);
        }

        private static run(self: ThrottledOperations, operationId: string, cb: () => void) {
            perfLogger.logStartScheduledOperation(operationId);
            self.pendingTimeouts.delete(operationId);
            if (self.logger) {
                self.logger.info(`Running: ${operationId}`);
            }
            cb();
            perfLogger.logStopScheduledOperation();
        }
    }

    export class GcTimer {
        private timerId: any;
        constructor(private readonly host: ServerHost, private readonly delay: number, private readonly logger: Logger) {
        }

        public scheduleCollect() {
            if (!this.host.gc || this.timerId !== undefined) {
                // no global.gc or collection was already scheduled - skip this request
                return;
            }
            this.timerId = this.host.setTimeout(GcTimer.run, this.delay, this);
        }

        private static run(self: GcTimer) {
            self.timerId = undefined;

            perfLogger.logStartScheduledOperation("GC collect");
            const log = self.logger.hasLevel(LogLevel.requestTime);
            const before = log && self.host.getMemoryUsage!(); // TODO: GH#18217

            self.host.gc!(); // TODO: GH#18217
            if (log) {
                const after = self.host.getMemoryUsage!(); // TODO: GH#18217
                self.logger.perftrc(`GC::before ${before}, after ${after}`);
            }
            perfLogger.logStopScheduledOperation();
        }
    }

    export function getBaseConfigFileName(configFilePath: NormalizedPath): "tsconfig.json" | "jsconfig.json" | undefined {
        const base = getBaseFileName(configFilePath);
        return base === "tsconfig.json" || base === "jsconfig.json" ? base : undefined;
    }

    export function removeSorted<T>(array: SortedArray<T>, remove: T, compare: Comparer<T>): void {
        if (!array || array.length === 0) {
            return;
        }

        if (array[0] === remove) {
            array.splice(0, 1);
            return;
        }

        const removeIndex = binarySearch(array, remove, identity, compare);
        if (removeIndex >= 0) {
            array.splice(removeIndex, 1);
        }
    }

    const indentStr = "\n    ";

    export function indent(str: string): string {
        return indentStr + str.replace(/\n/g, indentStr);
    }

    /** Put stringified JSON on the next line, indented. */
    export function stringifyIndented(json: {}): string {
        return indentStr + JSON.stringify(json);
    }
}
