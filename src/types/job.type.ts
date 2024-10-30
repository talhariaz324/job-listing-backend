export type JobStatus = 'pending' | 'resolved' | 'failed';

export interface Job {
  id: number;
  status: JobStatus;
  result: string | null;
}
