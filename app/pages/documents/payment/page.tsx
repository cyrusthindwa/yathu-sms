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

export default function PaymentSlipUploadPage() {
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
    // TODO: persist uploaded payment slip before advancing
    router.push("/documents");
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-gray-100">
      <div className="flex h-full w-full flex-col">
        <NavBar />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-80 bg-brand-orange text-white flex flex-col justify-between p-8 select-none hidden md:flex">
            <div>
              <div className="text-2xl font-bold tracking-wider mb-16">
                M<span className="text-white">C</span>
              </div>

              <nav className="flex flex-col space-y-8 relative">
                <div className="absolute left-4 top-6 bottom-6 w-0.5 border-l-2 border-dashed border-white/50 z-0" />
                {STEPS.map((step) => (
                  <div key={step.number} className="flex items-center space-x-4 relative z-10">
                    <div
                      className={
                        step.status === "active"
                          ? "w-8 h-8 rounded-full bg-white/30 text-white border-2 border-white flex items-center justify-center font-bold"
                          : "w-8 h-8 rounded-full bg-white text-brand-orange flex items-center justify-center font-bold shadow-sm"
                      }
                    >
                      {step.status === "complete" ? (
                        <Check className="w-4 h-4" strokeWidth={3} />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={step.status === "active" ? "font-bold text-lg" : "font-medium text-lg"}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
              </nav>
            </div>

            <div className="text-xs text-white/70">Academic Path Design System</div>
          </aside>

          {/* Main content */}
          <main className="flex-1 bg-white flex flex-col justify-between p-12 overflow-y-auto">
            <div className="max-w-3xl w-full mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Payment slip upload</h1>
                <p className="text-gray-500 text-sm">
                  Upload copies of your processing payment documents.
                </p>
              </div>

              {/* Horizontal progress */}
              <div className="flex items-center mb-10 max-w-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                </div>
                <div className="flex-1 h-1 bg-brand-orange mx-2" />
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-2" />
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                </div>
              </div>

              {/* Upload card */}
              <div className="border border-gray-200 bg-gray-50/50 rounded-xl p-8 flex flex-col items-center justify-center">
                <div
                  onClick={handleBrowseClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={
                    isDragging
                      ? "border-2 border-dashed border-brand-orange rounded-lg p-8 w-full max-w-lg bg-white flex flex-col items-center justify-center text-center transition-colors cursor-pointer mb-6"
                      : "border-2 border-dashed border-gray-300 rounded-lg p-8 w-full max-w-lg bg-white flex flex-col items-center justify-center text-center hover:border-brand-orange transition-colors cursor-pointer mb-6"
                  }
                >
                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleInputChange}
                  />
                  <div className="mb-3 text-gray-700">
                    <UploadCloud className="w-8 h-8 mx-auto" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Choose a file or drag and drop here.
                  </p>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBrowseClick();
                    }}
                    className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
                  >
                    Browse file
                  </Button>
                </div>

                {/* Uploaded files — only real uploads, no placeholder */}
                {files.length > 0 && (
                  <div className="w-full max-w-lg space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between shadow-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                            <FileText className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{file.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{file.sizeKb} kb</span>
                              <span className="flex items-center text-emerald-600 font-medium">
                                <Check className="w-3.5 h-3.5 mr-0.5" strokeWidth={2.5} />
                                completed
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          title="Remove file"
                          className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer action */}
            <div className="max-w-3xl w-full mx-auto flex justify-end pt-4">
              <Button
                type="button"
                onClick={handleNext}
                disabled={!isComplete}
                className="bg-brand-orange hover:opacity-90 text-white font-medium px-8 py-2.5 rounded-md shadow-sm transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}