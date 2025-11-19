import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex">
      <Skeleton className="mx-auto max-w-[636px] h-[100px] w-[100px] flex items-center justify-center rounded-full border-[10px] border-blue-100 border-t-black mt-72"></Skeleton>
    </div>
  );
};

export default loading;
