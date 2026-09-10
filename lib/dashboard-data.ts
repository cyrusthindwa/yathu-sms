// Data-fetching layer for the admin dashboard.
//
// Every UI component below consumes DashboardData — nothing else. To go live,
// replace the body of getDashboardData() with a real request (fetch, DB query,
// ORM call, etc.) that returns the same shape. No component code needs to change.

export type StatIconKey = "students" | "lecturers" | "administrators";
export type StatColor = "fuchsia" | "cyan" | "orange" | "emerald";

export type DashboardStat = {
  id: string;
  label: string;
  value: number;
  icon: StatIconKey;
  color: StatColor;
};

export type ActivityItem = {
  id: string;
  label: string;
};

export type ApprovalIconKey = "calendar" | "graduation-cap" | "bookmark" | "clock";

export type ApprovalItem = {
  id: string;
  label: string;
  icon: ApprovalIconKey;
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  program: string;
  year: string;
  performance: string;
  avatarUrl: string;
};

export type DashboardData = {
  admin: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  stats: DashboardStat[];
  upcomingActivities: ActivityItem[];
  pendingStaffApprovals: ApprovalItem[];
  pendingRegistrationApprovals: ApprovalItem[];
  students: Student[];
  genderDistribution: {
    total: number;
    malePercent: number;
    femalePercent: number;
  };
};

const MOCK_DATA: DashboardData = {
  admin: {
    name: "Francis",
    role: "Admin",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoEJ5XUmd5FFQygR1pwgb6Vb2Pibs_otCjjBD0nvahHyt5sWasXDx41C_7MqHkZfryWkb8OWit4FBOT27vvTBar0LGJ3JycoZnQCuiMUDw6i4Md6xXecqyaU4R0qZyRoaMGN-nuUILhOeIxGB5b9ltUuZItovgqEsIlitfoUL9h7HgVZzbIUi_H6fGUsVKHvUQ3ItIk8zL0ibLnAb3gdjKf8sB1wkJQ5v3OI9bzXgzDapEE7OHSwBc",
  },
  stats: [
    { id: "students", label: "Students", value: 573, icon: "students", color: "fuchsia" },
    { id: "lecturers-1", label: "lecturers", value: 4, icon: "lecturers", color: "cyan" },
    {
      id: "administrators",
      label: "Administrators",
      value: 5,
      icon: "administrators",
      color: "orange",
    },
    { id: "lecturers-2", label: "lecturers", value: 4, icon: "lecturers", color: "emerald" },
  ],
  upcomingActivities: [
    { id: "1", label: "course registration opens" },
    { id: "2", label: "lecturer grades submission" },
    { id: "3", label: "examination begin" },
    { id: "4", label: "examination approval" },
    { id: "5", label: "results publication" },
  ],
  pendingStaffApprovals: [
    { id: "1", label: "New students admission", icon: "calendar" },
    { id: "2", label: "New lecturer creation", icon: "graduation-cap" },
    { id: "3", label: "New course reaction", icon: "bookmark" },
    { id: "4", label: "Time table publication", icon: "clock" },
    { id: "5", label: "Time table change request", icon: "clock" },
  ],
  pendingRegistrationApprovals: [
    { id: "1", label: "Course registration closes in 2d", icon: "calendar" },
    { id: "2", label: "Final registration timetable pu...", icon: "graduation-cap" },
    { id: "3", label: "New course reaction", icon: "bookmark" },
    { id: "4", label: "Final registration timetable pu...", icon: "clock" },
    { id: "5", label: "New academic year created ...", icon: "clock" },
  ],
  students: [
    {
      id: "1",
      firstName: "Isabella",
      lastName: "Bwanali",
      program: "Bsc nursing",
      year: "Year 1",
      performance: "Average",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuACUC1bpEsLNy95tJ0JPawFeXC2TJqhvyAe13my2t8-OtGm6HYlunmf504qF8D9WowE4ydw63B6qGifpxOne3rP_SYkN9IkD3MvnfAjhrv1T_sjRY9zhkNY4DPxaA1xpMloQyCOX-lWuofdwpRhseZhm8alSFpyRjo3bnwM3u8ITu0vsnUz42JEWyXvj0cD7bdzzubX8XO9Lty5GE6U_5CgVC2jL767sr1zQbXW6i19bJ3ga_mkqfuF",
    },
    {
      id: "2",
      firstName: "Rosemary",
      lastName: "Nyirenda",
      program: "Bsc nursing",
      year: "Year 1",
      performance: "Average",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB37Jti5rdDhfpiPZiMHVGZ5nZKqxVP0I7HJDu8JPQuhZSetRqgRS4nPa9wCAo2iJnNxl7dLP2PohGrb1kYSsgH1iWLY8btxUeY61GPnGcA5pRyHTdvLbM0tvc-sS5TIt_ujXwhKZ_mjtxQwtOvpPpWgNrvOPryUu8kZzdj0TuFyMS9Q_5dl4V6T-DIzE_LUuIwNsE1CYU8g9JA3K0Q0Bzuj-N7a8L3-nVz0lWYdj3T3fZbOUnPSfe_",
    },
    {
      id: "3",
      firstName: "Isaac",
      lastName: "Kazembe",
      program: "Bsc nursing",
      year: "Year 1",
      performance: "Average",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBUqjegPz2zW1_cR9RYGEdZxEv8kLBIyTXNKinaeActr09K9yggPKJpVWLTqrU3ipoYmaXaUR9p9mi38isB0qnXzn10676M8_mvmgWxyib7cHzFj52piy-VysvFRSlPtwCnnUWuBf-zd1ggsUrCLYvOAW3ZKhNPzAYLGmyAeImlCfA1RlUAboBto-WdZdj37BdAOaghXYWALMPm9mW1e-2vLlhaIkDomE4SfEvCtmJBnXjBrtlMchch",
    },
    {
      id: "4",
      firstName: "Annie",
      lastName: "Banda",
      program: "Bsc nursing",
      year: "Year 1",
      performance: "Average",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDpNNnGMsr1P1LV6_c0TfP9lkklfzC0_0KFji1lxsnZ29xV9In9d_Dc0F8aMeFczGkh258NhgIN1shp0FJwdofyUrC8wQYF45H_bzKyNS7-8tGFfTIkEW8QDwuRYl1DiZEr-LzoUGv14R4mXaOdNRyah6f3jpdxrZ3vjmavH8JOvVY3VLFWAXdQzoDlSIhBzrwQzpW8hCRYCc5qQf__S9IVs5yg6SCwCkBfW5zXqSfcJI_iogVCDgU7",
    },
  ],
  genderDistribution: {
    total: 573,
    malePercent: 65,
    femalePercent: 35,
  },
};

export async function getDashboardData(): Promise<DashboardData> {
  // TODO: replace this with a real request once the backend exists, e.g.:
  //
  //   const res = await fetch(`${process.env.API_BASE_URL}/admin/dashboard`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //     cache: "no-store",
  //   });
  //   if (!res.ok) throw new Error("Failed to load dashboard data");
  //   return res.json();
  //
  // The shape returned must match DashboardData above.
  return MOCK_DATA;
}