"use client";

import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, FileText, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/nav-bar";

type StepStatus = "complete" | "active" | "pending";

type Step = {
  number: number;
  title: string;
  status: StepStatus;
};

const STEPS: Step[] = [
  { number: 1, title: "Personal details", status: "complete" },
  { number: 2, title: "Qualifications", status: "complete" },
  { number: 3, title: "Documents", status: "active" },
];

type UploadedFile = {
  id: string;
  name: string;
  sizeKb: number;
};

function toKb(bytes: number) {
  return Math.max(1, Math.round(bytes / 1024));
}

export default function NationalIdUploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
      name: f.name,
      sizeKb: toKb(f.size),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleBrowseClick = () => inputRef.current?.click();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const isComplete = files.length > 0;

  const handleNext = () => {
    if (!isComplete) return;
    // TODO: persist uploaded National ID before advancing
    router.push("/pages/documents/payment");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-brand-orange flex-col justify-between p-8 text-white select-none hidden md:flex">
          <div>
            <div className="text-3xl font-black tracking-wider mb-16">
              M<span className="opacity-90">C</span>
            </div>

            <nav className="space-y-10">
              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className={step.status === "active" ? "flex items-center space-x-4" : "flex items-center space-x-4 opacity-90"}
                >
                  <div
                    className={
                      step.status === "active"
                        ? "w-9 h-9 rounded-full bg-white text-brand-orange font-bold flex items-center justify-center text-sm shadow-md ring-4 ring-white/20"
                        : "w-9 h-9 rounded-full bg-white text-brand-orange font-bold flex items-center justify-center text-sm shadow-sm"
                    }
                  >
                    {step.number}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span
                      className={step.status === "active" ? "font-bold text-lg" : "font-medium text-lg"}
                    >
                      {step.title}
                    </span>
                    {step.status === "complete" && (
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="text-xs text-white/70">Academic Admissions Portal</div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col justify-between bg-white overflow-y-auto">
          <div className="max-w-4xl w-full mx-auto p-12 flex-1 flex flex-col">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                National ID documents upload
              </h1>
              <p className="text-gray-600 mb-8">Upload copies of your national ID documents.</p>

              {/* Horizontal step indicators */}
              <div className="flex items-center max-w-lg">
                <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </div>
                <div className="flex-1 h-1 bg-brand-orange mx-2" />
                <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </div>
                <div className="flex-1 h-1 bg-gray-300 mx-2" />
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
            </div>

            {/* Upload section */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-full max-w-xl bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center">
                <div
                  onClick={handleBrowseClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={
                    isDragging
                      ? "w-full border-2 border-dashed border-brand-orange rounded-lg p-8 flex flex-col items-center justify-center text-center bg-white transition-colors cursor-pointer mb-6"
                      : "w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-white hover:border-brand-orange transition-colors cursor-pointer mb-6"
                  }
                >
                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleInputChange}
                  />
                  <div className="mb-3 text-gray-600">
                    <Upload className="w-8 h-8 mx-auto" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-4">
                    Choose a file or drag and drop here.
                  </p>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBrowseClick();
                    }}
                    className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    Browse file
                  </Button>
                </div>

                {/* Uploaded files — only real uploads, no placeholder */}
                {files.length > 0 && (
                  <div className="w-full space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between shadow-xs"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-500 flex-shrink-0">
                            <FileText className="w-5 h-5" strokeWidth={2} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{file.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{file.sizeKb} kb</span>
                              <span className="flex items-center text-green-600 font-medium">
                                <Check className="w-3.5 h-3.5 mr-0.5" strokeWidth={2.5} />
                                completed
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          aria-label="Remove file"
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-red-500 p-2 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer action */}
          <div className="max-w-4xl w-full mx-auto px-12 py-6 flex justify-end items-center border-t border-gray-100">
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isComplete}
              className="px-8 py-2.5 bg-brand-orange hover:opacity-90 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}