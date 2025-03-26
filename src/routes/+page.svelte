<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // Use onMount to ensure this only runs in the browser
  onMount(() => {
    // Check if user is logged in
    const userName = sessionStorage.getItem('userName');
    const userNumber = sessionStorage.getItem('userNumber');

    if (userName && userNumber) {
      goto('/dashboard');
    } else {
      goto('/login');
    }
  });
</script>

<!-- Show a loading indicator until redirect happens -->
<div class="loading">
  <p>Loading...</p>
</div>

<style>
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-size: 1.2rem;
    }
</style>
