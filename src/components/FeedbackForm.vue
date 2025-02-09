<template>
    <div class="feedback-form">
      <h2>Send us your feedback</h2>
      <textarea v-model="feedback" placeholder="Write your feedback here..." />
      <button @click="submitFeedback">Submit</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        feedback: "",
        message: ""
      };
    },
    methods: {
      async submitFeedback() {
        if (!this.feedback) {
          this.message = "Please enter your feedback!";
          return;
        }
  
        try {
          const response = await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ feedback: this.feedback }),
          });
  
          const data = await response.json();
          this.message = data.message;
          this.feedback = ""; // Clear input field
        } catch (error) {
          console.error("Error submitting feedback:", error);
          this.message = "Failed to send feedback.";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .feedback-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
  }
  textarea {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
  }
  button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  </style>
  