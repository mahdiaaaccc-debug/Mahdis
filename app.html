// ====== قاعدة بيانات محلية (localStorage) ======
const STORAGE_KEYS = {
  products: "pos_products",
  cart: "pos_cart"
};

// بيانات تجريبية أولية
const demoProducts = [
  { id: "1001", name: "ماء صحة 500ml", price: 250, barcode: "6281001000013", stock: 0, unit: "pcs" },
  { id: "1002", name: "بيبسي علبة",     price: 500, barcode: "6281001000020", stock: 0, unit: "pcs" },
  { id: "1003", name: "شيبس بطعم الجبن", price: 750, barcode: "6281001000037", stock: 0, unit: "pcs" },
];

// عناصر DOM سريعة
const $ = (id) => document.getElementById(id);

// الحالة العامة
let state = {
  products: JSON.parse(localStorage.getItem(STORAGE_KEYS.products) || "null") || demoProducts,
  cart: [],
  discount: 0,
  tax: 0,
  editingId: null // لتعديل منتج
};

// حفظ المنتجات
function saveProducts() {
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(state.products));
}

// ====== واجهة عرض المنتجات والبحث ======
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

// ====== السلة والحساب ======
function addToCart(idOrBarcode) {
  let p = state.products.find(x => x.id === idOrBarcode || x.barcode === idOrBarcode);
  if (!p) {
    if (confirm("لم يتم العثور على المنتج. هل تريد إنشاؤه الآن؟")) {
      openModal();
      $("pBarcode").value = idOrBarcode;
    }
    return;
  }
  const line = state.cart.find(x => x.id === p.id);
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

// ====== طباعة الفاتورة ======
function printReceipt() {
  const { subtotal, discountAmt, taxAmt, grand } = calcTotals();
  const now = new Date();
  const meta = `التاريخ: ${now.toLocaleDateString('ar-IQ')} — الوقت: ${now.toLocaleTimeString('ar-IQ')}`;
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

// ====== إدارة المنتجات (إضافة/تعديل/حذف) ======
function openModal(editProduct = null) {
  $("productModal").style.display = "flex";
  if (editProduct) {
    $("modalTitle").textContent = "تعديل منتج";
    $("pName").value = editProduct.name || "";
    $("pPrice").value = editProduct.price || "";
    $("pBarcode").value = editProduct.barcode || "";
    $("pStock").value = editProduct.stock ?? 0;
    $("pUnit").value = editProduct.unit || "";
    state.editingId = editProduct.id;
  } else {
    $("modalTitle").textContent = "إضافة منتج";
    resetForm();
    state.editingId = null;
  }
  renderProductsTable();
}

function closeModal() {
  $("productModal").style.display = "none";
}

function resetForm() {
  $("pName").value = "";
  $("pPrice").value = "";
  $("pBarcode").value = "";
  $("pStock").value = "";
  $("pUnit").value = "";
}

// توليد EAN-13 مع تحقق checksum
function generateEAN13() {
  // 12 رقم عشوائي + تحقق للرقم 13
  let base = "";
  for (let i = 0; i < 12; i++) base += Math.floor(Math.random() * 10);
  const digits = base.split("").map(Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += (i % 2 === 0) ? digits[i] : digits[i] * 3;
  }
  const mod = sum % 10;
  const check = (10 - mod) % 10;
  return base + check;
}

function saveProductFromForm() {
  const name = $("pName").value.trim();
  const price = Number($("pPrice").value || 0);
  const barcode = $("pBarcode").value.trim();
  const stock = Number($("pStock").value || 0);
  const unit = $("pUnit").value.trim() || "pcs";

  if (!name) return alert("الاسم مطلوب.");
  if (!(price > 0)) return alert("السعر غير صالح.");
  if (barcode && !/^\d{8,14}$/.test(barcode)) return alert("الباركود يجب أن يكون أرقامًا (8-14 رقم).");

  // تحقق من التكرار
  const dup = state.products.find(p => p.barcode && barcode && p.barcode === barcode && p.id !== state.editingId);
  if (dup) return alert("الباركود مستخدم مسبقًا.");

  if (state.editingId) {
    const idx = state.products.findIndex(p => p.id === state.editingId);
    if (idx >= 0) {
      state.products[idx] = { ...state.products[idx], name, price, barcode, stock, unit };
    }
  } else {
    // أنشئ ID جديد بسيط
    const newId = Date.now().toString().slice(-8);
    state.products.push({ id: newId, name, price, barcode, stock, unit });
  }
  saveProducts();
  renderProducts();
  renderProductsTable();
  alert("تم الحفظ.");
}

function renderProductsTable() {
  const body = $("prodTableBody");
  body.innerHTML = "";
  state.products.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>${p.barcode || "-"}</td>
      <td>${p.stock ?? 0}</td>
      <td>${p.unit || ""}</td>
      <td class="prod-actions">
        <button class="edit">تعديل</button>
        <button class="delete">حذف</button>
      </td>
    `;
    tr.querySelector(".edit").addEventListener("click", () => openModal(p));
    tr.querySelector(".delete").addEventListener("click", () => {
      if (confirm("تأكيد حذف المنتج؟")) {
        state.products = state.products.filter(x => x.id !== p.id);
        saveProducts();
        renderProducts();
        renderProductsTable();
      }
    });
    body.appendChild(tr);
  });
}

// ====== استيراد/تصدير CSV ======
function exportCSV() {
  const head = ["id","name","price","barcode","stock","unit"];
  const rows = state.products.map(p => [p.id, p.name, p.price, p.barcode || "", p.stock ?? 0, p.unit || ""]);
  const all = [head, ...rows].map(r => r.map(v => (""+v).replaceAll('"','""')).map(v => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([all], {type: "text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "products.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importCSV(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (!lines.length) return alert("ملف CSV فارغ.");
    // بسيط: نفترض أول سطر رؤوس
    const rows = lines.slice(1).map(line => {
      // parsing بسيط للـ CSV المقتبس
      const cells = [];
      let curr = "", inQuotes = false;
      for (let i=0;i<line.length;i++) {
        const ch = line[i];
        if (ch === '"' ) {
          if (inQuotes && line[i+1] === '"') { curr += '"'; i++; }
          else inQuotes = !inQuotes;
        } else if (ch === ',' && !inQuotes) {
          cells.push(curr); curr = "";
        } else {
          curr += ch;
        }
      }
      cells.push(curr);
      return cells;
    });
    // دمج/إضافة
    rows.forEach(c => {
      if (!c.length) return;
      const [id, name, price, barcode, stock, unit] = c;
      if (!name) return;
      const existing = state.products.find(p => p.id === id) || (barcode ? state.products.find(p => p.barcode === barcode) : null);
      const obj = {
        id: id || Date.now().toString().slice(-8),
        name: name,
        price: Number(price || 0),
        barcode: barcode || "",
        stock: Number(stock || 0),
        unit: unit || "pcs"
      };
      if (existing) {
        // تحديث
        const idx = state.products.findIndex(p => p.id === existing.id);
        state.products[idx] = { ...existing, ...obj, id: existing.id };
      } else {
        state.products.push(obj);
      }
    });
    saveProducts();
    renderProducts();
    renderProductsTable();
    alert("تم استيراد CSV.");
  };
  reader.readAsText(file, "utf-8");
}

// ====== Events ======
function initEvents() {
  // بحث
  $("search").addEventListener("input", (e) => {
    const q = e.target.value.trim();
    if (!q) return renderProducts();
    const filtered = state.products.filter(p =>
      (p.name || "").includes(q) || (p.barcode || "").includes(q)
    );
    renderProducts(filtered);
  });

  // خصم/ضريبة
  $("discount").addEventListener("input", (e) => {
    state.discount = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    renderCart();
  });
  $("tax").addEventListener("input", (e) => {
    state.tax = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    renderCart();
  });

  // أزرار السلة
  $("clearCart").addEventListener("click", () => {
    if (confirm("تأكيد تفريغ السلة؟")) {
      state.cart = [];
      renderCart();
    }
  });
  $("saveCart").addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify({ cart: state.cart, discount: state.discount, tax: state.tax }));
    alert("تم حفظ السلة مؤقتًا.");
  });
  $("loadCart").addEventListener("click", () => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || "null");
    if (!saved) return alert("لا توجد سلة محفوظة.");
    state.cart = saved.cart || [];
    state.discount = saved.discount || 0;
    state.tax = saved.tax || 0;
    $("discount").value = state.discount;
    $("tax").value = state.tax;
    renderCart();
  });
  $("checkoutBtn").addEventListener("click", () => {
    if (state.cart.length === 0) return alert("السلة فارغة.");
    printReceipt();
  });

  // سكانر/إدخال باركود: Enter في خانة البحث
  $("search").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const code = e.target.value.trim();
      if (!code) return;
      addToCart(code);
      e.target.select();
    }
  });

  // إدارة المنتجات
  $("manageProductsBtn").addEventListener("click", () => openModal());
  $("closeModal").addEventListener("click", closeModal);
  $("resetForm").addEventListener("click", resetForm);
  $("genBarcode").addEventListener("click", () => {
    $("pBarcode").value = generateEAN13();
  });
  $("saveProduct").addEventListener("click", saveProductFromForm);

  // تصدير/استيراد CSV
  $("exportCsvBtn").addEventListener("click", exportCSV);
  $("importCsvInput").addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      importCSV(e.target.files[0]);
      e.target.value = "";
    }
  });
}

// ====== إقلاع ======
function bootstrap() {
  // إن لم تكن هناك منتجات محفوظة، خزّن التجريبية أولًا
  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(state.products));
  }
  renderProducts();
  renderCart();
  initEvents();
}
bootstrap();
