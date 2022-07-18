// If Table is non generic error does not occur
declare class TableClass<S = any>  {
    _field: S
}

export type Table = TableClass;

function fn<T extends Table>(o: T) {
    return o instanceof TableClass // error in 4.8
}

declare const o: Table;
o instanceof TableClass // This is ok 
