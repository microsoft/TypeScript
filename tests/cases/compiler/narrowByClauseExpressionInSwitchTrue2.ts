// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55986

declare const f: 'a' | 'b' | 'c';

switch(true) {
    case f === 'a':
    case f === 'b':
        f;
        break
    default:
        f;
}

f;

switch(true) {
    case f === 'a':
        f;
    case f === 'b':
        f;
        break
    default:
        f;
}

f;
