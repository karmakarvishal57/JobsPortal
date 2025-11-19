import MembershipPage from "@/components/membershipPage";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfileAction } from "@/server-actions";
import { redirect } from "next/navigation";

export default async function membership() {
  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) {
    redirect("/onboard");
  }
  return <MembershipPage profileInfo={profileInfo}></MembershipPage>;
}
