import { json } from "@sveltejs/kit";
import fs from "fs/promises";
import path from "path";

const USERS_DIR = "users";

export async function POST({ request }) {
    const { name, number, testType, results } = await request.json();

    if (!name || !number || !testType || !results) {
        return json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const userDir = path.join(USERS_DIR, `${name}-${number}`);

        // Check if user exists
        try {
            await fs.access(userDir);
        } catch {
            return json({ error: "User not found" }, { status: 404 });
        }

        // Create timestamp for unique filename
        const timestamp = new Date().toISOString().replace(/:/g, "-");
        const fileName = `${testType}_${timestamp}.json`;

        // Save test results
        await fs.writeFile(
            path.join(userDir, fileName),
            JSON.stringify(results, null, 2),
        );

        // Update settings to include this test
        const settingsPath = path.join(userDir, "settings.json");
        const settingsData = await fs.readFile(settingsPath, "utf-8");
        const settings = JSON.parse(settingsData);

        settings.tests.push({
            type: testType,
            timestamp: new Date().toISOString(),
            fileName,
        });

        await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));

        return json({ success: true });
    } catch (error) {
        console.error("Error saving results:", error);
        return json({ error: "Server error" }, { status: 500 });
    }
}
