<template>
  <Teleport to="body">
    <div v-if="isOpen" class="backdrop" @click="closeModal" />
    <transition name="dialog">
      <dialog v-if="isOpen" open>
        <header>
          <slot name="header"></slot>
        </header>
        <main>
          <slot></slot>
          <hr />
        </main>
        <footer class="p-3 text-end">
          <slot name="footer"></slot>
        </footer>
      </dialog>
    </transition>
  </Teleport>
</template>

<script>
export default {
  props: ["isOpen"],
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
dialog {
  position: fixed;
  top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
  width: 400px;
  height: 200px;
  padding: 0;
  border: 1px solid #333;
  border-radius: 1em;
  transform: translateY(-50%);
  overflow: hidden;
  header {
    padding: 1em;
    background: var(--first-color);
    color: #fff;
  }
  main {
    flex: 3 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #333333af;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-50%);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1) translateY(-50%);
}
</style>
