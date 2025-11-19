"use client";

import memberShipPlans from "@/utils";
import CommonCard from "../common-card";
import { Button } from "../ui/button";
import {
  createPriceIdAction,
  createStripePaymentAction,
  updateProfileAction,
} from "@/server-actions";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const { loadStripe } = require("@stripe/stripe-js");

const stripePromise = loadStripe(
  "pk_test_51RBYr4PiNcWtBAt2galravorD00cgaPvfNPWMJ2zIPKamXWOuO4CKHkjNNPX9W80rZVRargSMuyYpetUH1KgP9ee00P39RCeNA"
);
export default function memberShipPage({ profileInfo }) {
  const pathName = useSearchParams();

  async function handlePayment(currentPlan) {
    const stripe = await stripePromise;

    const priceId = await createPriceIdAction({ amount: currentPlan?.price });

    console.log(priceId);
    if (priceId) {
      sessionStorage.setItem("currentPlan", JSON.stringify(currentPlan));
      const result = await createStripePaymentAction({
        lineItems: [
          {
            price: priceId.id,
            quantity: 1,
          },
        ],
      });

      await stripe.redirectToCheckout({
        sessionId: result?.id,
      });
    }
  }

  async function updateProfile() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(
      sessionStorage.getItem("currentPlan")
    );
    await updateProfileAction(
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: fetchCurrentPlanFromSessionStorage?.type,
        memberShipStartDate: new Date().toString(),
        memberShipEndDate: new Date(
          new Date().getFullYear() + fetchCurrentPlanFromSessionStorage.type ===
          "Basic"
            ? 1
            : fetchCurrentPlanFromSessionStorage.type === "Teams"
            ? 2
            : 5,
          new Date().getMonth(),
          new Date().getDay()
        ),
      },
      "/membership"
    );
  }

  useEffect(() => {
    if (pathName.get("status") === "success") {
      updateProfile();
    }
  }, [pathName]);

  return (
    <div className="mx-auto ">
      <div className="pt-24 pb-4 border-b-2 flex items-center justify-between">
        <h1 className="text-4xl font-semibold tracking-tighter text-gray-400">
          {profileInfo?.isPremiumUser ? "Premium User" : "Choose Best Plan"}
        </h1>
        <div>
          {profileInfo?.isPremiumUser ? (
            <Button className="hover:bg-white bg-white outline outline-blue-400 font-bold text-black">
              {
                memberShipPlans.find(
                  (planItem) => planItem.type === profileInfo?.memberShipType
                ).heading
              }
            </Button>
          ) : null}
        </div>
      </div>
      <div className="py-20 pt-10">
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-x-4 gap-y-6">
          {memberShipPlans.map((plan, index) => (
            <CommonCard
              icon={
                <div className="flex justify-between pr-4 gap-2 ">
                  <div>
                    <img
                      src="data:image/png;base64,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"
                      alt="guarantee"
                    />
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tighter">
                    {plan?.heading}
                  </h1>
                </div>
              }
              title={`$ ${plan?.price} / yr`}
              description={plan?.type}
              footerContent={
                (profileInfo.memberShipType === "Enterprise" && index === 2) ||
                (profileInfo.memberShipType === "Basic" && index === 0) ||
                (profileInfo.memberShipType === "Teams" && index === 1) ? (
                  <Button className="opacity-80">Subscribed</Button>
                ) : (
                  <Button
                    onClick={() => {
                      handlePayment(plan);
                    }}
                  >
                    {profileInfo?.memberShipType === "Enterprise" ||
                    profileInfo.memberShipType === "Basic" ||
                    profileInfo.memberShipType === "Teams"
                      ? "Update Premium"
                      : "Get Premium"}
                  </Button>
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
