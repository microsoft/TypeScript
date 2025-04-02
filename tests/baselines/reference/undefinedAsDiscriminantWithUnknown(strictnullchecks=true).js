//// [tests/cases/compiler/undefinedAsDiscriminantWithUnknown.ts] ////

//// [undefinedAsDiscriminantWithUnknown.ts]
type S = 
| { type: 'string', value: string } 
| { type: 'number', value: number } 
| { type: 'unknown', value: unknown }
| { value: undefined };

declare var s: S

if (s.value !== undefined) {
  s;
}
else {
  s;
}

//// [undefinedAsDiscriminantWithUnknown.js]
if (s.value !== undefined) {
    s;
}
else {
    s;
}
