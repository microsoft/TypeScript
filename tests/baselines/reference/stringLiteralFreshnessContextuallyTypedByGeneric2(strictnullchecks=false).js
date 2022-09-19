//// [stringLiteralFreshnessContextuallyTypedByGeneric2.ts]
type Model = { s: string; b: boolean }
declare let pick: <Keys extends keyof Model>(properties: readonly Keys[]) => Pick<Model, Keys>
declare let transform1: <T>(obj: T) => T
declare let transform2: <T extends {}>(obj: T) => T

const result1 = transform1(pick(["s"]))
const result2 = transform2(pick(["s"]))

const intermediate = pick(["s"])
const result3 = transform1(intermediate)


//// [stringLiteralFreshnessContextuallyTypedByGeneric2.js]
var result1 = transform1(pick(["s"]));
var result2 = transform2(pick(["s"]));
var intermediate = pick(["s"]);
var result3 = transform1(intermediate);
