// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: src/component.ts
export function FunctionComponent(props: { x: number; y: number; z: number; }) {
    return null;
}
FunctionComponent.args = { x: 3, y: 4, z: 5 };

export const ArrowComponent = (props: { x: number; y: number; z: number; }) => {
    return null;
}
ArrowComponent.args = { x: 5, y: 12, z: 13 };

// @filename: src/main.js
import { FunctionComponent, ArrowComponent } from './component.js'

const FunctionComponentAlias = FunctionComponent;
const ArrowComponentAlias = ArrowComponent;

export default { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };
export { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };

// @filename: src/main2.ts
import { FunctionComponent, ArrowComponent } from './component.js'

const FunctionComponentAlias = FunctionComponent;
const ArrowComponentAlias = ArrowComponent;

export default { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };
export { FunctionComponent, ArrowComponent, FunctionComponentAlias, ArrowComponentAlias };