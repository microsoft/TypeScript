package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestThisPredicateFunctionQuickInfo01(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class FileSystemObject {
    /*1*/isFile(): this is Item {
        return this instanceof Item;
    }
    /*2*/isDirectory(): this is Directory {
        return this instanceof Directory;
    }
    /*3*/isNetworked(): this is (Networked & this) {
       return !!(this as Networked).host;
    }
    constructor(public path: string) {}
}

class Item extends FileSystemObject {
    constructor(path: string, public content: string) { super(path); }
}
class Directory extends FileSystemObject {
    children: FileSystemObject[];
}
interface Networked {
    host: string;
}

const obj: FileSystemObject = new Item("/foo", "");
if (obj.isFile/*4*/()) {
    obj.;
    if (obj.isNetworked/*5*/()) {
        obj.;
    }
}
if (obj.isDirectory/*6*/()) {
    obj.;
    if (obj.isNetworked/*7*/()) {
        obj.;
    }
}
if (obj.isNetworked/*8*/()) {
    obj.;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(method) FileSystemObject.isFile(): this is Item", "")
	f.VerifyQuickInfoAt(t, "2", "(method) FileSystemObject.isDirectory(): this is Directory", "")
	f.VerifyQuickInfoAt(t, "3", "(method) FileSystemObject.isNetworked(): this is (Networked & this)", "")
	f.VerifyQuickInfoAt(t, "4", "(method) FileSystemObject.isFile(): this is Item", "")
	f.VerifyQuickInfoAt(t, "5", "(method) FileSystemObject.isNetworked(): this is (Networked & Item)", "")
	f.VerifyQuickInfoAt(t, "6", "(method) FileSystemObject.isDirectory(): this is Directory", "")
	f.VerifyQuickInfoAt(t, "7", "(method) FileSystemObject.isNetworked(): this is (Networked & Directory)", "")
	f.VerifyQuickInfoAt(t, "8", "(method) FileSystemObject.isNetworked(): this is (Networked & FileSystemObject)", "")
}
