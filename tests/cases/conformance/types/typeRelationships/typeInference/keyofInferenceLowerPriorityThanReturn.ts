// #22736
declare class Write {
    protected dummy: Write;
}

declare class Col<s, a> {
    protected dummy: [Col<s, a>, s, a];
}

declare class Table<Req, Def> {
    protected dummy: [Table<Req, Def>, Req, Def];
}

type MakeTable<T1 extends object, T2 extends object> = {
    [P in keyof T1]: Col<Write, T1[P]>;
} & {
        [P in keyof T2]: Col<Write, T2[P]>;
    };

declare class ConflictTarget<Cols> {
    public static tableColumns<Cols>(cols: (keyof Cols)[]): ConflictTarget<Cols>;
    protected dummy: [ConflictTarget<Cols>, Cols];
}



const bookTable: Table<BookReq, BookDef> = null as any

interface BookReq {
    readonly title: string;
    readonly serial: number;
}

interface BookDef {
    readonly author: string;
    readonly numPages: number | null;
}


function insertOnConflictDoNothing<Req extends object, Def extends object>(_table: Table<Req, Def>, _conflictTarget: ConflictTarget<Req & Def>): boolean {
    throw new Error();
}

function f() {
    insertOnConflictDoNothing(bookTable, ConflictTarget.tableColumns(["serial"]));  // <-- No error here; should use the type inferred for the return type of `tableColumns`
}
