import { json } from "@sveltejs/kit";
import fs from "fs/promises";
import path from "path";

const USERS_DIR = "users"; // Base directory for user data

async function ensureUserDir() {
    try {
        await fs.access(USERS_DIR);
    } catch {
        await fs.mkdir(USERS_DIR, { recursive: true });
    }
}

export async function POST({ request }) {
    const { name, number } = await request.json();

    if (!name || !number) {
        return json({ error: "Name and number are required" }, { status: 400 });
    }

    try {
        await ensureUserDir();

        const userDir = path.join(USERS_DIR, `${name}-${number}`);

        // Check if user already exists
        try {
            await fs.access(userDir);
            return json({ error: "User already exists" }, { status: 409 });
        } catch {
            // Create user directory
            await fs.mkdir(userDir, { recursive: true });

            // Create initial settings file
            const settings = {
                name,
                number,
                created: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                tests: [],
            };

            await fs.writeFile(
                path.join(userDir, "settings.json"),
                JSON.stringify(settings, null, 2),
            );

            return json({ success: true });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return json({ error: "Server error" }, { status: 500 });
    }
}
