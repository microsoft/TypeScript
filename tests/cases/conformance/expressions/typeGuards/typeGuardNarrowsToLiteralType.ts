declare function isFoo(value: string) : value is "foo";
declare function doThis(value: "foo"): void;
declare function doThat(value: string) : void;
let value: string;
if (isFoo(value)) {
    doThis(value);
} else {
    doThat(value);
}

