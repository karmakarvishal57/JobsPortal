import CommonCard from "../common-card";
import JobsIcon from "../jobs-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CandidateActivity({ jobList, jobApplicants }) {
  const uniqueStatus = [
    ...new Set(jobApplicants.map((applicant) => applicant?.status).flat(1)),
  ];
  console.log(uniqueStatus);
  return (
    <>
      <div className="max-w-full my-16 ">
        <Tabs defaultValue="" className="bg-slate-950 rounded-lg ">
          <div className="w-full border-b-2 flex justify-between items-center pb-2 px-4">
            <h1 className="text-3xl text-gray-400 tracking-tighter text-nowrap font-semibold">
              Your Activity
            </h1>
            <TabsList>
              {uniqueStatus.map((status) => (
                <TabsTrigger value={status}>{status}</TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="py-3 mt-4 container">
            {uniqueStatus.map((status) => (
              <TabsContent value={status}>
                <div className="grid md:grid-cols-3 gap-4">
                  {jobList
                    .filter(
                      (jobItem) =>
                        jobApplicants
                          .filter((jobApplication) =>
                            jobApplication.status.includes(status)
                          )
                          .findIndex(
                            (filteredJobItem) =>
                              filteredJobItem.jobId === jobItem._id
                          ) > -1
                    )
                    .map((item) => (
                      <div>
                        <CommonCard
                          icon={<JobsIcon></JobsIcon>}
                          title={item?.title}
                          description={item?.companyName}
                        />
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </>
  );
}
