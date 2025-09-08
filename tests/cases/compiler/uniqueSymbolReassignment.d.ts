declare function myFunction(): void;
declare namespace myFunction {
    const mySymbol: unique symbol;
    const anotherUnique: unique symbol;
    var nonUnique1: typeof nonUniqueSymbol1;
    var nonUnique2: typeof nonUniqueSymbol2;
    var normalVar: string;
    var symbolName: string;
}
declare const nonUniqueSymbol1: unique symbol;
declare const nonUniqueSymbol2: unique symbol;
export { myFunction };
