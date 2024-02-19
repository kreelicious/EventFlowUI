"use client";
import Link from "next/link";
import EventModal from "@/components/Modals/CreateEvent";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <div className="">
        <EventModal></EventModal>
      </div>
    </div>
  );
};

export default Breadcrumb;