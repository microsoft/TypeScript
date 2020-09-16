//// [templateLiteralTypesPatterns.ts]
type RequiresLeadingSlash = `/${string}`;

// ok
const a: RequiresLeadingSlash = "/bin";

// not ok
const b: RequiresLeadingSlash = "no slash";

type Protocol<T extends string, U extends string> = `${T}://${U}`;
function download(hostSpec: Protocol<"http" | "https" | "ftp", string>) { }
// ok, has protocol
download("http://example.com/protocol");
// issues error - no protocol
download("example.com/noprotocol");
// issues error, incorrect protocol
download("gopher://example.com/protocol");

const q: RequiresLeadingSlash extends string ? true : false = true;

//// [templateLiteralTypesPatterns.js]
// ok
var a = "/bin";
// not ok
var b = "no slash";
function download(hostSpec) { }
// ok, has protocol
download("http://example.com/protocol");
// issues error - no protocol
download("example.com/noprotocol");
// issues error, incorrect protocol
download("gopher://example.com/protocol");
var q = true;
