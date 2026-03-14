import { DocumentationEntry, Note, RecallMode, RecallSet } from "../types/models";

const NOTES_KEY = "recallio_notes";
const DOCS_KEY = "recallio_docs";
const RECALL_SELECTION_KEY = "recallio_recall_selection";

export interface RecallSelectionState {
  noteIds: string[];
  mode: RecallMode | null;
}

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  return safeParse<Note[]>(window.localStorage.getItem(NOTES_KEY)) ?? [];
}

export function saveNotes(notes: Note[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function loadDocs(): DocumentationEntry[] {
  if (typeof window === "undefined") return [];
  return safeParse<DocumentationEntry[]>(window.localStorage.getItem(DOCS_KEY)) ?? [];
}

export function saveDocs(docs: DocumentationEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
}

export function loadRecallSelection(): RecallSelectionState | null {
  if (typeof window === "undefined") return null;
  return safeParse<RecallSelectionState>(
    window.localStorage.getItem(RECALL_SELECTION_KEY),
  );
}

export function saveRecallSelection(selection: RecallSelectionState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RECALL_SELECTION_KEY, JSON.stringify(selection));
}

export function clearRecallSelection() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(RECALL_SELECTION_KEY);
}

export function createRecallSet(
  id: string,
  mode: RecallMode,
  noteIds: string[],
): RecallSet {
  return {
    id,
    mode,
    noteIds,
    createdAt: new Date().toISOString(),
  };
}

