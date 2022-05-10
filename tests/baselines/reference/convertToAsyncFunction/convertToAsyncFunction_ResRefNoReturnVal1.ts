// ==ORIGINAL==

class Foo {
    public /*[#|*/method/*|]*/(): Promise<void> {
        return fetch('a').then(this.foo);
    }

    private foo(res) {
        console.log(res);
    }
}
        
// ==ASYNC FUNCTION::Convert to async function==

class Foo {
    public async method(): Promise<void> {
        const res = await fetch('a');
        return this.foo(res);
    }

    private foo(res) {
        console.log(res);
    }
}
        