// @target: ES5
// @declaration: true
// @removeComments: false
// @module: commonjs

// @Filename: declFileAccessors_0.ts
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

// @Filename: declFileAccessors_1.ts
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