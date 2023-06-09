//// [tests/cases/compiler/conditionalTypeClassMembers.ts] ////

//// [conditionalTypeClassMembers.ts]
declare class MyRecord {
    private a();
    b(): unknown;
}

declare class MySet<TSet extends MyRecord> {
    public item(): TSet;
}

type DS<TRec extends MyRecord | { [key: string]: unknown }> = TRec extends MyRecord ? MySet<TRec> : TRec[];

//// [conditionalTypeClassMembers.js]
