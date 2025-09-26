package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesThis(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|this|];
[|th/**/is|];

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

module m {
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
    f() {
        this;
    },
    g() {
        this;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}
