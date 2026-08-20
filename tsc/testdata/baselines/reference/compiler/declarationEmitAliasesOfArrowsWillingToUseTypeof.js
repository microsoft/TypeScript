//// [tests/cases/compiler/declarationEmitAliasesOfArrowsWillingToUseTypeof.ts] ////

//// [component.ts]
export function FunctionComponent(props: { x: number; y: number; z: number; }) {
    return null;
}
FunctionComponent.args = { x: 3, y: 4, z: 5 };

export const ArrowComponent = (props: { x: number; y: number; z: number; }) => {
    return null;
}
ArrowComponent.args = { x: 5, y: 12, z: 13 };

//// [main.js]
import { FunctionComponent, ArrowComponent } from './component.js'

const FunctionComponentAlias = FunctionComponent;
const ArrowComponentAlias = ArrowComponent;

export default { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };
export { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };

//// [main2.ts]
import { FunctionComponent, ArrowComponent } from './component.js'

const FunctionComponentAlias = FunctionComponent;
const ArrowComponentAlias = ArrowComponent;

export default { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };
export { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };



//// [component.d.ts]
export declare function FunctionComponent(props: {
    x: number;
    y: number;
    z: number;
}): null;
export declare namespace FunctionComponent {
    var args: {
        x: number;
        y: number;
        z: number;
    };
}
export declare function ArrowComponent(props: {
    x: number;
    y: number;
    z: number;
}): null;
export declare namespace ArrowComponent {
    var args: {
        x: number;
        y: number;
        z: number;
    };
}
//// [main.d.ts]
import { FunctionComponent, ArrowComponent } from './component.js';
declare const FunctionComponentAlias: typeof FunctionComponent;
declare const ArrowComponentAlias: typeof ArrowComponent;
declare const _default: {
    FunctionComponent: typeof FunctionComponent;
    ArrowComponent: typeof ArrowComponent;
    FunctionComponentAlias: typeof FunctionComponent;
    ArrowComponentAlias: typeof ArrowComponent;
};
export default _default;
export { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };
//// [main2.d.ts]
import { FunctionComponent, ArrowComponent } from './component.js';
declare const FunctionComponentAlias: typeof FunctionComponent;
declare const ArrowComponentAlias: typeof ArrowComponent;
declare const _default: {
    FunctionComponent: typeof FunctionComponent;
    ArrowComponent: typeof ArrowComponent;
    FunctionComponentAlias: typeof FunctionComponent;
    ArrowComponentAlias: typeof ArrowComponent;
};
export default _default;
export { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };
