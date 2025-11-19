"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function CommonCard({
  icon,
  title,
  footerContent,
  description,
}) {
  return (
    <Card className=" md:min-w-full w-[60%] max-h-min bg-gray-200 pl-4 pt-4  outline outline-blue-400 hover:drop-shadow-lg hover:shadow-blue-100 hover:shadow-lg  hover:bg-gray-100 transition duration-300 rounded-lg flex flex-col gap-2 pb-2">
      <CardHeader className=" p-0">
        {icon ? icon : null}
        {title ? (
          <CardTitle className="text-3xl text-ellipsis overflow-hidden text-nowrap tracking-tight">
            {title}
          </CardTitle>
        ) : null}
        {description ? (
          <CardDescription className="font-semibold">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardFooter className="p-0">{footerContent}</CardFooter>
    </Card>
  );
}
