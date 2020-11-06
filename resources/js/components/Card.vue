<template>
  <div class="card">
    <div class="card-header">
      <template v-if="title">{{ title }}</template>
      <slot name="header"></slot>
    </div>

    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: { type: String, default: '' }
  }
}
</script>
