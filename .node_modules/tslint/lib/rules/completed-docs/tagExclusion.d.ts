/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as ts from "typescript";
import { Exclusion } from "./exclusion";
export interface ITagExclusionDescriptor {
    tags?: {
        content: IContentTags;
        existence: string[];
    };
}
export interface IContentTags {
    [i: string]: string;
}
export declare class TagExclusion extends Exclusion<ITagExclusionDescriptor> {
    private readonly contentTags;
    private readonly existenceTags;
    excludes(node: ts.Node): boolean;
    private getDocumentationNode(node);
    private parseTagsWithContents(nodeText);
}
