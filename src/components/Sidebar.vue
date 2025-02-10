<script setup>
import { ref, onMounted } from "vue";

const audioSrc = ref(""); // MP3 URL
const audio = ref(null); // Audio element

// Fetch MP3 URL from the Azure Function
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

// Play/Pause Audio
const toggleAudio = () => {
  if (audio.value.paused) {
    audio.value.play();
  } else {
    audio.value.pause();
  }
};

onMounted(fetchAudioSource);
</script>

<template>
  <div class="d-flex">
    <div class="sidebar p-3">
      <h3>Menu</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/track" class="nav-link">📊 Track</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">ℹ️ About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/feedback" class="nav-link">📩 Feedback</router-link>
        </li>
      </ul>

      <!-- 🎶 Music Play Button -->
      <div class="mt-3">
        <button class="btn w-100 btn-primary" @click="toggleAudio">
          🎵 {{ audio && audio.paused ? "Play Music" : "Pause Music" }}
        </button>
        <!-- Hidden Audio Element -->
        <audio ref="audio" :src="audioSrc"></audio>
      </div>
    </div>

    <div class="content p-4">
      <router-view></router-view>
    </div>
  </div>
</template>
