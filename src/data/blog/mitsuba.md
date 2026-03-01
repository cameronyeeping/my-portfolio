---
author: Cameron Yee-Ping
pubDatetime: 2025-04-15
title: "Volumetric Caustics: Path Tracing & G-Buffer Denoising"
postSlug: volumetric-caustics-renderer
featured: true
draft: false
tags:
  - Computer Graphics
  - C++
  - Mitsuba 3
  - Physically Based Rendering
  - Research
description: "Developing custom phase functions and a G-buffer aware denoising pipeline to simulate complex volumetric caustic effects in Mitsuba 3."
---

## Project Overview

Inspired by the Stanford CS 384B Rendering Competition, this project focuses on the simulation of **Volumetric Caustics**—the complex light patterns formed when light is refracted by a surface and subsequently scattered within a participating medium. Utilizing the **Mitsuba 3** research engine, I implemented custom scattering models and developed a denoising pipeline specifically designed to handle the high levels of noise inherent in volumetric path tracing.
  <img src="/render-comp/renders.png" width="45%" alt="renders.png" />
  <img src="/render-comp/experiments.png" width="45%" alt="Dashboard view" />
</div>

## Technical Accomplishments

### 1. Custom Phase Function Plugins (C++)
To accurately model how light interacts with particles in a medium (like fog or water), I developed and integrated two custom C++ plugins for the Mitsuba 3 ecosystem:
* **Double Henyey-Greenstein (DHG):** Implemented the DHG model to support complex scattering profiles, allowing for the independent control of forward and backward scattering peaks.
* **Schlick Approximation:** Developed a computationally efficient alternative to the standard Henyey-Greenstein function, optimized for high-performance rendering loops while maintaining visual fidelity.

### 2. Volumetric Caustics & Scene Modeling
* **Caustic Simulation:** Focused on the interaction between dielectric materials (tinted glass) and participating media to produce physically accurate volumetric caustics.
* **XML Scene Architecture:** Due to limitations in existing Blender-to-Mitsuba exporters regarding participating media, I manually architected XML scene files to define heterogeneous volumes and complex material interfaces.
* **Media Optimization:** Tuned absorption and scattering coefficients to balance visual "glow" and caustic sharpness against rendering time.

### 3. G-Buffer Aware Denoising
Volumetric path tracers are notoriously noisy. I developed a denoising pipeline that goes beyond standard spatial filters:
* **Feature-Based Denoising:** Implemented an "Extra" denoising mode that utilizes **Albedo** and **Normal** G-buffer information to preserve edge details and material textures while smoothing out volumetric noise.
* **Noise Analysis:** Investigated the "salt and pepper" noise patterns specific to Mitsuba 3’s volumetric path tracer, conducting depth and Samples Per Pixel (SPP) testing to find the optimal convergence point for complex scenes.

### 4. Benchmarking & Debugging
* **Performance Profiling:** Built a benchmarking suite (`debug_vol