
class X<T> {
    i: T extends number ? throw '' : string = {} as any
}
new X<0>().i