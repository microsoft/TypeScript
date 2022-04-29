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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CoachMarkAnchorDecorator = /** @class */ (function () {
    function CoachMarkAnchorDecorator() {
    }
    CoachMarkAnchorDecorator.prototype.decorateComponent = function (anchor) {
        return /** @class */ (function (_super) {
            __extends(CoachMarkAnchor, _super);
            function CoachMarkAnchor() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._onAnchorRef = function (anchor) {
                    var anchorRef = _this.props.anchorRef;
                    if (anchorRef) {
                        anchorRef(anchor);
                    }
                };
                return _this;
            }
            return CoachMarkAnchor;
        }(Component));
    };
    return CoachMarkAnchorDecorator;
}());
