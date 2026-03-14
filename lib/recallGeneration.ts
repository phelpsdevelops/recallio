import { Flashcard, QuizQuestion, StatementPrompt } from "../types/models";

// Very lightweight, client-side-only text processing helpers for MVP.

function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
}

export function generateQuizQuestions(
  noteId: string,
  content: string,
): QuizQuestion[] {
  const sentences = splitIntoSentences(content);
  return sentences.slice(0, 10).map((sentence, index) => {
    const words = sentence.split(" ");
    const questionText =
      words.length > 6
        ? "What is the main idea of: \"" +
          words.slice(0, 8).join(" ") +
          "...\"?"
        : "What does this mean: \"" + sentence + "\"?";
    return {
      id: `${noteId}-q-${index}`,
      question: questionText,
      answer: sentence,
      sourceNoteId: noteId,
    };
  });
}

export function generateFlashcards(
  noteId: string,
  content: string,
): Flashcard[] {
  const sentences = splitIntoSentences(content);
  return sentences.slice(0, 10).map((sentence, index) => {
    const midpoint = Math.floor(sentence.length / 2);
    const front = sentence.slice(0, midpoint).trim() + " ...";
    const back = sentence.slice(midpoint).trim();
    return {
      id: `${noteId}-f-${index}`,
      front,
      back: back || sentence,
      sourceNoteId: noteId,
    };
  });
}

export function generateStatementPrompts(
  noteId: string,
  content: string,
): StatementPrompt[] {
  const sentences = splitIntoSentences(content);
  return sentences.slice(0, 10).map((sentence, index) => {
    const words = sentence.split(" ");
    const cutIndex = Math.max(4, Math.floor(words.length * 0.6));
    const prompt = words.slice(0, cutIndex).join(" ") + " ...";
    const answer = words.slice(cutIndex).join(" ");
    return {
      id: `${noteId}-s-${index}`,
      prompt,
      answer: answer || sentence,
      sourceNoteId: noteId,
    };
  });
}

