package ls_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"gotest.tools/v3/assert"
)

func TestDocumentURIToFileName(t *testing.T) {
	t.Parallel()

	tests := []struct {
		uri      lsproto.DocumentUri
		fileName string
	}{
		{"file:///path/to/file.ts", "/path/to/file.ts"},
		{"file://server/share/file.ts", "//server/share/file.ts"},
		{"file:///d%3A/work/tsgo932/lib/utils.ts", "d:/work/tsgo932/lib/utils.ts"},
		{"file:///D%3A/work/tsgo932/lib/utils.ts", "d:/work/tsgo932/lib/utils.ts"},
		{"file:///d%3A/work/tsgo932/app/%28test%29/comp/comp-test.tsx", "d:/work/tsgo932/app/(test)/comp/comp-test.tsx"},
		{"file:///path/to/file.ts#section", "/path/to/file.ts"},
		{"file:///c:/test/me", "c:/test/me"},
		{"file://shares/files/c%23/p.cs", "//shares/files/c#/p.cs"},
		{"file:///c:/Source/Z%C3%BCrich%20or%20Zurich%20(%CB%88zj%CA%8A%C9%99r%C9%AAk,/Code/resources/app/plugins/c%23/plugin.json", "c:/Source/Zürich or Zurich (ˈzjʊərɪk,/Code/resources/app/plugins/c#/plugin.json"},
		{"file:///c:/test %25/path", "c:/test %/path"},
		// {"file:?q", "/"},
		{"file:///_:/path", "/_:/path"},
		{"file:///users/me/c%23-projects/", "/users/me/c#-projects/"},
		{"file://localhost/c%24/GitDevelopment/express", "//localhost/c$/GitDevelopment/express"},
		{"file:///c%3A/test%20with%20%2525/c%23code", "c:/test with %25/c#code"},

		{"untitled:Untitled-1", "^/untitled/ts-nul-authority/Untitled-1"},
		{"untitled:Untitled-1#fragment", "^/untitled/ts-nul-authority/Untitled-1#fragment"},
		{"untitled:c:/Users/jrieken/Code/abc.txt", "^/untitled/ts-nul-authority/c:/Users/jrieken/Code/abc.txt"},
		{"untitled:C:/Users/jrieken/Code/abc.txt", "^/untitled/ts-nul-authority/C:/Users/jrieken/Code/abc.txt"},
		{"untitled://wsl%2Bubuntu/home/jabaile/work/TypeScript-go/newfile.ts", "^/untitled/wsl%2Bubuntu/home/jabaile/work/TypeScript-go/newfile.ts"},
	}

	for _, test := range tests {
		t.Run(string(test.uri), func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, test.uri.FileName(), test.fileName)
		})
	}
}

func TestFileNameToDocumentURI(t *testing.T) {
	t.Parallel()

	tests := []struct {
		fileName string
		uri      lsproto.DocumentUri
	}{
		{"/path/to/file.ts", "file:///path/to/file.ts"},
		{"//server/share/file.ts", "file://server/share/file.ts"},
		{"d:/work/tsgo932/lib/utils.ts", "file:///d%3A/work/tsgo932/lib/utils.ts"},
		{"d:/work/tsgo932/lib/utils.ts", "file:///d%3A/work/tsgo932/lib/utils.ts"},
		{"d:/work/tsgo932/app/(test)/comp/comp-test.tsx", "file:///d%3A/work/tsgo932/app/%28test%29/comp/comp-test.tsx"},
		{"/path/to/file.ts", "file:///path/to/file.ts"},
		{"c:/test/me", "file:///c%3A/test/me"},
		{"//shares/files/c#/p.cs", "file://shares/files/c%23/p.cs"},
		{"c:/Source/Zürich or Zurich (ˈzjʊərɪk,/Code/resources/app/plugins/c#/plugin.json", "file:///c%3A/Source/Z%C3%BCrich%20or%20Zurich%20%28%CB%88zj%CA%8A%C9%99r%C9%AAk%2C/Code/resources/app/plugins/c%23/plugin.json"},
		{"c:/test %/path", "file:///c%3A/test%20%25/path"},
		{"/", "file:///"},
		{"/_:/path", "file:///_%3A/path"},
		{"/users/me/c#-projects/", "file:///users/me/c%23-projects/"},
		{"//localhost/c$/GitDevelopment/express", "file://localhost/c%24/GitDevelopment/express"},
		{"c:/test with %25/c#code", "file:///c%3A/test%20with%20%2525/c%23code"},

		{"^/untitled/ts-nul-authority/Untitled-1", "untitled:Untitled-1"},
		{"^/untitled/ts-nul-authority/c:/Users/jrieken/Code/abc.txt", "untitled:c:/Users/jrieken/Code/abc.txt"},
		{"^/untitled/ts-nul-authority///wsl%2Bubuntu/home/jabaile/work/TypeScript-go/newfile.ts", "untitled://wsl%2Bubuntu/home/jabaile/work/TypeScript-go/newfile.ts"},
	}

	for _, test := range tests {
		t.Run(test.fileName, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, ls.FileNameToDocumentURI(test.fileName), test.uri)
		})
	}
}
