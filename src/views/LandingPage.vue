<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const entries = [
  {
    id: 'unity-build',
    img: '/hit-img.png',
    title: 'hit-title.png',
    sub: '(填入這個系列的特點)'
  },
  {
    id: 'unity-build-2',
    img: '/eas-img.png',
    title: 'eas-title.png',
    sub: '(填入這個系列的特點)'
  },
];

function enter(id: string) {
  router.push({ name: 'unity', params: { buildId: id } });
}
</script>

<template>
  <div class="landing">

    <!-- Header -->
    <header class="landing-header">
      <div class="brand">
        <img class="brand-title" src="/title.png" alt="title">
        <img class="brand-sub-title" src="/sub-title.png" alt="sub-title">
      </div>    
    </header>

    <!-- Entry Cards -->
    <main class="entries">
      <button
        v-for="entry in entries"
        :key="entry.id"
        class="entry-card"
        @click="enter(entry.id)"
      >
        <div class="card-bg"></div>
        <div class="card-content">   
          <img class="card-img" :src="entry.img" alt="">
          <img class="card-title" :src="entry.title" alt="">
          <div class="card-sub">{{ entry.sub }}</div>
        </div>
        <div class="card-enter">
          <img src="/cursor.svg" alt="cursor">
          <div class="card-enter-label">點擊進入</div>
        </div>
      </button>
      
    </main>

  </div>
</template>

<style scoped>
.landing {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: url('/bg.png') center center / cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

/* ── Header ─────────────────────────────────────── */
.landing-header {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: calc(60px / 2880px * 100vw) 0 calc(200px / 2880px * 100vw) 0;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(60px / 2880px * 100vw);
}

.brand-title {
  width: calc(1141px / 2880px * 100vw);
}

.brand-sub-title {
  width: calc(730px / 2880px * 100vw);
}

/* ── Entry Cards ─────────────────────────────────── */
.entries {
  position: relative;
  z-index: 1;
  display: flex;
  gap: calc(570px / 2880px * 100vw);
  width: 100%;
  flex: 1;
  justify-content: center;
}

.entry-card {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
  color: #fff;
  width: calc(700px / 2880px * 100vw);
  height: calc(700px / 2880px * 100vw);
  background: transparent;
  transition: opacity 3s ease;
}

.card-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #F9F8F8;
  border-radius: calc(40px / 2880px * 100vw);
  box-shadow: 0px 0px calc(16px / 2880px * 100vw) 0px #00000033;
  transform: rotate(45deg);
  width: calc(700px / 2880px * 100vw);
  height: calc(700px / 2880px * 100vw);
}

.card-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(0deg, rgba(159, 159, 159, 0.2), rgba(159, 159, 159, 0.2));
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.entry-card:active .card-img{
  opacity: 0.3;
}
.entry-card:active .card-bg::after {
  opacity: 1;
}

.card-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-img {
  width: auto;
  height:calc(565px / 2880px * 100vw);
  transition: opacity 3s ease;
}

.card-title {
  width: calc(250px / 2880px * 100vw);
  height:auto;
  position: absolute;
}

.card-sub {
  font-size: calc(64px / 2880px * 100vw);
  position: absolute;
  -webkit-text-stroke: 1px #000000;
  text-shadow: 0px 0px calc(16px / 2880px * 100vw) #00000066;
  bottom: calc(105px / 2880px * 100vw);
}

.card-enter {
  position: absolute;
  bottom: calc(-230px / 2880px * 100vw);
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(12px / 2880px * 100vw);
  pointer-events: none;
}

.card-enter img {
  width: calc(48px / 2880px * 100vw);
  height: auto;
  animation: float 3s ease-in-out infinite;
}

.card-enter-label {
  font-size: calc(36px / 2880px * 100vw);
  font-weight: 400;
  color: #595757;
}

</style>
