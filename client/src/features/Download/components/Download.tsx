import { useState } from 'react';
import { Download as DownloadIcon } from 'lucide-react';

import Select from '../../../components/Select';
import { Build } from '../../Builds/types';

const Download = () => {
  const [downloadType, setDownloadType] = useState('json');
  const hasDownloadableContent = window.localStorage.getItem('gunplaBuilds');

  const handleDownload = () => {
    let content = window.localStorage.getItem('gunplaBuilds') as string;
    let fileType = 'text/json';

    if (downloadType === 'json') {
      const json = JSON.stringify(JSON.parse(content), null, 2);
      content = json;
      fileType = 'text/json';
    } else if (downloadType === 'csv') {
      const rows = 'name,grade,status,priority\n';
      const csv = JSON.parse(content)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ id, createdAt, updatedAt, ...rest }: Build) => Object.values(rest).join(','))
        .join('\n');

      content = rows + csv;
      fileType = 'text/csv';
    }

    const blob = new Blob([content], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gunpla-backlog.${downloadType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const options = [
    { label: 'JSON', value: 'json' },
    { label: 'CSV', value: 'csv' },
  ];

  if (hasDownloadableContent) {
    return (
      <div className="flex justify-end gap-2 text-white">
        <Select
          value={downloadType}
          onChange={(e) => setDownloadType(e.target.value)}
          className="bg-transparent border rounded-sm border-white/20 px-3 py-3"
          options={options}
        />
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 text-black bg-white/90 px-3 rounded-sm transition-colors duration-150 hover:text-white/90 hover:bg-white/10 hover:cursor-pointer"
        >
          <DownloadIcon size={16} /> Download Backlog
        </button>
      </div>
    );
  }
};

export default Download;
