import { Fragment, useState } from "react";
import CommonCard from "../common-card";
import JobsIcon from "../jobs-icon";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { createJobApplicationAction } from "@/server-actions";
import { useToast } from "@/hooks/use-toast";

export default function CandidateJobsCard({
  jobItem,
  profileInfo,
  getJobApplicationsList,
}) {
  const [showJobsDrawerDetails, setShowJobsDrawerDetails] = useState(false);
  const {toast} = useToast();
  async function handleJobApply() {
    if (!profileInfo?.isPremium && getJobApplicationsList.length >= 2) {
      setShowJobsDrawerDetails(false);
      toast({
        variant: "destructive",
        title: "You can apply for max 2 jobs",
        description: "Please opt for membership to apply for more jobs",
      });
      return;
    }
    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidate?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobId: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },

      "/jobs"
    );
    setShowJobsDrawerDetails(false);
  }
  return (
    <Fragment>
      <CommonCard
        icon={<JobsIcon></JobsIcon>}
        title={jobItem?.title}
        footerContent={
          <Button
            className=" h-11 flex items-center justify-center "
            onClick={setShowJobsDrawerDetails}
          >
            View Details
          </Button>
        }
        description={jobItem?.companyName}
      ></CommonCard>
      <Drawer
        open={showJobsDrawerDetails}
        onOpenChange={setShowJobsDrawerDetails}
      >
        <DrawerContent className="px-6 pb-3">
          <DrawerHeader className="p-0">
            <div className="flex justify-between ">
              <DrawerTitle className=" text-black text-3xl">
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  className=" h-11 disabled:opacity-70 
                  "
                  onClick={handleJobApply}
                  disabled={
                    getJobApplicationsList.findIndex(
                      (item) => item.jobId === jobItem._id
                    ) > -1
                      ? true
                      : false
                  }
                >
                  {getJobApplicationsList.findIndex(
                    (item) => item.jobId === jobItem._id
                  ) > -1
                    ? "Applied"
                    : "Apply"}
                </Button>
                <Button
                  onClick={() => setShowJobsDrawerDetails()}
                  className=" h-11"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription>
            <div className="flex items-center gap-2 ">
              <div>
                <h2>{jobItem?.location}</h2>
              </div>
              <div className=" w-[120px]  min-w-max bg-gray-700  flex justify-center items-center  rounded-md h-[35px]">
                <h2 className="text-white font-bold ">
                  {jobItem?.jobType.toUpperCase()}
                </h2>
              </div>
            </div>
            <h3 className="text-xl font-medium text-black">
              Experience : {jobItem?.experience}
            </h3>
            <div className="flex gap-4 mt-1">
              {jobItem?.skills.split(",").map((skillItem) => (
                <div className="flex w-[150px] h-7 justify-center text-wrap items-center bg-black rounded-md">
                  <h2 className="text-white font-bold ">{skillItem}</h2>
                </div>
              ))}
            </div>
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
