import CandidateActivity from "@/components/candidate-activity";
import { fetchCandidateActivityAction, fetchJobApplicationForCandidateAction } from "@/server-actions"
import { currentUser } from "@clerk/nextjs/server";

export default async function Activity ()
{const user=await currentUser();
  const jobList=await fetchCandidateActivityAction();
  const jobApplicants=await fetchJobApplicationForCandidateAction(user?.id)
  console.log(jobList,jobApplicants);
return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants}/>
}
