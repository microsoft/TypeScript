
<any>{ a: 10, b: 20 };

(<any>{ a: 10, b: 20 });

({ a: 10, b: 20 } as any);

((<any>{ a: 10, b: 20 } as any));


function f() {
    <any>{ a: 10, b: 20 };

    (<any>{ a: 10, b: 20 });

    ({ a: 10, b: 20 } as any);

    ((<any>{ a: 10, b: 20 } as any));
}

namespace n {
    <any>{ a: 10, b: 20 };

    (<any>{ a: 10, b: 20 });

    ({ a: 10, b: 20 } as any);

    ((<any>{ a: 10, b: 20 } as any));
}