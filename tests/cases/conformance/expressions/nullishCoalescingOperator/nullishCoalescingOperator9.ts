// @strict: true

declare let f: null | ((x: string) => void);

let g = f || (abc => { void abc.toLowerCase() })
let gg = f ?? (abc => { void abc.toLowerCase() })
