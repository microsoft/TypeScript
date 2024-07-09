// @declaration: true
// @filename: first.ts
declare function mix<TMix>(mixin: TMix): TMix;

const DisposableMixin = class {
    protected _onDispose() {
        this._assertIsStripped()
    }
    private _assertIsStripped() {
    }
};

// No error, but definition is wrong. 
export default mix(DisposableMixin);
export class Monitor extends mix(DisposableMixin) {
    protected _onDispose() {
    }
}

// @filename: another.ts
declare function mix<TMix>(mixin: TMix): TMix;

const DisposableMixin = class {
    protected _onDispose() {
        this._assertIsStripped()
    }
    private _assertIsStripped() {
    }
};

export default class extends mix(DisposableMixin) {
    protected _onDispose() {
    }
}