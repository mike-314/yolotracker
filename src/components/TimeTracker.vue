<script setup>
import { ref, computed } from "vue";

// Reactive state
const timeElapsed = ref(0); // Time in seconds
const isTracking = ref(false); // Is the timer active
const showSummary = ref(false); // Show summary after clicking "No"
const message = ref(""); // Random motivational message

// Timer interval reference
let timerInterval = null;

// Random motivational messages
const messages = [
  "Good job! Keep at it!",
  "You're doing great!",
  "Stay focused and keep going!",
  "Awesome work, keep it up!",
  "You're crushing it!"
];

// Start timer function
const startTracking = () => {
  reset(); // Ensure everything is reset before starting
  isTracking.value = true;
  timerInterval = setInterval(() => {
    timeElapsed.value++;
  }, 1000);
};

// Stop tracking (No button clicked)
const stopTracking = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  isTracking.value = false;
  showSummary.value = true;
};

// Reset to initial state
const reset = () => {
  timeElapsed.value = 0;
  isTracking.value = false;
  showSummary.value = false;
  message.value = "";
  clearInterval(timerInterval);
  timerInterval = null;
};

// Handle "Yes" (still working)
const stillWorking = () => {
  message.value = messages[Math.floor(Math.random() * messages.length)];
};

// Display time in a nice format (MM:SS)
const formattedTime = computed(() => {
  const minutes = Math.floor(timeElapsed.value / 60).toString().padStart(2, "0");
  const seconds = (timeElapsed.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});
</script>

<template>
  <div class="container text-center mt-5">
    <h3 class="text-primary">Time Tracker</h3>
    <p class="text-muted">Track the time you've been working!</p>

    <!-- Display elapsed time -->
    <div class="display-4 my-3">{{ formattedTime }}</div>

    <!-- Start Button -->
    <button v-if="!isTracking && !showSummary" class="btn btn-success btn-lg" @click="startTracking">
      Start
    </button>

    <!-- Are you still working? -->
    <div v-if="isTracking && !showSummary" class="mt-3">
      <h5 class="text-warning">Are you still working?</h5>
      <button class="btn btn-primary me-2" @click="stillWorking">Yes</button>
      <button class="btn btn-danger" @click="stopTracking">No</button>
    </div>

    <!-- Motivational Message -->
    <div v-if="message && isTracking" class="mt-4 alert alert-info">
      {{ message }}
    </div>

    <!-- Summary State -->
    <div v-if="showSummary" class="mt-4">
      <h4 class="text-success">Awesome! You were working for {{ formattedTime }}.</h4>
      <p>Want to try again?</p>
      <button class="btn btn-secondary" @click="reset">Try Again</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>
