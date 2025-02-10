<script setup>
import { ref, onMounted } from "vue";

const audioSrc = ref(""); // Audio URL from API
const audio = ref(null); // Audio element reference
const isPlaying = ref(false); // ✅ Track whether audio is playing

// Fetch the MP3 URL from the API
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

// Play/Pause the Audio
const toggleAudio = () => {
  if (!audio.value) return;

  if (audio.value.paused) {
    audio.value.play();
    isPlaying.value = true;
  } else {
    audio.value.pause();
    isPlaying.value = false;
  }
};

onMounted(fetchAudioSource);
</script>

<template>
  <div class="mt-3">
    <button class="btn w-100 btn-primary" @click="toggleAudio" :disabled="!audioSrc">
      🎶 {{ isPlaying ? "Pause Music" : "Play Music" }}
    </button>
    <audio ref="audio" :src="audioSrc" v-if="audioSrc"></audio>
  </div>
</template>
