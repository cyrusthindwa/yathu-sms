"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NavBar } from "@/components/ui/nav-bar";

type StepStatus = "complete" | "active" | "pending";

type Step = {
  number: number;
  title: string;
  status: StepStatus;
};

const STEPS: Step[] = [
  { number: 1, title: "Personal details", status: "complete" },
  { number: 2, title: "Program", status: "active" },
  { number: 3, title: "Documents", status: "pending" },
];

type Requirement = {
  title: string;
  body: string;
};

type ProgramInfo = {
  label: string;
  years: number;
  requirements: Requirement[];
};

const PROGRAMS: Record<string, ProgramInfo> = {
  cs: {
    label: "Bachelor of Computer Science",
    years: 4,
    requirements: [
      {
        title: "Academic Qualifications",
        body: "An applicant must possess a Malawi School Certificate of Education (MSCE) or an equivalent qualification with at least six credits, including English and Mathematics.",
      },
      {
        title: "Programme-Specific Subject Requirements",
        body: "A credit in Mathematics and Physical Science is required, as these subjects form the foundation for programming logic, algorithms, and systems design covered in the programme.",
      },
      {
        title: "Application Documents and Requirements",
        body: "Applicants must submit a certified copy of their MSCE certificate or results slip, a valid national ID or passport, a recent passport-size photograph, and proof of payment of the application fee.",
      },
      {
        title: "Eligibility and Selection Criteria",
        body: "Selection is competitive and based on academic merit, particularly performance in Mathematics and Physical Science, as well as available training space.",
      },
    ],
  },
  ba: {
    label: "Bachelor of Business Administration",
    years: 4,
    requirements: [
      {
        title: "Academic Qualifications",
        body: "An applicant must possess an MSCE or equivalent qualification with at least six credits, including English and Mathematics.",
      },
      {
        title: "Programme-Specific Subject Requirements",
        body: "A credit in Mathematics is required. Credits in Accounting, Commerce, or Economics are an added advantage but not mandatory.",
      },
      {
        title: "Application Documents and Requirements",
        body: "Applicants must submit a certified copy of their MSCE certificate or results slip, a valid national ID or passport, a recent passport-size photograph, and proof of payment of the application fee.",
      },
      {
        title: "Eligibility and Selection Criteria",
        body: "Selection is competitive and based on overall academic merit and available training space; applicants with commerce-related subjects are given added consideration.",
      },
    ],
  },
  eng: {
    label: "Bachelor of Engineering",
    years: 5,
    requirements: [
      {
        title: "Academic Qualifications",
        body: "An applicant must possess an MSCE or equivalent qualification with at least six credits, including English, Mathematics, and Physical Science.",
      },
      {
        title: "Programme-Specific Subject Requirements",
        body: "A strong credit in Mathematics and Physical Science is mandatory, as these subjects underpin all core engineering coursework.",
      },
      {
        title: "Application Documents and Requirements",
        body: "Applicants must submit a certified copy of their MSCE certificate or results slip, a valid national ID or passport, a recent passport-size photograph, and proof of payment of the application fee.",
      },
      {
        title: "Eligibility and Selection Criteria",
        body: "Selection is highly competitive and based primarily on performance in Mathematics and Physical Science, plus availability of training space.",
      },
    ],
  },
  art: {
    label: "Bachelor of Arts",
    years: 3,
    requirements: [
      {
        title: "Academic Qualifications",
        body: "An applicant must possess an MSCE or equivalent qualification with at least six credits, including English.",
      },
      {
        title: "Programme-Specific Subject Requirements",
        body: "Credits in Humanities or Social Science subjects (History, Geography, or Literature) are an advantage but not mandatory.",
      },
      {
        title: "Application Documents and Requirements",
        body: "Applicants must submit a certified copy of their MSCE certificate or results slip, a valid national ID or passport, a recent passport-size photograph, and proof of payment of the application fee.",
      },
      {
        title: "Eligibility and Selection Criteria",
        body: "Selection is based on overall academic merit and availability of training space.",
      },
    ],
  },
};

export default function ProgramSelectionPage() {
  const router = useRouter();
  const [program, setProgram] = useState("");

  const isComplete = program !== "";
  const selectedProgram = isComplete ? PROGRAMS[program] : null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isComplete) return;
    // TODO: persist the selected program before advancing to Documents
    router.push("/pages/documents/academic");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <NavBar />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar progress */}
        <aside className="w-full md:w-80 bg-brand-orange text-white p-8 flex flex-col justify-between">
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-8 bottom-8 w-0.5 border-l-2 border-dashed border-white/60 -z-0" />
            {STEPS.map((step) => (
              <div key={step.number} className="flex items-start space-x-4 relative z-10">
                <div
                  className={
                    step.status === "complete"
                      ? "w-12 h-12 rounded-full bg-white text-brand-orange font-bold flex items-center justify-center text-lg shadow-sm shrink-0"
                      : step.status === "active"
                        ? "w-12 h-12 rounded-full bg-white/30 text-white font-bold flex items-center justify-center text-lg shadow-sm shrink-0 border-2 border-white"
                        : "w-12 h-12 rounded-full bg-white/20 text-white font-medium flex items-center justify-center text-lg shrink-0"
                  }
                >
                  {step.number}
                </div>
                <div className="pt-2.5 flex items-center justify-between flex-1">
                  <span
                    className={
                      step.status === "active"
                        ? "font-semibold text-lg"
                        : step.status === "pending"
                          ? "font-normal text-lg text-white/90"
                          : "font-medium text-lg"
                    }
                  >
                    {step.title}
                  </span>
                  {step.status === "complete" && (
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-white p-8 md:p-16 flex flex-col justify-between">
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Program of study
              </h1>
              <p className="text-gray-500 mt-1 text-base">Select your program of study</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="program-select" className="capitalize">
                  program of study
                </Label>
                <select
                  id="program-select"
                  name="program"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="block w-full rounded-md border-gray-300 bg-gray-50 py-3 pl-4 pr-10 text-base text-gray-700 focus:border-brand-orange focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange"
                >
                  <option value="" disabled>
                    Select program of study
                  </option>
                  {Object.entries(PROGRAMS).map(([value, info]) => (
                    <option key={value} value={value}>
                      {info.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Years of study + qualifications — only shown once a program is picked */}
              {selectedProgram && (
                <div className="mt-8 space-y-6">
                  <div className="text-sm text-gray-800 font-medium">
                    Years of study:{" "}
                    <span className="font-normal text-gray-600">{selectedProgram.years}</span>
                  </div>

                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                      Qualification
                    </h2>

                    <div className="space-y-6 relative pl-6">
                      <div className="absolute left-2.5 top-3 bottom-3 w-0.5 border-l-2 border-dashed border-gray-300" />
                      {selectedProgram.requirements.map((req) => (
                        <div key={req.title} className="relative">
                          <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-brand-orange ring-4 ring-white" />
                          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-1">
                            {req.title}
                          </h3>
                          <p className="text-xs text-gray-600 leading-relaxed">{req.body}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              <div className="flex justify-end mt-12 pt-6 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={!isComplete}
                  className="px-8 py-2.5 rounded-md font-medium bg-gray-100 text-gray-400 hover:bg-brand-orange hover:text-white disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-400"
                >
                  Next
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}