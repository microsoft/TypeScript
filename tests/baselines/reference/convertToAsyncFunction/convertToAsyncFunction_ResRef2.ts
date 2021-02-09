// ==ORIGINAL==

class Foo {
    public /*[#|*/method/*|]*/(): Promise<Response> {
        return fetch('a').then(this.foo);
    }

    private foo = res => res;
}
        
// ==ASYNC FUNCTION::Convert to async function==

class Foo {
    public async method(): Promise<Response> {
        const res = await fetch('a');
        return this.foo(res);
    }

    private foo = res => res;
}
        