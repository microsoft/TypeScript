//// [tests/cases/compiler/regularExpressionScanning.ts] ////

//// [regularExpressionScanning.ts]
const regexes: RegExp[] = [
	// Flags
	/foo/visualstudiocode,
	// Pattern modifiers
	/(?med-ium:bar)/,
	// Capturing groups
	/\0/,
	/\1/,
	/\2/,
	/(hi)\1/,
	/(hi) (hello) \2/,
	/\2()(\12)(foo)\1\0[\0\1\01\123\08\8](\3\03)\5\005\9\009/,
	/\2()(\12)(foo)\1\0[\0\1\01\123\08\8](\3\03)\5\005\9\009/u,
	/(?<foo>)((?<bar>bar)bar)(?<baz>baz)|(foo(?<foo>foo))(?<baz>)/,
	/(\k<bar>)\k<absent>(?<foo>foo)|(?<bar>)((?<foo>)|(bar(?<bar>bar)))/,
	// Quantifiers
	/{}{1,2}_{3}.{4,}?(foo){008}${32,16}\b{064,128}.+&*?\???\n{,256}{\\{,/,
	// Character classes
	/[-A-Za-z-z-aZ-A\d_-\d-.-.\r-\n\w-\W]/,
	/\p{L}\p{gc=L}\p{ASCII}\p{Invalid}[\p{L}\p{gc=L}\P{ASCII}\p{Invalid}]/,
	/\p{L}\p{gc=L}\p{ASCII}\p{Invalid}[\p{L}\p{gc=L}\P{ASCII}\p{Invalid}]/u,
	/\p{L}\p{gc=L}\p{ASCII}\p{Invalid}[\p{L}\p{gc=L}\P{ASCII}\p{Invalid}]/v,
	/\p{InvalidProperty=Value}\p{=}\p{sc=}\P{=foo}[\p{}\p\\\P\P{]\p{/,
	/\p{InvalidProperty=Value}\p{=}\p{sc=}\P{=foo}[\p{}\p\\\P\P{]\p{/u,
	/\p{InvalidProperty=Value}\p{=}\p{sc=}\P{=foo}[\p{}\p\\\P\P{]\p{/v,
	/\p{RGI_Emoji}\P{RGI_Emoji}[^\p{RGI_Emoji}\P{RGI_Emoji}]/,
	/\p{RGI_Emoji}\P{RGI_Emoji}[^\p{RGI_Emoji}\P{RGI_Emoji}]/u,
	/\p{RGI_Emoji}\P{RGI_Emoji}[^\p{RGI_Emoji}\P{RGI_Emoji}]/v,
	// Character escapes
	/\c[\c0\ca\cQ\c\C]\c1\C/,
	/\c[\c0\ca\cQ\c\C]\c1\C/u,
	/\q\\\`[\q\\\`[\Q\\\Q{\q{foo|bar|baz]\q{]\q{/,
	/\q\\\`[\q\\\`[\Q\\\Q{\q{foo|bar|baz]\q{]\q{/u,
	/\q\\\`[\q\\\`[\Q\\\Q{\q{foo|bar|baz]\q{]\q{/v,
	// Unicode sets notation
	/[a--b[--][\d++[]]&&[[&0-9--]&&[\p{L}]--\P{L}-_-]]&&&\q{foo}[0---9][&&q&&&\q{bar}&&]/,
	/[a--b[--][\d++[]]&&[[&0-9--]&&[\p{L}]--\P{L}-_-]]&&&\q{foo}[0---9][&&q&&&\q{bar}&&]/u,
	/[a--b[--][\d++[]]&&[[&0-9--]&&[\p{L}]--\P{L}-_-]]&&&\q{foo}[0---9][&&q&&&\q{bar}&&]/v,
	/[[^\P{Decimal_Number}&&[0-9]]&&\p{L}&&\p{ID_Continue}--\p{ASCII}\p{CWCF}]/v,
	/[^\p{Emoji}\p{RGI_Emoji}][^\p{Emoji}--\p{RGI_Emoji}][^\p{Emoji}&&\p{RGI_Emoji}]/v,
	/[^\p{RGI_Emoji}\p{Emoji}][^\p{RGI_Emoji}--\p{Emoji}][^\p{RGI_Emoji}&&\p{Emoji}]/v,
	/[^\p{RGI_Emoji}\q{foo}][^\p{RGI_Emoji}--\q{foo}][^\p{RGI_Emoji}&&\q{foo}]/v,
	/[^\p{Emoji}[[\p{RGI_Emoji}]]][^\p{Emoji}--[[\p{RGI_Emoji}]]][^\p{Emoji}&&[[\p{RGI_Emoji}]]]/v,
	/[^[[\p{RGI_Emoji}]]\p{Emoji}][^[[\p{RGI_Emoji}]]--\p{Emoji}][^[[\p{RGI_Emoji}]]&&\p{Emoji}]/v,
	/[^[[\p{RGI_Emoji}]]\q{foo}][^[[\p{RGI_Emoji}]]--\q{foo}][^[[\p{RGI_Emoji}]]&&\q{foo}]/v,
	/[^\q{foo|bar|baz}--\q{foo}--\q{bar}--\q{baz}][^\p{L}--\q{foo}--[\q{bar}]--[^[\q{baz}]]]/v,
	/[^[[\q{foo|bar|baz}]]--\q{foo}--\q{bar}--\q{baz}][^[^[^\p{L}]]--\q{foo}--[\q{bar}]--[^[\q{baz}]]]/v,
];


//// [regularExpressionScanning.js]
const regexes = [
    // Flags
    /foo/visualstudiocode,
    // Pattern modifiers
    /(?med-ium:bar)/,
    // Capturing groups
    /\0/,
    /\1/,
    /\2/,
    /(hi)\1/,
    /(hi) (hello) \2/,
    /\2()(\12)(foo)\1\0[\0\1\01\123\08\8](\3\03)\5\005\9\009/,
    /\2()(\12)(foo)\1\0[\0\1\01\123\08\8](\3\03)\5\005\9\009/u,
    /(?<foo>)((?<bar>bar)bar)(?<baz>baz)|(foo(?<foo>foo))(?<baz>)/,
    /(\k<bar>)\k<absent>(?<foo>foo)|(?<bar>)((?<foo>)|(bar(?<bar>bar)))/,
    // Quantifiers
    /{}{1,2}_{3}.{4,}?(foo){008}${32,16}\b{064,128}.+&*?\???\n{,256}{\\{,/,
    // Character classes
    /[-A-Za-z-z-aZ-A\d_-\d-.-.\r-\n\w-\W]/,
    /\p{L}\p{gc=L}\p{ASCII}\p{Invalid}[\p{L}\p{gc=L}\P{ASCII}\p{Invalid}]/,
    /\p{L}\p{gc=L}\p{ASCII}\p{Invalid}[\p{L}\p{gc=L}\P{ASCII}\p{Invalid}]/u,
    /\p{L}\p{gc=L}\p{ASCII}\p{Invalid}[\p{L}\p{gc=L}\P{ASCII}\p{Invalid}]/v,
    /\p{InvalidProperty=Value}\p{=}\p{sc=}\P{=foo}[\p{}\p\\\P\P{]\p{/,
    /\p{InvalidProperty=Value}\p{=}\p{sc=}\P{=foo}[\p{}\p\\\P\P{]\p{/u,
    /\p{InvalidProperty=Value}\p{=}\p{sc=}\P{=foo}[\p{}\p\\\P\P{]\p{/v,
    /\p{RGI_Emoji}\P{RGI_Emoji}[^\p{RGI_Emoji}\P{RGI_Emoji}]/,
    /\p{RGI_Emoji}\P{RGI_Emoji}[^\p{RGI_Emoji}\P{RGI_Emoji}]/u,
    /\p{RGI_Emoji}\P{RGI_Emoji}[^\p{RGI_Emoji}\P{RGI_Emoji}]/v,
    // Character escapes
    /\c[\c0\ca\cQ\c\C]\c1\C/,
    /\c[\c0\ca\cQ\c\C]\c1\C/u,
    /\q\\\`[\q\\\`[\Q\\\Q{\q{foo|bar|baz]\q{]\q{/,
    /\q\\\`[\q\\\`[\Q\\\Q{\q{foo|bar|baz]\q{]\q{/u,
    /\q\\\`[\q\\\`[\Q\\\Q{\q{foo|bar|baz]\q{]\q{/v,
    // Unicode sets notation
    /[a--b[--][\d++[]]&&[[&0-9--]&&[\p{L}]--\P{L}-_-]]&&&\q{foo}[0---9][&&q&&&\q{bar}&&]/,
    /[a--b[--][\d++[]]&&[[&0-9--]&&[\p{L}]--\P{L}-_-]]&&&\q{foo}[0---9][&&q&&&\q{bar}&&]/u,
    /[a--b[--][\d++[]]&&[[&0-9--]&&[\p{L}]--\P{L}-_-]]&&&\q{foo}[0---9][&&q&&&\q{bar}&&]/v,
    /[[^\P{Decimal_Number}&&[0-9]]&&\p{L}&&\p{ID_Continue}--\p{ASCII}\p{CWCF}]/v,
    /[^\p{Emoji}\p{RGI_Emoji}][^\p{Emoji}--\p{RGI_Emoji}][^\p{Emoji}&&\p{RGI_Emoji}]/v,
    /[^\p{RGI_Emoji}\p{Emoji}][^\p{RGI_Emoji}--\p{Emoji}][^\p{RGI_Emoji}&&\p{Emoji}]/v,
    /[^\p{RGI_Emoji}\q{foo}][^\p{RGI_Emoji}--\q{foo}][^\p{RGI_Emoji}&&\q{foo}]/v,
    /[^\p{Emoji}[[\p{RGI_Emoji}]]][^\p{Emoji}--[[\p{RGI_Emoji}]]][^\p{Emoji}&&[[\p{RGI_Emoji}]]]/v,
    /[^[[\p{RGI_Emoji}]]\p{Emoji}][^[[\p{RGI_Emoji}]]--\p{Emoji}][^[[\p{RGI_Emoji}]]&&\p{Emoji}]/v,
    /[^[[\p{RGI_Emoji}]]\q{foo}][^[[\p{RGI_Emoji}]]--\q{foo}][^[[\p{RGI_Emoji}]]&&\q{foo}]/v,
    /[^\q{foo|bar|baz}--\q{foo}--\q{bar}--\q{baz}][^\p{L}--\q{foo}--[\q{bar}]--[^[\q{baz}]]]/v,
    /[^[[\q{foo|bar|baz}]]--\q{foo}--\q{bar}--\q{baz}][^[^[^\p{L}]]--\q{foo}--[\q{bar}]--[^[\q{baz}]]]/v,
];
