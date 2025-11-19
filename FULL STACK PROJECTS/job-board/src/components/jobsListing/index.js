"use client";
import PostJob from "../postJob";
import RecruiterJobsCard from "../recruiterJobsCard";
import CandidateJobsCard from "../candidateJobsCard";
import { filterMenuArray, formUrlQuery } from "@/utils";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "../ui/menubar";

import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function jobsListing({
  user,
  profileInfo,
  jobsListing,
  getJobApplicationsList,
  filterJobs,
}) {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  
  const router = useRouter();
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilterparams = { ...filterParams };

    const indexOfCurrentId = Object.keys(cpyFilterparams).indexOf(getSectionId);
    if (indexOfCurrentId === -1) {
      cpyFilterparams = {
        ...cpyFilterparams,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexofCurrentOption =
        cpyFilterparams[getSectionId].indexOf(getCurrentOption);
      if (indexofCurrentOption === -1) {
        cpyFilterparams[getSectionId].push(getCurrentOption);
      } else {
        cpyFilterparams[getSectionId].splice(indexofCurrentOption, 1);
      }
    }
    setFilterParams(cpyFilterparams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterparams));
  }

  useEffect(() => {
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")));
  }, []);

  useEffect(() => {
    if (filterParams && Object.keys(filterParams)?.length > 0) {
      let url = "";
      url = formUrlQuery({
        params: searchParams,
        dataToAdd: filterParams,
      });
      router.push(url, { scroll: false });
    }
  }, [filterParams]);

  const filterMenus = filterMenuArray.map((item) => ({
    id: item?.id,
    name: item?.label,
    options: [...new Set(filterJobs.map((listItem) => listItem[item?.id]))],
  }));
  return (
    <div className="mx-auto mt-16 ">
      <div className="flex justify-between items-center border-b-2 pb-4 pt-24">
        <h1 className="text-3xl font-bold tracking-tight text-gray-400">
          {profileInfo?.role === "candidate"
            ? "Explore Jobs"
            : "Jobs Dashboard"}
        </h1>
        <div>
          {profileInfo?.role === "candidate" ? (
            <Menubar>
              {filterMenus.map((filterMenu) => (
                <MenubarMenu>
                  <MenubarTrigger>{filterMenu?.name}</MenubarTrigger>
                  <MenubarContent>
                    {filterMenu?.options.map((option, optIdx) => (
                      <MenubarItem
                        key={optIdx}
                        className="flex items-center "
                        onClick={() => handleFilter(filterMenu?.id, option)}
                      >
                        <div
                          className={`h-4 w-4 border-2 border-black rounded-sm ${
                            filterParams &&
                            Object.keys(filterParams).length > 0 &&
                            filterParams[filterMenu?.id] &&
                            filterParams[filterMenu?.id].indexOf(option) > -1
                              ? "bg-black"
                              : ""
                          }`}
                        ></div>
                        <Label className="ml-2 cursor-pointer text-gray-700">
                          {option}
                        </Label>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
            </Menubar>
          ) : (
            <PostJob user={user} profileInfo={profileInfo} jobsListing={jobsListing}></PostJob>
          )}
        </div>
      </div>
      <div className=" py-6 ">
        <div className="grid grid-cols-1 ">
          <div className="grid container md:grid-cols-3 gap-x-6 gap-y-4 ">
            {jobsListing && jobsListing.length > 0
              ? jobsListing.map((jobItem) =>
                  profileInfo?.role === "candidate" ? (
                    <CandidateJobsCard
                      jobItem={jobItem}
                      profileInfo={profileInfo}
                      getJobApplicationsList={getJobApplicationsList}
                    ></CandidateJobsCard>
                  ) : (
                    <RecruiterJobsCard                                                       
                      jobItem={jobItem}
                      profileInfo={profileInfo}
                      getJobApplicationsList={getJobApplicationsList}
                      jobsListing={jobsListing}
                    ></RecruiterJobsCard>
                  )
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
