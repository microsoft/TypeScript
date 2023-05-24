//// [usingDeclarationsWithESClassDecorators.8.ts]
export {};

declare var dec: any;

@dec
export class C {
}

using after = null;


//// [usingDeclarationsWithESClassDecorators.8.js]
@dec
export class C {
}
using after = null;
