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
class CoachMarkAnchorDecorator {
    decorateComponent(anchor) {
        return class CoachMarkAnchor extends Component {
            _onAnchorRef = (anchor) => {
                const anchorRef = this.props.anchorRef;
                if (anchorRef) {
                    anchorRef(anchor);
                }
            };
        };
    }
}
