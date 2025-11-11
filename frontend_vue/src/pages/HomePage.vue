<template>
  <div class="home-page">
    <div class="hero">
      <h1>Welcome to SMM Test</h1>
      <p>Full Stack Developer Application</p>
      <div class="features">
        <div class="feature-card">
          <h3>Vue 3</h3>
          <p>Modern reactive frontend with Composition API</p>
        </div>
        <div class="feature-card">
          <h3>Express.js</h3>
          <p>RESTful API with JWT authentication</p>
        </div>
        <div class="feature-card">
          <h3>Laravel</h3>
          <p>Elegant backend with pagination support</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
}

.hero {
  text-align: center;
  max-width: 800px;
}

.hero h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .features {
    grid-template-columns: 1fr;
  }
}
</style>
