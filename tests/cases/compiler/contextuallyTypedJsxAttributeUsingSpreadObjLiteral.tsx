// @strict: true
// @jsx: react
// @esModuleInterop: true
// @noEmit: true

/// <reference path="/.lib/react16.d.ts" />

import React from 'react';

// repro from https://github.com/microsoft/TypeScript/issues/54841
type AllOrNone<T> = T | { [K in keyof T]?: never };

type OrderRow = {
    name: string;
}

type OrderHistoryTableProps = {
  data: OrderRow[];
  noDataText?: string;
} &
  SearchParams;


type SearchParams = AllOrNone<{
  search: string;
  onSearchChange: (value: string) => void;
}>;

function OrderHistoryTable(props: OrderHistoryTableProps) {
    return null;
}

declare const rowData: OrderRow[];

<OrderHistoryTable
  data={rowData}
  {...{ search: '' }}
  onSearchChange={(value) => {}} 
/>;

<OrderHistoryTable
  data={rowData}
  {...{ search: '', onSearchChange: (value) => {} }}
/>;

const search = '';
<OrderHistoryTable
  data={rowData}
  {...{ search }}
  onSearchChange={(value) => {}} 
/>;
