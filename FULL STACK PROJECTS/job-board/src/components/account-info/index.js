"use client";

import {
  candidateOnBoardControls,
  initialCandidateAccountFormData,
  initialRecruiterFormData,
  recruiterOnBoardControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/server-actions";

export function accountInfo(props) {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateAccountFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const { profileInfo } = props;

  useEffect(() => {
    if (profileInfo?.role === "candidate") {
      setCandidateFormData(profileInfo?.candidate);
    } else if (profileInfo?.role === "recruiter") {
      setRecruiterFormData(profileInfo?.recruiter);
    }
  }, [profileInfo]);

  async function handleUpdateProfile() {
    await updateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            ...profileInfo,
            candidate: {
              ...candidateFormData,
              resume: profileInfo?.candidate?.resume,
            },
          }
        : {
            ...profileInfo,
            recruiter: recruiterFormData,
          },

      "/account"
    );
  }

  return (
    <>
      <div className="mx-auto">
        <div className="flex justify-between items-baseline border-b-2 pb-4 pt-24 ">
          <h1 className="text-4xl font-semibold ">Account</h1>
        </div>
        <div className="container bg-slate-400 py-4 px-3 my-8 rounded-md">
          <CommonForm
            formControls={
              profileInfo?.role === "candidate"
                ? candidateOnBoardControls.filter(
                    (item) => item?.name !== "resume"
                  )
                : recruiterOnBoardControls
            }
            formData={
              profileInfo?.role === "candidate"
                ? candidateFormData
                : recruiterFormData
            }
            setFormData={
              profileInfo?.role === "candidate"
                ? setCandidateFormData
                : setRecruiterFormData
            }
            btnText={"Update Profile"}
            action={handleUpdateProfile}
          />
        </div>
      </div>
    </>
  );
}
