// @strict: true
// @noEmit: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/65654

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Table = `t${Digit}${Digit}`; // 100 tables
type TableColumn<T extends Table> = "id" | "name" | `${T}_c${Digit}`; // 12 columns per table

type ColumnMap = { [T in Table]: TableColumn<T> };
interface Columns extends ColumnMap {}
type Column = TableColumn<Table>;
type ColumnFor<T extends Table> = Columns[T];

declare function parent<C extends Column | undefined>(column?: C): C;

export function parentOf<T extends Table>(column: ColumnFor<T>) {
    return parent(column);
}
