// ==ORIGINAL==

class Foo {
    public /*[#|*/method/*|]*/(): Promise<boolean> {
        return fetch('a').then(this.foo);
    }

    private foo(res) {
        return res.ok;
    }
}
        
// ==ASYNC FUNCTION::Convert to async function==

class Foo {
    public async method(): Promise<boolean> {
        const res = await fetch('a');
        return this.foo(res);
    }

    private foo(res) {
        return res.ok;
    }
}
        