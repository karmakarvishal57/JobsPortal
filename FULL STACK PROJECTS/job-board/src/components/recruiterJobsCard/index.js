import { useState } from "react";
import CommonCard from "../common-card";
import JobsIcon from "../jobs-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

export default function recruiterJobsCard({ jobItem, getJobApplicationsList,jobsListing }) {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  return (
    <div>
      <CommonCard
        icon={<JobsIcon></JobsIcon>}
        title={jobItem?.title}
        footerContent={
          <Button
            className="disabled:opacity-65 h-11 flex items-center justify-center"
            onClick={setShowApplicantsDrawer}
            disabled={
              getJobApplicationsList.filter(
                (item) => item?.jobId === jobItem?._id
              )?.length === 0
            }
          >
            {
              getJobApplicationsList.filter(
                (item) => item?.jobId === jobItem?._id
              )?.length
            }{" "}
            Applicants
          </Button>
        }
        description={jobItem?.description}
      ></CommonCard>
      <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        jobItem={jobItem}
        jobApplications={getJobApplicationsList.filter((item) => {
          return item.jobId === jobItem._id;
        })}
      ></JobApplicants>
    </div>
  );
}
