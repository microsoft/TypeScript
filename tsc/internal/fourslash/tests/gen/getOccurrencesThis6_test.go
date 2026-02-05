package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesThis6(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `this/*1*/;
this;

function f() {
    this/*2*/;
    this;
    () => this;
    () => {
        if (this) {
            this;
        }
        else {
            this.this;
        }
    }
    function inside() {
        this;
        (function (_) {
            this;
        })(this);
    }
}

namespace m {
    var x = th/*6*/is;
    function f() {
        this;
        this;
        () => this;
        () => {
            if (this) {
                this;
            }
            else {
                this.this;
            }
        }
        function inside() {
            this;
            (function (_) {
                this;
            })(this);
        }
    }
}

class A {
    public b = this.method1;

    public method1() {
        this;
        this;
        () => this;
        () => {
            if (this) {
                this;
            }
            else {
                this.this;
            }
        }
        function inside() {
            this;
            (function (_) {
                this/*3*/;
            })(this);
        }
    }

    private method2() {
        this;
        this;
        () => this;
        () => {
            if (this) {
                this;
            }
            else {
                this.this;
            }
        }
        function inside() {
            this;
            (function (_) {
                this;
            })(this);
        }
    }

    public static staticB = this.staticMethod1;

    public static staticMethod1() {
        this;
        this;
        () => this;
        () => {
            if (this) {
                this;
            }
            else {
                this.this;
            }
        }
        function inside() {
            this;
            (function (_) {
                this;
            })(this);
        }
    }

    private static staticMethod2() {
        this;
        this;
        () => this;
        () => {
            if (this) {
                this;
            }
            else {
                this.this;
            }
        }
        function inside() {
            this;
            (function (_) {
                this;
            })(this);
        }
    }
}

var x = {
    a: /*4*/this,

    f() {
        this/*5*/;
        function foo() {
            this;
        }
        const bar = () => {
            this;
        }
    },

    g() {
        this;
    },

    get h() {
        /*7*/this;
        function foo() {
            this;
        }
        const bar = () => {
            this;
        }
        return;
    },

    set h(foo: any) {
        this;
    },

    l: () => {
        /*8*/this;
        function foo() {
            this;
        }
        const bar = () => {
            this;
        }
    },
};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Markers())...)
}
