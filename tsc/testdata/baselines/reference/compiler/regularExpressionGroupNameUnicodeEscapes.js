//// [tests/cases/compiler/regularExpressionGroupNameUnicodeEscapes.ts] ////

//// [regularExpressionGroupNameUnicodeEscapes.ts]
// U+13A0 CHEROKEE LETTER A: character inside BMP with both the Unicode properties ID_Start and ID_Continue
/(?<Ꭰ>)\k<Ꭰ>\k<\u13A0>\k<\u{13A0}>/;
/(?<\u13A0>)\k<Ꭰ>\k<\u13A0>\k<\u{13A0}>/;
/(?<\u{13A0}>)\k<Ꭰ>\k<\u13A0>\k<\u{13A0}>/;

/(?<_Ꭰ>)\k<_Ꭰ>\k<_\u13A0>\k<_\u{13A0}>/;
/(?<_\u13A0>)\k<_Ꭰ>\k<_\u13A0>\k<_\u{13A0}>/;
/(?<_\u{13A0}>)\k<_Ꭰ>\k<_\u13A0>\k<_\u{13A0}>/;

// U+19D4 NEW TAI LUE DIGIT FOUR: character inside BMP with only ID_Continue
/(?<᧔>)\k<᧔>\k<\u19D4>\k<\u{19D4}>/; // invalid
/(?<\u19D4>)\k<᧔>\k<\u19D4>\k<\u{19D4}>/; // invalid
/(?<\u{19D4}>)\k<᧔>\k<\u19D4>\k<\u{19D4}>/; // invalid

/(?<_᧔>)\k<_᧔>\k<_\u19D4>\k<_\u{19D4}>/;
/(?<_\u19D4>)\k<_᧔>\k<_\u19D4>\k<_\u{19D4}>/;
/(?<_\u{19D4}>)\k<_᧔>\k<_\u19D4>\k<_\u{19D4}>/;

// U+102A7 CARIAN LETTER A2: character outside BMP with both ID_Start and ID_Continue
/(?<𐊧>)\k<𐊧>\k<\u{102A7}>\k<\uD800\uDEA7>/;
/(?<\u{102A7}>)\k<𐊧>\k<\u{102A7}>\k<\uD800\uDEA7>/;
/(?<\uD800\uDEA7>)\k<𐊧>\k<\u{102A7}>\k<\uD800\uDEA7>/;

/(?<_𐊧>)\k<_𐊧>\k<_\u{102A7}>\k<_\uD800\uDEA7>/;
/(?<_\u{102A7}>)\k<_𐊧>\k<_\u{102A7}>\k<_\uD800\uDEA7>/;
/(?<_\uD800\uDEA7>)\k<_𐊧>\k<_\u{102A7}>\k<_\uD800\uDEA7>/;

// U+1113D CHAKMA DIGIT SEVEN: character outside BMP with only ID_Continue
/(?<𑄽>)\k<𑄽>\k<\u{1113D}>\k<\uD804\uDD3D>/; // invalid
/(?<\u{1113D}>)\k<𑄽>\k<\u{1113D}>\k<\uD804\uDD3D>/; // invalid
/(?<\uD804\uDD3D>)\k<𑄽>\k<\u{1113D}>\k<\uD804\uDD3D>/; // invalid

/(?<_𑄽>)\k<_𑄽>\k<_\u{1113D}>\k<_\uD804\uDD3D>/;
/(?<_\u{1113D}>)\k<_𑄽>\k<_\u{1113D}>\k<_\uD804\uDD3D>/;
/(?<_\uD804\uDD3D>)\k<_𑄽>\k<_\u{1113D}>\k<_\uD804\uDD3D>/;

// The following cases are all invalid:

// U+2F47 KANGXI RADICAL SUN: character inside BMP without both properties
/(?<⽇>)(?<\u2F47>)(?<\u{2F47}>)\k<⽇>\k<\u2F47>\k<\u{2F47}>/;
/(?<_⽇>)(?<_\u2F47>)(?<_\u{2F47}>)\k<_⽇>\k<_\u2F47>\k<_\u{2F47}>/;

// U+1F31A NEW MOON WITH FACE: character outside BMP without both properties
/(?<🌚>)(?<\u{1F31A}>)(?<\uD83C\uDF1A>)\k<🌚>\k<\u{1F31A}>\k<\uD83C\uDF1A>/;
/(?<_🌚>)(?<_\u{1F31A}>)(?<_\uD83C\uDF1A>)\k<_🌚>\k<_\u{1F31A}>\k<_\uD83C\uDF1A>/;

// Lone leading surrogate
/(?<\uD800>)(?<\u{D800}>)\k<\uD800>\k<\u{D800}>/;
/(?<_\uD800>)(?<_\u{D800}>)\k<_\uD800>\k<_\u{D800}>/;

// Lone trailing surrogate
/(?<\uDFFF>)(?<\u{DFFF}>)\k<\uDFFF>\k<\u{DFFF}>/;
/(?<_\uDFFF>)(?<_\u{DFFF}>)\k<_\uDFFF>\k<_\u{DFFF}>/;

// Fake surrogate pair with extended Unicode escapes – invalid even if the intended character has both properties
/(?<\u{D800}\u{DC00}>)\k<\u{D800}\u{DC00}>/;
/(?<_\u{D800}\u{DC00}>)\k<_\u{D800}\u{DC00}>/;

// Cases with Unicode escapes and extended Unicode escapes mixed
/(?<RegExp>)\k<RegExp>\k<\u{52}\u0065gE\u{78}p>\k<\u0052e\u0067\u{45}x\u{70}>/;
/(?<_RegExp>)\k<_RegExp>\k<_\u{52}\u0065gE\u{78}p>\k<_\u0052e\u0067\u{45}x\u{70}>/;


