type Tag = {__tag: any};
declare function isNonBlank(value: string) : value is (string & Tag);
declare function doThis(value: string & Tag): void;
declare function doThat(value: string) : void;
let value: string;
if (isNonBlank(value)) {
    doThis(value);
} else {
    doThat(value);
}


const enum Tag2 {}
declare function isNonBlank2(value: string) : value is (string & Tag2);
declare function doThis2(value: string & Tag2): void;
declare function doThat2(value: string) : void;
if (isNonBlank2(value)) {
    doThis2(value);
} else {
    doThat2(value);
}
