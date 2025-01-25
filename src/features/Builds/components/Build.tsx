import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { GRADES, PRIORITIES, STATUSES } from '../constants';
import BuildTable from './BuildTable';

const GunplaBacklog = () => {
  const [builds, setBuilds] = useState(() => {
    const saved = localStorage.getItem('gunplaBuilds');
    return saved ? JSON.parse(saved) : [];
  });

  const [newBuild, setNewBuild] = useState({
    name: '',
    grade: 'hg',
    status: 'backlog',
    priority: 'medium',
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('gunplaBuilds', JSON.stringify(builds));
  }, [builds]);

  const addBuild = () => {
    if (newBuild.name.trim()) {
      setBuilds([...builds, { ...newBuild, id: Date.now(), createdAt: new Date() }]);
      setNewBuild({ name: '', grade: 'HG', status: 'Backlog', priority: 'Medium' });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBuild({ ...newBuild, name: e.target.value });
  };

  const handleSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const value = e.target.value;

    if (type === 'grade') {
      setNewBuild({ ...newBuild, grade: value });
    } else if (type === 'status') {
      setNewBuild({ ...newBuild, status: value });
    } else if (type === 'priority') {
      setNewBuild({ ...newBuild, priority: value });
    }
  };

  return (
    <div className="text-white py-10">
      <div className="flex gap-2 mb-4">
        <Input
          value={newBuild.name}
          onChange={(e) => handleOnChange(e)}
          placeholder="Kit Name"
          className="flex-1 bg-transparent border rounded-sm border-white/20 px-2 py-3 outline-0 focus:outline-white focus:outline-1"
        />
        <Select
          value={newBuild.grade}
          onChange={(e) => handleSelectOnChange(e, 'grade')}
          className="bg-transparent border rounded-sm border-white/20 px-3 py-3"
          options={GRADES}
        />
        <Select
          value={newBuild.status}
          onChange={(e) => handleSelectOnChange(e, 'status')}
          className="bg-transparent border rounded-sm border-white/20 px-3 py-3"
          options={STATUSES}
        />
        <Select
          value={newBuild.priority}
          onChange={(e) => handleSelectOnChange(e, 'priority')}
          className="bg-transparent border rounded-sm border-white/20 px-3 py-3"
          options={PRIORITIES}
        />
        <button
          onClick={addBuild}
          className="flex items-center gap-1 text-black bg-white/90 px-3 rounded-sm transition-colors duration-150 hover:text-white/90 hover:bg-white/10 hover:cursor-pointer"
        >
          <Plus size={16} /> Add Kit
        </button>
      </div>

      <div className="space-y-4">
        <div className="w-full mb-4">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Kits"
            className="bg-transparent border rounded-sm border-white/20 px-2 py-3 outline-0 focus:outline-white focus:outline-1 w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <BuildTable builds={builds} searchQuery={searchQuery} setBuilds={setBuilds} />
      </div>
    </div>
  );
};

export default GunplaBacklog;
