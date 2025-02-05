// @declaration: true
// @target: esNext
// @strict: true

export class T {
    static readonly "\t" = Symbol()
}

export let x = { [T['\t']]: 1 }
