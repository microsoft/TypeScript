interface JQuery {
    each<T>(
        collection: T[], callback: (this: T, dit: T) => T
    ): any;
}

let $: JQuery;
let lines: string[];
$.each(lines, function(dit) {
    return dit.charAt(0) + this.charAt(1);
});
