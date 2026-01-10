var v = 3;
var v2: typeof v = v;
var v3: string = v2; // Not assignment compatible

interface I<T> { x: T; }
interface J { }

declare var numberJ: typeof J; //Error, cannot reference type in typeof
declare var numberI: I<typeof v2>;

declare var fun: () => I<number>;
numberI = fun();