//// [usingDeclarationsWithLegacyClassDecorators.6.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}

export { C as D };

//// [usingDeclarationsWithLegacyClassDecorators.6.js]
using before = null;
let C = class C {
};
C = __decorate([
    dec
], C);
export { C as D };
