// ==ORIGINAL==
// ==NO CHANGES==
declare module 'mod1' {
    declare export type P = {|
    |};
    declare export type F = {|
        ...$Exact<Node>,
        await?: Span,
    |};
    declare export type S = {|
    |};
    declare export type C = {|
    |};
}

declare module 'mod2' {
    import type {
        U,
    } from 'mod1';
}