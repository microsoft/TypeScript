// regression for https://github.com/microsoft/TypeScript/issues/32928
// Callable
type F = (...args: any[]) => any;
// Callable but intersected
type F2 = F & { inject?: string[] }

declare const a: string | F2

if (typeof a == 'function') {
    // only F2
    a
} else {
    // Should be only a string
    a
}