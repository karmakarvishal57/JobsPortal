import OnBoard from "@/components/on-board";
import { fetchProfileAction } from "@/server-actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function onboard() {
  const user = await currentUser();
  if(!user)redirect('/')
  const profileInfo = await fetchProfileAction(user?.id);
  if (profileInfo?._id) {
    if ((profileInfo?.role === "recruiter" || profileInfo?.role === "candidate") && !profileInfo?.isPremiumUser)
      redirect("/membership");
    else redirect("/");
  } else return <OnBoard></OnBoard>;
}

export default onboard;
