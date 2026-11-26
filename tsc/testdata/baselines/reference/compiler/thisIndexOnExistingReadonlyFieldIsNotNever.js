//// [tests/cases/compiler/thisIndexOnExistingReadonlyFieldIsNotNever.ts] ////

//// [thisIndexOnExistingReadonlyFieldIsNotNever.ts]
declare class Component<P, S = {}> {
    readonly props: Readonly<{ children?: unknown }> & Readonly<P>;
    state: Readonly<S>;
}
interface CoachMarkAnchorProps<C> {
    anchorRef?: (anchor: C) => void;
}
type AnchorType<P> = Component<P>;

class CoachMarkAnchorDecorator {
    decorateComponent<P>(anchor: P) {
        return class CoachMarkAnchor extends Component<CoachMarkAnchorProps<AnchorType<P>> & P, {}> {
            private _onAnchorRef = (anchor: AnchorType<P>) => {
                const anchorRef = this.props.anchorRef;
                if (anchorRef) {
                    anchorRef(anchor);
                }
            }
        };
    }
}


//// [thisIndexOnExistingReadonlyFieldIsNotNever.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class CoachMarkAnchorDecorator {
    decorateComponent(anchor) {
        return class CoachMarkAnchor extends Component {
            constructor() {
                super(...arguments);
                this._onAnchorRef = __setFunctionName((anchor) => {
                    const anchorRef = this.props.anchorRef;
                    if (anchorRef) {
                        anchorRef(anchor);
                    }
                }, "_onAnchorRef");
            }
        };
    }
}
