import { DocType } from "../completedDocsRule";
import { Exclusion } from "./exclusion";
import { IInputExclusionDescriptors } from "./exclusionDescriptors";
export declare type ExclusionsMap = Map<DocType, Array<Exclusion<any>>>;
export declare class ExclusionFactory {
    constructExclusionsMap(ruleArguments: IInputExclusionDescriptors[]): ExclusionsMap;
    private addRequirements(exclusionsMap, descriptors);
    private createRequirementsForDocType(docType, descriptor);
}
