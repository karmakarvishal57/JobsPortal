import Header from "@/components/header";
import { fetchProfileAction } from "@/server-actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function commonLayout({ children }) {
  const user = await currentUser();
  const profileInfo=await fetchProfileAction(user?.id);
  return (
    <div className="mx-auto p-8 lg:px-8 max-w-8xl">
      {/* Header */}
      <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))} />

      {/* Main */}
      <main>{children}</main>
    </div>
  );
}
