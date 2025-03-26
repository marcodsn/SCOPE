/**
 * Saves test results to the user's profile
 * @param {string} testType - Type of test being saved
 * @param {object} results - Results data to save
 * @returns {Promise} - API response
 */
export async function saveTestResults(testType, results) {
    const name = sessionStorage.getItem("userName");
    const number = sessionStorage.getItem("userNumber");

    if (!name || !number) {
        throw new Error("User not logged in");
    }

    const response = await fetch("/api/save-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, number, testType, results }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save results");
    }

    return await response.json();
}
