# GitHub Pages for Suramya

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Anyone can open https://vinitingle.github.io/suramya/ and see the current shop homepage without running Vite locally.

**Architecture:** GitHub Actions builds `dist/` with Vite `base: '/suramya/'` (CI only), uploads it as a Pages artifact, and `actions/deploy-pages` publishes it. Local `npm run dev` keeps `base: '/'`.

**Tech Stack:** Vite, GitHub Actions `deploy-pages`, Vitest.

## Global Constraints

- Publish only from `main`.
- Local preview stays at `/`.
- No extra hosting npm packages.
- No custom domain, tunnels, or contact-form backend.

See the approved Cursor plan for file-level steps.
