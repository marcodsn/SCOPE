<script>
  export let type = "button";
  export let variant = "primary"; // primary, secondary, etc.
  export let size = "medium"; // small, medium, large
  export let disabled = false;
  export let fullWidth = false;
</script>

<button
  {type}
  class="button {variant} {size} {fullWidth ? 'full-width' : ''}"
  {disabled}
  on:click
>
  <slot></slot>
</button>

<style>
  .button {
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }

  .primary {
    background-color: #4A90E2;
    color: white;
  }

  .primary:hover:not(:disabled) {
    background-color: #357ABD;
  }

  .medium {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  .full-width {
    width: 100%;
  }

  /* Add more variants and sizes as needed */
</style>
