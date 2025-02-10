<script setup>
import { ref, onMounted } from "vue";

// Theme mode state
const isDarkMode = ref(true);
const audio = ref(null);
const audioSrc = ref(""); // ✅ Make audio URL reactive

// Fetch MP3 URL from the serverless function
const fetchAudioSource = async () => {
  try {
    const response = await fetch("/api/audio");
    const data = await response.json();
    audioSrc.value = data.audioSource;
    console.log("🎵 Loaded audio source:", audioSrc.value);
  } catch (error) {
    console.error("❌ Failed to fetch audio source:", error);
  }
};

// Function to toggle dark/light mode
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.setAttribute("data-bs-theme", isDarkMode.value ? "dark" : "light");
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
};

// Function to play/pause the audio
const toggleAudio = () => {
  if (audio.value.paused) {
    audio.value.play();
  } else {
    audio.value.pause();
  }
};

// Load user's theme preference & fetch audio URL on mount
onMounted(() => {
  fetchAudioSource(); // ✅ Call function here
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
    <div class="sidebar p-3" :class="isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'">
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

      <!-- 🎵 Music Play Button -->
      <div class="mt-3">
        <button class="btn w-100 btn-primary" @click="toggleAudio" :disabled="!audioSrc">
          🎶 {{ audio && audio.paused ? "Play Music" : "Pause Music" }}
        </button>
        <!-- Hidden Audio Element (Only renders when audioSrc is available) -->
        <audio ref="audio" :src="audioSrc" v-if="audioSrc"></audio>
      </div>

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
