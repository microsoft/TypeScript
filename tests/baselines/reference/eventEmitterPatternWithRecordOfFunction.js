//// [eventEmitterPatternWithRecordOfFunction.ts]
interface A {
    emit(event: string, ...args: any[]): boolean;
}

type Args<F> = F extends (...args: infer A) => void ? A : never;

type EventMap = Record<string, Function>;

interface B<M extends EventMap> extends A {
    emit<Event extends keyof M>(event: Event, ...args: Args<M[Event]>): boolean;
}

//// [eventEmitterPatternWithRecordOfFunction.js]
"use strict";
