package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingJsxTexts1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
<option>
    homu   ;      homu
    homu;homu
    homu   :    homu
    homu:homu
    homu    ?     homu
    homu    .    homu

    homu    [   homu   ]   homu

    !     homu
    --    Type
    homu    --
    homu    ++
    ++     homu

    homu  ,   homu

    var    homu
    throw    homu
    new    homu
    delete   homu
    return       homu
    typeof     homu
    await     homu

    abstract  homu
    class     homu
    declare   homu
    default   homu
    enum      homu
    export    homu
    homu    extends   homu
    get       homu
    homu    implements     homu
    interface      homu
    module    homu
    namespace      homu
    private   homu
    public    homu
    protected      homu
    set       homu
    static    homu
    type      homu

    homu    =>    homu
    homu=>homu

    ...       homu

    homu     @     homu
    homu@homu

    (    homu   )    homu
</option>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `<option>
    homu   ;      homu
    homu;homu
    homu   :    homu
    homu:homu
    homu    ?     homu
    homu    .    homu

    homu    [   homu   ]   homu

    !     homu
    --    Type
    homu    --
    homu    ++
    ++     homu

    homu  ,   homu

    var    homu
    throw    homu
    new    homu
    delete   homu
    return       homu
    typeof     homu
    await     homu

    abstract  homu
    class     homu
    declare   homu
    default   homu
    enum      homu
    export    homu
    homu    extends   homu
    get       homu
    homu    implements     homu
    interface      homu
    module    homu
    namespace      homu
    private   homu
    public    homu
    protected      homu
    set       homu
    static    homu
    type      homu

    homu    =>    homu
    homu=>homu

    ...       homu

    homu     @     homu
    homu@homu

    (    homu   )    homu
</option>;`)
}
