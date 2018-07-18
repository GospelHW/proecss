/**
 * Created by gaole on 2018/2/9.
 */
export class ProjectInfo {
  totalcount: string;
  stopcount: string;
  usecount: string;
  notusercount: string;
  userate: string;
  norate: string;
  completion: string;
  activeproject: string;
}

export class ProjectPassInfo {
  crate: string;
  nrate: string;
  prate: string;
  onepass_count: number;
  finish_count: number;
}

export class ProjectDistributionInfo {
  amount: string;
  engineering_name: string;
}

export class NoOnceThroughProcessInfo {
  amount: string;
  engineering_name: string;
}

export class ProcessDistributionInfo {
  concealmentcount: string;
  notconcealmentcount: string;
  processcount: string;
  engineering_name: string;
}
