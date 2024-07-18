export type TurnType = "do" | "say" | "story" | "see";

export interface Message {
    content: string;
    role: "system" | "user" | "assistant";
}

export interface ModelResponse {
    choices: { finish_reason: string; index: number; message: Message }[];
    created: number;
    id: string;
    model: string;
}

