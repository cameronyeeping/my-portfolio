---
author: Cameron
pubDatetime: 2025-12-15
title: "Multi-Class Fake News Detection with BERT and LLMs"
postSlug: fake-news-detection
featured: false
draft: false
tags:
  - NLP
  - Deep Learning
  - LLMs
  - Classification
description: "A comparative analysis of TF-IDF, BERT, and Llama-3.2 using ORPO for 6-way fake news classification on the LIAR-Plus dataset."
---

## Project Overview

For my CMPT 413 Final Project, my team and I tackled the challenge of **Multi-Class Fake News Detection**. Rather than relying on a simple binary (true/false) classification, we classified political statements into six granular categories of truthfulness: *pants-fire, false, barely-true, half-true, mostly-true,* and *true*. 

Real-world claims rarely fall into absolute true or false categories. By utilizing a 6-way classification system, we were able to capture the spectrum of misinformation, study linguistic patterns across varying levels of veracity, and provide more nuanced, actionable feedback for automated fact-checking systems.

## The Dataset

We utilized the **LIAR-Plus** dataset, which consists of manually fact-checked political statements sourced from PolitiFact.com. 
* **Size:** ~22,900 statements (split into ~18k training, 2.3k validation, and 2.3k test samples).
* **Imbalance Handling:** The dataset is naturally imbalanced (e.g., "false" statements make up ~28% of the training set, while "true" makes up ~11%). To evaluate fairly, we heavily relied on Macro-averaged F1 scores alongside standard accuracy.

## Approach & Model Architectures

We designed an experiment to compare three models of increasing sophistication to see which features—TF-IDF, contextual embeddings, or LLM reasoning—best distinguish truthfulness.

### 1. The Baseline: Logistic Regression + TF-IDF
* **Architecture:** Bag-of-words using TF-IDF vectorization (unigrams and bigrams, limited to 10,000 features).
* **Classifier:** Multi-class logistic regression with balanced class weights.
* **Goal:** Test whether simple, surface-level linguistic features can adequately capture truthfulness patterns.

### 2. BERT Fine-Tuning
* **Architecture:** `bert-base-uncased` (110M parameters) fine-tuned with a 6-way classification head.
* **Goal:** Leverage BERT's contextual embeddings to capture semantic nuances and context-dependent meanings that traditional TF-IDF misses.

### 3. LLM with ORPO (Odds Ratio Preference Optimization)
* **Architecture:** `Llama-3.2-1B-Instruct` fine-tuned via LoRA (Low-Rank Adaptation) in 4-bit quantization for memory efficiency.
* **Training Method:** We used **ORPO**, a preference-based contrastive learning method. The model learns from pairs of chosen and rejected responses, encouraging it to assign high probability to correct labels and penalize plausible but incorrect ones.
* **Goal:** Determine if a Large Language Model's vast pre-trained reasoning capabilities can be aligned specifically to fact-checking tasks.

## Results & Evaluation

We evaluated the models on the held-out test set using both the 6-way classification task and a simplified binary (False vs. True) task. 

### 6-Way Classification Results
| Model | Accuracy | F1 Score (Macro) |
| :--- | :--- | :--- |
| **Baseline (LR + TF-IDF)** | 32.10% | 31.32% |
| **BERT Fine-Tuned** | 34.36% | 31.79% |
| **Llama-3.2-1B (ORPO)** | 33.41% | 23.05% |

### Binary Classification Results (False vs. True)
| Model | Accuracy | F1 Score |
| :--- | :--- | :--- |
| **Baseline (LR + TF-IDF)** | 67.64% | 64.23% |
| **BERT Fine-Tuned** | 70.73% | 66.13% |
| **Llama-3.2-1B (ORPO)** | **74.87%** | **80.85%** |

## Key Takeaways

1. **Nuance is Difficult:** The 6-way classification proved highly challenging across all architectures. Distinguishing between adjacent classes like "barely-true" and "half-true" is contextually demanding, resulting in lower metrics across the board compared to binary classification.
2. **Context Matters:** BERT out-performed the TF-IDF baseline in the 6-way task, proving that contextual embeddings are superior to surface-level word frequencies for detecting subtle misinformation.
3. **LLMs Excel at Binary Logic:** While the LLM struggled with the granular 6-way F1 score, it significantly outperformed both BERT and the baseline on the Binary Classification task (achieving a massive 80.85% F1 score). This suggests that while ORPO preference-tuning makes the LLM highly decisive on absolute truths and falsehoods, further alignment is needed for nuanced, multi-class truth spectrums.