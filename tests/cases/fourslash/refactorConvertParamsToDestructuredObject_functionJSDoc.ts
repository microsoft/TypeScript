/// <reference path='fourslash.ts' />

/////**
//// * Return the boolean state of attribute from an element
//// * /*a*/@param/*b*/ el The source of the attributes.
//// * @param atty Name of the attribute or a string of candidate attribute names.
//// * @param def Default boolean value when attribute is undefined.
//// */
////export function /*c*/getBoolFromAttribute/*d*/(
////    el:  HTMLElement | ElementRef,
////    attr: string | string[],
////    def: boolean = false): boolean {
////    return boolFromValue(getAttrValue(getAttrs(el), attr), def);
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Convert parameters to destructured object");
goTo.select("c", "d");
verify.refactorAvailable("Convert parameters to destructured object");