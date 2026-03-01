---
author: Cameron Yee-Ping
pubDatetime: 2024-12-10
title: "NutriPath: Budget-Friendly Nutrition Tracker"
postSlug: nutripath-android
featured: false
draft: false
tags:
  - Android
  - Kotlin
  - Google Maps API
  - Mobile Development
description: "An Android application designed to help users maintain a healthy lifestyle and diet without exceeding their financial budget."
---

## Project Overview

NutriPath is an Android application developed as a final project for CMPT 362. It addresses the common challenge of maintaining a healthy diet on a limited budget. Since healthier food choices can often be more expensive, this app provides tools to help users balance their nutritional needs with their financial constraints through data-driven tracking and local resource discovery.
<div style="display: flex; gap: 10px; justify-content: center;">
  <img src="/nutripath/image.png" width="45%" alt="Home Screen" />
  <img src="/nutripath/dashboard.png" width="45%" alt="Dashboard view" />
</div>

## Technical Accomplishments

### 1. Robust Android Architecture
The application is built using the **MVVM (Model-View-ViewModel)** pattern to ensure a clean separation of concerns and a responsive user interface.
* **Navigation Management:** Implemented the Android Navigation Component with a `BottomNavigationView` to handle seamless transitions between the Home Menu, Dashboard, Map, and Notifications.
* **Lifecycle Awareness:** Utilized `AddOnDestinationChangedListener` to dynamically manage UI elements, such as hiding the navigation bar in specific sub-menus like the Profile view.
* **Local Persistence:** Integrated a local database system (Room) to track food consumption, notifications, and user statistics.

### 2. Location-Based Services
To help users find affordable healthy food, I integrated the **Google Maps SDK**.
* **Store Tracking:** Utilized the Google Maps API for real-time location tracking and mapping nearby grocery stores.
* **Permission Handling:** Implemented robust runtime permission checks for location services and background tracking to ensure user privacy and app stability.

### 3. Multi-Source Nutrition Integration
The app serves as a centralized hub for nutritional data by integrating several external REST APIs:
* **Edamam & TheMealDB:** Used to fetch diverse recipe ideas and detailed macronutrient information.
* **OpenFoodFacts:** Integrated for product-specific data, enabling users to understand exactly what is in the items they buy.
* **Barcode Scanning:** Developed a custom `BarcodeScannerActivity` to allow users to quickly log food items by scanning physical labels.

### 4. Smart Reminders & Notifications
To encourage consistent logging, the app features a custom notification system.
* **Notification Channels:** Created a high-priority "Reminder Channel" compatible with Android O and above to handle scheduled alerts.
* **Permission Logic:** Developed logic to request `POST_NOTIFICATIONS` permissions on newer Android versions (Tiramisu+) to ensure compliance with modern security standards.

## Key Features
* **Financial & Caloric Dashboard:** A unified view to track daily spending alongside nutritional intake.
* **Interactive Mapping:** Find the best places to shop for healthy ingredients based on your current location.
* **Profile Customization:** Personalized setup to tailor budget and calorie goals to individual user needs.

## Tech Stack
* **Language:** Kotlin
* **UI:** Jetpack Compose / XML with Data Binding
* **APIs:** Google Maps SDK, Edamam, TheMealDB, OpenFoodFacts
* **Database:** SQLite / Room