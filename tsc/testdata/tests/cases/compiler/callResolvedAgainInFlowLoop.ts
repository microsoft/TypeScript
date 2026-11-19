// @strict: true
// @noEmit: true
// @target: esnext
// @checkOrder: default, typesfirst, editorfirst

// Destructuring func in the loop reads its declared type, which reaches the
// assignment of the call below it, so the call is resolved again while it
// is being resolved, from flow analysis of the loop (seen in a repro of
// 60130).

declare function inferStuff<T>(arg: T, checkStuff?: boolean): T;

export function test(lines: string[]): string[] {
    let func: { name: string } | null = null;

    for (const _ of lines) {
        if (Math.random() < 0.5) {
            func = { name: "qwer" };
        } else {
            if (func) {
                const { name } = func;
                func = inferStuff({ name: "other" }, name === "abc");
            }
        }
    }

    return lines;
}
