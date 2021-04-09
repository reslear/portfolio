<template>
  <div id="app">
    <main class="wrap">
      <nav-bar></nav-bar>

      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </main>
    <footer class="footer">
      <a
        href="https://github.com/reslear/portfolio/tree/master/currency-converter"
        target="_blank"
        class="link"
        >open source</a
      >
      <span class="text">by ReSLeaR-</span>
    </footer>

    <svg style="display: none;">
      <symbol id="star" viewBox="0 0 12 12">
        <path
          d="M11.73 5.11a.84.84 0 00.21-.86.84.84 0 00-.68-.57l-2.84-.42a.37.37 0 01-.28-.2L6.87.48A.84.84 0 006.1.01a.84.84 0 00-.75.47L4.08 3.06a.37.37 0 01-.28.2l-2.84.42a.84.84 0 00-.68.57c-.1.3-.02.64.21.86l2.06 2.01c.09.09.13.2.1.33l-.48 2.83c-.04.25.02.5.18.69.25.3.7.38 1.04.2l2.55-1.34c.1-.05.24-.05.34 0l2.55 1.34a.83.83 0 001.04-.2c.16-.2.22-.44.18-.69l-.49-2.83a.37.37 0 01.11-.33l2.06-2z"
        />
      </symbol>
    </svg>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: { NavBar }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
}

body::-webkit-scrollbar-track-piece {
  display: none;
}

:root {
  --text-color-black: #1f263a;
  --text-color-gray: #a7adc6;
}

* {
  padding: 0;
  margin: 0;
}

html,
body {
  height: 100%;
}

body {
  background: #f5f7fb;
  margin: 0;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

hr {
  background: #c3ccdf;
  border: 0;
  height: 1px;
}

#app {
  margin: 0 auto;
  width: 680px;
  padding: 0 16px;
  box-sizing: border-box;
}

@media (max-width: 680px) {
  #app {
    width: 100%;
  }
}

.content {
  background: #fff;
  box-shadow: 0 13px 77px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.flag {
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.7;
}

.footer {
  padding: 16px 0;
  text-align: center;
}
.footer > * {
  font-size: 12px;
}

a.link {
  color: var(--text-color-gray);
}
a.link:hover {
  text-decoration: none;
}
.footer .text {
  margin-left: 16px;
  color: var(--text-color-gray);
}
</style>
