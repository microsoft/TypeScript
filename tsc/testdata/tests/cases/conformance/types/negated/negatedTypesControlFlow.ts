interface A { type: "a", data: number }
interface B { type: "b", data: string }
interface Unknown { type: string & not ("a"|"b"), data: object }
type ABU = A | B | Unknown;
declare function needsNumber(x: number): void;
declare function needsString(x: string): void;
declare function needsObject(x: object): void;
declare var x: ABU;

if (x.type === "a") {
    let y = x.data;
    needsNumber(y);
}
else if (x.type === "b") {
    needsString(x.data);
}
else {
    needsObject(x.data);
}
