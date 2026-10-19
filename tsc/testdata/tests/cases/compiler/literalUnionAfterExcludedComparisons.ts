// @target: es2021
// @strict: true

type Runtime = "node" | "deno" | "bun";
function readRuntime(value: string): Runtime {
    if (value !== "node" && value !== "deno" && value !== "bun") {
        throw new Error();
    }
    return value;
}
