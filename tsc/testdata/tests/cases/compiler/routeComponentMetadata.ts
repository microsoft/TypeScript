// @strict: true
// @noEmit: true

type Component = (() => number) | ((() => number) & { readonly $$typeof: symbol });
type RouteComponent = Component & { preload?: () => Promise<void> };
declare function createRoute<Search = {}>(options: { component?: RouteComponent; validateSearch?: (search: unknown) => Search }): { useSearch(): Search };
declare const schema: { parse(search: unknown): { page: number } };
const route = createRoute({ component: () => 0, validateSearch: search => schema.parse(search) });
route.useSearch().page;
