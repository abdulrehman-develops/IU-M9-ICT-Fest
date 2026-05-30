/*
  =========================================
  VIRASAT - TRADITIONAL E-COMMERCE WEBSITE
  =========================================
  This shared Javascript file handles the logic across all of our pages.
  To support multiple pages:
  1. We read the `data-page` attribute on the HTML `<body>` tag.
  2. Depending on the page, we render the correct products (e.g., only Balochi items on balochi.html).
  3. On the Home page, we render a selection of "Featured Items" representing all cultures.
  4. The shopping cart state, badge, and theme toggler are synchronized on every page using LocalStorage.
*/

// ==========================================
// 1. PRODUCT DATABASE
// ==========================================
const PRODUCTS = [
  // --- PUNJABI DRESSING COMPONENTS ---
  {
    id: "pb-1",
    name: "Classic Khadi Kurta",
    price: 3500,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "A comfortable, knee-length collarless shirt made from premium breathable handloom cotton. Perfect for hot weather.",
    story: "The Kurta has historical roots in the Indus Valley region. It represents simple elegance and is the standard upper garment across Punjab."
  },
  {
    id: "pb-2",
    name: "Traditional Silk Tehmat",
    price: 2200,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "Also known as Lacha, this is a sheet of fine cotton or silk fabric tied around the waist in a flowing wrap style.",
    story: "The Tehmat is the traditional lower garment of Punjabi men, symbolizing a relaxed yet active heritage suitable for agricultural and festive life."
  },
  {
    id: "pb-3",
    name: "Royal Crimson Pagri",
    price: 1800,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "A premium cotton turban cloth, dyed in vibrant red, to be wrapped in the majestic Punjabi style.",
    story: "In Punjab, the Pagri (Turban) is not just clothing; it is a crown representing respect, dignity, honor, and community leadership."
  },
  {
    id: "pb-4",
    name: "Intricate Phulkari Shawl",
    price: 6500,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "A spectacular georgette shawl covered in dense, bright yellow and orange floral hand-embroidery using silk threads.",
    story: "Phulkari literally translates to 'flower work'. Traditionally, grandmothers began embroidering a Phulkari when a granddaughter was born, to be gifted at her wedding."
  },
  {
    id: "pb-5",
    name: "Stitched Cotton Salwar",
    price: 1900,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "Comfortable, loose trousers that taper tightly at the ankles. Made from durable cotton fabric.",
    story: "Developed over centuries, the Punjabi Salwar is designed for maximum mobility and functionality in the agricultural heartland."
  },
  {
    id: "pb-6",
    name: "Georgette Festive Dupatta",
    price: 1500,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "A lightweight, long flowing scarf adorned with delicate golden lace (Gotta) borders.",
    story: "The Dupatta is a symbol of modesty and grace in traditional Punjabi attire, dynamically draped over the shoulders or head."
  },
  {
    id: "pb-7",
    name: "Handcrafted Leather Jutti",
    price: 3200,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "Genuine leather slip-on shoes featuring detailed golden tilla embroidery and a comfortable padded sole.",
    story: "Juttis are historically associated with royalty. They have no left or right foot distinction and conform to the wearer's feet over time."
  },
  {
    id: "pb-8",
    name: "Embroidered Cotton Waistcoat",
    price: 2800,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "A fitted sleeveless jacket designed to be worn over the Kurta. Includes brass buttons and front pockets.",
    story: "Waistcoats add structure and formality to the traditional Kurta, often worn by groomsmen and during formal community assemblies."
  },
  {
    id: "pb-9",
    name: "Velvet Ghagra Skirt",
    price: 7500,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "A heavy, pleated full-length skirt with a wide border embellished with traditional patterns.",
    story: "The Ghagra is a celebration of volume and color, worn by Punjabi women during traditional dances like Giddha to create a beautiful spinning motion."
  },
  {
    id: "pb-10",
    name: "Tasselled Silk Paranda",
    price: 800,
    culture: "punjabi",
    image: "assets/punjabi.png",
    description: "A vibrant hair ornament made of silk threads, beads, and mirrors, designed to be braided into long hair.",
    story: "The Paranda expresses joy and beauty. Women wear it during festivals to add a burst of color to their braided hair."
  },

  // --- PATHAN DRESSING COMPONENTS ---
  {
    id: "pt-1",
    name: "Chitrali Wool Pakol",
    price: 1200,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "A round, flat-topped hat made of 100% natural sheep wool. Highly insulating and comfortable.",
    story: "The Pakol is an iconic headgear worn in Northern Pakistan. It gained international recognition as a symbol of resilience and mountain culture."
  },
  {
    id: "pt-2",
    name: "Perahan Tunban Set",
    price: 4200,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "Traditional Pashtun suit featuring a very loose, knee-length shirt (Perahan) and incredibly baggy trousers (Tunban).",
    story: "Engineered for the rugged mountainous climate and outdoor lifestyle, it offers unparalleled comfort and ventilation."
  },
  {
    id: "pt-3",
    name: "Royal Woolen Chapan",
    price: 8500,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "A heavy, quilted wool overcoat featuring rich silk thread borders. Worn draped over the shoulders.",
    story: "Chapans are prestigious coats originating from Central Asia and popular among Pashtuns to ward off harsh winter winds."
  },
  {
    id: "pt-4",
    name: "Tribal Checkered Patu",
    price: 2500,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "A large, thick woolen shawl that acts as a wrap-around blanket, coat, and head cover in cold weather.",
    story: "The Patu is a highly versatile item used by mountain travelers as both a warm wrap by day and a sleeping blanket by night."
  },
  {
    id: "pt-5",
    name: "Formal Pashtun Lungee Turban",
    price: 3200,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "A long, decorative silk turban cloth featuring beautiful woven gold patterns on the borders.",
    story: "The Lungee is a ceremonial headwear representing lineage, respect, and transitioning into manhood in Pashtun tribal assemblies."
  },
  {
    id: "pt-6",
    name: "Classic Peshawari Kameez",
    price: 3000,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "A straight-cut, long-sleeved shirt made from high-quality blended linen.",
    story: "Differing from the Punjabi Kurta, the Peshawari Kameez has a distinct collar and structured cuffs, reflecting regional preferences."
  },
  {
    id: "pt-7",
    name: "Loose Pashtun Shalwar",
    price: 1800,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "Extremely wide, pleated trousers that provide comfort and are gathered at the ankle.",
    story: "The Pashtun Shalwar uses extra fabric width to facilitate horse riding and hiking across rugged highland terrains."
  },
  {
    id: "pt-8",
    name: "Suede Embroidered Waistcoat",
    price: 3500,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "A dark suede waistcoat adorned with intricate golden tilla thread work and custom metallic buttons.",
    story: "Worn over the Perahan Tunban, this vest completes the Pashtun formal attire for weddings and cultural festivals."
  },
  {
    id: "pt-9",
    name: "Classic Peshawari Chappal",
    price: 3800,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "Traditional semi-closed leather sandals with a durable rubber sole (often made from tyres for grip).",
    story: "Originating in Peshawar, this footwear is famous worldwide for its durability, comfort, and bold masculine design."
  },
  {
    id: "pt-10",
    name: "Kashmiri Woolen Shawl",
    price: 5500,
    culture: "pathan",
    image: "assets/pathan.png",
    description: "An ultra-soft, warm woolen shawl with fine hand-woven patterns on all four borders.",
    story: "These shawls are highly prized family heirlooms, gifted during winters as a gesture of warmth and hospitality."
  },

  // --- BALOCHI DRESSING COMPONENTS ---
  {
    id: "bl-1",
    name: "Grand Balochi Turban (Pag)",
    price: 3800,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "A majestic, wide white cotton turban cloth, symbolizing honor and maturity.",
    story: "The Balochi Pag is exceptionally wide and tied in a unique style with loose ends hanging on the sides, protecting the wearer from scorching desert heat."
  },
  {
    id: "bl-2",
    name: "Pleated Balochi Shalwar",
    price: 2400,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "Extremely wide trousers utilizing up to 10 yards of light cotton fabric to create thousands of pleats.",
    story: "The massive volume of the Balochi Shalwar creates a natural cooling effect through air circulation in the hot desert plains of Balochistan."
  },
  {
    id: "bl-3",
    name: "Loose Balochi Kameez",
    price: 3200,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "A long, loose shirt featuring double-stitched seams and side pocket openings.",
    story: "This Kameez is designed to be worn in combination with the wide Balochi Shalwar, creating the distinct silhouette of the Baloch people."
  },
  {
    id: "bl-4",
    name: "Hand-Embroidered Dochi Vest",
    price: 4500,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "A vibrant waistcoat showcasing the traditional 'Dochi' geometric needlepoint patterns.",
    story: "Dochi embroidery is a highly complex handcraft passed down through generations of Balochi artisans, requiring immense precision."
  },
  {
    id: "bl-5",
    name: "Mirror Work Detail Patch",
    price: 1500,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "A set of hand-embroidered neck and cuff patches with embedded mirrors, ready to be stitched onto dresses.",
    story: "Balochi mirror-work (Shisha) reflects light to ward off the evil eye, adding a glittering, lively texture to clothing."
  },
  {
    id: "bl-6",
    name: "Traditional Balochi Pashk",
    price: 8500,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "A breathtaking women's dress featuring a large central pocket (Pandol) and heavy hand-embroidery on the chest and sleeves.",
    story: "The Pashk is a masterpiece of wearable art. The pocket in front is traditionally used by Balochi women to carry small personal items and sweets for children."
  },
  {
    id: "bl-7",
    name: "Mirror-Work Leather Waistcoat",
    price: 4200,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "Premium leather waistcoat decorated with authentic Balochi wool embroidery and small mirrors.",
    story: "Combining durable leather with bright embroidery, this vest represents the rugged yet colorful spirit of Baloch tribal culture."
  },
  {
    id: "bl-8",
    name: "Leather Sandals (Chawat)",
    price: 2900,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "Sturdy, thick leather sandals hand-stitched with braided leather cords.",
    story: "Chawat sandals are built to withstand the rocky terrains of the Balochi mountains and the hot desert sands."
  },
  {
    id: "bl-9",
    name: "Desert Silk Chadar",
    price: 2000,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "A large, lightweight silk wrap decorated with simple block-printed tribal patterns.",
    story: "Worn over the shoulders or head, the Chadar protects against both the desert sun and cold evening breezes."
  },
  {
    id: "bl-10",
    name: "Antique Silver Balochi Necklace",
    price: 4800,
    culture: "balochi",
    image: "assets/balochi.png",
    description: "A heavy, vintage-style coin necklace made from high-quality German silver with engraved tribal patterns.",
    story: "Traditional Balochi jewelry is typically made of silver rather than gold, featuring bold geometric shapes that tell stories of tribal lineages."
  },

  // --- SINDHI CULTURE ACCESSORIES ---
  {
    id: "sd-1",
    name: "Authentic Sindhi Ajrak Shawl",
    price: 2800,
    culture: "sindhi",
    image: "assets/sindhi.png",
    description: "A premium block-printed shawl using natural indigo and madder dyes. Features intricate geometric patterns.",
    story: "Ajrak is a symbol of Sindhi culture tracing back to the Mohenjo-daro civilization. It is presented as a mark of respect and hospitality."
  },
  {
    id: "sd-2",
    name: "Mirror-Work Sindhi Topi",
    price: 1200,
    culture: "sindhi",
    image: "assets/sindhi.png",
    description: "A hand-woven cap embellished with elaborate mirror-work and embroidery, featuring a unique front arch.",
    story: "The Sindhi Topi represents honor and self-respect. Its distinct arch cut-out in the front allows the forehead to touch the ground during prayer."
  },
  {
    id: "sd-3",
    name: "Geometrical Rilli Throw",
    price: 4500,
    culture: "sindhi",
    image: "assets/sindhi.png",
    description: "A traditional patchwork quilt-material fabric, handcrafted using vibrant fabric scraps in geometric patterns.",
    story: "Rilli is an expression of Sindhi women's creativity, turning leftover textile scraps into gorgeous, intricate blankets and outfits."
  },
  {
    id: "sd-4",
    name: "Antique Silver Sindhi Kada",
    price: 2200,
    culture: "sindhi",
    image: "assets/sindhi.png",
    description: "Heavy, open-ended silver bracelets decorated with traditional carvings and colored glass beads.",
    story: "Kadas are worn by women as a statement accessory, ringing softly with movement and keeping Sindhi folklore alive."
  },
  {
    id: "sd-5",
    name: "Ajrak Print Embroidered Kurti",
    price: 3600,
    culture: "sindhi",
    image: "assets/sindhi.png",
    description: "A short, stylish women's shirt combining Ajrak prints with delicate mirror work around the neckline.",
    story: "This kurti represents a modern fusion of traditional Ajrak blocks with contemporary fashion aesthetics."
  },
  {
    id: "sd-6",
    name: "Handloom Sussi Fabric",
    price: 1800,
    culture: "sindhi",
    image: "assets/sindhi.png",
    description: "Striped handloom cotton-silk fabric, perfect for crafting custom trousers or shirts.",
    story: "Sussi is a traditional multi-colored striped fabric that has been woven in Sindh's handlooms for centuries."
  },
  {
    id: "sd-7",
    name: "Traditional Sindhi Suthan",
    price: 2100,
    culture: "sindhi",
    image: "assets/sindhi.png",
    description: "Pleated drawers that are wide at the thighs and tight from the calf down, made of comfortable cotton.",
    story: "The Suthan is the historical lower garment of Sindh, offering ease of movement and thermal comfort."
  },
  {
    id: "sd-8",
    name: "Woven Silk Sindhi Loongi",
    price: 3500,
    culture: "sindhi",
    image: "assets/sindhi.png",
    description: "A beautiful, shimmering silk sash with decorated borders, worn as a turban or waistband.",
    story: "Traditionally worn by Sindhi chieftains, the Loongi is a sign of prestige, dignity, and high social standing."
  }
];

