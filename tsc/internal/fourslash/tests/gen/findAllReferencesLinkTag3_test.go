package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllReferencesLinkTag3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace NPR/*5*/ {
    export class Consider/*4*/ {
        This/*3*/ = class {
            show/*2*/() { }
        }
        m/*1*/() { }
    }
    /**
     * {@linkcode Consider.prototype.m}
     * {@linkplain Consider#m}
     * {@linkcode Consider#This#show}
     * {@linkplain Consider.This.show}
     * {@linkcode NPR.Consider#This#show}
     * {@linkplain NPR.Consider.This#show}
     * {@linkcode NPR.Consider#This.show} # doesn't parse trailing .
     * {@linkcode NPR.Consider.This.show}
     */
    export function ref() { }
}
/**
 * {@linkplain NPR.Consider#This#show hello hello}
 * {@linkplain NPR.Consider.This#show}
 * {@linkcode NPR.Consider#This.show} # doesn't parse trailing .
 * {@linkcode NPR.Consider.This.show}
 */
export function outerref() { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4", "5")
}
