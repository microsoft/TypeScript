// @noEmit: true

type Foo<T extends boolean> = {
    name: string,
    isDog: T,
}

type Ret<T> =
    T extends true ? "woof" :
    T extends false? "meow" :
    never;

function example1<T extends boolean>(param1: T, param2: Foo<T>): Ret<T> {
    if (param1) {
        return "woof";
    }
    return "meow"
}
