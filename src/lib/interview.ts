// 前後端共用的面試資料型別與規則

export const TOTAL_QUESTIONS = 3;
export const MAX_FOLLOWUPS_PER_QUESTION = 1;

export type Turn =
  | { role: "assistant"; kind: "question" | "followup"; content: string }
  | { role: "user"; content: string };

export type QuestionScore = {
  question: string;
  score: number;
  comment: string;
};

export type Evaluation = {
  questions: QuestionScore[];
  totalScore: number;
  maxScore: number;
  summary: string;
  suggestions: string[];
};

export type InterviewRequest = {
  jobDescription: string;
  turns: Turn[];
};

export type InterviewResponse =
  | { type: "question" | "followup"; content: string; questionNumber: number }
  | { type: "evaluation"; evaluation: Evaluation }
  | { type: "error"; error: string };

export function countQuestions(turns: Turn[]): number {
  return turns.filter((t) => t.role === "assistant" && t.kind === "question")
    .length;
}

export function countFollowupsSinceLastQuestion(turns: Turn[]): number {
  let count = 0;
  for (let i = turns.length - 1; i >= 0; i--) {
    const t = turns[i];
    if (t.role !== "assistant") continue;
    if (t.kind === "question") break;
    count++;
  }
  return count;
}
