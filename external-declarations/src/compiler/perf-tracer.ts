export const tracer: {
    current: undefined | {
        times: Record<string, number>;
        increment(name: string): void;
        start(name: string): void;
        end(name: string): void;
    };
} = {
    current: undefined
};

export function installTracer() {
    const times: Record<string, number> = {};
    const startTimes: Record<string, number | undefined> = {};
    tracer.current = {
        times,
        start(name: string) {
            startTimes[name] = Date.now();
        },
        increment(name: string) {
            times[name] = (times[name] ?? 0) + 1;
        },
        end(name: string) {
            times[name] =  (times[name] ?? 0) +
                (Date.now() - (startTimes[name] ?? Date.now()));
            startTimes[name] = undefined;
        },
    };
}