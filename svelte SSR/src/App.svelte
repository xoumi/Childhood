<script>
import Component from './Component.svelte';
export let name;
</script>

<main>
<!-- My Comment -->
	<h1>Root Component</h1>
  <Component {name} />
</main>