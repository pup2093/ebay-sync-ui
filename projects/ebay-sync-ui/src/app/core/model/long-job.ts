import { LongJobStatus } from './long-job-status';

export interface LongJob {
  longJobId: number;
  progress: number;
  status: LongJobStatus;
  jobType: string;
  failureMessage?: string;
  successMessage?: string;
}
