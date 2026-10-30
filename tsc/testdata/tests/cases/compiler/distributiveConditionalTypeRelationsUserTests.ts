// @strict: true
// @exactOptionalPropertyTypes: true
// @target: esnext
// @noEmit: true

namespace Inquirer {
    type Answer<R extends boolean> = R extends true ? number : number | undefined;

    export function answer<R extends boolean>(validate: (value: Answer<R>) => boolean, value: number) {
        return validate(value);
    }
}

namespace VSCode {
    interface Separator {
        separator: true;
    }

    export class QuickPick<T, O extends { useSeparators: boolean }> {
        private items: O extends { useSeparators: true } ? (T | Separator)[] : T[] = [];
    }
}

namespace Fabric {
    type Easing<T> = T extends number[]
        ? (time: number, start: number, delta: number, duration: number, index: number) => number
        : (time: number, start: number, delta: number, duration: number) => number;

    const defaultEasing = (time: number, start: number, delta: number, duration: number) => start;

    export function easing<T extends number | number[]>(): Easing<T> {
        return defaultEasing;
    }
}

namespace Supabase {
    interface Row {
        id: number;
        columns?: string[];
    }

    type Selected<T extends boolean | undefined> = T extends true ? Row : Omit<Row, "columns">;

    export function rows<T extends boolean | undefined>(value: Row[]): Selected<T>[] {
        return value;
    }
}

namespace Lexical {
    class Slot {
        value = 0;
    }

    class ElementSlot extends Slot {
        element = true;
        withAfter(): ElementSlot {
            return this;
        }
    }

    class BaseNode {
        node = true;
    }

    type SlotForNode<N extends BaseNode> = N extends ElementNode ? ElementSlot : Slot;
    declare function getSlot<N extends BaseNode>(node: N): SlotForNode<N>;

    export class ElementNode extends BaseNode {
        element = true;
        refresh() {
            let slot = getSlot(this);
            slot = slot.withAfter();
        }
    }
}

namespace LobeHub {
    type RequestResult<Data, Throw extends boolean> = Throw extends true ? Promise<Data> : Promise<Data | undefined>;

    export const request: <Data, Throw extends boolean>(
        data: Data,
        flag: Throw,
    ) => RequestResult<Data, Throw> = async (data, flag) => data;
}

namespace Effect {
    interface Box<T> {
        value: T;
    }

    type With<S extends Iterable<any>, T> = S extends readonly [any, ...any[]] ? [T, ...T[]] : T[];

    export function join<A extends Iterable<Box<any>>>(
        value: [any, ...any[]],
    ): With<A, A extends Iterable<Box<infer T>> ? T : never> {
        return value;
    }

    type Result<T> = [T] extends [Box<infer U>] ? Box<U> : never;

    export function result<T extends Box<any>>(value: Box<any>): Result<T> {
        return value;
    }
}

namespace NonDistributive {
    export function answer<R extends boolean>(value: number): [R] extends [true] ? number : number | undefined {
        return value;
    }

    export function items<T, O extends { useSeparators: boolean }>():
        [O] extends [{ useSeparators: true }] ? (T | { separator: true })[] : T[] {
        return [];
    }
}
