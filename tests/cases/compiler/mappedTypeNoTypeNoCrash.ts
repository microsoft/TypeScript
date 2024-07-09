// @declaration: true
type T0<T> = ({[K in keyof T]}) extends ({[key in K]: T[K]}) ? number : never;