<template>
  <div class="loading">
    <div class="loader" />
    <p>processing...</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 50vh;
  left: calc(50% - 35px);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  .loader {
    width: 70px;
    height: 70px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    animation: around-the-world 3s linear infinite both;
    &::before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 0;
      background: #fff;
      border-radius: 50%;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: calc(50% - 5px);
      width: 10px;
      height: 10px;
      background: rgba(0, 0, 0, 0.521);
      border-radius: 50%;
    }
  }
  p {
    margin-top: 0.5em;
    color: rgba(0, 0, 0, 0.5);
    font-weight: bold;
    text-transform: capitalize;
  }
  @keyframes around-the-world {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
