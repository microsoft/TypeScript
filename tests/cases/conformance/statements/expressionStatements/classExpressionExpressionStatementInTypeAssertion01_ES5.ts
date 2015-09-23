// @target: ES5

(<any>class { });

(class { } as any);

<any>class { };

<any>class { } as any;


function f() {
    (<any>class { });

    (class { } as any);

    <any>class { };

    <any>class { } as any;
}

namespace n {
    (<any>class { });

    (class { } as any);

    <any>class { };

    <any>class { } as any;
}