"use client";

import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, FileText, X, UploadCloud } from "lucide-react";
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

export default function DocumentsUploadPage() {
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
    // TODO: persist uploaded documents before advancing
    router.push("/pages/documents/national-id");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar />

      <div className="flex-1 flex w-full max-w-7xl mx-auto bg-white shadow-xl overflow-hidden my-auto rounded-none md:rounded-xl">
        {/* Sidebar */}
        <aside className="w-80 bg-brand-orange text-white flex flex-col justify-between p-8 hidden md:flex">
          <div>
            <div className="text-2xl font-black tracking-wider mb-12">MC</div>

            <nav className="flex flex-col space-y-8 relative">
              {STEPS.map((step, i) => (
                <div key={step.number}>
                  <div className="flex items-center space-x-4 relative z-10">
                    <div
                      className={
                        step.status === "active"
                          ? "w-10 h-10 rounded-full bg-white text-brand-orange flex items-center justify-center font-bold text-lg shadow-md ring-4 ring-white/30"
                          : "w-10 h-10 rounded-full bg-white text-brand-orange flex items-center justify-center font-bold text-lg shadow-md"
                      }
                    >
                      {step.number}
                    </div>
                    <div className="flex-grow flex items-center justify-between">
                      <span
                        className={
                          step.status === "active" ? "font-bold text-lg" : "font-medium text-lg"
                        }
                      >
                        {step.title}
                      </span>
                      {step.status === "complete" && (
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="ml-5 h-8 w-0.5 border-l-2 border-dashed border-white/50" />
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="text-xs text-white/70">Admissions Portal v2.4</div>
        </aside>

        {/* Content */}
        <section className="flex-1 flex flex-col justify-between p-10 lg:p-14 bg-white">
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                Academic qualifications documents upload
              </h1>
              <p className="text-gray-500 text-base">
                Upload copies of your academic qualification documents.
              </p>
            </div>

            {/* Horizontal stepper */}
            <div className="flex items-center max-w-xl mb-10">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-orange text-white font-semibold text-sm">
                1
              </div>
              <div className="flex-1 h-1 bg-brand-orange mx-2" />
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-orange text-white font-semibold text-sm">
                2
              </div>
              <div className="flex-1 h-1 bg-brand-orange mx-2" />
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-orange text-white font-semibold text-sm ring-2 ring-brand-orange/30">
                3
              </div>
            </div>

            {/* Upload card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-2xl shadow-sm flex flex-col items-center justify-center">
              <div
                onClick={handleBrowseClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={
                  isDragging
                    ? "border-2 border-dashed border-brand-orange rounded-xl p-8 w-full text-center bg-white transition-colors cursor-pointer mb-6"
                    : "border-2 border-dashed border-gray-300 rounded-xl p-8 w-full text-center bg-white hover:border-brand-orange transition-colors cursor-pointer mb-6"
                }
              >
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleInputChange}
                />
                <div className="flex justify-center mb-3">
                  <UploadCloud className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                </div>
                <p className="text-gray-700 font-medium text-sm mb-4">
                  Choose a file or drag and drop here.
                </p>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrowseClick();
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all"
                >
                  Browse file
                </Button>
              </div>

              {/* Uploaded file list */}
              <div className="w-full space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                        <FileText className="w-6 h-6" strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">{file.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                          <span>{file.sizeKb} kb</span>
                          <span>•</span>
                          <span className="text-green-600 font-medium flex items-center space-x-1">
                            <Check className="w-3.5 h-3.5 inline mr-0.5" strokeWidth={2.5} />
                            completed
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      title="Remove file"
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="w-5 h-5 bg-red-100 rounded p-0.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next button */}
          <div className="flex justify-end mt-10 max-w-2xl">
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isComplete}
              className="bg-brand-orange hover:opacity-90 text-white font-medium px-8 py-2.5 rounded-lg shadow transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}