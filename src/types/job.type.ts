export type JobStatus = "pending" | "resolved" | "failed";

export interface Job {
  id: string;
  status: JobStatus;
  result?: string | null;
}
