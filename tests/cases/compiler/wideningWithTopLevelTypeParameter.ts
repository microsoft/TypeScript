// @strict: true
// @noEmit: true

class FormControl<T> {
    constructor(t: T extends undefined ? never : T) {}
}

const a = new FormControl('');  // string

class FormControl2<T> {
    constructor(t: T | string) {}
}

const b = new FormControl2('');  // string

class FormControl3<T> {
    constructor(t: T extends undefined ? never : T | string) {}
}

const c = new FormControl3('');  // string
