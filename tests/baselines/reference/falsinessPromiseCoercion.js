//// [tests/cases/compiler/falsinessPromiseCoercion.ts] ////

//// [falsinessPromiseCoercion.ts]
function test1() {
    async function canAccess() { return false; }

    if (!canAccess()) { // error
    }
}

async function test2() {
    async function canAccess() { return false; }

    const res = canAccess()

    if (!res) { // ok
        return
    }

   await res
}

function test3() {
    async function canAccess() { return false; }

    if (!!!canAccess()) { // ok
    }
}

function test4(canAccess: () => Promise<boolean>) {
    if (!canAccess()) { // error
    }
}

function test5(canAccess: () => Promise<boolean> | undefined) {
    if (!canAccess()) { // ok
    }
}

function test6() {
    const x = {
        foo: {
            async bar() { return true; }
        }
    };

    if (!x.foo.bar()) { // error
    }
}

async function test7() {
    const x = {
        foo: {
            async bar() { return true; }
        }
    };

    const res = x.foo.bar();

    if (!res) { // ok
    }

    await res;
}

class Test8 {
    async isUser() {
        return true;
    }

    test() {
        if (!this.isUser()) { // error
        }
    }
}

class Test9 {
    async isUser() {
        return true;
    }

    async test() {
        const res = this.isUser();
        if (!res) { // ok
        }

        await res;
    }
}


//// [falsinessPromiseCoercion.js]
function test1() {
    async function canAccess() { return false; }
    if (!canAccess()) { // error
    }
}
async function test2() {
    async function canAccess() { return false; }
    const res = canAccess();
    if (!res) { // ok
        return;
    }
    await res;
}
function test3() {
    async function canAccess() { return false; }
    if (!!!canAccess()) { // ok
    }
}
function test4(canAccess) {
    if (!canAccess()) { // error
    }
}
function test5(canAccess) {
    if (!canAccess()) { // ok
    }
}
function test6() {
    const x = {
        foo: {
            async bar() { return true; }
        }
    };
    if (!x.foo.bar()) { // error
    }
}
async function test7() {
    const x = {
        foo: {
            async bar() { return true; }
        }
    };
    const res = x.foo.bar();
    if (!res) { // ok
    }
    await res;
}
class Test8 {
    async isUser() {
        return true;
    }
    test() {
        if (!this.isUser()) { // error
        }
    }
}
class Test9 {
    async isUser() {
        return true;
    }
    async test() {
        const res = this.isUser();
        if (!res) { // ok
        }
        await res;
    }
}
