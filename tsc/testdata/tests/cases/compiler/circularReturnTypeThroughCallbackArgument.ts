// @strict: true,false
// @noEmit: true

declare function fan(g: () => number): number;

export function a(n: number) {
    return fan(() => a(n));
}

declare function fanAll(g: () => Promise<{ ok: boolean }>): Promise<{ ok: boolean }>;

export async function b(n: number) {
    if (n > 0) {
        return fanAll(() => b(n - 1));
    }
    return { ok: true };
}

type Result = { success: boolean; [key: string]: unknown };
interface Other { success: boolean; url: string }
declare function fanOut(generateOne: () => Promise<Result>): Promise<Result>;
declare const other: Other;

export async function c(n: number) {
    if (n) return other;
    return fanOut(() => c(n - 1));
}
