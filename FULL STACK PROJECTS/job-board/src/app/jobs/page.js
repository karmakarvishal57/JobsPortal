import { currentUser } from "@clerk/nextjs/server";
import {
  fetchProfileAction,
  fetchRecruiterJobsAction,
  fetchCandidateJobsAction,
  fetchJobApplicationForCandidateAction,
  fetchJobApplicationForRecruiterAction,
  createFilterJobsAction,
} from "@/server-actions";
import JobsListing from "@/components/jobsListing";
import { redirect } from "next/navigation";

export default async function jobs({ searchParams }) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo?._id) {
    redirect("/onboard");
  }
  const jobsListing =
    profileInfo?.role === "candidate"
      ? await fetchCandidateJobsAction(await searchParams)
      : await fetchRecruiterJobsAction(user?.id);

  const getJobApplicationsList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationForCandidateAction(user?.id)
      : await fetchJobApplicationForRecruiterAction(user?.id);
  const filterJobs = await createFilterJobsAction();
  return (
    <JobsListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobsListing={jobsListing}
      getJobApplicationsList={getJobApplicationsList}
      filterJobs={filterJobs}
    ></JobsListing>
  );
}
