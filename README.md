# 🚗 Parking Management System – Microfrontend Architecture (React + Rspack + Tailwind)

This project is a Parking Management System built with **Module Federation** using **React 18/19**, **Rspack**, **Tailwind CSS**, and **pnpm**.

### 📁 Microfrontends Structure


---

## 🧑‍💻 Tech Stack

- ⚛️ React 18/19
- 🎯 Rspack (Webpack Alternative)
- 🎨 Tailwind CSS
- 📦 pnpm
- 🔗 Module Federation (via `@module-federation/enhanced`)

---

## 🚀 Quick Start (for each app)

> ⚠️ Requires `pnpm` installed globally.

1. **Install dependencies in all apps:**

```bash
pnpm install -r
cd host && pnpm install
cd ../admin && pnpm install
cd ../org && pnpm install
cd ../user && pnpm install
# Terminal 1 - Host App
cd host
pnpm start

# Terminal 2 - Admin App
cd admin
pnpm start

# Terminal 3 - Org App
cd org
pnpm start

# Terminal 4 - User App
cd user
pnpm start

http://localhost:3000
