package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPromiseTyping1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IPromise<T> {
    then<U>(success: (value: T) => IPromise<U>, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): IPromise<U>;
    then<U>(success: (value: T) => IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): IPromise<U>;
    then<U>(success: (value: T) => U, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): IPromise<U>;
    then<U>(success: (value: T) => U, error?: (error: any) => U, progress?: (progress: any) => void ): IPromise<U>;
    done? <U>(success: (value: T) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
}
var p1: IPromise<string>;
var p/*1*/2 = p1.then(function (x/*2*/x) {
    return xx;
});
p2.then(function (x/*3*/x) {
} );`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var p2: IPromise<string>", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) xx: string", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) xx: string", "")
}
