<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let name = '';
  let number = '';
  let isNewUser = true;
  let errorMessage = '';

  // Generate a random 4-digit number
  function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  // Update number field when user type changes
  function handleUserTypeChange() {
    if (isNewUser) {
      number = generateRandomNumber().toString();
    } else {
      number = '';
    }
  }

  // Initialize number for new users
  onMount(() => {
    if (isNewUser) {
      number = generateRandomNumber().toString();
    }
  });

  // Handle form submission
  async function handleSubmit() {
    if (!name) {
      errorMessage = 'Please enter your name';
      return;
    }

    if (!number || number.length !== 4) {
      errorMessage = 'Please enter a valid 4-digit number';
      return;
    }

    try {
      if (isNewUser) {
        // Create user directory via API
        const response = await fetch('/api/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, number })
        });

        if (response.ok) {
          // Store user info in session/localStorage for convenience
          sessionStorage.setItem('userName', name);
          sessionStorage.setItem('userNumber', number);
          goto('/dashboard');
        } else {
          errorMessage = 'Error creating user profile';
        }
      } else {
        // Verify returning user
        const response = await fetch('/api/verify-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, number })
        });

        const data = await response.json();

        if (data.exists) {
          sessionStorage.setItem('userName', name);
          sessionStorage.setItem('userNumber', number);
          goto('/dashboard');
        } else {
          errorMessage = 'Invalid credentials. Please try again.';
        }
      }
    } catch (error) {
      errorMessage = 'Server error. Please try again.';
      console.error(error);
    }
  }
</script>

<div class="page-container">
  <div class="login-container">
    <Card elevated={true} padding="large">
      <h1 class="title">Welcome to SCOPE</h1>
      <p class="subtitle">Open BETA Release</p>

      <hr class="divider" />

      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            bind:value={name}
            placeholder="Enter your name"
          />
        </div>

        <div class="form-group">
          <div class="number-header">
            <label for="number">Your 4-digit Number:</label>
            <div class="toggle-container">
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  bind:checked={isNewUser}
                  on:change={handleUserTypeChange}
                >
                <span class="toggle-label">New User</span>
              </label>
            </div>
          </div>

          <input
            type="text"
            id="number"
            bind:value={number}
            placeholder={isNewUser ? "Auto-generated" : "Enter your 4-digit number"}
            maxlength="4"
            disabled={isNewUser}
            class={isNewUser ? 'auto-generated' : ''}
          />
          {#if isNewUser}
            <p class="help-text">Please remember this number for future logins.</p>
          {/if}
        </div>

        {#if errorMessage}
          <div class="error-message">{errorMessage}</div>
        {/if}

        <hr class="divider" />

        <Button type="submit">
          {isNewUser ? 'Create Profile' : 'Login'}
        </Button>
      </form>
    </Card>
  </div>
</div>

<style>
  .page-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1rem;
  }

  .login-container {
    width: 100%;
    max-width: 400px;
  }

  .title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: normal;
    margin-bottom: 1rem;
    color: rgba(0, 0, 0, 0.5);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .number-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .toggle-container {
    display: flex;
    align-items: center;
  }

  .toggle-switch {
    display: inline-flex;
    align-items: center;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .toggle-switch input {
    margin-right: 0.5rem;
    cursor: pointer;
  }

  .toggle-label {
    color: #4A90E2;
    font-weight: 500;
    white-space: nowrap;
  }

  label {
    display: block;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .auto-generated {
    background-color: #f0f8ff;
    border-color: #4A90E2;
    font-weight: bold;
  }

  .help-text {
    font-size: 0.85rem;
    color: #666;
    margin-top: 0.25rem;
  }

  .divider {
    width: calc(100% + 3rem); /* Adjust based on Card's padding */
    margin: 1.5rem -1.5rem;
    border: none;
    border-top: 1px solid #ddd;
  }

  .error-message {
    color: #d9534f;
    margin-top: 0.5rem;
  }
</style>
