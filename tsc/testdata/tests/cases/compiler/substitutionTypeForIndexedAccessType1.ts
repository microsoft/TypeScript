// @target: es2015
type AddPropToObject<Obj extends object, Prop extends string> = Prop extends keyof Obj
  ? Obj[Prop] extends unknown[]
    ? [...Obj[Prop]]
    : never
  : never