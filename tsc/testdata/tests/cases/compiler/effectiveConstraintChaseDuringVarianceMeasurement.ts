// @noEmit: true

// Regression test for microsoft/TypeScript#64423.
//
// Distilled from the three.js TSL node types. `Node<TNodeType>` is a generic type
// alias that resolves to an intersection whose constituents include deferred
// conditional types selecting between sets of generic "extension" interfaces.
// Resolving `uv().div(vec2())` measures the variances of those extension
// interfaces, and while the variance stack is non-empty the combined-constraint
// comparison in `structuredTypeRelatedTo` repeatedly hoists the constraints of
// the intersection source into a structurally new and ever larger intersection
// (each round peels a branch off the deferred conditional chain, producing new
// type identities the relation cache never recognizes as recursive). Without a
// guard this chase grows without bound until the process runs out of memory;
// checking this file must terminate with no diagnostics instead.

export type NumType = "float" | "int" | "uint";
export type IntegerType = "int" | "uint";
export type NumOrBoolType = NumType | "bool";
export type FloatVecType = "vec2" | "vec3" | "vec4";
export type MatType = "mat2" | "mat3" | "mat4";

interface NumberToVec {
    float: "vec";
    int: "ivec";
    uint: "uvec";
}

type NumberToVec2<TNum extends NumType> = `${NumberToVec[TNum]}2`;

type Number<TNum extends NumType> = Node<TNum> | number;

type Vec2OrLessOrNumber<TNum extends NumType> = Number<TNum> | Node<NumberToVec2<TNum>>;

declare class NodeClass {
}

interface NodeExtensions<TNodeType> {
}

interface FloatExtensions {
}

interface IntExtensions {
}

interface UintExtensions {
}

interface BoolExtensions {
}

interface NumExtensions<TNum extends NumType> {
}

interface IntegerExtensions<TInteger extends IntegerType> {
}

interface NumOrBoolExtensions<TNumOrBool extends NumOrBoolType> {
}

interface NumVec2Extensions<TNum extends NumType> {
}

interface NumVec3Extensions<TNum extends NumType> {
}

interface NumVec4Extensions<TNum extends NumType> {
}

interface NumOrBoolVec2Extensions<TNumOrBool extends NumOrBoolType> {
}

interface NumOrBoolVec3Extensions<TNumOrBool extends NumOrBoolType> {
}

interface NumOrBoolVec4Extensions<TNumOrBool extends NumOrBoolType> {
}

interface Vec2Extensions {
}

interface Vec3Extensions {
}

interface Vec4Extensions {
}

interface ColorExtensions {
}

interface FloatVecExtensions<TVec extends FloatVecType> {
}

interface FloatOrVecExtensions<TNodeType> {
}

interface IntOrVecExtensions<TNodeType> {
}

interface BoolOrVecExtensions<TNodeType> {
}

interface Mat2Extensions {
}

interface Mat3Extensions {
}

interface Mat4Extensions {
}

interface MatExtensions<TMat extends MatType> {
}

