import { getDashboardData } from "@/lib/dashboard-data";
import { DashboardClient } from "@/components/Admindashboard/dashboard-client";

export default async function UniversityDashboardPage() {
  const data = await getDashboardData();

  return <DashboardClient data={data} />;
}