// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62606

interface DerivedTable<S extends { base: any; new: any }> {
    // Error disappears when these property declarations are reversed
    schema: S["base"] & S["new"]
    readonlySchema: Readonly<S["base"] & S["new"]>
}

interface Base { baseProp: number; }
interface New  { newProp: boolean; }

declare const source: DerivedTable<{ base: Base, new: New }>
const destination: DerivedTable<{ base: Base; new: New & Base }> = source; // Error