//// [regularExpressionGroupNameUnicodeEscapes.js]
"use strict";
// U+13A0 CHEROKEE LETTER A: character inside BMP with both the Unicode properties ID_Start and ID_Continue
/(?<Ꭰ>)\k<Ꭰ>\k<\u13A0>\k<\u{13A0}>/;
/(?<\u13A0>)\k<Ꭰ>\k<\u13A0>\k<\u{13A0}>/;
/(?<\u{13A0}>)\k<Ꭰ>\k<\u13A0>\k<\u{13A0}>/;
/(?<_Ꭰ>)\k<_Ꭰ>\k<_\u13A0>\k<_\u{13A0}>/;
/(?<_\u13A0>)\k<_Ꭰ>\k<_\u13A0>\k<_\u{13A0}>/;
/(?<_\u{13A0}>)\k<_Ꭰ>\k<_\u13A0>\k<_\u{13A0}>/;
// U+19D4 NEW TAI LUE DIGIT FOUR: character inside BMP with only ID_Continue
/(?<᧔>)\k<᧔>\k<\u19D4>\k<\u{19D4}>/; // invalid
/(?<\u19D4>)\k<᧔>\k<\u19D4>\k<\u{19D4}>/; // invalid
/(?<\u{19D4}>)\k<᧔>\k<\u19D4>\k<\u{19D4}>/; // invalid
/(?<_᧔>)\k<_᧔>\k<_\u19D4>\k<_\u{19D4}>/;
/(?<_\u19D4>)\k<_᧔>\k<_\u19D4>\k<_\u{19D4}>/;
/(?<_\u{19D4}>)\k<_᧔>\k<_\u19D4>\k<_\u{19D4}>/;
// U+102A7 CARIAN LETTER A2: character outside BMP with both ID_Start and ID_Continue
/(?<𐊧>)\k<𐊧>\k<\u{102A7}>\k<\uD800\uDEA7>/;
/(?<\u{102A7}>)\k<𐊧>\k<\u{102A7}>\k<\uD800\uDEA7>/;
/(?<\uD800\uDEA7>)\k<𐊧>\k<\u{102A7}>\k<\uD800\uDEA7>/;
/(?<_𐊧>)\k<_𐊧>\k<_\u{102A7}>\k<_\uD800\uDEA7>/;
/(?<_\u{102A7}>)\k<_𐊧>\k<_\u{102A7}>\k<_\uD800\uDEA7>/;
/(?<_\uD800\uDEA7>)\k<_𐊧>\k<_\u{102A7}>\k<_\uD800\uDEA7>/;
// U+1113D CHAKMA DIGIT SEVEN: character outside BMP with only ID_Continue
/(?<𑄽>)\k<𑄽>\k<\u{1113D}>\k<\uD804\uDD3D>/; // invalid
/(?<\u{1113D}>)\k<𑄽>\k<\u{1113D}>\k<\uD804\uDD3D>/; // invalid
/(?<\uD804\uDD3D>)\k<𑄽>\k<\u{1113D}>\k<\uD804\uDD3D>/; // invalid
/(?<_𑄽>)\k<_𑄽>\k<_\u{1113D}>\k<_\uD804\uDD3D>/;
/(?<_\u{1113D}>)\k<_𑄽>\k<_\u{1113D}>\k<_\uD804\uDD3D>/;
/(?<_\uD804\uDD3D>)\k<_𑄽>\k<_\u{1113D}>\k<_\uD804\uDD3D>/;
// The following cases are all invalid:
// U+2F47 KANGXI RADICAL SUN: character inside BMP without both properties
/(?<⽇>)(?<\u2F47>)(?<\u{2F47}>)\k<⽇>\k<\u2F47>\k<\u{2F47}>/;
/(?<_⽇>)(?<_\u2F47>)(?<_\u{2F47}>)\k<_⽇>\k<_\u2F47>\k<_\u{2F47}>/;
// U+1F31A NEW MOON WITH FACE: character outside BMP without both properties
/(?<🌚>)(?<\u{1F31A}>)(?<\uD83C\uDF1A>)\k<🌚>\k<\u{1F31A}>\k<\uD83C\uDF1A>/;
/(?<_🌚>)(?<_\u{1F31A}>)(?<_\uD83C\uDF1A>)\k<_🌚>\k<_\u{1F31A}>\k<_\uD83C\uDF1A>/;
// Lone leading surrogate
/(?<\uD800>)(?<\u{D800}>)\k<\uD800>\k<\u{D800}>/;
/(?<_\uD800>)(?<_\u{D800}>)\k<_\uD800>\k<_\u{D800}>/;
// Lone trailing surrogate
/(?<\uDFFF>)(?<\u{DFFF}>)\k<\uDFFF>\k<\u{DFFF}>/;
/(?<_\uDFFF>)(?<_\u{DFFF}>)\k<_\uDFFF>\k<_\u{DFFF}>/;
// Fake surrogate pair with extended Unicode escapes – invalid even if the intended character has both properties
/(?<\u{D800}\u{DC00}>)\k<\u{D800}\u{DC00}>/;
/(?<_\u{D800}\u{DC00}>)\k<_\u{D800}\u{DC00}>/;
// Cases with Unicode escapes and extended Unicode escapes mixed
/(?<RegExp>)\k<RegExp>\k<\u{52}\u0065gE\u{78}p>\k<\u0052e\u0067\u{45}x\u{70}>/;
/(?<_RegExp>)\k<_RegExp>\k<_\u{52}\u0065gE\u{78}p>\k<_\u0052e\u0067\u{45}x\u{70}>/;
