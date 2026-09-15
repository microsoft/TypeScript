// @strict: true
// @noEmit: true

declare function anyRecord<T extends Record<string, any>>(value: T): T;
declare function unknownRecord<T extends Record<string, unknown>>(value: T): T;
declare function numberRecord<T extends Record<string, number>>(value: T): T;

const a = anyRecord({
    value: "",
    get next() {
        return a;
    },
});

const u = unknownRecord({
    value: "",
    get next() {
        return u;
    },
});

const anyValue: string = a.next.next.value;
const unknownValue: string = u.next.next.value;
const wrongAnyValue: number = a.next.next.value;
const wrongUnknownValue: number = u.next.next.value;
a.next.next.missing;
u.next.next.missing;

numberRecord({
    get value() {
        return "";
    },
});

const circular = unknownRecord({
    get next() {
        return circular.next;
    },
});
