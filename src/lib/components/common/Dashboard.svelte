<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { saveTestResults } from '$lib/utils/auth.js';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let userName = '';
  let userNumber = '';

  onMount(() => {
    // Get user info from session storage
    userName = sessionStorage.getItem('userName');
    userNumber = sessionStorage.getItem('userNumber');

    if (!userName || !userNumber) {
      goto('/login');
    }
  });

  function logout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userNumber');
    goto('/login');
  }

  // Example function to save test results
  async function completeTest(testType, testResults) {
    try {
      await saveTestResults(testType, testResults);
      alert('Test results saved successfully!');
    } catch (error) {
      alert('Error saving results: ' + error.message);
    }
  }

  // Example test completion
  function runDemoTest() {
    // Simulate test results
    const results = {
      score: Math.floor(Math.random() * 100),
      completionTime: Date.now(),
      answers: [
        { question: 1, correct: true },
        { question: 2, correct: false },
        { question: 3, correct: true }
      ]
    };

    completeTest('demo-test', results);
  }
</script>

<div class="dashboard">
  <header>
    <h1 class="title">SCOPE Dashboard</h1>
    <div class="user-info">
      <span>User: <strong>{userName}</strong> ({userNumber})</span>
      <Button variant="secondary" on:click={logout}>Logout</Button>
    </div>
  </header>

  <hr class="divider" />

  <main>
    <section class="tests-section">
      <h2>Available Tests</h2>
      <div class="tests-grid">
        <Card elevated={true} padding="medium" class="test-card">
          <h3>Demo Test</h3>
          <p>This is a simple demonstration test.</p>
          <Button on:click={runDemoTest}>Start Test</Button>
        </Card>
        <!-- Add more test cards here -->
      </div>
    </section>
  </main>
</div>

<style>
  .dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.1rem;
  }

  .divider {
    width: 100%;
    margin: 0 0 2rem 0;
    border: none;
    border-top: 1px solid #ddd;
  }

  .tests-section h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .tests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  /* Make the test card fill the Card component */
  :global(.test-card) {
    display: flex;
    flex-direction: column;
  }

  /* Push the button to the bottom of the card */
  :global(.test-card > button) {
    margin-top: auto;
  }
</style>
