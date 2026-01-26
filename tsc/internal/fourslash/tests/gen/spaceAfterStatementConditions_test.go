package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSpaceAfterStatementConditions(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `let i = 0;

if(i<0) ++i;
if(i<0) --i;

while(i<0) ++i;
while(i<0) --i;

do ++i;
while(i<0)
do --i;
while(i<0)

for(let prop in { foo: 1 }) ++i;
for(let prop in { foo: 1 }) --i;

for(let foo of [1, 2]) ++i;
for(let foo of [1, 2]) --i;

for(let j = 0; j < 10; j++) ++i;
for(let j = 0; j < 10; j++) --i;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `let i = 0;

if (i < 0) ++i;
if (i < 0) --i;

while (i < 0) ++i;
while (i < 0) --i;

do ++i;
while (i < 0)
do --i;
while (i < 0)

for (let prop in { foo: 1 }) ++i;
for (let prop in { foo: 1 }) --i;

for (let foo of [1, 2]) ++i;
for (let foo of [1, 2]) --i;

for (let j = 0; j < 10; j++) ++i;
for (let j = 0; j < 10; j++) --i;
`)
}
