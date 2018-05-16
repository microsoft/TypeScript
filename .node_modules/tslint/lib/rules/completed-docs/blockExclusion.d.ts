import * as ts from "typescript";
import { Visibility } from "../completedDocsRule";
import { Exclusion } from "./exclusion";
export interface IBlockExclusionDescriptor {
    visibilities?: Visibility[];
}
export declare class BlockExclusion extends Exclusion<IBlockExclusionDescriptor> {
    readonly visibilities: Set<Visibility>;
    excludes(node: ts.Node): boolean;
}
