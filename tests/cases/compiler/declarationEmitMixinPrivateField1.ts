// @target: esnext
// @declaration: true
// @filename: first.ts
declare function mix<TMix>(mixin: TMix): TMix;

const DisposableMixin = class {
    #onDispose() {}
};

export default mix(DisposableMixin);
export class Monitor extends mix(DisposableMixin) {}

// @filename: another.ts
declare function mix<TMix>(mixin: TMix): TMix;

const DisposableMixin = class {
    #onDispose() {}
};

export default class extends mix(DisposableMixin) {}
