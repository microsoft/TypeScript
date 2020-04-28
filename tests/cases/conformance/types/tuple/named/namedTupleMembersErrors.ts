// @declaration: true

export type Segment1 = [length: number, number]; // partially named, disallowed

export type List = [item: any, ...any];  // partially named, disallowed

export type Pair = [item: any, any?];  // partially named, disallowed

export type Opt = [element?: string]; // question mark on name disallowed

export type Trailing =  [first: string, ...rest: string[]] // dots on name disallowed