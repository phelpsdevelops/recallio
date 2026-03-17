"use client";

import { useState, useEffect } from "react";
import { AppShell, PageShell, Button, Card } from "../../../../components/ui";
import { useAuth } from "../../../../components/authContext";
import dynamic from "next/dynamic";
import { pdfjs } from "react-pdf";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Dynamically import PDF viewer to avoid SSR issues
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(
  () => import("react-pdf").then((mod) => mod.Page),
  { ssr: false }
);

export default function UploadPage() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [pdfPages, setPdfPages] = useState<any[]>([]);
  const [pdfNumPages, setPdfNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setLoading(true);
    setFileContent("");
    setFileType("");
    setPdfPages([]);

    const fileName = file.name.toLowerCase();
    const extension = fileName.split(".").pop();

    try {
      if (extension === "pdf") {
        setFileType("pdf");
        // PDF will be handled by react-pdf component
      } else if (extension === "doc" || extension === "docx") {
        setFileType("doc");
        // Import mammoth dynamically
        const mammoth = await import("mammoth");
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setFileContent(result.value);
      } else if (extension === "md" || extension === "txt" || extension === "markdown") {
        setFileType("text");
        const text = await file.text();
        setFileContent(text);
      }
    } catch (error) {
      console.error("Error reading file:", error);
      setFileContent("Error reading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setFileContent("");
    setFileType("");
    setPdfPages([]);
    setPdfNumPages(0);
    // Reset file input
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPdfNumPages(numPages);
  };

  return (
    <AppShell>
      <PageShell
        title="Upload Files"
        description="Upload notes, PDFs, or documents and turn them into recall tools."
        actions={
          <div className="flex gap-2">
            {selectedFile && (
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            )}
          </div>
        }
      >
        <div className="space-y-6">
          {/* File Input */}
          <Card>
            <div className="space-y-4">
              <label
                htmlFor="file-input"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-zinc-500 dark:text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Markdown, TXT, PDF, or Word documents
                  </p>
                </div>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept=".md,.txt,.markdown,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                />
              </label>
              {selectedFile && (
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Selected: <span className="font-medium">{selectedFile.name}</span> (
                  {(selectedFile.size / 1024).toFixed(2)} KB)
                </div>
              )}
            </div>
          </Card>

          {/* File Content Display */}
          {loading && (
            <Card className="py-12 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading file...</p>
            </Card>
          )}

          {!loading && selectedFile && (
            <Card className="p-0 overflow-hidden">
              <div className="p-6">
                {fileType === "pdf" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        PDF Preview
                      </h3>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {pdfNumPages > 0 && `${pdfNumPages} page${pdfNumPages > 1 ? "s" : ""}`}
                      </span>
                    </div>
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-auto bg-zinc-50 dark:bg-zinc-900 p-4">
                      <Document
                        file={selectedFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<div className="text-center py-8">Loading PDF...</div>}
                        error={
                          <div className="text-center py-8 text-red-600 dark:text-red-400">
                            Error loading PDF. Please try again.
                          </div>
                        }
                      >
                        {Array.from(new Array(pdfNumPages), (el, index) => (
                          <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            className="mb-4"
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        ))}
                      </Document>
                    </div>
                  </div>
                )}

                {fileType === "text" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      File Content
                    </h3>
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-auto bg-white dark:bg-zinc-900 p-6 max-h-[600px]">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-900 dark:text-zinc-50">
                        {fileContent}
                      </pre>
                    </div>
                  </div>
                )}

                {fileType === "doc" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      Document Content
                    </h3>
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-auto bg-white dark:bg-zinc-900 p-6 max-h-[600px]">
                      <div className="whitespace-pre-wrap text-sm text-zinc-900 dark:text-zinc-50">
                        {fileContent}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {!selectedFile && !loading && (
            <Card className="py-12 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Select a file to view its contents.
              </p>
            </Card>
          )}
        </div>
      </PageShell>
    </AppShell>
  );
}
