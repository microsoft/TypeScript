//// [tests/cases/compiler/narrowDestructuredVariables.ts] ////

//// [narrowDestructuredVariables.ts]
interface Ref<T> { current: T };
type ToRefs<T> = { [K in keyof T]: Ref<T[K]> };
declare function toRefs<T>(o: T): ToRefs<T>;

interface DataPrepared {
    prepared: true
    payload: string
};

interface DataPending {
    prepared: false
    payload: null
};

type Data = DataPrepared | DataPending;

declare function isDataRefsPrepared(refs: ToRefs<Data>): refs is ToRefs<DataPrepared>;

declare const data: Data;
const dataRefs = toRefs(data);
const { prepared, payload } = dataRefs;

if (prepared.current) {
    prepared.current;
    payload.current;
    data.prepared;
    data.payload;
}

if (isDataRefsPrepared(dataRefs)) {
    prepared.current;
    payload.current;
    data.prepared;
    data.payload;
}

if (data.prepared) {
    prepared.current;
    payload.current;
    data.prepared;
    data.payload;
}


//// [narrowDestructuredVariables.js]
"use strict";
;
;
;
const dataRefs = toRefs(data);
const { prepared, payload } = dataRefs;
if (prepared.current) {
    prepared.current;
    payload.current;
    data.prepared;
    data.payload;
}
if (isDataRefsPrepared(dataRefs)) {
    prepared.current;
    payload.current;
    data.prepared;
    data.payload;
}
if (data.prepared) {
    prepared.current;
    payload.current;
    data.prepared;
    data.payload;
}
