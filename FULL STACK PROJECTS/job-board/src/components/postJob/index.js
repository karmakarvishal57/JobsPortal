import { useState } from "react";
import CommonForm from "../common-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { initialPostJobFormData, postJobFormControls } from "@/utils";
import { postNewJobAction } from "@/server-actions";
import { useToast } from "@/hooks/use-toast";

export default function postJob({ profileInfo, user, jobsListing }) {
  const { toast } = useToast();
  const [showJobDialog, setShowJobDialog] = useState();
  const [jobFormData, setJobFormData] = useState({
    ...initialPostJobFormData,
    companyName: profileInfo?.recruiter?.companyName,
  });
  function handlePostJobButtonValidation() {
    return Object.keys(jobFormData).every(
      (key) => jobFormData[key].trim() !== ""
    );
  }

  async function createNewJob() {
    await postNewJobAction(
      { ...jobFormData, recruiterId: user?.id, applicants: [] },
      "/jobs"
    );
    setJobFormData({
      ...initialPostJobFormData,
      companyName: profileInfo?.recruiter?.companyName,
    });
    setShowJobDialog(false);
  }
  function handleNewJob() {
    if (!profileInfo?.isPremiumUser && jobsListing?.length >= 2) {
      toast({
        variant: "destructive",
        title: "You can post max 2 jobs",
        description: "Please opt for membership to post more jobs",
      });
      return;
    }
    setShowJobDialog(true);
  }
  return (
    <div>
      <Button
        // type={btnType}
        onClick={handleNewJob}
        className="disabled:opacity-60 h-9 flex justify-center bg-white mb-2 text-black hover:bg-blue-300 hover:outline-2 hover:outline-white outline"
      >
        Post A Job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setJobFormData({
            ...initialPostJobFormData,
            companyName: profileInfo?.recruiter?.companyName,
          });
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job </DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                formControls={postJobFormControls}
                formData={jobFormData}
                setFormData={setJobFormData}
                btnText={"Add"}
                isBtnDisabled={!handlePostJobButtonValidation()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
