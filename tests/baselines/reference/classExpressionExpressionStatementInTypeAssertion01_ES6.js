//// [classExpressionExpressionStatementInTypeAssertion01_ES6.ts]

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

//// [classExpressionExpressionStatementInTypeAssertion01_ES6.js]
(class class_1 {
}
);
(class class_2 {
}
);
(class class_3 {
}
);
(class class_4 {
}
);
function f() {
    (class class_5 {
    }
    );
    (class class_6 {
    }
    );
    (class class_7 {
    }
    );
    (class class_8 {
    }
    );
}
var n;
(function (n) {
    (class class_9 {
    }
    );
    (class class_10 {
    }
    );
    (class class_11 {
    }
    );
    (class class_12 {
    }
    );
})(n || (n = {}));
