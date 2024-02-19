import CRM from "@/components/Dashboard/CRM";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Event Flow Dashboard",
  description:
    "",
  // other metadata
};

const DashboardPage = () => {
  return (
    <DefaultLayout>
      <CRM />
    </DefaultLayout>
  );
};

export default DashboardPage;
