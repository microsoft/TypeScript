//// [usingDeclarationsWithESClassDecorators.9.ts]
export {};

declare var dec: any;

@dec
export default class C {
}

void C;

using after = null;



//// [usingDeclarationsWithESClassDecorators.9.js]
@dec
export default class C {
}
void C;
using after = null;
