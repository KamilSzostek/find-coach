<template>
  <div class="text-center">
    <h2 class="fs-1">
      Ups, something went wrong. <br /><br /><span class="fs-3">
        Do you want go to
        <RouterLink class="text-primary" to="/coaches">
          All Coaches</RouterLink
        >?
      </span>
    </h2>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: underline;
}
</style>
