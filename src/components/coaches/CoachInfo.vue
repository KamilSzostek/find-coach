<template>
  <div>
    <h3>{{ firstName }} {{ lastName }}</h3>
    <p>${{ hourlyRate }}/hour</p>
  </div>
</template>

<script>
export default {
  props: ["firstName", "lastName", "hourlyRate"],
};
</script>
