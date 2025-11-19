"use server";

import connectToDb from "@/db";
import { revalidatePath } from "next/cache";
import { Profile } from "@/models/profile";
import Jobs from "@/models/jobs";
import Application from "@/models/application";
import Stripe from "stripe";
const stripe = Stripe(
  "sk_test_51RBYr4PiNcWtBAt2hT5cwJf5TKJ1dJptNmMqaj29eDBDZGso0INK7lGYYjzS3Dvzqxwx1m0ITsLbo0JBk9Pu8Iri00TJj1XWvs"
);

// create profile action
export default async function createProfileAction(data, pathToRevalidate) {
  await connectToDb();
  await Profile.create(data);

  revalidatePath(pathToRevalidate);
}

// fetch profile action
export async function fetchProfileAction(id) {
  await connectToDb();
  const result = await Profile.findOne({ userId: id });

  return JSON.parse(JSON.stringify(result));
}

// create job action
export async function postNewJobAction(data, pathToRevalidate) {
  await connectToDb();
  await Jobs.create(data);
  revalidatePath(pathToRevalidate);
}

// fetch jobs for recruiter
export async function fetchRecruiterJobsAction(id) {
  await connectToDb();
  const result = await Jobs.find({ recruiterId: id });

  return JSON.parse(JSON.stringify(result));
}

// fetch jobs for candidate
export async function fetchCandidateJobsAction(filterParams) {
  await connectToDb();
  let updatedParams = {};
  Object.keys(filterParams).forEach((filterKey) => {
    updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
  });

  const result = await Jobs.find(
    updatedParams && Object.keys(updatedParams).length > 0 ? updatedParams : {}
  );

  return JSON.parse(JSON.stringify(result));
}

// fetch activity jobs action for candidate
export async function fetchCandidateActivityAction() {
  await connectToDb();
  const result = await Jobs.find({});

  return JSON.parse(JSON.stringify(result));
}

//create job application
export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDb();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

//fetch job applications candidate
export async function fetchJobApplicationForCandidateAction(candidateUserID) {
  await connectToDb();
  const result = await Application.find({ candidateUserID });
  return JSON.parse(JSON.stringify(result));
}

//fetch job applications recruiter
export async function fetchJobApplicationForRecruiterAction(recruiterUserID) {
  await connectToDb();
  const result = await Application.find({ recruiterUserID });
  return JSON.parse(JSON.stringify(result));
}

//update job application
export async function updateJobApplication(data, pathToRevalidate) {
  await connectToDb();
  const {
    _id,
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobId,
    jobAppliedDate,
  } = data;

  await Application.findOneAndUpdate(
    { _id },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobId,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

// filter jobs action
export async function createFilterJobsAction() {
  await connectToDb();
  const result = await Jobs.find({});
  return JSON.parse(JSON.stringify(result));
}

// Update Profile Action
export async function updateProfileAction(data, pathToRevalidate) {
  await connectToDb();
  const {
    userId,
    email,
    role,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiter,
    candidate,
    _id,
  } = data;
  await Profile.findOneAndUpdate(
    { _id: _id },
    {
      userId,
      email,
      role,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiter,
      candidate,
    },
    {
      new: true,
    }
  );
  revalidatePath(pathToRevalidate);
}

// created prices id
export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "inr",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "year",
    },
    product_data: {
      name: "Premium Plan",
    },
  });
  return { success: true, id: session?.id };
}

// create payment logic

export async function createStripePaymentAction(data) {
  const session = await stripe?.checkout?.sessions?.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: "http://localhost:3000/membership" + "?status=success",
    cancel_url: "http://localhost:3000/membership" + "?status=cancel",
  });
  return { success: true, id: session?.id };
}
