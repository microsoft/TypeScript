import * as ts from "typescript";
import { Location, Privacy } from "../completedDocsRule";
import { Exclusion } from "./exclusion";
export interface IClassExclusionDescriptor {
    locations?: Location[];
    privacies?: Privacy[];
}
export declare class ClassExclusion extends Exclusion<IClassExclusionDescriptor> {
    readonly locations: Set<Location>;
    readonly privacies: Set<Privacy>;
    excludes(node: ts.Node): boolean;
    private shouldLocationBeDocumented(node);
    private shouldPrivacyBeDocumented(node);
}
