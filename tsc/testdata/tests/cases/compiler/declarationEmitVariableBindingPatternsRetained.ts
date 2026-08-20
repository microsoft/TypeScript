// @declaration: true
const func = () => "ok"
const b = { a: func }
export const { a } = b
export const { a: q } = b