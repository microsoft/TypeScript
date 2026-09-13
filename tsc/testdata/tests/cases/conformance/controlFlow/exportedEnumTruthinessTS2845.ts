// @strictNullChecks: true

export enum AdapterOutputType {
  APP_PAGE,
  PAGES,
}

declare const type: AdapterOutputType;

const kind =
  type === AdapterOutputType.APP_PAGE || AdapterOutputType.PAGES
    ? 'left'
    : 'right';
