// @target: esnext

// The characters in the following regular expression are ASCII-lookalike characters found in Unicode, including:
// - 𝘴 (U+1D634 Mathematical Sans-Serif Italic Small S)
// - 𝘪 (U+1D62A Mathematical Sans-Serif Italic Small I)
// - 𝘮 (U+1D62E Mathematical Sans-Serif Italic Small M)
//
// See https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols
const 𝘳𝘦𝘨𝘦𝘹 = /(?𝘴𝘪-𝘮:^𝘧𝘰𝘰.)/𝘨𝘮𝘶;
