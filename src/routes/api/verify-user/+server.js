import { json } from "@sveltejs/kit";
import fs from "fs/promises";
import path from "path";

const USERS_DIR = "users";

export async function POST({ request }) {
    const { name, number } = await request.json();

    if (!name || !number) {
        return json({ error: "Name and number are required" }, { status: 400 });
    }

    try {
        const userDir = path.join(USERS_DIR, `${name}-${number}`);

        try {
            await fs.access(userDir);

            // Update last login time
            const settingsPath = path.join(userDir, "settings.json");
            const settingsData = await fs.readFile(settingsPath, "utf-8");
            const settings = JSON.parse(settingsData);

            settings.lastLogin = new Date().toISOString();

            await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));

            return json({ exists: true });
        } catch {
            return json({ exists: false });
        }
    } catch (error) {
        console.error("Error verifying user:", error);
        return json({ error: "Server error" }, { status: 500 });
    }
}
