// @strict: true
// @noEmit: true

// Negated types combined with keyof and mapped-type key remapping (`as`).

interface Obj {
    id: number;
    name: string;
    method(): void;
}

// keyof over the object.
type K = keyof Obj; // "id" | "name" | "method"

// Negation of a keyof union.
type NotKeyof = not keyof Obj; // not ("id" | "name" | "method")

// keyof applied to a negated object type.
type KeyofNot = keyof (not Obj);

// Key remapping that filters out a specific key via `as (K & not "id")`.
type WithoutId = {
    [P in keyof Obj as (P & not "id")]: Obj[P];
};

// Key remapping that filters out several keys.
type OnlyData = {
    [P in keyof Obj as (P & not ("id" | "method"))]: Obj[P];
};

// Probes against the remapped types.
declare let withoutId: WithoutId;
withoutId.name;   // should exist
withoutId.method; // should exist
withoutId.id;     // should be removed

declare let onlyData: OnlyData;
onlyData.name;   // should exist
onlyData.id;     // should be removed
onlyData.method; // should be removed

// Generic key filtering.
type Omit2<T, K extends keyof T> = {
    [P in keyof T as (P & not K)]: T[P];
};
type ObjNoName = Omit2<Obj, "name">;
declare let objNoName: ObjNoName;
objNoName.id;   // should exist
objNoName.name; // should be removed
