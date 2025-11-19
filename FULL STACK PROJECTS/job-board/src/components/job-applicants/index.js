"use client";

import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import CandidateList from "../candidate-lists";

export default function JobApplicants({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  jobItem,
  jobApplications,
}) {
  return (
    <>
      <Drawer
        open={showApplicantsDrawer}
        onOpenChange={setShowApplicantsDrawer}
      >
        <DrawerContent className="max-h-[50vh]">
          <ScrollArea className="h-auto overflow-y-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 p-4 gap-4">
            <CandidateList
              currentCandidateDetails={currentCandidateDetails}
              setCurrentCandidateDetails={setCurrentCandidateDetails}
              showCurrentCandidateDetailsModal={
                showCurrentCandidateDetailsModal
              }
              setShowCurrentCandidateDetailsModal={
                setShowCurrentCandidateDetailsModal
              }
              jobItem={jobItem}
              jobApplications={jobApplications}
            ></CandidateList>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
}
