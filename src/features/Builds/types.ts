export type Grade = 'HG' | 'RG' | 'MG' | 'PG' | 'SD' | 'Other';
export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Backlog' | 'In Progress' | 'Build' | 'Painted' | 'Complete';

export interface Build {
  id: number;
  name: string;
  grade: Grade;
  priority: Priority;
  status: Status;
  createdAt: Date;
  updatedAt: Date | null;
}
