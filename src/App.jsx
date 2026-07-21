import { useEffect, useMemo, useState } from "react";
import { getProducts } from "./lib/api.js";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { CartDrawer } from "./components/CartDrawer.jsx";
import { Home } from "./pages/Home.jsx";
import { Shop } from "./pages/Shop.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Checkout } from "./pages/Checkout.jsx";
import { Confirmation } from "./pages/Confirmation.jsx";

function initialPage() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("session_id")) return "confirmation";
  return "home";
}

export default function App() {
  const [page, setPage] = useState(initialPage);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setProductsLoaded(true));
  }, []);

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], [products]);

  const goTo = (p) => {
    setPage(p);
    window.scrollTo?.({ top: 0, behavior: "instant" });
  };

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const setQty = (id, qty) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ ...products.find((p) => p.id === id), qty }))
        .filter((i) => i.id),
    [cart, products]
  );
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0);
  const shipping = cartTotal > 0 && cartTotal < 40 ? 5 : 0;
  const orderTotal = cartTotal + shipping;

  const filteredProducts = category === "All" ? products : products.filter((p) => p.category === category);

  const handleDrawerCheckout = async () => {
    setCartOpen(false);
    goTo("checkout");
  };

  if (!productsLoaded) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A5546" }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100%" }}>
      <Header page={page} goTo={goTo} cartCount={cartCount} onCart={() => setCartOpen(true)} />

      {page === "home" && <Home goTo={goTo} addToCart={addToCart} products={products} />}
      {page === "shop" && (
        <Shop category={category} setCategory={setCategory} products={filteredProducts} categories={categories} addToCart={addToCart} />
      )}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
      {page === "checkout" && (
        <Checkout cartItems={cartItems} cartTotal={cartTotal} shipping={shipping} orderTotal={orderTotal} goTo={goTo} />
      )}
      {page === "confirmation" && <Confirmation goTo={goTo} />}

      <Footer goTo={goTo} />

      {cartOpen && (
        <CartDrawer
          cartItems={cartItems}
          cartTotal={cartTotal}
          setQty={setQty}
          onClose={() => setCartOpen(false)}
          onCheckout={handleDrawerCheckout}
        />
      )}
    </div>
  );
}
