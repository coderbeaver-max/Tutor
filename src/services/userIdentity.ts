const USER_ID_STORAGE_KEY = "jarvis_user_id";

export function getUserId(): string {
    const existingUserId = localStorage.getItem(
        USER_ID_STORAGE_KEY
    );

    if (existingUserId) {
        return existingUserId;
    }

    const userId = crypto.randomUUID();

    localStorage.setItem(
        USER_ID_STORAGE_KEY,
        userId
    );

    return userId;
}