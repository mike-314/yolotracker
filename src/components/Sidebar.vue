<script setup>
import { ref, onMounted } from "vue";

// State for theme mode
const isDarkMode = ref(true);

// Function to toggle dark/light mode
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;

  // Change Bootstrap theme
  document.body.setAttribute("data-bs-theme", isDarkMode.value ? "dark" : "light");

  // Store user preference
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
};

// Load user's theme preference on mount
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDarkMode.value = savedTheme === "dark";
    document.body.setAttribute("data-bs-theme", savedTheme);
  }
});
</script>

<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <div
      class="sidebar p-3"
      :class="isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'"
    >
      <h3>Menu</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/track" class="nav-link" :class="isDarkMode ? 'text-white' : 'text-dark'">
            📊 Track
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" :class="isDarkMode ? 'text-white' : 'text-dark'">
            ℹ️ About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/feedback" class="nav-link" :class="isDarkMode ? 'text-white' : 'text-dark'">
            📩 Feedback
          </router-link>
        </li>
      </ul>

      <!-- Dark Mode Toggle Button -->
      <div class="mt-3">
        <button class="btn w-100" :class="isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'" @click="toggleTheme">
          {{ isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode" }}
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
/* Sidebar styling */
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 20px;
}

.content {
  margin-left: 260px;
  width: 100%;
}
</style>
