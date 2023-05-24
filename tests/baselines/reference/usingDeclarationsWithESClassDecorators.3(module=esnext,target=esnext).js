//// [usingDeclarationsWithESClassDecorators.3.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class C {
}

void C;

//// [usingDeclarationsWithESClassDecorators.3.js]
using before = null;
@dec
export default class C {
}
void C;
