<script>
  export let elevated = false;
  export let padding = "medium"; // none, small, medium, large
</script>

<div class="card {elevated ? 'elevated' : ''} padding-{padding}">
  <slot></slot>
</div>

<style>
  .card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
  }

  .elevated {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .padding-none {
    padding: 0;
  }

  .padding-small {
    padding: 0.5rem;
  }

  .padding-medium {
    padding: 1rem;
  }

  .padding-large {
    padding: 1.5rem;
  }

  /* Add other padding sizes as needed */
</style>
