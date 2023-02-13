// @strict: true
// @noEmit: true

// Repro from #52575

export interface Event<T> {
    callback: (response: T) => void;
    nested: {
        nestedCallback: (response: T) => void;
    }
}

export type CustomEvents = {
    a: Event<string>
    b: Event<number>
};

declare function emit<T extends keyof CustomEvents>(type: T, data: CustomEvents[T]): void

emit('a', {
    callback: (r) => {},
    nested: {
        nestedCallback: (r) => {},
    },
});
