package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCommentsLinePreservation(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** This is firstLine
  * This is second Line
  * 
  * This is fourth Line
  */
var /*a*/a: string;
/** 
  * This is firstLine
  * This is second Line
  * 
  * This is fourth Line
  */
var /*b*/b: string;
/** 
  * This is firstLine
  * This is second Line
  * 
  * This is fourth Line
  *
  */
var /*c*/c: string;
/** 
  * This is firstLine
  * This is second Line
  * @param param
  * @random tag This should be third line
  */
function /*d*/d(param: string) { /*1*/param = "hello"; }
/** 
  * This is firstLine
  * This is second Line
  * @param param
  */
function /*e*/e(param: string) { /*2*/param = "hello"; }
/** 
  * This is firstLine
  * This is second Line
  * @param param1 first line of param
  *
  *  param information third line
  * @random tag This should be third line
  */
function /*f*/f(param1: string) { /*3*/param1 = "hello"; }
/** 
  * This is firstLine
  * This is second Line
  * @param param1
  *
  *  param information first line
  * @random tag This should be third line
  */
function /*g*/g(param1: string) { /*4*/param1 = "hello"; }
/** 
  * This is firstLine
  * This is second Line
  * @param param1
  *
  *  param information first line
  *
  *  param information third line
  * @random tag This should be third line
  */
function /*h*/h(param1: string) { /*5*/param1 = "hello"; }
/** 
  * This is firstLine
  * This is second Line
  * @param param1
  *
  *  param information first line
  *
  *  param information third line
  *
  */
function /*i*/i(param1: string) { /*6*/param1 = "hello"; }
/** 
  * This is firstLine
  * This is second Line
  * @param param1
  *
  *  param information first line
  *
  *  param information third line
  */
function /*j*/j(param1: string) { /*7*/param1 = "hello"; }
/** 
  * This is firstLine
  * This is second Line
  * @param param1 hello   @randomtag 
  *
  *  random information first line
  *
  *  random information third line
  */
function /*k*/k(param1: string) { /*8*/param1 = "hello"; }
/** 
  * This is firstLine
  * This is second Line
  * @param param1 first Line text
  *
  * @param param1 
  *
  * blank line that shouldnt be shown when starting this 
  * second time information about the param again
  */
function /*l*/l(param1: string) { /*9*/param1 = "hello"; }
     /** 
       * This is firstLine
 This is second Line
 [1]: third * line
 @param param1 first Line text
 second line text
 */
function /*m*/m(param1: string) { /*10*/param1 = "hello"; }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "a", "var a: string", "This is firstLine\nThis is second Line\n\nThis is fourth Line")
	f.VerifyQuickInfoAt(t, "b", "var b: string", "This is firstLine\nThis is second Line\n\nThis is fourth Line")
	f.VerifyQuickInfoAt(t, "c", "var c: string", "This is firstLine\nThis is second Line\n\nThis is fourth Line")
	f.VerifyQuickInfoAt(t, "d", "function d(param: string): void", "This is firstLine\nThis is second Line")
	f.VerifyQuickInfoAt(t, "1", "(parameter) param: string", "")
	f.VerifyQuickInfoAt(t, "e", "function e(param: string): void", "This is firstLine\nThis is second Line")
	f.VerifyQuickInfoAt(t, "2", "(parameter) param: string", "")
	f.VerifyQuickInfoAt(t, "f", "function f(param1: string): void", "This is firstLine\nThis is second Line")
	f.VerifyQuickInfoAt(t, "3", "(parameter) param1: string", "first line of param\n\nparam information third line")
	f.VerifyQuickInfoAt(t, "g", "function g(param1: string): void", "This is firstLine\nThis is second Line")
	f.VerifyQuickInfoAt(t, "4", "(parameter) param1: string", " param information first line")
	f.VerifyQuickInfoAt(t, "h", "function h(param1: string): void", "This is firstLine\nThis is second Line")
	f.VerifyQuickInfoAt(t, "5", "(parameter) param1: string", " param information first line\n\n param information third line")
	f.VerifyQuickInfoAt(t, "i", "function i(param1: string): void", "This is firstLine\nThis is second Line")
	f.VerifyQuickInfoAt(t, "6", "(parameter) param1: string", " param information first line\n\n param information third line")
	f.VerifyQuickInfoAt(t, "j", "function j(param1: string): void", "This is firstLine\nThis is second Line")
	f.VerifyQuickInfoAt(t, "7", "(parameter) param1: string", " param information first line\n\n param information third line")
	f.VerifyQuickInfoAt(t, "k", "function k(param1: string): void", "This is firstLine\nThis is second Line")
	f.VerifyQuickInfoAt(t, "8", "(parameter) param1: string", "hello")
	f.VerifyQuickInfoAt(t, "l", "function l(param1: string): void", "This is firstLine\nThis is second Line")
	f.VerifyQuickInfoAt(t, "9", "(parameter) param1: string", "first Line text\nblank line that shouldnt be shown when starting this \nsecond time information about the param again")
	f.VerifyQuickInfoAt(t, "m", "function m(param1: string): void", "This is firstLine\nThis is second Line\n[1]: third * line")
	f.VerifyQuickInfoAt(t, "10", "(parameter) param1: string", "first Line text\nsecond line text")
}
