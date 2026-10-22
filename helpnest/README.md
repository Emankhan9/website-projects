# HelpNest — Frontend Showcase

HelpNest is a platform for finding and booking verified household helpers (cleaning, cooking, babysitting, elder care, drivers and more), with separate dashboards for **users**, **housekeepers** and **admins**.

This repository is a **static HTML version** of the HelpNest frontend, made so the UI can be browsed on GitHub Pages. The original app is built with **PHP + MySQL**. Every page here was rendered from that PHP code with sample data, so it looks and behaves like the real app, but nothing is saved to a server.

## Live demo

Turn on GitHub Pages for this repo (Settings → Pages → Deploy from branch → `main` / root). The site opens at `index.html`.

Use the **Demo views** button (bottom-right of every page) to switch between the four parts of the app:

| Area | Start page |
|---|---|
| Public site | `index.html` |
| User dashboard | `user/dashboard/user-dashboard.html` |
| Housekeeper dashboard | `housekeeper/dashboard/housekeeper-dashboard.html` |
| Admin panel | `admin/dashboard.html` |

## What works in the static demo

- All pages, layouts, sidebars, tabs and status filters (each filter is its own pre-rendered page)
- Category browsing and search on the helpers page (filtered in the browser)
- Login, register, OTP and password-reset screens walk through their flow (login → dashboard)
- Chat shows a sample conversation, and you can type new messages (they aren't saved)
- Forms that would change data (book, cancel, review, verify, block…) show a "static demo" notice instead

## Pages

- **Public:** home, about, contact, explore, helpers list, helper profile, book a helper
- **Auth:** login, register, verify OTP, forgot / reset password (user and admin)
- **User:** dashboard, bookings, payments, reviews, disputes, notifications, messages, chat, profile, settings
- **Housekeeper:** dashboard, requests, tasks, earnings, reviews, disputes, notifications, messages, chat, profile, settings
- **Admin:** dashboard, users, housekeepers, bookings, payments, disputes, dispute detail, contact messages, reply, settings

## Tech

HTML, CSS, JavaScript, Font Awesome, Google Fonts, SweetAlert2 and Leaflet. The original backend uses PHP (PDO), MySQL and PHPMailer.

All names, phone numbers and emails in this demo are made up.
