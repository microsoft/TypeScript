// @strict: true
// @noEmit: true

type Path = string & { _pathBrand: any };

type JoinedPath = `${Path}/${Path}`;

declare function joinedPath(p: JoinedPath): void;

joinedPath("foo/bar");

declare const somePath: Path;

joinedPath(`${somePath}/${somePath}`);


type StartsWithA = `a${string}`;
type EndsWithA = `${string}a`;


declare function withinAs(p: StartsWithA & EndsWithA): void;

withinAs("");
withinAs("a");
withinAs("ab");
withinAs("aba");
withinAs("abavvvva");
