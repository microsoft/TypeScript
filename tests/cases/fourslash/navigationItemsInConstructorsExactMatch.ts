/// <reference path="fourslash.ts"/>

////class Test {
////    private search1: number;
////    constructor(public search2: boolean, search3: string) {
////    }
////}

// Search for properties defined in the constructor, but not other constructor paramters
var searchValue = "search";
verify.navigationItemsListContains("search1", "property", searchValue, "prefix");
verify.navigationItemsListContains("search2", "property", searchValue, "prefix");

// There should be not be any other results
verify.navigationItemsListCount(2, searchValue, "exact");
