// بيانات تجريبية
const demoProducts = [
  { id: "1001", name: "ماء صحة 500ml", price: 250, barcode: "6281001001" },
  { id: "1002", name: "بيبسي علبة",     price: 500, barcode: "6281001002" },
  { id: "1003", name: "شيبس بطعم الجبن", price: 750, barcode: "6281001003" },
  { id: "1004", name: "قهوة عربية",      price: 3000, barcode: "6281001004" },
  { id: "1005", name: "سكر 1كغم",        price: 1500, barcode: "6281001005" },
];

const $ = (id) => document.getElementById(id);

let state = {
  products: JSON.parse(localStorage.getItem("products") || "null") || demoProducts,
  cart: [],
  discount: 0,
  tax: 0,
};

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(state.products));
}

function renderProducts(list = state.products) {
  const wrap = $("productList");
  wrap.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <div class="price">${p.price} د.ع</div>
      <div class="small">باركود: ${p.barcode || "-"}</div>
      <button data-id="${p.id}">إضافة للسلة</button>
    `;
    card.querySelector("button").addEventListener("click", () => addToCart(p.id));
    wrap.appendChild(card);
  });
}

function addToCart(id) {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  const line = state.cart.find(x => x.id === id);
  if (line) { line.qty += 1; }
  else { state.cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 }); }
  renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(x => x.id !== id);
  renderCart();
}

function setQty(id, qty) {
  const line = state.cart.find(x => x.id === id);
  if (!line) return;
  line.qty = Math.max(1, Number(qty) || 1);
  renderCart();
}

function calcTotals() {
  const subtotal = state.cart.reduce((s, x) => s + x.price * x.qty, 0);
  const discountAmt = subtotal * (state.discount / 100);
  const afterDiscount = subtotal - discountAmt;
  const taxAmt = afterDiscount * (state.tax / 100);
  const grand = Math.round(afterDiscount + taxAmt);
  return { subtotal, discountAmt, taxAmt, grand };
}

function renderCart() {
  const tbody = $("cartBody");
  tbody.innerHTML = "";
  state.cart.forEach(line => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${line.name}</td>
      <td>${line.price}</td>
      <td><input type="number" min="1" value="${line.qty}" /></td>
      <td>${line.price * line.qty}</td>
      <td><button data-remove="${line.id}">✕</button></td>
    `;
    tr.querySelector("input").addEventListener("change", (e) => setQty(line.id, e.target.value));
    tr.querySelector("button").addEventListener("click", () => removeFromCart(line.id));
    tbody.appendChild(tr);
  });

  const totals = calcTotals();
  $("subtotal").textContent = totals.subtotal;
  $("grandTotal").textContent = totals.grand;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify({
    cart: state.cart, discount: state.discount, tax: state.tax
  }));
  alert("تم حفظ السلة مؤقتًا.");
}

function loadCart() {
  const saved = JSON.parse(localStorage.getItem("cart") || "null");
  if (!saved) return alert("لا توجد سلة محفوظة.");
  state.cart = saved.cart || [];
  state.discount = saved.discount || 0;
  state.tax = saved.tax || 0;
  $("discount").value = state.discount;
  $("tax").value = state.tax;
  renderCart();
}

function printReceipt() {
  const { subtotal, discountAmt, taxAmt, grand } = calcTotals();
  const now = new Date();
  const meta = `
    التاريخ: ${now.toLocaleDateString('ar-IQ')} — الوقت: ${now.toLocaleTimeString('ar-IQ')}
  `;
  $("receiptMeta").textContent = meta;
  const body = $("receiptBody");
  body.innerHTML = "";
  state.cart.forEach(line => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${line.name}</td>
      <td>${line.price}</td>
      <td>${line.qty}</td>
      <td>${line.price * line.qty}</td>
    `;
    body.appendChild(tr);
  });
  $("rSubtotal").textContent = subtotal;
  $("rDiscount").textContent = Math.round(discountAmt);
  $("rTax").textContent = Math.round(taxAmt);
  $("rGrand").textContent = grand;

  const receipt = $("receipt");
  receipt.style.display = "block";
  window.print();
  receipt.style.display = "none";
}

function initEvents() {
  $("search").addEventListener("input", (e) => {
    const q = e.target.value.trim();
    if (!q) return renderProducts();
    const filtered = state.products.filter(p =>
      (p.name || "").includes(q) || (p.barcode || "").includes(q)
    );
    renderProducts(filtered);
  });

  $("discount").addEventListener("input", (e) => {
    state.discount = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    renderCart();
  });

  $("tax").addEventListener("input", (e) => {
    state.tax = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    renderCart();
  });

  $("clearCart").addEventListener("click", () => {
    if (confirm("تأكيد تفريغ السلة؟")) {
      state.cart = [];
      renderCart();
    }
  });
  $("saveCart").addEventListener("click", saveCart);
  $("loadCart").addEventListener("click", loadCart);
  $("checkoutBtn").addEventListener("click", () => {
    if (state.cart.length === 0) return alert("السلة فارغة.");
    printReceipt();
  });

  // دعم إدخال باركود: التركيز على حقل البحث، سكانر USB يكتب الأرقام ثم Enter
  $("search").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const code = e.target.value.trim();
      if (!code) return;
      const p = state.products.find(x => x.barcode === code || x.id === code);
      if (p) addToCart(p.id);
      e.target.select();
    }
  });
}

function bootstrap() {
  renderProducts();
  renderCart();
  initEvents();
}
bootstrap();
