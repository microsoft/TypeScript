//// [conditionalTypesASI.ts]
// Repro from #21637

interface JSONSchema4 {
  a?: number
  extends?: string | string[]
}


//// [conditionalTypesASI.js]
// Repro from #21637


//// [conditionalTypesASI.d.ts]
interface JSONSchema4 {
    a?: number;
    extends?: string | string[];
}
