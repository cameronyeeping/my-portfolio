---
author: Cameron Yee-Ping
pubDatetime: 2025-12-21T15:20:35Z
title: "Capstone Project: Real-Time 3D Point Cloud Editing & Rendering"
featured: true
draft: false
tags:
  - Deep Learning
  - Computer Vision
  - Computer Graphics
description:
  Proximity Attention Points Rendering (PAPR)
---
## Project Overview

This capstone project focuses on enhancing the **PAPR (Proximity Attention Point Rendering)** framework by 
reimplementing it to fit natively into the **Nerfstudio** framework. By refactoring PAPR to align with Nerfstudio's 
modular architecture, we enabled better integration with standardized NeRF pipelines and developed an interactive 3D 
editor to manipulate point primitives in real-time.

![Training outputs](/main_plots_245000.png)
_Figure 1: Model plots generated during training_
![output gif](/papr_animation.gif)
_Figure 2: A Point cloud visualization generated during training_
## Technical Accomplishments

### 1. Nerfstudio Framework Reimplementation
* **Architectural Refactoring:** Reimplemented the core PAPR model to adhere to Nerfstudio’s `Model` and `Pipeline` configurations, ensuring compatibility with its training loops and visualization ecosystem.
* **Device Management:** Resolved critical tensor device issues within the modular framework by optimizing the instantiation of the `PAPRField` object to ensure consistent GPU acceleration.

### 2. Interactive 3D Point Cloud Editor
We developed a production-ready 3D editor integrated into the **Nerfstudio** viewer, specifically designed for PAPR point primitives.

* **Geometric Projections:** Implemented camera-space projection to map 2D screen coordinates from a rectangular selection to 3D point positions.
* **Architecture:** Structured the editor into three core modules: `SelectionUtils` (geometric logic), `SelectionPointRendering` (visualization), and `SelectionUI` (interaction coordination).
* **Cross-Version Compatibility:** Developed dual rendering paths to support both legacy Viser (0.2.7) and modern Viser (1.0+) APIs, utilizing direct property mutation and remove-recreate patterns where necessary.
* **Gizmo Integration:** Added an interactive gizmo interface allowing for real-time translation and transformation of selected point groups with immediate visual feedback.

### 3. High-Performance Rendering & Optimization
To improve the scalability of PAPR, we focused on hardware-accelerated implementations:

* **PAPR-CUDA:** Developed and benchmarked a custom CUDA implementation against naive baselines, resulting in significant performance gains for point-based rendering tasks.
* **WebGPU Client-Side Rendering:** Targeted browser-based execution using `webgpu-torch`. This involved writing a custom **Squaremax kernel** and optimizing the client-side rendering pipeline to handle the large number of kernels required by the PAPR model.
* **Profiling:** Conducted deep-dive analysis using Chrome GPU profiling to measure kernel execution times and identify bottlenecks in WebGPU-based model loading.

### 4. Model Training & Refinement
We addressed several challenges in the original training pipeline to improve output quality and training stability:

* **Numerical Stability:** Mitigated "NaN" value issues at high iterations by implementing fast-forward scheduling, zero-gradient evaluation steps, and fine-tuning learning rate schedulers.
* **Depth Map Integration:** Updated the model architecture to output high-fidelity depth maps alongside standard RGB, implementing clamping logic to fix visual artifacts in depth rendering.
* **Resource Management:** Optimized CPU and RAM usage by refactoring loss-plotting logic, shifting monitoring to Tensorboard to prevent memory overflows during long training sessions.

## Results
The finalized system allows users to load a pre-trained PAPR model, interactively edit the scene in 3D (e.g., the Lego dataset), and render the results with optimized performance across both local GPU and browser environments.
## Tech Stack
* **Languages:** Python, CUDA, TypeScript
* **Frameworks:** PyTorch, Nerfstudio
* **Tools:** Git, LaTeX, Linux
