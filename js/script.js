/* ============================================================
   PackPro Industries — script.js (vanilla)
   ------------------------------------------------------------
   CONFIG: change the WhatsApp number here (country code +
   number, digits only, no "+" and no spaces).
   ============================================================ */
const SITE_CONFIG = {
  WHATSAPP_NUMBER: "919876543210",
  DEFAULT_MESSAGE:
    "Hello, I am interested in your packaging products. Please share your catalogue and quotation.",
};

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------------- WhatsApp link builder ---------------- */
function waHref(product) {
  let text = SITE_CONFIG.DEFAULT_MESSAGE;
  if (product) {
    text =
      "Hello, I am interested in " +
      product +
      ". Please share your catalogue and quotation.";
  }
  return (
    "https://wa.me/" +
    SITE_CONFIG.WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(text)
  );
}

document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = waHref(el.getAttribute("data-wa-product") || "");
});

/* ---------------- Header state ---------------- */
const header = document.getElementById("site-header");
const onHeaderScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
};
window.addEventListener("scroll", onHeaderScroll, { passive: true });
onHeaderScroll();

/* ---------------- Mobile navigation ---------------- */
const navToggle = document.getElementById("nav-toggle");
const mobileNav = document.getElementById("mobile-nav");

function setMobileNav(open) {
  navToggle.classList.toggle("is-open", open);
  mobileNav.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-locked", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav.setAttribute("aria-hidden", String(!open));
  if (lenis) {
    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }
}

navToggle.addEventListener("click", () => {
  setMobileNav(!mobileNav.classList.contains("is-open"));
});
mobileNav.querySelectorAll("a").forEach((link, i) => {
  link.style.setProperty("--i", i);
  link.addEventListener("click", () => setMobileNav(false));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
    setMobileNav(false);
  }
});

/* ---------------- Lenis smooth scrolling ---------------- */
let lenis = null;
if (typeof window.Lenis !== "undefined" && !prefersReducedMotion) {
  lenis = new window.Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  window.lenisInstance = lenis;
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

function scrollToTarget(target) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -70 });
  } else {
    const top =
      el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      scrollToTarget(id);
    }
  });
});

/* ---------------- Scroll reveals ---------------- */
const revealEls = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

/* ---------------- Hero parallax ---------------- */
const heroMedia = document.getElementById("hero-media");
const heroWatermark = document.getElementById("hero-watermark");
if (heroMedia && !prefersReducedMotion) {
  let ticking = false;
  const parallax = () => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.2) {
      heroMedia.style.transform = "translateY(" + y * 0.08 + "px)";
      if (heroWatermark) {
        heroWatermark.style.transform =
          "translateX(-50%) translateY(" + y * -0.06 + "px)";
      }
    }
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(parallax);
        ticking = true;
      }
    },
    { passive: true }
  );
}

/* ---------------- Magnetic buttons (fine pointers only) ---------------- */
if (window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion) {
  document.querySelectorAll(".btn-magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.16;
      const y = (e.clientY - r.top - r.height / 2) * 0.24;
      btn.style.transform = "translate(" + x + "px, " + y + "px)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

/* ---------------- Enquiry form → WhatsApp ---------------- */
const form = document.getElementById("enquiry-form");
const formNote = document.getElementById("form-note");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
      formNote.textContent = "Please add your name and phone number first.";
      formNote.classList.remove("is-sent");
      (name ? form.phone : form.name).focus();
      return;
    }

    const product = form.product.value;
    const message = form.message.value.trim();
    let text =
      "Hello PackPro Industries, I am " + name + " (" + phone + ").";
    if (product && product !== "General Enquiry") {
      text += " I am interested in " + product + ".";
    }
    if (message) {
      text += " Details: " + message;
    }
    text += " Please share your catalogue and quotation.";

    formNote.textContent = "Opening WhatsApp with your enquiry… just press send.";
    formNote.classList.add("is-sent");
    window.open(
      "https://wa.me/" + SITE_CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text),
      "_blank",
      "noopener"
    );
  });
}

/* ---------------- Footer year ---------------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
