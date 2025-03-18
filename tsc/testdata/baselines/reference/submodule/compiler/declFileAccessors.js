//// [tests/cases/compiler/declFileAccessors.ts] ////

//// [declFileAccessors_0.ts]
/** This is comment for c1*/
export class c1 {
    /** getter property*/
    public get p3() {
        return 10;
    }
    /** setter property*/
    public set p3(/** this is value*/value: number) {
    }
    /** private getter property*/
    private get pp3() {
        return 10;
    }
    /** private setter property*/
    private set pp3(/** this is value*/value: number) {
    }
    /** static getter property*/
    static get s3() {
        return 10;
    }
    /** setter property*/
    static set s3( /** this is value*/value: number) {
    }
    public get nc_p3() {
        return 10;
    }
    public set nc_p3(value: number) {
    }
    private get nc_pp3() {
        return 10;
    }
    private set nc_pp3(value: number) {
    }
    static get nc_s3() {
        return "";
    }
    static set nc_s3(value: string) {
    }

    // Only getter property
    public get onlyGetter() {
        return 10;
    }

    // Only setter property
    public set onlySetter(value: number) {
    }
}

//// [declFileAccessors_1.ts]
/** This is comment for c2 - the global class*/
class c2 {
    /** getter property*/
    public get p3() {
        return 10;
    }
    /** setter property*/
    public set p3(/** this is value*/value: number) {
    }
    /** private getter property*/
    private get pp3() {
        return 10;
    }
    /** private setter property*/
    private set pp3(/** this is value*/value: number) {
    }
    /** static getter property*/
    static get s3() {
        return 10;
    }
    /** setter property*/
    static set s3( /** this is value*/value: number) {
    }
    public get nc_p3() {
        return 10;
    }
    public set nc_p3(value: number) {
    }
    private get nc_pp3() {
        return 10;
    }
    private set nc_pp3(value: number) {
    }
    static get nc_s3() {
        return "";
    }
    static set nc_s3(value: string) {
    }

    // Only getter property
    public get onlyGetter() {
        return 10;
    }

    // Only setter property
    public set onlySetter(value: number) {
    }
}

//// [declFileAccessors_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c1 = void 0;
class c1 {
    get p3() {
        return 10;
    }
    set p3(value) {
    }
    get pp3() {
        return 10;
    }
    set pp3(value) {
    }
    static get s3() {
        return 10;
    }
    static set s3(value) {
    }
    get nc_p3() {
        return 10;
    }
    set nc_p3(value) {
    }
    get nc_pp3() {
        return 10;
    }
    set nc_pp3(value) {
    }
    static get nc_s3() {
        return "";
    }
    static set nc_s3(value) {
    }
    get onlyGetter() {
        return 10;
    }
    set onlySetter(value) {
    }
}
exports.c1 = c1;
//// [declFileAccessors_1.js]
class c2 {
    get p3() {
        return 10;
    }
    set p3(value) {
    }
    get pp3() {
        return 10;
    }
    set pp3(value) {
    }
    static get s3() {
        return 10;
    }
    static set s3(value) {
    }
    get nc_p3() {
        return 10;
    }
    set nc_p3(value) {
    }
    get nc_pp3() {
        return 10;
    }
    set nc_pp3(value) {
    }
    static get nc_s3() {
        return "";
    }
    static set nc_s3(value) {
    }
    get onlyGetter() {
        return 10;
    }
    set onlySetter(value) {
    }
}
