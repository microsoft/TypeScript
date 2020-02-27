//// [spreadOfObjectLiteralAssignableToIndexSignature.ts]
const foo: Record<never, never> = {} // OK

interface RecordOfRecords extends Record<keyof any, RecordOfRecords> {}
const recordOfRecords: RecordOfRecords = {}
recordOfRecords.propA = {...(foo !== undefined ? {foo} : {})} // OK
recordOfRecords.propB = {...(foo && {foo})} // OK
recordOfRecords.propC = {...(foo !== undefined && {foo})} // error'd in 3.7 beta, should be OK

interface RecordOfRecordsOrEmpty extends Record<keyof any, RecordOfRecordsOrEmpty | {}> {}
const recordsOfRecordsOrEmpty: RecordOfRecordsOrEmpty = {}
recordsOfRecordsOrEmpty.propA = {...(foo !== undefined ? {foo} : {})} // OK
recordsOfRecordsOrEmpty.propB = {...(foo && {foo})} // OK
recordsOfRecordsOrEmpty.propC = {...(foo !== undefined && {foo})} // OK

//// [spreadOfObjectLiteralAssignableToIndexSignature.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var foo = {}; // OK
var recordOfRecords = {};
recordOfRecords.propA = __assign({}, (foo !== undefined ? { foo: foo } : {})); // OK
recordOfRecords.propB = __assign({}, (foo && { foo: foo })); // OK
recordOfRecords.propC = __assign({}, (foo !== undefined && { foo: foo })); // error'd in 3.7 beta, should be OK
var recordsOfRecordsOrEmpty = {};
recordsOfRecordsOrEmpty.propA = __assign({}, (foo !== undefined ? { foo: foo } : {})); // OK
recordsOfRecordsOrEmpty.propB = __assign({}, (foo && { foo: foo })); // OK
recordsOfRecordsOrEmpty.propC = __assign({}, (foo !== undefined && { foo: foo })); // OK
