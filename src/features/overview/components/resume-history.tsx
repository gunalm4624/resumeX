'use client';

import * as React from 'react';
import Link from 'next/link';
import { createColumnHelper } from '@tanstack/react-table';
import { IconArrowRight } from '@tabler/icons-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';

import { Card, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/ui/table/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchInput from '@/components/search-input';

type ResumeRow = {
  id: string;
  resumeName: string;
  type: 'Rewritten' | 'Created';
  company: string;
  atsScore: string; // e.g., "82/100"
  lastModified: string; // date string
  status: 'Applied' | 'Not Applied';
};

const initialData: ResumeRow[] = [
  {
    id: '1',
    resumeName: 'Gunal - Amazon',
    type: 'Rewritten',
    company: 'Amazon - Product Designer',
    atsScore: '82/100',
    lastModified: '2025-09-21',
    status: 'Applied'
  },
  {
    id: '2',
    resumeName: 'Gunal - Google',
    type: 'Created',
    company: 'Google - UX Engineer',
    atsScore: '76/100',
    lastModified: '2025-09-18',
    status: 'Not Applied'
  },
  {
    id: '3',
    resumeName: 'Gunal - Netflix',
    type: 'Rewritten',
    company: 'Netflix - Product Designer',
    atsScore: '88/100',
    lastModified: '2025-09-10',
    status: 'Applied'
  },
  {
    id: '4',
    resumeName: 'Gunal - Microsoft',
    type: 'Created',
    company: 'Microsoft - Product Designer',
    atsScore: '79/100',
    lastModified: '2025-09-05',
    status: 'Not Applied'
  },
  {
    id: '5',
    resumeName: 'Gunal - Meta',
    type: 'Rewritten',
    company: 'Meta - UX Researcher',
    atsScore: '84/100',
    lastModified: '2025-08-30',
    status: 'Applied'
  },
  {
    id: '6',
    resumeName: 'Gunal - Apple',
    type: 'Created',
    company: 'Apple - Human Interface Designer',
    atsScore: '73/100',
    lastModified: '2025-08-27',
    status: 'Not Applied'
  },
];

const columnHelper = createColumnHelper<ResumeRow>();

export function ResumeHistoryTable() {
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'Applied' | 'Not Applied'>('all');
  const [data, setData] = React.useState<ResumeRow[]>(initialData);

  const filteredData = React.useMemo(() => {
    if (statusFilter === 'all') return data;
    return data.filter((row) => row.status === statusFilter);
  }, [data, statusFilter]);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('resumeName', {
        id: 'resumeName',
        header: 'Resume Name',
        cell: (info) => <span className='font-medium'>{info.getValue()}</span>
      }),
      columnHelper.accessor('type', {
        id: 'type',
        header: 'Type',
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor('company', {
        id: 'company',
        header: 'Company/JD Name',
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor('atsScore', {
        id: 'atsScore',
        header: 'ATS Score',
        cell: (info) => (
          <span className='text-foreground'>{info.getValue()}</span>
        )
      }),
      columnHelper.accessor('lastModified', {
        id: 'lastModified',
        header: 'Last Modified',
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
        }
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: 'Status',
        cell: (info) => info.getValue()
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => (
          <Link
            href={'#'}
            className='underline text-[#3B0189] inline-flex items-center gap-1'
          >
            <span>View</span>
            <IconArrowRight size={20} strokeWidth={1.5} className='text-[#3B0189]' />
          </Link>
        )
      })
    ],
    []
  );

  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(5));

  const pageCount = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const { table } = useDataTable<ResumeRow>({
    columns,
    data: filteredData,
    pageCount,
    initialState: {
      pagination: { pageIndex: 0, pageSize }
    }
  });

  return (
    <Card className='@container/card'>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold tracking-tight'>Resume History</h3>
          <div className='flex items-center gap-2'>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder='All Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='Applied'>Applied</SelectItem>
                <SelectItem value='Not Applied'>Not Applied</SelectItem>
              </SelectContent>
            </Select>
            {/* Place the table toolbar next to the dropdown */}
            <div className='hidden lg:flex lg:items-center'>
              <DataTableToolbar table={table} />
            </div>
            <div className='hidden md:block'>
              <SearchInput />
            </div>
          </div>
        </div>

        <DataTable table={table} />
      </CardContent>
    </Card>
  );
}


