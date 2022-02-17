//// [substitutionTypeForIndexedAccessType1.ts]
type AddPropToObject<Obj extends object, Prop extends string> = Prop extends keyof Obj
  ? Obj[Prop] extends unknown[]
    ? [...Obj[Prop]]
    : never
  : never

//// [substitutionTypeForIndexedAccessType1.js]
