// @strict: true
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