type Node<TNodeType = unknown> =
    & NodeClass
    & (unknown extends TNodeType ? {} : NodeExtensions<TNodeType>)
    & (TNodeType extends "float"
        ? NumOrBoolExtensions<"float"> & FloatExtensions & NumExtensions<"float"> & FloatOrVecExtensions<"float">
        : TNodeType extends "int"
            ? NumOrBoolExtensions<"int"> & IntExtensions & NumExtensions<"int"> & IntegerExtensions<"int"> & IntOrVecExtensions<"int">
        : TNodeType extends "uint"
            ? NumOrBoolExtensions<"uint"> & UintExtensions & NumExtensions<"uint"> & IntegerExtensions<"uint"> & IntOrVecExtensions<"uint">
        : TNodeType extends "bool" ? NumOrBoolExtensions<"bool"> & BoolExtensions & BoolOrVecExtensions<"bool">
        : TNodeType extends "vec2"
            ? NumOrBoolVec2Extensions<"float"> & Vec2Extensions & NumVec2Extensions<"float"> & FloatVecExtensions<"vec2"> & FloatOrVecExtensions<"vec2">
        : TNodeType extends "ivec2"
            ? NumOrBoolVec2Extensions<"int"> & NumVec2Extensions<"int"> & IntOrVecExtensions<"ivec2">
        : TNodeType extends "uvec2"
            ? NumOrBoolVec2Extensions<"uint"> & NumVec2Extensions<"uint"> & IntOrVecExtensions<"uvec2">
        : TNodeType extends "bvec2" ? NumOrBoolVec2Extensions<"bool"> & BoolOrVecExtensions<"bvec2">
        : TNodeType extends "vec3"
            ? NumOrBoolVec3Extensions<"float"> & Vec3Extensions & NumVec3Extensions<"float"> & FloatVecExtensions<"vec3"> & FloatOrVecExtensions<"vec3">
        : TNodeType extends "ivec3"
            ? NumOrBoolVec3Extensions<"int"> & NumVec3Extensions<"int"> & IntOrVecExtensions<"ivec3">
        : TNodeType extends "uvec3"
            ? NumOrBoolVec3Extensions<"uint"> & NumVec3Extensions<"uint"> & IntOrVecExtensions<"uvec3">
        : TNodeType extends "bvec3" ? NumOrBoolVec3Extensions<"bool"> & BoolOrVecExtensions<"bvec3">
        : TNodeType extends "vec4"
            ? NumOrBoolVec4Extensions<"float"> & Vec4Extensions & NumVec4Extensions<"float"> & FloatVecExtensions<"vec4"> & FloatOrVecExtensions<"vec4">
        : TNodeType extends "ivec4"
            ? NumOrBoolVec4Extensions<"int"> & NumVec4Extensions<"int"> & IntOrVecExtensions<"ivec4">
        : TNodeType extends "uvec4"
            ? NumOrBoolVec4Extensions<"uint"> & NumVec4Extensions<"uint"> & IntOrVecExtensions<"uvec4">
        : TNodeType extends "bvec4" ? NumOrBoolVec4Extensions<"bool"> & BoolOrVecExtensions<"bvec4">
        : TNodeType extends "color" ? ColorExtensions
        : TNodeType extends "mat2" ? Mat2Extensions & MatExtensions<"mat2">
        : TNodeType extends "mat3" ? Mat3Extensions & MatExtensions<"mat3">
        : TNodeType extends "mat4" ? Mat4Extensions & MatExtensions<"mat4">
        : {});

interface AddSubMulDivNumberVec<TNum extends NumType> {
    (a: Vec2OrLessOrNumber<TNum>, b: Vec2OrLessOrNumber<TNum>, ...params: Vec2OrLessOrNumber<TNum>[]): Node<NumberToVec2<TNum>>;
}

interface AddSubMulDivNumberVecNumExtensions<TNum extends NumType> {
    (b: Vec2OrLessOrNumber<TNum>, ...params: Vec2OrLessOrNumber<TNum>[]): Node<NumberToVec2<TNum>>;
}

interface AddSubMulDivNumberVecVec2Extensions<TNum extends NumType> {
    (b: Vec2OrLessOrNumber<TNum>, ...params: Vec2OrLessOrNumber<TNum>[]): Node<NumberToVec2<TNum>>;
}

interface Div extends AddSubMulDivNumberVec<"float">, AddSubMulDivNumberVec<"int">, AddSubMulDivNumberVec<"uint"> {
}

declare const div: Div;

interface NumExtensions<TNum extends NumType> {
    div: AddSubMulDivNumberVecNumExtensions<TNum>;
}

interface NumVec2Extensions<TNum extends NumType> {
    div: AddSubMulDivNumberVecVec2Extensions<TNum>;
}

declare class ContextNodeInterface<TNodeType> extends NodeClass {
    node: Node<TNodeType> | null;
}

type ContextNode<TNodeType> = ContextNodeInterface<TNodeType>;

interface NodeExtensions<TNodeType> {
    context: (context?: unknown) => ContextNode<TNodeType>;
}

declare const uv: () => Node<"vec2">;

declare const vec2: () => Node<"vec2">;

export const x = uv().div(vec2());
