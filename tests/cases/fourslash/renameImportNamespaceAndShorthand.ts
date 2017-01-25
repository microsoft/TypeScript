/// <reference path='fourslash.ts' />

////import * as [|foo|] from 'bar';
////const bar = { [|foo|] };

verify.rangesAreRenameLocations();
