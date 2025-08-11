package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestChineseCharacterDisplayInHover(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
interface 中文界面 {
    上居中: string;
    下居中: string;
}

class 中文类 {
    获取中文属性(): 中文界面 {
        return {
            上居中: "上居中",
            下居中: "下居中"
        };
    }
}

let /*instanceHover*/实例 = new 中文类();
let 属性对象 = 实例./*methodHover*/获取中文属性();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "instanceHover", "let 实例: 中文类", "")
	f.VerifyQuickInfoAt(t, "methodHover", "(method) 中文类.获取中文属性(): 中文界面", "")
}

func TestChineseCharacterDisplayInUnionTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// Test the original issue: Chinese characters in method parameters should display correctly
class TSLine {
    setLengthTextPositionPreset(/*methodParam*/preset: "上居中" | "下居中" | "右居中" | "左居中"): void {}
}

let lines = new TSLine();
lines./*method*/setLengthTextPositionPreset;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)

	// Verify that the method displays Chinese characters correctly in hover (this was the original problem)
	f.VerifyQuickInfoAt(t, "method", `(method) TSLine.setLengthTextPositionPreset(preset: "上居中" | "下居中" | "右居中" | "左居中"): void`, "")
}
