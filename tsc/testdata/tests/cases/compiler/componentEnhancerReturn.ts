// @strict: true
// @noEmit: true

type Component = ((props: number) => number) | (new (props: number) => object);
type App = Component & { getInitialProps?: () => object };
declare function render(enhance: (app: App) => App): void;
render(app => props => props);

interface RenderPlugin { enhance(app: Component): (props: number) => number }
declare const plugins: RenderPlugin[];
render(app => plugins.reduce((result, plugin) => plugin.enhance(result), app));
