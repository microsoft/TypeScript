export function nodeCreateRequire(path: string): (id: string) => any {
    /* eslint-disable no-restricted-globals */
    // If we're running in an environment that already has `require`, use it.
    // We're probably in bun or a bundler that provides `require` even within ESM.
    if (typeof require === "function" && typeof require.resolve === "function") {
        return id => {
            const p = require.resolve(id, { paths: [path] });
            return require(p);
        };
    }
    /* eslint-enable no-restricted-globals */

    // Otherwise, try and build a `require` function from the `module` module.
    if (typeof process === "undefined" || typeof process.getBuiltinModule !== "function") {
        throw new Error("process.getBuiltinModule is not supported in this environment.");
    }

    const mod = process.getBuiltinModule("node:module");
    if (!mod) throw new Error("missing node:module");
    return mod.createRequire(path);
}
