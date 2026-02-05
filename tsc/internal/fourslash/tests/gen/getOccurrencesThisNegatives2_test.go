package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesThisNegatives2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `this;
this;

function f() {
    this;
    this;
    () => this;
    () => {
        if (this) {
            this;
        }
        else {
            this.t/*1*/his;
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
    function f() {
        this;
        this;
        () => this;
        () => {
            if (this) {
                this;
            }
            else {
                this./*2*/this;
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
                this.thi/*3*/s;
            }
        }
        function inside() {
            this;
            (function (_) {
                this;
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
                this.t/*4*/his;
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
                this.th/*5*/is;
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
                this.th/*6*/is;
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
    f() {
        this;
    },
    g() {
        this;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Markers())...)
}
