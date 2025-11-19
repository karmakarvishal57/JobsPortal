"use client";

import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import {
  initialRecruiterFormData,
  initialCandidateFormData,
  recruiterOnBoardControls,
  candidateOnBoardControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import createProfileAction from "@/server-actions";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kkraxqfmecewtawbcjft.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcmF4cWZtZWNld3Rhd2JjamZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTQyNTYsImV4cCI6MjA1NzAzMDI1Nn0.B4og4oeAZCicaq-PojaSnyOKO8AuLF5gjBk0XrUsT2Q";

const supabaseClient = createClient(supabaseUrl, supabaseKey);
function onBoard() {
  const [currentTab, setCurrentTab] = useState("");

  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );

  const [file, setFile] = useState(null);
  console.log(candidateFormData, "candidateFormData");

  const { user } = useUser();
  async function createProfile() {
    const data =
      currentTab === "candidate"
        ? {
            candidate: candidateFormData,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
            role: "candidate",
            isPremiumUser: false,
          }
        : {
            recruiter: recruiterFormData,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
            role: "recruiter",
            isPremiumUser: false,
          };
    await createProfileAction(data, "/onboard");
  }

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  function handleButtonValidation() {
    if (currentTab === "candidate") {
      return Object.keys(candidateFormData).every(
        (key) => candidateFormData[key].trim() !== ""
      );
    } else {
      return (
        recruiterFormData &&
        recruiterFormData.name.trim() !== "" &&
        recruiterFormData.companyName.trim() !== "" &&
        recruiterFormData.companyRole.trim() !== ""
      );
    }
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleFileUploadToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from("jobboard")
      .upload(`/public/${file.name}`, file, {
        cacheControl: 3600,
        upsert: false,
      });
    if (data) {
      setCandidateFormData({ ...candidateFormData, resume: data.path });
    } else {
      throw new Error(JSON.stringify(error));
    }
  }

  useEffect(() => {
    if (file) handleFileUploadToSupabase(file);
  }, [file]);

  return (
    <div className="bg-slate-400 rounded-md h-full">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className=" w-full ">
          <div className="flex items-baseline justify-between border-b-2 pb-6 pt-24 px-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome To Onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="candidate" className="px-4 py-4">
            <CommonForm
              formControls={candidateOnBoardControls}
              btnText="Onboard as candidate"
              formData={candidateFormData}
              setFormData={setCandidateFormData}
              handleFileChange={handleFileChange}
              isBtnDisabled={!handleButtonValidation()}
              action={createProfile}
            />
          </TabsContent>
          <TabsContent value="recruiter" className="px-4 py-4">
            <CommonForm
              formControls={recruiterOnBoardControls}
              setFormData={setRecruiterFormData}
              btnText="Onboard as recruiter"
              formData={recruiterFormData}
              isBtnDisabled={!handleButtonValidation()}
              action={createProfile}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default onBoard;
