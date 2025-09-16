// @preserveConstEnums: false

function t(x: number) {
    if (x)
        /* before E */ const enum E { A = 1 } /* after E */
}
