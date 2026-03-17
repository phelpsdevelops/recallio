"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AppShell, PageShell, Button, Card } from "../../../components/ui";
import { useAuth } from "../../../components/authContext";

export default function NotepadPage() {
  const { user } = useAuth();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[500px] p-6 text-zinc-900 dark:text-zinc-50",
        "data-placeholder": "Start typing your notes here... Use the toolbar above to format text, create headers, lists, and more.",
      },
    },
  });

  const handleSave = () => {
    if (editor) {
      const content = editor.getHTML();
      // TODO: Implement save functionality
      console.log("Saving notes:", content);
    }
  };

  const handleClear = () => {
    if (editor) {
      editor.commands.clearContent();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <AppShell>
      <PageShell
        title="Type Notes"
        description="Write your notes manually and generate flashcards and quizzes from them."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button onClick={handleSave}>Save Notes</Button>
          </div>
        }
      >
        <Card className="p-0 overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-900">
            {/* Headers */}
            <div className="flex items-center gap-1 border-r border-zinc-300 dark:border-zinc-700 pr-2">
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-2 py-1 rounded text-sm font-semibold transition ${
                  editor.isActive("heading", { level: 1 })
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
                title="Heading 1"
              >
                H1
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-2 py-1 rounded text-sm font-semibold transition ${
                  editor.isActive("heading", { level: 2 })
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
                title="Heading 2"
              >
                H2
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`px-2 py-1 rounded text-sm font-semibold transition ${
                  editor.isActive("heading", { level: 3 })
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
                title="Heading 3"
              >
                H3
              </button>
              <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`px-2 py-1 rounded text-sm transition ${
                  editor.isActive("paragraph")
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
                title="Paragraph"
              >
                P
              </button>
            </div>

            {/* Text Formatting */}
            <div className="flex items-center gap-1 border-r border-zinc-300 dark:border-zinc-700 pr-2">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-2 py-1 rounded text-sm font-bold transition ${
                  editor.isActive("bold")
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
                title="Bold"
              >
                B
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-2 py-1 rounded text-sm italic transition ${
                  editor.isActive("italic")
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
                title="Italic"
              >
                I
              </button>
            </div>

            {/* Lists */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded text-sm transition ${
                  editor.isActive("bulletList")
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
                title="Bullet List"
              >
                •
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded text-sm transition ${
                  editor.isActive("orderedList")
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
                title="Numbered List"
              >
                1.
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="bg-white dark:bg-zinc-900">
            <EditorContent editor={editor} />
          </div>
        </Card>
      </PageShell>
    </AppShell>
  );
}
