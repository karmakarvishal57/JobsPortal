"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import connectToDb from "@/db";
import { fetchProfileAction } from "@/server-actions";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function Home() {
  connectToDb();
  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);
  if (user && !profileInfo?._id) redirect("/onboard");
  return (
    <Fragment>
      <div className="max-h-[300vh]">
        <div className="relative my-auto flex  top-28 gap-16 max-sm:hidden">
          <div className="space-y-10 w-5/12 ml-4">
            <span className="flex space-x-2">
              <span className="w-20 block mb-2 border-b border-gray-300"></span>
              <span>One Stop Solution To Find Jobs</span>
            </span>
            <h1 className="text-4xl font-bold md:text-6xl text-gray-400">
              The Best <br /> Job Portal App
            </h1>
            <p className="text-xl font-semibold border-gray-300">
              Find Best Jobs From Top Product Based Companies And Build Your
              Career
            </p>
            <div className="flex ">
              <Link
                className="bg-gray-300 rounded-sm text-black text-lg font-semibold h-11 p-2 outline outline-blue-400 flex items-center"
                href="/jobs"
              >
                {user
                  ? profileInfo?.role === "candidate"
                    ? "Browse Jobs"
                    : "Post New Job"
                  : "Find Jobs"}
              </Link>
            </div>
          </div>
          <div className=" relative  lg:w-6/12  opacity-80 mx-auto">
            <img
              src="https://media.istockphoto.com/id/1275821819/vector/group-of-people-watch-rocket-take-off-from-computer-screen-startup-concept-illustration-in.jpg?s=612x612&w=0&k=20&c=zXJCsKJeXvGTSV6VY7YqyIVYlrJ2aYx56JvsesSI00w="
              alt="Job Portal"
              className="rounded-3xl h-[450px] relative ml-auto "
            ></img>
          </div>
        </div>
      </div>
      
       <div className="relative my-auto top-20 sm:hidden">
          <div className=" relative  lg:w-6/12  opacity-80 mx-auto">
            <img
              src="https://media.istockphoto.com/id/1275821819/vector/group-of-people-watch-rocket-take-off-from-computer-screen-startup-concept-illustration-in.jpg?s=612x612&w=0&k=20&c=zXJCsKJeXvGTSV6VY7YqyIVYlrJ2aYx56JvsesSI00w="
              alt="Job Portal"
              className="rounded-3xl h-[450px] relative ml-auto "
            ></img>
          </div>
          <div className="space-y-10 ml-4 mt-10">
            <span className="flex space-x-2">
              <span className="w-20 block mb-2 border-b border-gray-300"></span>
              <span>One Stop Solution To Find Jobs</span>
            </span>
            <h1 className="text-4xl font-bold md:text-6xl text-gray-400">
              The Best <br /> Job Portal App
            </h1>
            <p className="text-xl font-semibold border-gray-300">
              Find Best Jobs From Top Product Based Companies And Build Your
              Career
            </p>
            <div className="flex ">
              <Link
                className="bg-gray-300 rounded-sm text-black text-lg font-semibold h-11 p-2 outline outline-blue-400 flex items-center"
                href="/jobs"
              >
                {user
                  ? profileInfo?.role === "candidate"
                    ? "Browse Jobs"
                    : "Post New Job"
                  : "Find Jobs"}
              </Link>
            </div>
          </div>
        </div>
    

      <footer className="flex mt-60 mb-12 justify-between items-center space-x-2">
        <div className="border-b w-[100%]"></div>
        <h1 className="text-nowrap">© 2025 Job Board</h1>
        <div className="border-b w-[100%]"></div>
      </footer>
    </Fragment>
  );
}

export default Home;
