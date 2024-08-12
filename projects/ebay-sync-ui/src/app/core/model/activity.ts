import { ActivityFlow } from './activity-flow';
import { ActivityStatus } from './activity-status';

export interface Activity {
  flow: ActivityFlow;
  description: string;
  status: ActivityStatus;
  createdDate: string;
}
