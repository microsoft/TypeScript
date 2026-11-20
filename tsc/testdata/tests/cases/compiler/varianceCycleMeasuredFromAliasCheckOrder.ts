// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst

// Settings, Hover and Renderer refer to each other. Relating two
// instantiations of Hover measures the variances of the cycle starting
// from Hover, and whether a Renderer<NodeAttrs> is a Renderer must not
// depend on whether the types were requested before (64635).

type Attrs = { [name: string]: any };

interface Settings<N extends Attrs = Attrs, E extends Attrs = Attrs> {
    hover: Hover<N, E>;
    reducer: (data: N) => void;
    program: (renderer: Renderer<N, E>) => void;
}
interface Renderer<N extends Attrs = Attrs, E extends Attrs = Attrs> {
    getSettings(): Settings<N, E>;
}
type Hover<N extends Attrs = Attrs, E extends Attrs = Attrs> = (settings: Settings<N, E>) => void;

type NodeAttrs = { x: number };

declare const hover: Hover<NodeAttrs>;
const h: Hover<NodeAttrs, {}> = hover;

declare function fit(renderer: Renderer): void;
declare const renderer: Renderer<NodeAttrs>;
fit(renderer);
