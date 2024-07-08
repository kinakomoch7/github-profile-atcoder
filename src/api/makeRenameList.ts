import { RenameContestList } from "../constants";
import { RenameContestsType } from "../types/RenameContestsType";


const makeRenameList = ():[string[], string[]] => {

  const CList: string[] = [];
  const DList: string[] = [];
  
  RenameContestList.forEach((contest: RenameContestsType ) => {
    const key = Object.keys(contest)[0];
    if (contest[key].C) {
      CList.push(contest[key].C);
    }
    if (contest[key].D) {
      DList.push(contest[key].D);
    }
  });

  return [CList, DList]
}

export default makeRenameList