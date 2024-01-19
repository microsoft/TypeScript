// @strict: true
// @noEmit: true

// Based on @types/sinon v10

type MatchArguments<T> = {
    [K in keyof T]: T[K];
};

interface SinonSpyCallApi<TArgs extends any[] = any[]> {
    calledWith(...args: Partial<MatchArguments<TArgs>>): boolean;
}