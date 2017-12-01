/// <reference path='fourslash.ts' />

////import [|foo|] from 'bar';
////const bar = { [|foo|] };

verify.rangesAreRenameLocations();
