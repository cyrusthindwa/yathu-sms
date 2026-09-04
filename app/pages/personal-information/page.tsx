"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { NavBar } from "@/components/ui/nav-bar";

type Step = {
  number: number;
  title: string;
  status: string;
};

const STEPS: Step[] = [
  { number: 1, title: "Personal details", status: "In progress" },
  { number: 2, title: "Program", status: "Pending" },
  { number: 3, title: "Qualifications", status: "Pending" },
];

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  sex: string;
  dateOfBirth: string;
};

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  sex: "",
  dateOfBirth: "",
};

export default function PersonalInformationPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const updateField =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const isComplete = Object.values(form).every((value) => value.trim() !== "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isComplete) return;
    // TODO: persist form to the admissions API before advancing
    router.push("/pages/program");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <NavBar />

      <main className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar progress */}
        <aside className="w-full md:w-80 bg-brand-orange text-white p-8 flex flex-col justify-between shadow-inner">
          <div className="space-y-12 py-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-orange-200 font-semibold">
                Admissions Process
              </span>
              <h1 className="text-2xl font-bold">Personal Information</h1>
            </div>

            <div className="relative pl-4 space-y-10">
              <div className="absolute left-7 top-6 bottom-6 w-0.5 border-l-2 border-dashed border-orange-300" />
              {STEPS.map((step) => (
                <div key={step.number} className="relative flex items-center space-x-4">
                  <div
                    className={
                      step.number === 1
                        ? "w-10 h-10 rounded-full bg-white text-brand-orange font-bold flex items-center justify-center shadow-md z-10"
                        : "w-10 h-10 rounded-full bg-orange-700 text-white font-bold flex items-center justify-center z-10"
                    }
                  >
                    {step.number}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{step.title}</div>
                    <div className="text-xs text-orange-100">{step.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-orange-200 pt-6 border-t border-orange-600">
            Need help? Contact admissions support at{" "}
            <a className="underline hover:text-white" href="mailto:support@mc.edu">
              support@mc.edu
            </a>
          </div>
        </aside>

        {/* Form */}
        <section className="flex-1 p-6 sm:p-10 lg:p-12 flex justify-center items-start">
          <Card className="w-full max-w-3xl border border-gray-200 shadow-sm rounded-2xl">
            <CardContent className="p-8 sm:p-10">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Please fill in your accurate personal details to proceed with your
                  application.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={updateField("firstName")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={updateField("lastName")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter contact number"
                    value={form.phone}
                    onChange={updateField("phone")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={updateField("email")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="sex">Sex</Label>
                    <select
                      id="sex"
                      value={form.sex}
                      onChange={updateField("sex")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:bg-white transition appearance-none"
                    >
                      <option value="" disabled>
                        Select sex
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="dob">Date of birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      placeholder="Choose date of birth"
                      value={form.dateOfBirth}
                      onChange={updateField("dateOfBirth")}
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <Button
                    type="submit"
                    disabled={!isComplete}
                    className="px-8 py-3 rounded-lg font-semibold bg-gray-100 text-gray-400 hover:bg-brand-orange hover:text-white disabled:opacity-100 disabled:hover:bg-gray-100 disabled:hover:text-gray-400"
                  >
                    Next
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}