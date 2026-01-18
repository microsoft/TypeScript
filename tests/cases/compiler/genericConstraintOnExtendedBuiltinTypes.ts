declare namespace EndGate {
    export interface ICloneable {
        Clone(): any;
    }
}

interface Number extends EndGate.ICloneable { }

namespace EndGate.Tweening {
    export class Tween<T extends ICloneable>{
        private _from: T;


        constructor(from: T) {
            this._from = from.Clone();
        }
    }
}

namespace EndGate.Tweening {
    export class NumberTween extends Tween<number>{
        constructor(from: number) {
            super(from);
        }
    }
}