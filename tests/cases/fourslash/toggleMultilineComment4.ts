// This is an edgecase. The string contains a multiline comment syntax but it is a string
// and not actually a comment. When toggling it doesn't get escaped or appended comments.
// The result would be a portion of the selection to be "not commented".

//// /*let s[|omeLongVa*/riable = "Some other /*long th*/in|]g";

verify.toggleMultilineComment(`/*let s*//*omeLongVa*//*riable = "Some other /*long th*/in*/g";`);