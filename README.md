# 🛒 React Shopping Cart Application - Amazon Gaming Store

A modern, responsive, and feature-packed **React Shopping Cart Application** built with **React**, **Context API**, and **Tailwind CSS**, inspired by Amazon's gaming desktop store design and the reference website ([https://startling-beijinho-72802b.netlify.app/](https://startling-beijinho-72802b.netlify.app/)).

---

## 🌟 Key Features & Requirements

### 1. Core Functionality
- 🖥️ **Product Catalog**: Clean, interactive grid & list view displaying pre-built gaming PCs with real-time responsive filtering.
- 🔍 **Product Details**: Complete specifications including CPU, GPU, RAM, NVMe Storage, Power Supply, OS, Customer Ratings (★), Reviews count, Stock levels, and Delivery Date.
- 🛒 **Cart Operations**:
  - **Single-Click Add to Cart**: Add products instantly with dynamic toast feedback and button animations.
  - **Dynamic Quantity Stepper**: Seamlessly increment (`+`) or decrement (`-`) item quantities with minimum protection (`qty >= 1`).
  - **Remove Item**: Delete individual products from the cart.
  - **Clear Entire Cart**: One-click cart reset with safety confirmation dialog.
  - **Persistent Storage**: All cart items automatically sync with `localStorage` (key: `Cart Products`) to persist across page refreshes.
- 📊 **Real-Time Cart Summary**: Instant subtotal calculation, item count badge updates, dynamic promo code discounts, and tax/shipping breakdown.
- 🎟️ **Promo Code Discount System**:
  - `OSTAD10` or `ostad10`: **10% OFF**
  - `OSTAD5` or `ostad5`: **5% OFF**
  - `GAMING20`: **20% OFF**
  - `WELCOME15`: **15% OFF**
- 🛍️ **Dual Cart Experience**:
  - **Slide-Over Cart Drawer**: Quick slide-in sidebar on the right when clicking the Navbar cart badge.
  - **Dedicated Cart Page (`/mycart`)**: Full-width table view with IMAGE, PRODUCT, UNIT PRICE, QUANTITY, TOTAL, and REMOVE columns matching the reference site.
- 🔎 **Real-Time Search & Multi-Filter Sidebar**:
  - Search by brand, CPU, GPU, RAM, or PC model name.
  - Filter by Processor (Intel Core i5/i7/i9, AMD Ryzen 5/7/9).
  - Filter by RAM size (8GB, 16GB, 32GB).
  - Filter by Graphics Card (RTX 4070, RTX 4060, RTX 3070, GTX 16 Series, AMD Radeon).
  - Interactive Price Range slider ($600 - $2500) and preset chips.
  - Star ratings filter (4.5★ & up, 4.0★ & up, etc.).
- 🚀 **Quick View Modal & Checkout Experience**:
  - Detailed product specs popup modal.
  - Interactive Checkout Modal with shipping address form, payment method selector (COD, Card, bKash), and celebration confetti animation upon placing order!

---

## 🏗️ Project Architecture & Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Amazon dark branding, search bar, category dropdown, live cart badge
│   ├── HeroBanner.jsx      # Promo code highlight, gaming desktop banner & trust badges
│   ├── FilterSidebar.jsx   # Multi-attribute filter (Price, CPU, GPU, RAM, Rating)
│   ├── ProductCard.jsx     # Responsive product card with Grid/List layout & Add to Cart
│   ├── ProductGrid.jsx     # Results grid, sorting selector & empty state
│   ├── CartDrawer.jsx      # Slide-over cart sidebar with quick checkout link
│   ├── Cart.jsx            # Dedicated full cart table, promo coupon input & order summary
│   ├── ProductModal.jsx    # Quick view specs modal
│   ├── CheckoutModal.jsx   # Checkout simulation modal with confetti & order confirmation
│   ├── Toast.jsx           # Global animated notification toast alerts
│   └── Footer.jsx          # Multi-column footer with back-to-top button & copyright
├── context/
│   └── CartContext.jsx     # Centralized React Context API for global cart & state management
├── data/
│   └── products.js         # Comprehensive product catalog data & promo codes
├── hooks/
│   ├── useCart.js          # Custom hook for easy CartContext access
│   ├── useLocalStorage.js  # Custom hook for localStorage sync
│   └── useProducts.js      # Custom hook for fetching products data
├── App.jsx                 # Main application layout & view routing
├── main.jsx                # Entry point
└── index.css               # Global styles, Tailwind CSS, typography & animations
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm`

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd "React Shopping Cart Application"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🎨 Technologies Used

- **React 19**
- **Vite 8**
- **Tailwind CSS v4**
- **React Context API & Hooks** (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`)
- **Lucide React Icons**
- **Canvas Confetti**

---

## 📄 License & Attribution
Developed for the **Ostad React Shopping Cart Application** Assignment. Reference design: [startling-beijinho-72802b.netlify.app](https://startling-beijinho-72802b.netlify.app/).
