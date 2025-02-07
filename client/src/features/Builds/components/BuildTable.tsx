import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

import BuildRow from './BuildRow';
import { Build } from '../types';

interface BuildTableProps {
  builds: Build[];
  searchQuery: string;
  setBuilds: React.Dispatch<React.SetStateAction<Build[]>>;
}

const BuildTable = ({ builds, searchQuery, setBuilds }: BuildTableProps) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const showArrow = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <ArrowDown size={12} /> : <ArrowUp size={12} />;
    }
    return;
  };

  const handleSortOnClick = (key: string) => {
    setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <>
      <div className="flex items-center gap-2 bg-white/10 rounded-sm text-sm font-medium text-white/60 py-4 px-3">
        <button
          className="flex-1 flex items-center gap-1 hover:text-white hover:cursor-pointer"
          onClick={() => handleSortOnClick('name')}
        >
          Kit Name {showArrow('name')}
        </button>
        <button
          className="w-16 flex items-center gap-1 hover:text-white hover:cursor-pointer"
          onClick={() => handleSortOnClick('grade')}
        >
          Grade {showArrow('grade')}
        </button>
        <button
          className="w-24 flex items-center gap-1 hover:text-white hover:cursor-pointer"
          onClick={() => handleSortOnClick('status')}
        >
          Status {showArrow('status')}
        </button>
        <button
          className="w-16 flex items-center gap-1 hover:text-white hover:cursor-pointer"
          onClick={() => handleSortOnClick('priority')}
        >
          Priority {showArrow('priority')}
        </button>
        <span className="w-16">Actions</span>
      </div>
      <div className="space-y-4">
        {[...builds]
          .sort((a, b) => {
            if (sortConfig.direction === 'asc') {
              return (a[sortConfig.key as keyof Build] ?? '') > (b[sortConfig.key as keyof Build] ?? '') ? 1 : -1;
            }
            return (a[sortConfig.key as keyof Build] ?? '') < (b[sortConfig.key as keyof Build] ?? '') ? 1 : -1;
          })
          .filter((build) => build.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((build) => (
            <BuildRow key={build.id} build={build} builds={builds} setBuilds={setBuilds} />
          ))}
      </div>
    </>
  );
};

export default BuildTable;
