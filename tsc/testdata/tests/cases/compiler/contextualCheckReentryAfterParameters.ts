// @strict: true
// @noEmit: true

// Instantiating the type predicate inside the nested callback re-enters the
// contextual check of the enclosing functions through their outer type
// parameters. That must not discard the parameter types assigned to them.

type Surface = { id: string; kind: "file"; path: string } | { id: string; kind: "terminal" };
interface Panel {
    surfaces: Surface[];
}
interface Store {
    panel: Panel;
    openFile: (path: string) => void;
    close: (id: string) => void;
}
type Creator<T> = (set: (update: (state: T) => Partial<T>) => void) => T;
declare function create<T>(init: Creator<T>): T;
declare function wrap<T>(init: Creator<T>): Creator<T>;

const update = (state: Store, updater: (current: Panel) => Panel): Partial<Store> => ({ panel: updater(state.panel) });

export const store = create<Store>(wrap((set) => ({
    panel: { surfaces: [] },
    openFile: (path) =>
        set((state) =>
            update(state, (current) => {
                const existing = current.surfaces.find(
                    (surface): surface is Extract<Surface, { kind: "file" }> => surface.kind === "file" && surface.path === path,
                );
                return existing ? current : { surfaces: [...current.surfaces, { id: path, kind: "file", path }] };
            })
        ),
    close: (id) =>
        set((state) =>
            update(state, (current) => {
                const index = current.surfaces.findIndex((entry) => entry.id === id);
                return { surfaces: current.surfaces.slice(index) };
            })
        ),
})));
