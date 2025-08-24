//// [tests/cases/compiler/declarationEmitMixinPrivateField1.ts] ////

//// [first.ts]
declare function mix<TMix>(mixin: TMix): TMix;

const DisposableMixin = class {
    #onDispose() {}
};

export default mix(DisposableMixin);
export class Monitor extends mix(DisposableMixin) {}

//// [another.ts]
declare function mix<TMix>(mixin: TMix): TMix;

const DisposableMixin = class {
    #onDispose() {}
};

export default class extends mix(DisposableMixin) {}


//// [first.js]
const DisposableMixin = class {
    #onDispose() { }
};
export default mix(DisposableMixin);
export class Monitor extends mix(DisposableMixin) {
}
//// [another.js]
const DisposableMixin = class {
    #onDispose() { }
};
export default class extends mix(DisposableMixin) {
}
