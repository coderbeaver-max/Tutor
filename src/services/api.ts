import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export async function askQuestion(
    userId: string,
    question: string
) {
    const response = await axios.post(
        `${API_URL}/api/ask`,
        {
            user_id: userId,
            question: question
        }
    );

    return response.data;
}

export async function streamQuestion(
    userId: string,
    question: string,
    onChunk: (chunk: string) => void
) {
    const response = await fetch(
        `${API_URL}/api/stream`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userId,
                question: question
            })
        }
    );

    if (!response.ok) {
        throw new Error("Streaming request failed");
    }

    if (!response.body) {
        throw new Error("Streaming response body is unavailable");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        const chunk = decoder.decode(value, {
            stream: true
        });

        if (chunk) {
            onChunk(chunk);
        }
    }
}