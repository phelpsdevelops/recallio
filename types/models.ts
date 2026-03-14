export type NoteType = "typed" | "file";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UploadedFile {
  id: string;
  noteId: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  createdAt: string;
  updatedAt: string;
  files?: UploadedFile[];
}

export type RecallMode = "quiz" | "flashcards" | "finish-statement";

export interface QuizQuestion {
  id: string;
  question: string;
  answer: string;
  sourceNoteId: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  sourceNoteId: string;
}

export interface StatementPrompt {
  id: string;
  prompt: string;
  answer: string;
  sourceNoteId: string;
}

export interface RecallSet {
  id: string;
  mode: RecallMode;
  noteIds: string[];
  createdAt: string;
  questions?: QuizQuestion[];
  flashcards?: Flashcard[];
  statements?: StatementPrompt[];
}

export interface DocumentationEntry {
  id: string;
  title: string;
  category?: string;
  steps: string[];
  imageUrls?: string[];
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

