// @strictFunctionTypes: true
// @noEmit: true

declare let f: (...args: [x: number]) => void;
declare let g: (a: string) => void;
f = g;
