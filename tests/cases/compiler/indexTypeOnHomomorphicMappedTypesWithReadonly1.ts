// @strict: true
// @noEmit: true

type T1 = Readonly<string[]>;
type R1 = keyof T1; // keyof readonly string[]
type KeyOfReadonly<T> = keyof Readonly<T>;
type R2 = KeyOfReadonly<string[]>; // keyof readonly string[]

type Identity<T> = { [K in keyof T]: T[K] };

type KeyOfReadonly2<T> = keyof Identity<Readonly<T>>; 
type R3 = KeyOfReadonly2<string[]>; // keyof readonly string[]
type KeyOfReadonly3<T> = keyof Readonly<Identity<T>>; 
type R4 = KeyOfReadonly3<string[]>; // keyof readonly string[]

type Writable<T> = { -readonly [K in keyof T]: T[K] };

type KeyOfWritable<T> = keyof Writable<T>;
type R5 = KeyOfWritable<readonly string[]>; // keyof string[]
type KeyOfWritable2<T> = keyof Writable<Readonly<T>>;
type R6 = KeyOfWritable2<readonly string[]>; // keyof string[]
type KeyOfWritable3<T> = keyof Identity<Writable<Readonly<T>>>;
type R7 = KeyOfWritable3<string[]>; // keyof string[]
type R8 = KeyOfWritable3<readonly string[]>; // keyof string[]

type KeyOfReadonly4<T> = keyof Identity<Readonly<Writable<T>>>;
type R9 = KeyOfReadonly4<string[]>; // keyof readonly string[]
