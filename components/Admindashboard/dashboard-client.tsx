"use client";

import { useMemo, useState } from "react";
import {
  Home,
  Users,
  ShieldCheck,
  Key,
  GraduationCap,
  Calendar,
  CalendarDays,
  Network,
  Bookmark,
  BookOpen,
  Tag,
  FileText,
  GitBranch,
  CalendarCheck,
  Presentation,
  Building2,
  Sun,
  Clock,
  Shield,
  Search,
  Bell,
  IdCard,
  UserCog,
  ArrowUpDown,
  Filter,
  type LucideIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import type {
  ApprovalIconKey,
  ApprovalItem,
  DashboardData,
  StatIconKey,
} from "@/lib/dashboard-data";

type NavItem = {
  label: string;
  icon: LucideIcon;
};

type NavCategory = {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
};

const CATEGORIES: NavCategory[] = [
  {
    title: "User management",
    icon: Users,
    items: [
      { label: "Users", icon: Users },
      { label: "Roles", icon: ShieldCheck },
      { label: "Permissions", icon: Key },
    ],
  },
  {
    title: "Academic",
    icon: GraduationCap,
    items: [
      { label: "Years", icon: Calendar },
      { label: "Semester", icon: CalendarDays },
      { label: "Departments", icon: Network },
      { label: "Programs", icon: Bookmark },
      { label: "Courses", icon: BookOpen },
      { label: "Course offerings", icon: Tag },
      { label: "Curriculum", icon: FileText },
      { label: "Class rules", icon: GitBranch },
      { label: "Calendar", icon: CalendarCheck },
    ],
  },
  {
    title: "Classes",
    icon: Presentation,
    items: [
      { label: "Room", icon: Building2 },
      { label: "days", icon: Sun },
      { label: "Period", icon: Clock },
      { label: "Constraints", icon: Shield },
    ],
  },
];

const STAT_ICONS: Record<StatIconKey, LucideIcon> = {
  students: GraduationCap,
  lecturers: IdCard,
  administrators: UserCog,
};

const STAT_STYLES: Record<
  DashboardData["stats"][number]["color"],
  { border: string; text: string }
> = {
  fuchsia: { border: "border-l-fuchsia-600", text: "text-fuchsia-600" },
  cyan: { border: "border-l-cyan-400", text: "text-cyan-500" },
  orange: { border: "border-l-orange-500", text: "text-orange-500" },
  emerald: { border: "border-l-emerald-500", text: "text-emerald-500" },
};

const APPROVAL_ICONS: Record<ApprovalIconKey, LucideIcon> = {
  calendar: Calendar,
  "graduation-cap": GraduationCap,
  bookmark: Bookmark,
  clock: Clock,
};

function ApprovalColumn({ title, items }: { title: string; items: ApprovalItem[] }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="font-medium text-slate-800 text-xs mb-3">{title}</h3>
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = APPROVAL_ICONS[item.icon];
            return (
              <div
                key={item.id}
                className="bg-slate-50/70 rounded px-3 py-2 flex items-center justify-between text-[11px] text-slate-700"
              >
                <span>{item.label}</span>
                <Icon className="w-3.5 h-3.5 text-blue-500" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-right mt-3">
        <a href="#" className="text-[11px] text-slate-400 hover:text-slate-600">
          More
        </a>
      </div>
    </div>
  );
}

type SortDirection = "none" | "asc" | "desc";

export function DashboardClient({ data }: { data: DashboardData }) {
  const [globalQuery, setGlobalQuery] = useState("");
  const [studentQuery, setStudentQuery] = useState("");
  const [sortDir, setSortDir] = useState<SortDirection>("none");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const programs = useMemo(
    () => Array.from(new Set(data.students.map((s) => s.program))),
    [data.students]
  );

  const visibleStudents = useMemo(() => {
    let result = data.students;

    if (programFilter !== "all") {
      result = result.filter((s) => s.program === programFilter);
    }

    if (studentQuery.trim() !== "") {
      const q = studentQuery.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.firstName.toLowerCase().includes(q) || s.lastName.toLowerCase().includes(q)
      );
    }

    if (sortDir !== "none") {
      result = [...result].sort((a, b) =>
        sortDir === "asc"
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName)
      );
    }

    return result;
  }, [data.students, programFilter, studentQuery, sortDir]);

  const allVisibleSelected =
    visibleStudents.length > 0 && visibleStudents.every((s) => selectedIds.has(s.id));

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        visibleStudents.forEach((s) => next.delete(s.id));
      } else {
        visibleStudents.forEach((s) => next.add(s.id));
      }
      return next;
    });
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const cycleSortDir = () => {
    setSortDir((prev) => (prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"));
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-slate-700 antialiased text-xs">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0 select-none">
        <div className="h-16 flex items-center px-6 border-b border-transparent">
          <span className="text-2xl font-black tracking-tight text-slate-800">
            M<span className="text-orange-500">C</span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          <div>
            <a
              href="#"
              className="flex items-center justify-between py-2 px-3 text-slate-800 font-semibold border-l-2 border-orange-500 bg-orange-50/30 rounded-r transition-colors"
            >
              <span className="text-[13px]">Dashboard</span>
              <Home className="w-4 h-4" />
            </a>
          </div>

          {CATEGORIES.map((category) => (
            <div key={category.title} className="space-y-1">
              <div className="flex items-center justify-between py-1 px-3 text-slate-800 font-semibold text-[13px]">
                <span>{category.title}</span>
                <category.icon className="w-4 h-4" />
              </div>
              <div className="pl-2 space-y-0.5 text-slate-500 font-normal">
                {category.items.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    className="flex items-center justify-between py-1.5 px-3 rounded hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    <span>{item.label}</span>
                    <item.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        {/* Top header */}
        <header className="h-16 px-8 flex items-center justify-between bg-white border-b border-slate-100">
          <div className="w-96 relative">
            <input
              type="text"
              value={globalQuery}
              onChange={(e) => {
                setGlobalQuery(e.target.value);
                // TODO: wire to a real global search endpoint, e.g.
                // debouncedGlobalSearch(e.target.value)
              }}
              placeholder="What do you want to find?"
              className="w-full bg-blue-50/30 border border-blue-100/60 rounded-lg pl-4 pr-10 py-2 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 text-slate-700"
            />
            <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-500" />
          </div>

          <div className="flex items-center gap-5">
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-slate-700" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.admin.avatarUrl}
                alt={`${data.admin.name} profile`}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-tight">
                  {data.admin.name}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight">
                  {data.admin.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard body */}
        <main className="flex-1 px-8 py-6 space-y-6 overflow-y-auto">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">
            Welcome {data.admin.name}
          </h1>

          {/* KPI stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.stats.map((stat) => {
              const Icon = STAT_ICONS[stat.icon];
              const style = STAT_STYLES[stat.color];
              return (
                <div
                  key={stat.id}
                  className={`bg-white rounded-lg p-4 border border-slate-100 shadow-xs relative flex items-center justify-between border-l-4 ${style.border}`}
                >
                  <div>
                    <p className={`font-medium text-xs ${style.text}`}>{stat.label}</p>
                    <h2 className={`text-2xl font-bold mt-1 ${style.text}`}>{stat.value}</h2>
                  </div>
                  <Icon className={`w-8 h-8 ${style.text}`} />
                </div>
              );
            })}
          </div>

          {/* Activity / approval columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-slate-800 text-xs mb-3">Upcoming activities</h3>
                <div className="space-y-2">
                  {data.upcomingActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-slate-50/70 rounded px-3 py-2 flex items-center justify-between text-[11px] text-slate-700"
                    >
                      <span>{activity.label}</span>
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right mt-3">
                <a href="#" className="text-[11px] text-slate-400 hover:text-slate-600">
                  More
                </a>
              </div>
            </div>

            <ApprovalColumn title="Pending approvals" items={data.pendingStaffApprovals} />
            <ApprovalColumn title="Pending approvals" items={data.pendingRegistrationApprovals} />
          </div>

          {/* Table + donut chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-lg p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-800 text-xs">Students</span>
                    {selectedIds.size > 0 && (
                      <span className="text-[10px] text-slate-500">
                        {selectedIds.size} selected
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={studentQuery}
                        onChange={(e) => setStudentQuery(e.target.value)}
                        placeholder="Find student"
                        className="w-36 bg-slate-50 border border-slate-200/80 rounded px-2 py-1 text-[10px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
                      />
                      <Search className="w-3.5 h-3.5 absolute right-2 top-1.5 text-slate-400" />
                    </div>
                    <button
                      onClick={cycleSortDir}
                      className={
                        sortDir === "none"
                          ? "text-slate-500 hover:text-slate-700"
                          : "text-slate-800"
                      }
                      title="Sort by first name"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                    <DropdownMenu
                      align="end"
                      trigger={
                        <button
                          className={
                            programFilter === "all"
                              ? "text-slate-500 hover:text-slate-700"
                              : "text-slate-800"
                          }
                          title="Filter by program"
                        >
                          <Filter className="w-3.5 h-3.5" />
                        </button>
                      }
                      items={[
                        {
                          label: "All programs",
                          onSelect: () => setProgramFilter("all"),
                        },
                        ...programs.map((program) => ({
                          label: program,
                          onSelect: () => setProgramFilter(program),
                        })),
                      ]}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] text-slate-600 border-collapse">
                    <thead>
                      <tr className="text-slate-400 font-normal">
                        <th className="py-2.5 px-3 w-8">
                          <Checkbox
                            checked={allVisibleSelected}
                            onChange={toggleSelectAll}
                            aria-label="Select all students"
                          />
                        </th>
                        <th className="py-2.5 px-3 w-10"></th>
                        <th className="py-2.5 px-3 font-normal">First name</th>
                        <th className="py-2.5 px-3 font-normal">Last name</th>
                        <th className="py-2.5 px-3 font-normal">Program</th>
                        <th className="py-2.5 px-3 font-normal">Year</th>
                        <th className="py-2.5 px-3 font-normal">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/70">
                      {visibleStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3">
                            <Checkbox
                              checked={selectedIds.has(student.id)}
                              onChange={() => toggleSelectOne(student.id)}
                              aria-label={`Select ${student.firstName} ${student.lastName}`}
                            />
                          </td>
                          <td className="py-2 px-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={student.avatarUrl}
                              alt={student.firstName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          </td>
                          <td className="py-2 px-3 text-slate-700 font-medium">
                            {student.firstName}
                          </td>
                          <td className="py-2 px-3">{student.lastName}</td>
                          <td className="py-2 px-3">{student.program}</td>
                          <td className="py-2 px-3 text-slate-500">{student.year}</td>
                          <td className="py-2 px-3 text-slate-500">{student.performance}</td>
                        </tr>
                      ))}
                      {visibleStudents.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-6 px-3 text-center text-slate-400">
                            No students match your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-right mt-3">
                <a href="#" className="text-[11px] text-slate-400 hover:text-slate-600">
                  View more
                </a>
              </div>
            </div>

            {/* Gender distribution donut chart */}
            <div className="bg-white rounded-lg p-5 border border-slate-100 shadow-xs flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="stroke-slate-100"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeWidth="9"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="#f472b6"
                    strokeDasharray="251.2"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeWidth="9"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="#22d3ee"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - data.genderDistribution.malePercent / 100)}
                    strokeLinecap="round"
                    strokeWidth="9"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">
                    {data.genderDistribution.total}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-5">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-cyan-400" />
                  <span className="text-xs font-semibold text-slate-700">
                    Male ({data.genderDistribution.malePercent}%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-pink-400" />
                  <span className="text-xs font-semibold text-slate-700">
                    Female ({data.genderDistribution.femalePercent}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}