
const LOCAL_API_URL = "http://127.0.0.1:8000";

function getApiBaseUrl(): string {
    const configuredUrl = import.meta.env.VITE_API_BASE_URL;

    // Use localhost as the development fallback only.
    // Production must have its API URL explicitly configured.
    const apiUrl =
        configuredUrl ||
        (import.meta.env.DEV ? LOCAL_API_URL : "");

    if (!apiUrl) {
        throw new Error(
            "VITE_API_BASE_URL is missing. Configure it in Vercel Environment Variables."
        );
    }

    return apiUrl.replace(/\/+$/, "");
}

export async function askQuestion(
    userId: string,
    question: string
) {
    const response = await fetch(
        `${getApiBaseUrl()}/api/ask`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                question,
            }),
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();

        throw new Error(
            `Ask API failed (${response.status}): ${errorBody}`
        );
    }

    return response.json();
}

export async function streamQuestion(
    userId: string,
    question: string,
    onChunk: (chunk: string) => void
) {
    const response = await fetch(
        `${getApiBaseUrl()}/api/stream`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                question,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            `Streaming request failed: ${response.status} ${response.statusText}`
        );
    }

    if (!response.body) {
        throw new Error(
            "Streaming response body is unavailable."
        );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            onChunk(
                decoder.decode(value, { stream: true })
            );
        }

        const remaining = decoder.decode();

        if (remaining) {
            onChunk(remaining);
        }
    } finally {
        reader.releaseLock();
    }
}
