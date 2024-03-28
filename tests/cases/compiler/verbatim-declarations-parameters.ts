// @strictNullChecks: true
// @declaration: true

type Map = {} & { [P in string]: any }
type MapOrUndefined = Map | undefined | "dummy"
export class Foo {
  constructor(
    // Type node is accurate, preserve
    public reuseTypeNode?: Map | undefined,
    public reuseTypeNode2?: Exclude<MapOrUndefined, "dummy">,
    // Resolve type node, requires adding | undefined
    public resolveType?: Map,
  ) { }
}

export function foo1(
    // Type node is accurate, preserve
    reuseTypeNode: Map | undefined = {},
    reuseTypeNode2: Exclude<MapOrUndefined, "dummy">  = {},
    // Resolve type node, requires adding | undefined
    resolveType: Map = {}, 
    requiredParam: number) {

}
