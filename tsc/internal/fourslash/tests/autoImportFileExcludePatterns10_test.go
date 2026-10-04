package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAutoImportFileExcludePatterns10(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/vs/test.ts
import { Parts } from './parts';
export class /**/Extended implements Parts {
}
// @Filename: /src/vs/parts.ts
import { Event } from '../event/event';

export interface Parts {
	readonly options: Event;
}
// @Filename: /src/event/event.ts
export interface Event {
	(): string;
}
// @Filename: /src/thing.ts
import { Event } from './event/event';
export { Event };
// @Filename: /src/a.ts
import './thing'
declare module './thing' {
	interface Event {
		c: string;
	}
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'Parts'",
		NewFileContent: `import { Event } from '../event/event';
import { Parts } from './parts';
export class Extended implements Parts {
    options: Event;
}`,
		Index:           0,
		UserPreferences: &lsutil.UserPreferences{AutoImportFileExcludePatterns: []string{"src/thing.ts"}},
	})
}
