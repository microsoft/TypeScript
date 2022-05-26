//// [mappedTypeSinglePropertyConstrainsProperly.ts]
interface ListElement {
    condition: boolean;
    id: string;
}

const list = [
    { condition: true, id: "yes" },
    { condition: false, id: "no" },
] as const;

type CheckCondition<
    List extends readonly ListElement[],
    ID extends List[number]["id"],
    > = ({ id: ID } & List[number])["condition"]

type Mapped = {
    [ID in "yes"]: CheckCondition<typeof list, ID>
}["yes"]

type NotMapped = CheckCondition<typeof list, "yes">

declare const mapped: Mapped
declare const notMapped: NotMapped

let test: true = true
test = mapped
test = notMapped

//// [mappedTypeSinglePropertyConstrainsProperly.js]
var list = [
    { condition: true, id: "yes" },
    { condition: false, id: "no" },
];
var test = true;
test = mapped;
test = notMapped;
