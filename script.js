document.addEventListener("DOMContentLoaded", function () {
  // =====================================
  // KONFIGURASI
  // =====================================

  const WHATSAPP_NUMBER = "60123456789";

  let currentLanguage = "id";
  let currentCategory = "all";

  // Currency follows the visitor's IP country, independently from language.
  // Indonesia = IDR; all other countries default to MYR.
  let currentCurrency = "MYR";

  function formatProductPrice() {
    document
      .querySelectorAll(".product-card .product-price")
      .forEach((price) => {
        price.textContent =
          currentCurrency === "IDR" ? "Rp 50.000" : "RM 25.00";
      });
  }

  async function detectVisitorSettingsByIP() {
    try {
      const response = await fetch("https://ipwho.is/", { cache: "no-store" });
      if (!response.ok) throw new Error("IP location lookup failed");

      const location = await response.json();
      if (location && location.success && location.country_code) {
        const countryCode = location.country_code.toUpperCase();

        // Indonesia uses Indonesian; all other countries use English.
        currentLanguage = countryCode === "ID" ? "id" : "en";

        // Currency follows the visitor's IP country independently.
        currentCurrency = countryCode === "ID" ? "IDR" : "MYR";
      } else {
        currentLanguage = "en";
        currentCurrency = "MYR";
      }
    } catch (error) {
      // If IP detection is unavailable, use English and MYR as fallbacks.
      currentLanguage = "en";
      currentCurrency = "MYR";
    }

    changeLanguage(currentLanguage);
    formatProductPrice();

    // If the product drawer is already open, refresh its displayed price too.
    const activeCard = document.querySelector(".product-card.drawer-active");
    if (activeCard) {
      const activePrice = activeCard.querySelector(".product-price");
      document.getElementById("drawerPrice").textContent =
        activePrice.textContent;
    }
  }

  // =====================================
  // DATA TERJEMAHAN
  // =====================================

  const translations = {
    id: {
      navCategories: "Kategori",
      navProducts: "Produk",
      navContact: "Kontak",
      brandTagline: "STUDIO DESAIN DIGITAL KREATIF",

      heroEyebrow: "STUDIO DESAIN KREATIF",
      heroTitle: "IDE KREATIF, DESAIN JADI LEBIH MUDAH.",
      heroDescription:
        "Temukan berbagai template digital kreatif untuk bisnis, media sosial, pendidikan, dan kebutuhan lainnya.",
      heroButton: "JELAJAHI PRODUK",

      categorySocial: "Media Sosial",
      categoryInfo: "Infografis",
      categoryPpt: "Desain PPT",
      categoryFolder: "Folder",

      categoriesLabel: "JASA DESAIN CUSTOM ORDER",
      categoriesTitle: "Punya Desain Impian?",
      categoriesDescription:
        "Punya idea sendiri? Kami sedia membantu merealisasikan design mengikut keperluan dan identiti brand anda.",

      serviceGraphicTitle: "Custom Graphic Design",
      serviceGraphicDescription:
        "Poster, konten media sosial, branding dan desain promosi sesuai kebutuhan Anda.",
      servicePortfolioTitle: "Portfolio Design",
      servicePortfolioDescription:
        "Portfolio profesional untuk personal branding, freelancer dan bisnis.",
      serviceSlidesTitle: "Presentation & Slides",
      serviceSlidesDescription:
        "Slide presentasi yang rapi, menarik dan mudah dipahami untuk berbagai kebutuhan.",
      serviceWebsiteTitle: "Website Design",
      serviceWebsiteDescription:
        "Desain website untuk personal, portfolio, bisnis dan kebutuhan online Anda.",

      productsLabel: "KOLEKSI DESAIN KAMI",
      productsTitle: "Temukan Produk Kami",
      productsDescription:
        "Pilihan template kreatif untuk memudahkan pekerjaanmu.",

      filterAll: "Semua Produk",
      catalogCollection: "Template Media Sosial",
      sidebarCategories: "Kategori",
      sidebarNote: "Template kreatif yang dirancang untuk brand kamu.",
      sortNewest: "Terbaru",
      sortName: "Nama",
      priceLabel: "Harga Produk",

      product1: "Social Media Template – SukaDonat",
      product1Description:
        "Koleksi desain media sosial yang playful untuk brand SukaDonat.",
      product2: "Social Media Template – SukaBanana",
      product2Description:
        "Koleksi desain media sosial yang ceria untuk brand SukaBanana.",
      product3: "Social Media Template – TheCoffee",
      product3Description:
        "Koleksi desain media sosial yang warm dan minimal untuk TheCoffee.",
      product4: "Social Media Template – Martabak",
      product4Description:
        "Koleksi desain media sosial yang warm dan minimal untuk Martabak.",
      product5: "Social Media Template – Our Bread",
      product5Description:
        "Koleksi desain media sosial yang warm dan minimal untuk Our Bread.",
      product6: "Social Media Template – Our Burger",
      product6Description:
        "Koleksi desain media sosial yang warm dan minimal untuk Our Burger.",

      orderButton: "PESAN SEKARANG",

      emptyTitle: "Produk tidak ditemukan",
      emptyDescription: "Coba gunakan kata kunci atau kategori lain.",
      resetButton: "Lihat Semua Produk",

      contactLabel: "MARI BERKOLABORASI",
      contactTitle: "Punya Ide atau Proyek?",
      contactDescription: "Mari wujudkan ide kreatifmu bersama Our Design.",
      contactButton: "HUBUNGI KAMI",

      footerDescription: "Desain kreatif untuk setiap kebutuhan.",
      footerTagline: "Dibuat dengan kreativitas.",

      searchPlaceholder: "Cari produk...",
      productCount: "produk",

      orderMessage: "Halo Our Design! Saya tertarik untuk memesan produk: ",
      orderMessageEnd: ". Boleh saya mendapatkan informasi lebih lanjut?",
      contactMessage:
        "Halo Our Design! Saya ingin mengetahui lebih lanjut tentang produk dan layanan yang tersedia.",
    },

    en: {
      navCategories: "Categories",
      navProducts: "Products",
      navContact: "Contact",
      brandTagline: "CREATIVE DIGITAL DESIGN STUDIO",

      heroEyebrow: "CREATIVE DESIGN STUDIO",
      heroTitle: "CREATIVE IDEAS, DESIGN MADE EASIER.",
      heroDescription:
        "Discover creative digital templates for business, social media, education and more.",
      heroButton: "EXPLORE PRODUCTS",

      categorySocial: "Social Media",
      categoryInfo: "Infographic",
      categoryPpt: "PPT Design",
      categoryFolder: "Folder",

      categoriesLabel: "CUSTOM DESIGN SERVICES",
      categoriesTitle: "Have a Design in Mind?",
      categoriesDescription:
        "Have your own idea? We can bring it to life with a design tailored to your needs and brand identity.",

      serviceGraphicTitle: "Custom Graphic Design",
      serviceGraphicDescription:
        "Posters, social media content, branding and promotional designs tailored to your needs.",
      servicePortfolioTitle: "Portfolio Design",
      servicePortfolioDescription:
        "Professional portfolios for personal branding, freelancers and businesses.",
      serviceSlidesTitle: "Presentation & Slides",
      serviceSlidesDescription:
        "Clean, engaging and easy-to-follow presentation slides for different purposes.",
      serviceWebsiteTitle: "Website Design",
      serviceWebsiteDescription:
        "Website design for personal brands, portfolios, businesses and online presence.",

      productsLabel: "OUR DESIGN COLLECTION",
      productsTitle: "Discover Our Products",
      productsDescription: "Creative templates to make your work easier.",

      filterAll: "All Products",
      catalogCollection: "Social Media Templates",
      sidebarCategories: "Categories",
      sidebarNote: "Thoughtfully designed templates for your brand.",
      sortNewest: "Newest",
      sortName: "Name",
      priceLabel: "Product Price",

      product1: "Social Media Template – SukaDonat",
      product1Description:
        "A playful social media design collection for SukaDonat.",
      product2: "Social Media Template – SukaBanana",
      product2Description:
        "A vibrant social media design collection for SukaBanana.",
      product3: "Social Media Template – TheCoffee",
      product3Description:
        "A warm and minimal social media design collection for TheCoffee.",
      product4: "Social Media Template – Martabak",
      product4Description:
        "A warm and minimal social media design collection for Martabak.",
      product5: "Social Media Template – Our Bread",
      product5Description:
        "A warm and minimal social media design collection for Our Bread.",
      product6: "Social Media Template – Our Burger",
      product6Description:
        "A warm and minimal social media design collection for Our Burger.",

      orderButton: "ORDER NOW",

      emptyTitle: "No products found",
      emptyDescription: "Try another keyword or category.",
      resetButton: "View All Products",

      contactLabel: "LET'S COLLABORATE",
      contactTitle: "Have an Idea or Project?",
      contactDescription:
        "Let's bring your creative ideas to life with Our Design.",
      contactButton: "CONTACT US",

      footerDescription: "Creative designs for every need.",
      footerTagline: "Made with creativity.",

      searchPlaceholder: "Search products...",
      productCount: "products",

      orderMessage: "Hi Our Design! I'm interested in ordering: ",
      orderMessageEnd: ". Could you share more information?",
      contactMessage:
        "Hi Our Design! I would like to know more about your products and services.",
    },
  };

  // =====================================
  // GANTI BAHASA
  // =====================================

  const languageButtons = document.querySelectorAll(".language-btn");
  const searchInput = document.getElementById("productSearch");

  function changeLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const text = translations[language][key];

      if (text !== undefined) {
        element.textContent = text;
      }
    });

    searchInput.placeholder = translations[language].searchPlaceholder;

    languageButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === language);
    });

    filterProducts();
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      changeLanguage(this.dataset.lang);
    });
  });

  // =====================================
  // SEARCH DAN FILTER PRODUK
  // =====================================

  const filterButtons = document.querySelectorAll(".sidebar-filter");
  const productCards = document.querySelectorAll(".product-card");

  const resultCount = document.getElementById("resultCount");
  const emptyResult = document.getElementById("emptyResult");
  const productGrid = document.getElementById("productGrid");
  const resetFilters = document.getElementById("resetFilters");

  function filterProducts() {
    const keyword = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    productCards.forEach((card) => {
      const category = card.dataset.category;

      const searchText = (
        card.dataset.search +
        " " +
        card.querySelector("h3").textContent +
        " " +
        card.querySelector(".product-category").textContent
      ).toLowerCase();

      const matchesCategory =
        currentCategory === "all" || category === currentCategory;

      const matchesSearch = searchText.includes(keyword);

      const shouldShow = matchesCategory && matchesSearch;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount++;
      }
    });

    resultCount.textContent = `${visibleCount} ${translations[currentLanguage].productCount}`;

    emptyResult.hidden = visibleCount !== 0;
    productGrid.hidden = visibleCount === 0;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");

      currentCategory = this.dataset.filter;

      filterProducts();
    });
  });

  searchInput.addEventListener("input", filterProducts);

  // Sort catalog items without changing their product data.
  document.querySelectorAll(".sort-btn").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".sort-btn")
        .forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
      const cards = Array.from(productGrid.querySelectorAll(".product-card"));
      if (this.dataset.sort === "name") {
        cards.sort((a, b) =>
          a.dataset.sortName.localeCompare(b.dataset.sortName),
        );
      } else {
        cards.sort(
          (a, b) =>
            Number(a.dataset.sortOrder || 0) - Number(b.dataset.sortOrder || 0),
        );
      }
      cards.forEach((card) =>
        productGrid.insertBefore(
          card,
          productGrid.querySelector(".product-drawer-overlay"),
        ),
      );
    });
  });

  // Reset pencarian dan filter

  resetFilters.addEventListener("click", function () {
    searchInput.value = "";
    currentCategory = "all";

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    document.querySelector('[data-filter="all"]').classList.add("active");

    filterProducts();
  });

  // =====================================
  // KLIK KARTU KATEGORI
  // =====================================

  document.querySelectorAll("[data-category-link]").forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.dataset.categoryLink;

      const filterButton = document.querySelector(
        `.filter-btn[data-filter="${category}"]`,
      );

      if (!filterButton) return;

      searchInput.value = "";
      filterButton.click();

      document.querySelector("#products").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // CUSTOM ORDER SERVICE CARDS -> WhatsApp inquiry
  document.querySelectorAll("[data-custom-service]").forEach((card) => {
    card.addEventListener("click", function () {
      const serviceName = this.dataset.customService;
      const message =
        currentLanguage === "id"
          ? `Halo Our Design! Saya ingin bertanya tentang jasa custom order: ${serviceName}. Boleh saya mendapatkan informasi lebih lanjut?`
          : `Hi Our Design! I would like to enquire about your custom design service: ${serviceName}. Could you share more details?`;

      openWhatsApp(message);
    });
  });

  // =====================================
  // FAVORITE
  // =====================================

  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const isActive = this.classList.toggle("active");

      this.textContent = isActive ? "♥" : "♡";

      this.setAttribute("aria-pressed", isActive);
    });
  });

  // =====================================
  // WHATSAPP
  // =====================================

  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Pesan produk

  document.querySelectorAll(".order-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const productId = this.dataset.productId;

      const productName = translations[currentLanguage][productId];

      const message =
        translations[currentLanguage].orderMessage +
        productName +
        translations[currentLanguage].orderMessageEnd;

      openWhatsApp(message);
    });
  });

  // Kontak umum

  document
    .getElementById("contactWhatsapp")
    .addEventListener("click", function (event) {
      event.preventDefault();

      openWhatsApp(translations[currentLanguage].contactMessage);
    });

  // =====================================
  // PRODUCT DETAILS DRAWER + IMAGE SLIDER
  // =====================================

  const productDrawer = document.getElementById("productDrawer");
  const drawerOverlay = document.getElementById("productDrawerOverlay");
  const drawerClose = document.getElementById("drawerClose");
  const drawerMainImage = document.getElementById("drawerMainImage");
  const drawerThumbnails = document.getElementById("drawerThumbnails");
  const galleryCounter = document.getElementById("galleryCounter");
  const drawerOrder = document.getElementById("drawerOrder");

  let drawerImages = [];
  let drawerImageIndex = 0;
  let activeProductCard = null;

  function renderDrawerGallery() {
    if (!drawerImages.length) return;

    drawerMainImage.src = drawerImages[drawerImageIndex];
    drawerMainImage.alt = document.getElementById("drawerTitle").textContent;
    galleryCounter.textContent = `${drawerImageIndex + 1} / ${drawerImages.length}`;

    drawerThumbnails.innerHTML = "";

    drawerImages.forEach((image, index) => {
      const thumbnail = document.createElement("button");
      thumbnail.type = "button";
      thumbnail.className = `drawer-thumbnail${index === drawerImageIndex ? " active" : ""}`;
      thumbnail.setAttribute("aria-label", `Lihat gambar ${index + 1}`);

      const thumbnailImage = document.createElement("img");
      thumbnailImage.src = image;
      thumbnailImage.alt = `Preview ${index + 1}`;
      thumbnail.appendChild(thumbnailImage);

      thumbnail.addEventListener("click", () => {
        drawerImageIndex = index;
        renderDrawerGallery();
      });

      drawerThumbnails.appendChild(thumbnail);
    });
  }

  function openProductDrawer(card) {
    activeProductCard = card;
    document
      .querySelectorAll(".product-card")
      .forEach((item) => item.classList.remove("drawer-active"));
    card.classList.add("drawer-active");

    const mainImage = card.querySelector(".product-image-wrapper img");
    const title = card.querySelector(".product-info h3");
    const description = card.querySelector(".product-info p");
    const category = card.querySelector(".product-category");
    const price = card.querySelector(".product-price");
    const rating = card.querySelector(".product-rating");

    // Isi data-gallery dengan 1 hingga 10 path gambar yang dipisahkan koma.
    // Jika tidak diisi, drawer menggunakan gambar utama kartu produk.
    const galleryAttribute = Array.from(
      card.querySelectorAll(".product-gallery-data span"),
    )
      .map((item) => item.textContent.trim())
      .filter(Boolean)
      .slice(0, 10);

    drawerImages = galleryAttribute.length ? galleryAttribute : [mainImage.src];

    drawerImageIndex = 0;

    document.getElementById("drawerTitle").textContent = title.textContent;
    document.getElementById("drawerDescription").textContent =
      description.textContent;
    document.getElementById("drawerCategory").textContent =
      category.textContent;
    document.getElementById("drawerPrice").textContent = price.textContent;
    document.getElementById("drawerRating").innerHTML =
      `${rating.querySelector(".stars").textContent}<small>${rating.querySelector("small").textContent}</small>`;

    renderDrawerGallery();

    productDrawer.classList.add("show");
    drawerOverlay.classList.add("show");
    productDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
  }

  function closeProductDrawer() {
    productDrawer.classList.remove("show");
    drawerOverlay.classList.remove("show");
    productDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
  }

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".favorite-btn, .order-btn")) return;
      openProductDrawer(card);
    });
  });

  drawerClose.addEventListener("click", closeProductDrawer);
  drawerOverlay.addEventListener("click", closeProductDrawer);

  document.getElementById("galleryPrev").addEventListener("click", () => {
    if (!drawerImages.length) return;
    drawerImageIndex =
      (drawerImageIndex - 1 + drawerImages.length) % drawerImages.length;
    renderDrawerGallery();
  });

  document.getElementById("galleryNext").addEventListener("click", () => {
    if (!drawerImages.length) return;
    drawerImageIndex = (drawerImageIndex + 1) % drawerImages.length;
    renderDrawerGallery();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && productDrawer.classList.contains("show")) {
      closeProductDrawer();
    }
  });

  drawerOrder.addEventListener("click", () => {
    if (activeProductCard) {
      activeProductCard.querySelector(".order-btn").click();
    }
  });

  // =====================================
  // MOBILE NAVIGATION
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("show");
    });
  });

  // =====================================
  // SAAT WEBSITE DIBUKA
  // =====================================

  // Detect the visitor's country first, then apply the default language.
  // Indonesia = Bahasa Indonesia; other countries = English.
  detectVisitorSettingsByIP();
  filterProducts();
});
