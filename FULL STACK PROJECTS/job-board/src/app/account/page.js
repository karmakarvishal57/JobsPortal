import { accountInfo as AccountInfo } from "@/components/account-info";
import { fetchProfileAction } from "@/server-actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Account() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }
  const profileInfo = await fetchProfileAction(user?.id);
  if (user && !profileInfo) {
    redirect("/onboard");
  }
  return (
    <>
      <AccountInfo profileInfo={profileInfo} />
    </>
  );
}
