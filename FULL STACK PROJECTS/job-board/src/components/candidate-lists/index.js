import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { fetchProfileAction, updateJobApplication } from "@/server-actions";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kkraxqfmecewtawbcjft.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcmF4cWZtZWNld3Rhd2JjamZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTQyNTYsImV4cCI6MjA1NzAzMDI1Nn0.B4og4oeAZCicaq-PojaSnyOKO8AuLF5gjBk0XrUsT2Q";

const supabaseClient = createClient(supabaseUrl, supabaseKey);
export default async function CandidateList({
  jobItem,
  jobApplications,
  setShowCurrentCandidateDetailsModal,
  showCurrentCandidateDetailsModal,
  currentCandidateDetails,
  setCurrentCandidateDetails,
}) {
  async function handleFetchCandidateDetails(candidateUserId) {
    const data = await fetchProfileAction(candidateUserId);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }

  async function handlePreviewResume() {
    const { data } = supabaseClient.storage
      .from("jobboard")
      .getPublicUrl(currentCandidateDetails?.candidate?.resume);
    const a = document.createElement("a");
    a.href = data.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    a.click();
  }

  async function handleUpdateJobStatus(getJobStatus) {
    const indexOfCurrentJobApplicant = jobApplications.findIndex(
      (item) => item?.candidateUserID === currentCandidateDetails?.userId
    );

    const jobApplicantsUpdate = {
      ...jobApplications[indexOfCurrentJobApplicant],
      status:
        jobApplications[indexOfCurrentJobApplicant].status.concat(getJobStatus),
    };
    await updateJobApplication(jobApplicantsUpdate, "/jobs");
    console.log(jobApplicantsUpdate, "jobApplicantsUpdate");
  }

  return (
    <Fragment>
      {jobApplications && jobApplications.length > 0
        ? jobApplications.map((item) => (
            <div className="flex justify-between items-center shadow-xl rounded-lg  border overflow-hidden  p-4 bg-white w-full max-w-lg">
              <h3 className="text-lg text-black font-medium ">{item?.name}</h3>
              <Button
                className="h-11 flex items-center justify-center "
                onClick={() =>
                  handleFetchCandidateDetails(item?.candidateUserID)
                }
              >
                View Profile
              </Button>
            </div>
          ))
        : null}

      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setShowCurrentCandidateDetailsModal(false);
          setCurrentCandidateDetails(null);
        }}
      >
        <DialogContent className="p-4 border-[5px] border-gray-500">
          <div>
            <h1 className="text-lg text-black font-bold inline">
              {currentCandidateDetails?.candidate?.name},
              <span className=" font-semibold">
                {currentCandidateDetails?.email}
              </span>
            </h1>
            <p className="text-gray-700 text-base font-bold">
              {currentCandidateDetails?.candidate?.currentCompany.toUpperCase()}
            </p>
            <p className="text-sm font-medium mb-1">
              {currentCandidateDetails?.candidate?.currentJobLocation}
            </p>
            <p>
              Total Experience :{" "}
              {currentCandidateDetails?.candidate?.totalExperience}
            </p>
            <p>
              Salary : {currentCandidateDetails?.candidate?.currentSalary} LPA
            </p>
            <p>
              Notice Period : {currentCandidateDetails?.candidate?.noticePeriod}
            </p>
            <div className="flex gap-3 flex-wrap mt-1">
              {currentCandidateDetails?.candidate?.skills
                .split("," || " ")
                .map((skillItem) => (
                  <div className="flex w-[100px] h-7 justify-center items-center text-wrap bg-black rounded-md">
                    <h2 className="text-white font-semibold">{skillItem}</h2>
                  </div>
                ))}
            </div>
            <div className="mt-2 ">
              <Button
                className=" flex items-center justify-center"
                onClick={handlePreviewResume}
              >
                Resume
              </Button>
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-2">
              <Button
                className="h-11 disabled:opacity-65 items-center justify-center outline outline-green-600 text-green-600 bg-green-200 hover:bg-green-200 active:bg-white "
                onClick={() => {
                  handleUpdateJobStatus("Selected");
                }}
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
                    )
                    ?.status?.includes("Selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
                    )
                    ?.status?.includes("Rejected")
                    ? true
                    : false
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item?.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status?.includes("Selected")
                  ? "Selected"
                  : "Select"}
              </Button>
              <Button
                className="h-11 disabled:opacity-65  items-center justify-center text-red-500 outline outline-red-600 bg-red-200 hover:bg-red-200 active:bg-white "
                onClick={() => {
                  handleUpdateJobStatus("Rejected");
                }}
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
                    )
                    ?.status?.includes("Selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
                    )
                    ?.status?.includes("Rejected")
                    ? true
                    : false
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item?.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status?.includes("Rejected")
                  ? "Rejected"
                  : "Reject"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
