package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsNonexistentPropertyNoCrash1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @allowJs: true
// @checkJs: true
// @filename: ./src/parser-input.js
export default () => {
  let input;

  const parserInput = {};

  parserInput.currentChar = () => input.charAt(parserInput.i);

  parserInput.end = () => {
    const isFinished = parserInput.i >= input.length;

    return {
      isFinished,
      furthest: parserInput.i,
    };
  };

  return parserInput;
};
// @filename: ./src/parser.js
import getParserInput from "./parser-input";

const Parser = function Parser(context, imports, fileInfo, currentIndex) {
  currentIndex = currentIndex || 0;
  let parsers;
  const parserInput = getParserInput();

  return {
    parserInput,
    parsers: (parsers = {
      variable: function () {
        let name;

        if (parserInput.currentChar() === "/*1*/@") {
          return name[1];
        }
      },
    }),
  };
};

export default Parser;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1")
}
