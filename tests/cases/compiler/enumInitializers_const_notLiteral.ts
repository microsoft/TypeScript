const notALiteralType = 1 ? 2 : 3;
const enum E {
    x = notALiteralType,
}
