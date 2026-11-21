// @noEmit: true
// @noTypesAndSymbols: true
interface Constrained<T extends object> extends T {}
interface Unconstrained<T> extends T {}

interface Base { value: number }
interface Derived extends Base { value: string }
