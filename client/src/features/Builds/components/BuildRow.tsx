import { useState } from 'react';
import { Check, Edit2, Trash2, X } from 'lucide-react';

import { Build, Grade, Priority, Status } from '../types';
import Select from '../../../components/Select';
import { GRADES, PRIORITIES, STATUSES } from '../constants';

interface BuildRowProps {
  build: Build;
  builds: Build[];
  setBuilds: React.Dispatch<React.SetStateAction<Build[]>>;
}

const BuildRow = ({ build, builds, setBuilds }: BuildRowProps) => {
  const [editedBuild, setEditedBuild] = useState(build);
  const [editingId, setEditingId] = useState<number | null>(null);

  const deleteBuild = (id: number) => setBuilds(builds.filter((build: Build) => build.id !== id));
  const startEdit = (build: Build) => setEditingId(build.id);
  const cancelEdit = () => setEditingId(null);
  const saveEdit = (id: number, updatedBuild: Build) => {
    setBuilds(builds.map((build: Build) => (build.id === id ? updatedBuild : build)));
    setEditingId(null);
  };

  const handleSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    if (type === 'grade') {
      setEditedBuild({ ...editedBuild, grade: e.target.value as Grade, updatedAt: new Date() });
    } else if (type === 'status') {
      setEditedBuild({ ...editedBuild, status: e.target.value as Status, updatedAt: new Date() });
    } else if (type === 'priority') {
      setEditedBuild({ ...editedBuild, priority: e.target.value as Priority, updatedAt: new Date() });
    }
  };

  if (editingId === build.id) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={editedBuild.name}
          onChange={(e) => setEditedBuild({ ...editedBuild, name: e.target.value })}
          className="flex-1 bg-transparent border-b border-white/20 px-2 py-1 outline-0 focus:border-b-white"
        />
        <Select
          value={editedBuild.grade}
          onChange={(e) => handleSelectOnChange(e, 'grade')}
          className="bg-transparent border-b border-white/20 px-2 py-1"
          options={GRADES}
        />
        <Select
          value={editedBuild.status}
          onChange={(e) => handleSelectOnChange(e, 'status')}
          className="bg-transparent border-b border-white/20 px-2 py-1"
          options={STATUSES}
        />
        <Select
          value={editedBuild.priority}
          onChange={(e) => handleSelectOnChange(e, 'priority')}
          className="bg-transparent border-b border-white/20 px-2 py-1"
          options={PRIORITIES}
        />
        <button onClick={() => saveEdit(build.id, editedBuild)} className="text-green-500">
          <Check size={16} />
        </button>
        <button onClick={cancelEdit} className="text-red-500">
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 font-medium px-3">
      <span className="flex-1">{build.name}</span>
      <span className="w-16 text-white/60">{build.grade}</span>
      <span className="w-24 text-white/60">{build.status}</span>
      <span className="w-16 text-white/60">{build.priority}</span>
      <span className="w-16 flex gap-2 justify-start">
        <button onClick={() => startEdit(build)} className="text-white/60 hover:text-white">
          <Edit2 size={16} />
        </button>
        <button onClick={() => deleteBuild(build.id)} className="text-white/60 hover:text-white">
          <Trash2 size={16} />
        </button>
      </span>
    </div>
  );
};

export default BuildRow;