// ==========================================
// 2. STATE VARIABLES
// ==========================================
let cart = [];
let activeTheme = "light";

// ==========================================
// 3. DOM ELEMENTS
// ==========================================
const productsGrid = document.getElementById("products-grid");
const cartBadge = document.getElementById("cart-badge");
const cartPanel = document.getElementById("cart-panel");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalText = document.getElementById("cart-total");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("product-modal");
const checkoutModal = document.getElementById("checkout-modal");
const themeToggleBtn = document.getElementById("theme-toggle-btn");

// ==========================================
// 4. THEME TOGGLE LOGIC
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  activeTheme = savedTheme;
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggleBtn.innerHTML = "☀️";
  } else {
    document.body.classList.remove("dark-theme");
    themeToggleBtn.innerHTML = "🌙";
  }
}

themeToggleBtn.addEventListener("click", () => {
  if (activeTheme === "light") {
    document.body.classList.add("dark-theme");
    activeTheme = "dark";
    themeToggleBtn.innerHTML = "☀️";
  } else {
    document.body.classList.remove("dark-theme");
    activeTheme = "light";
    themeToggleBtn.innerHTML = "🌙";
  }
  localStorage.setItem("theme", activeTheme);
});

// ==========================================
// 5. PRODUCT RENDERING (DETERMINED BY PAGE)
// ==========================================
function renderProducts() {
  // Check if grid exists (Style Combinator page won't have this grid)
  if (!productsGrid) return;
  
  productsGrid.innerHTML = "";
  
  // Read dataset-page attribute to determine which products to filter
  const pageType = document.body.getAttribute("data-page");
  
  let productsToRender = [];
  
  if (pageType === "home") {
    // Render 4 "Featured Items" on the home page (one representing each culture)
    const featuredIds = ["pb-4", "pt-3", "bl-6", "sd-1"];
    productsToRender = PRODUCTS.filter(p => featuredIds.includes(p.id));
  } else if (pageType === "punjabi") {
    productsToRender = PRODUCTS.filter(p => p.culture === "punjabi");
  } else if (pageType === "pathan") {
    productsToRender = PRODUCTS.filter(p => p.culture === "pathan");
  } else if (pageType === "balochi") {
    productsToRender = PRODUCTS.filter(p => p.culture === "balochi");
  } else if (pageType === "sindhi") {
    productsToRender = PRODUCTS.filter(p => p.culture === "sindhi");
  }
  
  if (productsToRender.length === 0) {
    productsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No products found.</div>`;
    return;
  }

  productsToRender.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    const formattedPrice = "Rs. " + product.price.toLocaleString();
    
    card.innerHTML = `
      <span class="product-badge">${capitalize(product.culture)}</span>
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <div class="product-culture">${product.culture} culture</div>
        <a href="#" class="product-name" data-id="${product.id}">${product.name}</a>
        <p class="product-desc-preview">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formattedPrice}</span>
          <button class="add-cart-btn" data-id="${product.id}" title="Add to Cart">🛒</button>
        </div>
      </div>
    `;
    
    card.querySelector(".product-name").addEventListener("click", (e) => {
      e.preventDefault();
      openProductModal(product.id);
    });

    card.querySelector(".add-cart-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product.id);
    });

    productsGrid.appendChild(card);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==========================================
// 6. CART STATE MANAGEMENT
// ==========================================
function initCart() {
  const savedCart = localStorage.getItem("virasat_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}

function addToCart(productId, size = "L") {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      culture: product.culture,
      size: size,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  openCartPanel();
}

function removeFromCart(productId, size) {
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart();
  updateCartUI();
}

function updateQuantity(productId, size, change) {
  const item = cart.find(item => item.id === productId && item.size === size);
  if (!item) return;

  item.quantity += change;
  if (item.quantity < 1) {
    removeFromCart(productId, size);
  } else {
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem("virasat_cart", JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? "flex" : "none";

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 0; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🛍️</div>
        Your cart is empty.<br>Start adding some heritage items!
      </div>
    `;
    cartTotalText.textContent = "Rs. 0";
    return;
  }

  let grandTotal = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    const itemRow = document.createElement("div");
    itemRow.className = "cart-item";
    itemRow.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-meta">Size: ${item.size} | Culture: ${capitalize(item.culture)}</div>
        <div class="cart-item-footer">
          <span class="cart-item-price">Rs. ${item.price.toLocaleString()}</span>
          <div class="qty-control">
            <button class="qty-btn dec-btn">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn inc-btn">+</button>
          </div>
          <button class="cart-item-remove">🗑️</button>
        </div>
      </div>
    `;

    itemRow.querySelector(".dec-btn").addEventListener("click", () => updateQuantity(item.id, item.size, -1));
    itemRow.querySelector(".inc-btn").addEventListener("click", () => updateQuantity(item.id, item.size, 1));
    itemRow.querySelector(".cart-item-remove").addEventListener("click", () => removeFromCart(item.id, item.size));

    cartItemsContainer.appendChild(itemRow);
  });

  cartTotalText.textContent = "Rs. " + grandTotal.toLocaleString();
}

function openCartPanel() {
  cartPanel.classList.add("open");
  overlay.classList.add("open");
}

function closeCartPanel() {
  cartPanel.classList.remove("open");
  if (!modal.classList.contains("open") && !checkoutModal.classList.contains("open")) {
    overlay.classList.remove("open");
  }
}

document.getElementById("cart-btn").addEventListener("click", openCartPanel);
document.getElementById("cart-close").addEventListener("click", closeCartPanel);

// ==========================================
// 7. PRODUCT DETAIL MODAL LOGIC
// ==========================================
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  document.getElementById("modal-img").src = product.image;
  document.getElementById("modal-culture-badge").textContent = product.culture + " heritage";
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-price").textContent = "Rs. " + product.price.toLocaleString();
  document.getElementById("modal-desc").textContent = product.description;
  document.getElementById("modal-story").textContent = product.story;

  const sizeChips = document.querySelectorAll(".size-chip");
  sizeChips.forEach(chip => {
    chip.classList.remove("active");
    if (chip.getAttribute("data-size") === "L") {
      chip.classList.add("active");
    }
  });

  const modalAddBtn = document.getElementById("modal-add-btn");
  const newAddBtn = modalAddBtn.cloneNode(true);
  modalAddBtn.parentNode.replaceChild(newAddBtn, modalAddBtn);

  newAddBtn.addEventListener("click", () => {
    const activeSize = document.querySelector(".size-chip.active").getAttribute("data-size");
    addToCart(product.id, activeSize);
    closeProductModal();
  });

  modal.classList.add("open");
  overlay.classList.add("open");
}

function closeProductModal() {
  modal.classList.remove("open");
  if (!cartPanel.classList.contains("open")) {
    overlay.classList.remove("open");
  }
}

document.getElementById("modal-close-btn").addEventListener("click", closeProductModal);

const chips = document.querySelectorAll(".size-chip");
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
  });
});

overlay.addEventListener("click", () => {
  closeCartPanel();
  closeProductModal();
  closeCheckoutModal();
});

// ==========================================
// 8. INTERACTIVE STYLE COMBINATOR LOGIC
// ==========================================
const combinatorHead = document.getElementById("comb-head");
const combinatorTorso = document.getElementById("comb-torso");
const combinatorFootwear = document.getElementById("comb-footwear");

const previewHead = document.getElementById("prev-head");
const previewTorso = document.getElementById("prev-torso");
const previewFootwear = document.getElementById("prev-footwear");
const combinatorTotalPriceText = document.getElementById("comb-total-price");
const combinatorAddAllBtn = document.getElementById("comb-add-all-btn");

function initStyleCombinator() {
  // Verify selectors exist on this page
  if (!combinatorHead || !combinatorTorso || !combinatorFootwear) return;

  const headwearKeywords = ["turban", "pagri", "pakol", "topi"];
  const torsoKeywords = ["kurta", "perahan", "kameez", "kurti"];
  const footwearKeywords = ["jutti", "khussa", "sandals", "chappal"];

  combinatorHead.innerHTML = '<option value="">-- Choose Headwear --</option>';
  combinatorTorso.innerHTML = '<option value="">-- Choose Upper Body --</option>';
  combinatorFootwear.innerHTML = '<option value="">-- Choose Footwear --</option>';

  PRODUCTS.forEach(p => {
    const nameLower = p.name.toLowerCase();
    
    if (headwearKeywords.some(keyword => nameLower.includes(keyword))) {
      combinatorHead.innerHTML += `<option value="${p.id}">${p.name} (${capitalize(p.culture)}) - Rs. ${p.price}</option>`;
    } else if (torsoKeywords.some(keyword => nameLower.includes(keyword))) {
      combinatorTorso.innerHTML += `<option value="${p.id}">${p.name} (${capitalize(p.culture)}) - Rs. ${p.price}</option>`;
    } else if (footwearKeywords.some(keyword => nameLower.includes(keyword))) {
      combinatorFootwear.innerHTML += `<option value="${p.id}">${p.name} (${capitalize(p.culture)}) - Rs. ${p.price}</option>`;
    }
  });

  combinatorHead.addEventListener("change", updateCombinatorPreview);
  combinatorTorso.addEventListener("change", updateCombinatorPreview);
  combinatorFootwear.addEventListener("change", updateCombinatorPreview);

  combinatorAddAllBtn.addEventListener("click", addCombinatorOutfitToCart);
}

function updateCombinatorPreview() {
  let comboTotal = 0;
  
  const headId = combinatorHead.value;
  if (headId) {
    const p = PRODUCTS.find(item => item.id === headId);
    previewHead.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="preview-slot-info">
        <div class="preview-slot-title">${p.culture} headwear</div>
        <div class="preview-slot-name">${p.name}</div>
      </div>
    `;
    previewHead.style.display = "flex";
    comboTotal += p.price;
  } else {
    previewHead.style.display = "none";
  }

  const torsoId = combinatorTorso.value;
  if (torsoId) {
    const p = PRODUCTS.find(item => item.id === torsoId);
    previewTorso.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="preview-slot-info">
        <div class="preview-slot-title">${p.culture} upper wear</div>
        <div class="preview-slot-name">${p.name}</div>
      </div>
    `;
    previewTorso.style.display = "flex";
    comboTotal += p.price;
  } else {
    previewTorso.style.display = "none";
  }

  const footId = combinatorFootwear.value;
  if (footId) {
    const p = PRODUCTS.find(item => item.id === footId);
    previewFootwear.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="preview-slot-info">
        <div class="preview-slot-title">${p.culture} footwear</div>
        <div class="preview-slot-name">${p.name}</div>
      </div>
    `;
    previewFootwear.style.display = "flex";
    comboTotal += p.price;
  } else {
    previewFootwear.style.display = "none";
  }

  const placeholder = document.getElementById("combinator-placeholder");
  if (!headId && !torsoId && !footId) {
    placeholder.style.display = "block";
    combinatorTotalPriceText.textContent = "Rs. 0";
    combinatorAddAllBtn.disabled = true;
  } else {
    placeholder.style.display = "none";
    combinatorTotalPriceText.textContent = "Rs. " + comboTotal.toLocaleString();
    combinatorAddAllBtn.disabled = false;
  }
}

function addCombinatorOutfitToCart() {
  const headId = combinatorHead.value;
  const torsoId = combinatorTorso.value;
  const footId = combinatorFootwear.value;

  if (headId) addToCart(headId);
  if (torsoId) addToCart(torsoId);
  if (footId) addToCart(footId);

  combinatorHead.value = "";
  combinatorTorso.value = "";
  combinatorFootwear.value = "";
  updateCombinatorPreview();
}

// ==========================================
// 9. CHECKOUT SIMULATION
// ==========================================
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty! Add products before checking out.");
    return;
  }

  cart = [];
  saveCart();
  updateCartUI();
  closeCartPanel();

  checkoutModal.classList.add("open");
  overlay.classList.add("open");
}

function closeCheckoutModal() {
  checkoutModal.classList.remove("open");
  overlay.classList.remove("open");
}

document.getElementById("checkout-btn").addEventListener("click", checkout);
document.getElementById("checkout-close-btn").addEventListener("click", closeCheckoutModal);

// ==========================================
// 10. INITIALIZATION
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderProducts();
  initCart();
  initStyleCombinator();
});
