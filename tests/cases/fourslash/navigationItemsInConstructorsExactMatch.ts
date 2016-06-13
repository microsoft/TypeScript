/// <reference path="fourslash.ts"/>

////class Test {
////    private search1: number;
////    constructor(public search2: boolean, readonly search3: string, search4: string) {
////    }
////}

// Search for properties defined in the constructor, but not other constructor paramters
var searchValue = "search";
verify.navigationItemsListContains("search1", "property", searchValue, "prefix");
verify.navigationItemsListContains("search2", "property", searchValue, "prefix");
verify.navigationItemsListContains("search3", "property", searchValue, "prefix");
