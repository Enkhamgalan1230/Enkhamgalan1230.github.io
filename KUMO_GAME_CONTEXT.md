# KUMO_GAME_CONTEXT.md

This is a documentation-only handoff for another LLM adding a small interactive pixel-game section to the Astro portfolio homepage.

Generated directories such as node_modules, dist, and .astro are intentionally omitted. No game component exists yet.

## 1. Repository tree

````
Enkhamgalan1230.github.io/
├── src/
│   ├── pages/
│   │   ├── about.astro
│   │   ├── index.astro
│   │   └── projects.astro
│   ├── components/
│   │   ├── FaceButton.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── KumoChat.astro
│   │   ├── MusicButton.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectModal.astro
│   │   └── SectionTitle.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── project-dialogs.css
│   ├── projects/
│   │   ├── AccountProject.astro
│   │   ├── KumoProject.astro
│   │   ├── RecommendationProject.astro
│   │   └── ReceiptProject.astro
├── public/
│   ├── images/
│   │   ├── faces/
│   │   │   ├── left-main.png
│   │   │   ├── left-transition.png
│   │   │   ├── right-main.png
│   │   │   ├── right-transition.png
│   │   │   └── straight-main.png
│   │   ├── kumo_avatars/
│   │   │   ├── confused.png
│   │   │   ├── happy.png
│   │   │   ├── neutral.png
│   │   │   └── sleepy.png
│   │   ├── patterns/
│   │   │   └── Ulzii.png
│   │   ├── profile/
│   │   │   └── about.jpeg
│   │   ├── projects/
│   │   │   ├── cactus.png
│   │   │   ├── ger.png
│   │   │   ├── receipt-pics/
│   │   │   │   ├── receipt-average-price-by-store.jpg
│   │   │   │   ├── receipt-data-pipeline.jpg
│   │   │   │   ├── receipt-logo.jpg
│   │   │   │   ├── receipt-product-wordcloud.jpg
│   │   │   │   ├── receipt-scraping-pipeline.jpg
│   │   │   └── ulzii_small.png
│   │   └── kumo_real.jpg
│   └── videos/
│       ├── accountancy/accountancy.mp4
│       ├── patterns/vids/pattern1.mp4 ... pattern7.mp4
│       └── reciept/receipt_portfolio_demo.mp4
└── worker/
    └── src/
        ├── index.ts
        └── entwan/
            ├── prompts.ts
            ├── knowledge/
            │   ├── about.ts
            │   ├── education.ts
            │   ├── faq.ts
            │   ├── index.ts
            │   ├── interests.ts
            │   ├── projects.ts
            │   ├── skills.ts
            │   ├── types.ts
            │   ├── validate.ts
            │   └── work.ts
            └── rag/
                ├── embed.ts
                ├── formatChunk.ts
                ├── generate.ts
                ├── indexKnowledge.ts
                ├── normalizeQuery.ts
                ├── rerank.ts
                └── retrieve.ts
````

## 2. Homepage

The homepage is src/pages/index.astro. It contains the hero, project carousel, head prompt, Kumo information overlay, project modal instances, floating Kumo chat, inline homepage scripts, and extensive inline styles.

Full current contents of src/pages/index.astro:

````astro
---
import BaseLayout from "../layouts/BaseLayout.astro";

import ReceiptProject from "../projects/ReceiptProject.astro";
import AccountProject from "../projects/AccountProject.astro";
import KumoProject from "../projects/KumoProject.astro";
import RecommendationProject from "../projects/RecommendationProject.astro";
import KumoChat from "../components/KumoChat.astro";
---

<BaseLayout title="Entwan's Portfolio">

  <!-- =========================
       HERO
       ========================= -->

  <section class="hero">
    <div class="hero-content">
      <p class="hero-intro">
        Data and problem <span class="hero-green">given.</span>
        <br />
        I turn them into:
      </p>

      <div class="typewriter-wrapper">
        <span id="typewriter"></span>
        <span class="cursor" aria-hidden="true">|</span>
      </div>

      <a
        class="cv-download"
        href="/cv/Enkh-Amgalan_CV.pdf"
        target="_blank"
        rel="noreferrer"
        aria-label="View Enkh-Amgalan's CV"
      >
        <span>VIEW CV</span>
        <span class="cv-download-arrow" aria-hidden="true">&#x2197;</span>
      </a>
    </div>

    <a class="scroll-cue" href="#projects">
      <span>SCROLL TO EXPLORE</span>
      <span class="scroll-arrow">â†“</span>
    </a>
  </section>

  <!-- =========================
       PROJECTS
       ========================= -->

  <section class="projects-section" id="projects">
    <div class="projects-inner reveal-section">

      <div class="projects-heading">
        <p class="projects-label">
          SELECTED WORK
        </p>

        <h2>
          Some things I've built.
        </h2>

      </div>

      <!-- =========================
           CAROUSEL
           ========================= -->

      <div class="projects-carousel">

        <button
          class="carousel-button carousel-button-left"
          type="button"
          aria-label="Previous projects"
          data-carousel-prev
        >
          â†
        </button>

        <div class="projects-viewport">

          <div
            class="project-cards"
            data-project-track
          >

            <!-- =========================
                 01 RECEIPT
                 ========================= -->

            <div class="carousel-item">
              <button
                class="project-card project-card-video"
                type="button"
                data-project-open="receipt-project"
                aria-label="Open Receipt project"
              >
                <div class="project-video-background">
                  <video
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source
                      src="/videos/patterns/vids/pattern1.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div class="project-card-image">
                  <div class="video-card-content">

                    <span class="video-card-type">
                      AI / DATA / FULL STACK
                    </span>

                    <div class="video-card-main">
                      <strong>
                        Receipt
                      </strong>

                      <small>
                        Smart grocery budgeting
                      </small>
                    </div>

                  </div>
                </div>

                <div class="project-card-footer video-card-footer">
                  <span>Receipt</span>
                  <span>01</span>
                </div>

              </button>
            </div>

            <!-- =========================
                 02 ACCOUNTANCY
                 ========================= -->

            <div class="carousel-item">
              <button
                class="project-card project-card-video project-card-account"
                type="button"
                data-project-open="account-project"
                aria-label="Open Accountancy project"
              >
                <div class="project-video-background">
                  <video
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source
                      src="/videos/patterns/vids/pattern2.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div class="project-card-image">
                  <div class="video-card-content">

                    <span class="video-card-type">
                      DATA / FINANCE / AUTOMATION
                    </span>

                    <div class="video-card-main">
                      <strong>
                        Accountancy
                      </strong>

                      <small>
                        Explainable financial review
                      </small>
                    </div>

                  </div>
                </div>

                <div class="project-card-footer video-card-footer">
                  <span>Accountancy</span>
                  <span>02</span>
                </div>

              </button>
            </div>

            <!-- =========================
                 03 KUMO AI
                 ========================= -->

            <div class="carousel-item">
              <button
                class="project-card project-card-video project-card-kumo"
                type="button"
                data-project-open="kumo-project"
                aria-label="Open Kumo AI project"
              >
                <div class="project-video-background">
                  <video
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source
                      src="/videos/patterns/vids/pattern3.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div class="project-card-image">
                  <div class="video-card-content">

                    <span class="video-card-type">
                      AI / NLP / EXPERIMENT
                    </span>

                    <div class="video-card-main">
                      <strong>
                        KUMO AI.exe
                      </strong>

                      <small>
                        Retrieval-augmented portfolio assistant
                      </small>
                    </div>

                  </div>
                </div>

                <div class="project-card-footer video-card-footer">
                  <span>KUMO AI.exe</span>
                  <span>03</span>
                </div>

              </button>
            </div>

            <!-- =========================
                 04 MERCHANT RECOMMENDATION
                 ========================= -->

            <div class="carousel-item">
              <button
                class="project-card project-card-video project-card-recommendation"
                type="button"
                data-project-open="merchant-recommendation-project"
                aria-label="Open Merchant Recommendation System project"
              >
                <div class="project-video-background">
                  <video
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source
                      src="/videos/patterns/vids/pattern4.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div class="project-card-image">
                  <div class="video-card-content">

                    <span class="video-card-type">
                      RECOMMENDATIONS / FORECASTING / CLIENT WORK
                    </span>

                    <div class="video-card-main">
                      <strong>
                        Merchant
                      </strong>

                      <small>
                        Personalised product discovery
                      </small>
                    </div>

                  </div>
                </div>

                <div class="project-card-footer video-card-footer">
                  <span>Merchant</span>
                  <span>04</span>
                </div>

              </button>
            </div>

            <!-- =========================
                 05 PLACEHOLDER
                 ========================= -->

            <div class="carousel-item">
              <div
                class="project-card project-card-video placeholder-project"
                role="group"
                aria-label="Project Five â€” in progress"
              >
                <div class="project-video-background">
                  <video
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source
                      src="/videos/patterns/vids/pattern5.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div class="project-card-image">
                  <div class="video-card-content">

                    <span class="video-card-type">
                      ANALYTICS / VISUALISATION
                    </span>

                    <div class="video-card-main">
                      <strong>
                        Project Five
                      </strong>

                      <small>
                        Turning numbers into something useful
                      </small>
                    </div>

                  </div>
                </div>

                <div class="project-card-footer video-card-footer">
                  <span>Project Five</span>
                  <span>05</span>
                </div>

                <div class="placeholder-overlay" aria-hidden="true">
                  <span class="placeholder-status">
                    <span class="placeholder-status-dot"></span>
                    <span class="placeholder-badge">IN PROGRESS</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- =========================
                 06 PLACEHOLDER
                 ========================= -->

            <div class="carousel-item">
              <div
                class="project-card project-card-video placeholder-project"
                role="group"
                aria-label="Project Six â€” in progress"
              >
                <div class="project-video-background">
                  <video
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source
                      src="/videos/patterns/vids/pattern6.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div class="project-card-image">
                  <div class="video-card-content">

                    <span class="video-card-type">
                      PYTHON / DATA / TOOLING
                    </span>

                    <div class="video-card-main">
                      <strong>
                        Project Six
                      </strong>

                      <small>
                        Solving another annoying problem
                      </small>
                    </div>

                  </div>
                </div>

                <div class="project-card-footer video-card-footer">
                  <span>Project Six</span>
                  <span>06</span>
                </div>

                <div class="placeholder-overlay" aria-hidden="true">
                  <span class="placeholder-status">
                    <span class="placeholder-status-dot"></span>
                    <span class="placeholder-badge">IN PROGRESS</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- =========================
                 07 PLACEHOLDER
                 ========================= -->

            <div class="carousel-item">
              <div
                class="project-card project-card-video placeholder-project"
                role="group"
                aria-label="Project Seven â€” in progress"
              >
                <div class="project-video-background">
                  <video
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source
                      src="/videos/patterns/vids/pattern7.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div class="project-card-image">
                  <div class="video-card-content">

                    <span class="video-card-type">
                      AI / DATA / SOMETHING COOL
                    </span>

                    <div class="video-card-main">
                      <strong>
                        Project Seven
                      </strong>

                      <small>
                        CooooOol things live here
                      </small>
                    </div>

                  </div>
                </div>

                <div class="project-card-footer video-card-footer">
                  <span>Project Seven</span>
                  <span>07</span>
                </div>

                <div class="placeholder-overlay" aria-hidden="true">
                  <span class="placeholder-status">
                    <span class="placeholder-status-dot"></span>
                    <span class="placeholder-badge">IN PROGRESS</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          class="carousel-button carousel-button-right"
          type="button"
          aria-label="Next projects"
          data-carousel-next
        >
          â†’
        </button>

        <a
          class="projects-scroll-cue"
          href="#head-prompt"
        >
          <span>SCROLL TO EXPLORE</span>
          <span class="scroll-arrow" aria-hidden="true">&#x2193;</span>
        </a>

      </div>
    </div>
  </section>

  <section
    class="head-prompt"
    id="head-prompt"
    aria-labelledby="head-prompt-title"
  >
    <p class="head-prompt-label">BY THE WAY &#x1F447;</p>

    <h2 id="head-prompt-title">
      Did you click on that
      <span class="head-prompt-yet">
        <img
          class="head-prompt-face"
          src="/images/faces/straight-main.png"
          alt=""
          aria-hidden="true"
        />
        yet?
      </span>
    </h2>

    <div class="head-prompt-actions">
      <button
        class="head-prompt-button head-prompt-button-muted"
        type="button"
        data-head-not-yet
      >
        Not yet
      </button>

      <button
        class="head-prompt-button"
        type="button"
        data-head-did-it
      >
        Yeah I did
      </button>
    </div>

    <div
      class="head-toast"
      data-head-toast
      role="status"
      aria-live="polite"
    >
      NICE TO MEET YOU IN THAT CASE &#x1F91D;
    </div>
  </section>

  <div class="kumo-info-overlay" data-kumo-info-overlay aria-hidden="true">
    <div
      class="kumo-info-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kumo-info-title"
    >
      <button
        class="kumo-info-close"
        type="button"
        data-kumo-info-close
        aria-label="Close Kumo information"
      >
        &#x00D7;
      </button>

      <div class="kumo-info-copy">
        <p class="head-prompt-label">KUMO.exe</p>
        <h2 id="kumo-info-title">Meet Kumo, my old cat.</h2>
        <p>
          She was a tiny boo who came into my life so suddenly and left it
          just as quickly. I wasn't her fan the first day, idk why.
          Everything changed following night when she slept on my chest whole night.
        </p>
        <p>
          I loved her deeply.
        </p>
        <p>
          I named her Kumo(é›²) because it meant â€œcloudâ€ in Japanese, and her soft cloudy-coloured fur made the
          name feel perfect.
        </p>
      </div>

      <div class="kumo-info-image">
        <img src="/images/kumo_real.jpg" alt="Kumo" />
      </div>
    </div>
  </div>

  <ReceiptProject />
  <AccountProject />
  <KumoProject />
  <RecommendationProject />
  <KumoChat />

</BaseLayout>

<script>
  const kumoWhoButton =
    document.querySelector<HTMLButtonElement>(
      "[data-kumo-who]"
    );

  const kumoInfoOverlay =
    document.querySelector<HTMLElement>(
      "[data-kumo-info-overlay]"
    );

  const kumoInfoClose =
    document.querySelector<HTMLButtonElement>(
      "[data-kumo-info-close]"
    );

  function closeKumoInfo() {
    kumoInfoOverlay?.classList.remove("is-open");
    kumoInfoOverlay?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  kumoWhoButton?.addEventListener("click", () => {
    kumoInfoOverlay?.classList.add("is-open");
    kumoInfoOverlay?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    kumoInfoClose?.focus();
  });

  kumoInfoClose?.addEventListener("click", closeKumoInfo);

  kumoInfoOverlay?.addEventListener("click", (event) => {
    if (event.target === kumoInfoOverlay) {
      closeKumoInfo();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      kumoInfoOverlay?.classList.contains("is-open")
    ) {
      closeKumoInfo();
    }
  });

  const notYetButton =
    document.querySelector<HTMLButtonElement>(
      "[data-head-not-yet]"
    );

  const didItButton =
    document.querySelector<HTMLButtonElement>(
      "[data-head-did-it]"
    );

  let toastTimer: number | undefined;

  function showHeadToast() {
    const toast =
      document.querySelector<HTMLElement>(
        "[data-head-toast]"
      );

    if (!toast) return;

    window.clearTimeout(toastTimer);
    toast.classList.remove("is-visible");

    requestAnimationFrame(() => {
      toast?.classList.add("is-visible");
    });

    toastTimer = window.setTimeout(() => {
      toast?.classList.remove("is-visible");
    }, 3200);
  }

  notYetButton?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  didItButton?.addEventListener("click", showHeadToast);

  const promptFace =
    document.querySelector<HTMLImageElement>(
      ".head-prompt-face"
    );

  const promptFaceFrames = [
    { src: "/images/faces/straight-main.png", duration: 80 },
    { src: "/images/faces/left-transition.png", duration: 90 },
    { src: "/images/faces/left-main.png", duration: 240 },
    { src: "/images/faces/left-transition.png", duration: 90 },
    { src: "/images/faces/straight-main.png", duration: 120 },
    { src: "/images/faces/right-transition.png", duration: 90 },
    { src: "/images/faces/right-main.png", duration: 240 },
    { src: "/images/faces/right-transition.png", duration: 90 },
    { src: "/images/faces/straight-main.png", duration: 0 },
  ];

  let promptFacePlaying = false;

  promptFaceFrames.forEach(({ src }) => {
    const image = new Image();
    image.src = src;
  });

  async function playPromptFace() {
    if (
      !promptFace ||
      promptFacePlaying ||
      document.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    promptFacePlaying = true;

    try {
      for (const frame of promptFaceFrames) {
        promptFace.src = frame.src;

        if (frame.duration > 0) {
          await wait(frame.duration);
        }
      }
    } finally {
      promptFace.src = "/images/faces/straight-main.png";
      promptFacePlaying = false;
    }
  }

  window.setInterval(playPromptFace, 6000);

  /* =========================
     TYPEWRITER
     ========================= */

  const words = [
    "Automation",
    "Predictions",
    "Efficiency",
    "â€œYeahh, that makes senseâ€ moments",
    "CooooOol AI things",
  ];

  const element =
    document.querySelector<HTMLElement>(
      "#typewriter"
    );

  const typingSpeed = 85;
  const deletingSpeed = 25;
  const finishedPause = 1000;
  const emptyPause = 500;

  const wait = (time: number) =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, time);
    });

  async function typeWord(
    word: string
  ) {
    if (!element) return;

    for (
      let i = 1;
      i <= word.length;
      i++
    ) {
      element.textContent =
        word.slice(0, i);

      await wait(
        typingSpeed
      );
    }
  }

  async function deleteWord(
    word: string
  ) {
    if (!element) return;

    for (
      let i = word.length;
      i >= 0;
      i--
    ) {
      element.textContent =
        word.slice(0, i);

      await wait(
        deletingSpeed
      );
    }
  }

  async function startTypewriter() {
    if (!element) return;

    while (true) {
      for (const word of words) {
        await typeWord(word);

        await wait(
          finishedPause
        );

        await deleteWord(word);

        await wait(
          emptyPause
        );
      }
    }
  }

  startTypewriter();

  /* =========================
     SECTION REVEAL
     ========================= */

  const revealSection =
    document.querySelector<HTMLElement>(
      ".reveal-section"
    );

  if (revealSection) {
    const observer =
      new IntersectionObserver(
        (entries) => {
          for (
            const entry
            of entries
          ) {
            entry.target.classList.toggle(
              "is-visible",
              entry.isIntersecting
            );
          }
        },
        {
          threshold: 0.18,
          rootMargin: "-8% 0px -8% 0px",
        }
      );

    observer.observe(
      revealSection
    );
  }

  /* =========================
     SCROLL TRANSITION
     ========================= */

  const hero =
    document.querySelector<HTMLElement>(
      ".hero"
    );

  const scrollCue =
    document.querySelector<HTMLAnchorElement>(
      ".scroll-cue"
    );

  const projectsSection =
    document.querySelector<HTMLElement>(
      ".projects-section"
    );

  const headPrompt =
    document.querySelector<HTMLElement>(
      "#head-prompt"
    );

  let scrollFrame: number | undefined;

  function updateScrollTransition() {
    scrollFrame = undefined;

    if (hero) {
      const fadeStart = 90;
      const fadeDistance = Math.max(
        hero.offsetHeight * 0.9,
        620
      );

      const fade = Math.min(
        Math.max(
          (window.scrollY - fadeStart) /
            fadeDistance,
          0
        ),
        1
      );

      hero.style.setProperty(
        "--hero-fade",
        fade.toFixed(3)
      );
    }

    if (!scrollCue || !hero || !headPrompt) {
      return;
    }

    const promptTop =
      headPrompt.getBoundingClientRect().top;

    const promptFade = Math.min(
      Math.max(
        (window.innerHeight * 0.95 - promptTop) /
          (window.innerHeight * 0.75),
        0
      ),
      1
    );

    headPrompt.style.setProperty(
      "--prompt-fade",
      promptFade.toFixed(3)
    );

    projectsSection?.style.setProperty(
      "--projects-fade",
      (1 - promptFade).toFixed(3)
    );

    const heroHasPassed =
      hero.getBoundingClientRect().bottom <= 0;

    const promptIsVisible =
      promptTop <=
      window.innerHeight * 0.72;

    const shouldFloat =
      heroHasPassed && !promptIsVisible;

    scrollCue.classList.toggle(
      "is-floating",
      shouldFloat
    );

    scrollCue.href = shouldFloat
      ? "#head-prompt"
      : "#projects";
  }

  function requestScrollTransition() {
    if (scrollFrame !== undefined) return;

    scrollFrame = window.requestAnimationFrame(
      updateScrollTransition
    );
  }

  window.addEventListener(
    "scroll",
    requestScrollTransition,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestScrollTransition
  );

  requestScrollTransition();

  /* =========================
     PROJECT CAROUSEL
     ========================= */

  const projectTrack =
    document.querySelector<HTMLElement>(
      "[data-project-track]"
    );

  const nextButton =
    document.querySelector<HTMLButtonElement>(
      "[data-carousel-next]"
    );

  const previousButton =
    document.querySelector<HTMLButtonElement>(
      "[data-carousel-prev]"
    );

  if (
    projectTrack &&
    nextButton &&
    previousButton
  ) {
    const items =
      Array.from(
        projectTrack.querySelectorAll<HTMLElement>(
          ".carousel-item"
        )
      );

    const videos = items.map((item) =>
      item.querySelector<HTMLVideoElement>(
        ".project-video-background video"
      )
    );

    /*
      Position numbers.

      Desktop initial:
      0 1 2 3 4 5 6

      0-4 are visible.
      5 and 6 wait off-screen right.

      After NEXT:
      -1 0 1 2 3 4 5

      Then the -1 card is silently
      wrapped to position 6.
    */

    const positions =
      items.map(
        (_, index) => index
      );

    let carouselAnimating = false;

    const animationDuration = 600;

    /* =========================
       RESPONSIVE CARD COUNT
       ========================= */

    function getVisibleCount() {
      if (
        window.innerWidth <= 640
      ) {
        return 1;
      }

      if (
        window.innerWidth <= 1100
      ) {
        return 3;
      }

      return 5;
    }

    /* =========================
       SIZE / POSITION
       ========================= */

    function layoutItems(
      animate = false
    ) {
      const visibleCount =
        getVisibleCount();

      const styles =
        window.getComputedStyle(
          projectTrack
        );

      const gap =
        parseFloat(
          styles.getPropertyValue(
            "--project-gap"
          )
        ) || 22;

      const trackWidth =
        projectTrack
          .getBoundingClientRect()
          .width;

      const cardWidth =
        (
          trackWidth
          -
          (
            gap *
            (
              visibleCount - 1
            )
          )
        )
        /
        visibleCount;

      /*
        Preserve original playing-card
        ratio of 0.72.
      */

      const cardHeight =
        cardWidth / 0.72;

      projectTrack.style.height =
        `${cardHeight}px`;

      items.forEach(
        (item, index) => {
          const position =
            positions[index];

          const x =
            position *
            (
              cardWidth + gap
            );

          item.style.width =
            `${cardWidth}px`;

          item.style.height =
            `${cardHeight}px`;

          item.style.transition =
            animate
              ? `transform ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "none";

          item.style.transform =
            `translate3d(${x}px, 0, 0)`;

          const visible =
            position >= 0 &&
            position < visibleCount;

          const nearby =
            position >= -1 &&
            position <= visibleCount + 1;

          item.style.visibility =
            nearby
              ? "visible"
              : "hidden";

          item.style.pointerEvents =
            visible
              ? "auto"
              : "none";

          item.classList.toggle(
            "is-visible",
            visible
          );

          item.setAttribute(
            "aria-hidden",
            visible
              ? "false"
              : "true"
          );
        }
      );

      updateVideoPlayback(visibleCount);
    }

    /*
      Video backgrounds are the most expensive part of
      the carousel. Keep only a small number playing and
      pause everything that is outside the viewport.
    */
    function updateVideoPlayback(
      visibleCount: number
    ) {
      const maxPlayingVideos =
        window.innerWidth <= 640
          ? 1
          : 3;

      let playingVideos = 0;

      videos.forEach((video, index) => {
        if (!video) return;

        const shouldPlay =
          positions[index] >= 0 &&
          positions[index] < visibleCount &&
          playingVideos < maxPlayingVideos;

        if (shouldPlay) {
          playingVideos += 1;

          video.play().catch(() => {
            // Autoplay can be unavailable in some browsers.
          });
        } else {
          video.pause();
        }
      });
    }

    /* =========================
       NEXT
       ========================= */

    function goNext() {
      if (
        carouselAnimating ||
        items.length === 0
      ) {
        return;
      }

      carouselAnimating = true;

      /*
        Move every wrapper one
        position to the left.
      */

      positions.forEach(
        (_, index) => {
          positions[index] -= 1;
        }
      );

      layoutItems(true);

      window.setTimeout(
        () => {
          /*
            Anything that left the
            screen gets placed quietly
            at the far right.

            No DOM movement.
            No card animation restart.
          */

          positions.forEach(
            (position, index) => {
              if (position < 0) {
                positions[index] +=
                  items.length;
              }
            }
          );

          layoutItems(false);

          carouselAnimating = false;
        },
        animationDuration
      );
    }

    /* =========================
       PREVIOUS
       ========================= */

    function goPrevious() {
      if (
        carouselAnimating ||
        items.length === 0
      ) {
        return;
      }

      carouselAnimating = true;

      /*
        Find the item currently
        furthest to the right.
      */

      let highestPosition =
        Math.max(
          ...positions
        );

      /*
        Move that card silently to
        one position before the
        visible viewport.
      */

      const itemToWrap =
        positions.indexOf(
          highestPosition
        );

      positions[itemToWrap] = -1;

      layoutItems(false);

      /*
        Force the browser to commit
        that hidden starting position.
      */

      void projectTrack.offsetWidth;

      /*
        Now everything slides right.
      */

      positions.forEach(
        (_, index) => {
          positions[index] += 1;
        }
      );

      layoutItems(true);

      window.setTimeout(
        () => {
          layoutItems(false);

          carouselAnimating = false;
        },
        animationDuration
      );
    }

    /* =========================
       BUTTON EVENTS
       ========================= */

    nextButton.addEventListener(
      "click",
      goNext
    );

    previousButton.addEventListener(
      "click",
      goPrevious
    );

    /* =========================
       RESIZE
       ========================= */

    let resizeTimer:
      number | undefined;

    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(
          resizeTimer
        );

        resizeTimer =
          window.setTimeout(
            () => {
              layoutItems(false);
            },
            120
          );
      }
    );

    /* =========================
       INITIAL LAYOUT
       ========================= */

    requestAnimationFrame(
      () => {
        layoutItems(false);
      }
    );
  }
</script>

<style>

  /* =========================
     HERO
     ========================= */

  .hero {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    min-height:
      calc(
        100vh - 140px
      );

    padding: 24px;

    overflow: hidden;

    isolation: isolate;

    background: #edecea;
  }

  /*
    A quiet dot grid gives the hero texture while keeping
    the negative space and typography in control.
  */

  .hero::before {
    position: absolute;
    inset: 0;

    content: "";
    pointer-events: none;
    z-index: 0;

    background-image:
      radial-gradient(
        circle,
        rgba(17, 17, 17, 0.17) 1.25px,
        transparent 1.5px
      );
    background-size: 30px 30px;

    opacity: calc(1 - var(--hero-fade, 0));
  }

  .hero-content {
    position: relative;

    z-index: 1;

    opacity: calc(1 - var(--hero-fade, 0));

    will-change: opacity;

    width:
      min(
        100%,
        860px
      );

    text-align: left;
  }

  .hero-green {
    color: #4d7657;
  }

  .hero-intro {
    flex: 1;

    margin: 0;

    font-family:
      "Instrument Serif",
      serif;

    font-size:
      clamp(
        2.1rem,
        4vw,
        4.2rem
      );

    font-weight: 400;

    line-height: 0.98;

    letter-spacing:
      -0.025em;

    color: #111111;
  }

  .cv-download {
    display: inline-flex;

    align-items: center;
    gap: 12px;

    flex-shrink: 0;

    align-self: flex-start;

    margin-top: 38px;
    padding: 16px 19px 15px;

    border: 1px solid rgba(17, 17, 17, 0.55);
    border-radius: 2px;

    background: rgba(237, 236, 234, 0.82);

    font-family: "Courier Prime", monospace;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    line-height: 1;

    color: #111111;

    box-shadow: 8px 9px 0 rgba(77, 118, 87, 0.24);

    animation: cv-float 8s ease-in-out infinite;

    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .cv-download-arrow {
    font-size: 1rem;
    line-height: 0.7;
  }

  @media (hover: hover) and (pointer: fine) {
    .cv-download:hover {
      border-color: #4d7657;
      background: #4d7657;
      color: #ffffff;
      box-shadow: 2px 2px 0 rgba(17, 17, 17, 0.18);
      animation-play-state: paused;
      transform: rotate(0deg) translateY(2px);
    }
  }

  .typewriter-wrapper {
    min-height: 2em;

    margin-top: 8px;

    font-family:
      "Instrument Serif",
      serif;

    font-size:
      clamp(
        2.3rem,
        4.2vw,
        4.4rem
      );

    font-style: italic;

    font-weight: 400;

    line-height: 0.95;

    color: #4d7657;
  }

  .cursor {
    display: inline-block;

    margin-left: 2px;

    font-style: normal;

    animation:
      blink
      0.8s
      steps(1)
      infinite;
  }

  /* =========================
     SCROLL CUE
     ========================= */

  .scroll-cue {
    position: absolute;

    left: 50%;
    bottom: 28px;

    transform:
      translateX(-50%);

    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding:
      8px 13px;

    border:
      1px solid
      rgba(
        17,
        17,
        17,
        0.22
      );

    border-radius: 999px;

    background:
      rgba(
        237,
        236,
        234,
        0.72
      );

    backdrop-filter:
      blur(8px);

    -webkit-backdrop-filter:
      blur(8px);

    font-family:
      "Courier Prime",
      monospace;

    font-size: 0.62rem;

    letter-spacing:
      0.06em;

    white-space: nowrap;

    z-index: 2;

    animation:
      float-scroll-cue
      2.8s
      ease-in-out
      infinite;

    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .scroll-cue.is-floating {
    position: fixed;

    right: 24px;
    bottom: 24px;
    left: auto;

    animation: none;

    transform: none;
  }

  .scroll-arrow {
    color: #4d7657;

    font-size: 0.9rem;
  }

  .projects-scroll-cue {
    display: flex;
    align-items: center;
    gap: 8px;

    width: max-content;
    margin: 24px auto 0;
    padding: 8px 13px;

    border: 1px solid rgba(17, 17, 17, 0.22);
    border-radius: 999px;

    background: rgba(237, 236, 234, 0.72);

    font-family: "Courier Prime", monospace;
    font-size: 0.62rem;
    letter-spacing: 0.06em;

    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .projects-scroll-cue:hover {
    transform: translateY(2px);
    border-color: #4d7657;
    background: rgba(77, 118, 87, 0.08);
  }

  /* =========================
     HEAD PROMPT
     ========================= */

  .head-prompt {
    min-height: calc(100vh - 80px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 88px 24px 112px;

    text-align: center;

    background: #edecea;

    opacity: var(--prompt-fade, 0);

    transition: opacity 0.18s linear;

    will-change: opacity;
  }

  .head-prompt-label {
    margin: 0 0 14px;

    font-family: "Courier Prime", monospace;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    color: #777777;
  }

  .head-prompt h2 {
    margin: 0;

    font-family: "Instrument Serif", serif;
    font-size: clamp(3rem, 5.4vw, 5.5rem);
    font-weight: 400;
    line-height: 0.95;
    letter-spacing: -0.025em;

    animation:
      head-prompt-float
      4.8s
      ease-in-out
      infinite;
  }

  .head-prompt-yet {
    white-space: nowrap;
  }

  .head-prompt-face {
    display: inline-block;

    width: 1em;
    height: 1em;

    margin: 0 0.08em;

    object-fit: contain;
    vertical-align: -0.12em;
  }

  .head-prompt-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 28px;
  }

  .head-prompt-button {
    padding: 11px 16px;

    border: 1px solid rgba(17, 17, 17, 0.22);
    border-radius: 999px;

    background: #4d7657;
    color: #ffffff;

    font-family: "Courier Prime", monospace;
    font-size: 0.76rem;
    cursor: pointer;

    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .head-prompt-button-muted {
    background: transparent;
    color: #333333;
  }

  .head-prompt-button:hover {
    transform: translateY(-2px);
    border-color: #4d7657;
  }

  .head-prompt-button-muted:hover {
    background: rgba(77, 118, 87, 0.08);
  }

  .kumo-info-overlay {
    position: fixed;
    inset: 0;
    z-index: 10001;

    display: grid;
    place-items: center;
    padding: 24px;

    background: rgba(17, 17, 17, 0.46);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }

  .kumo-info-overlay.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  .kumo-info-card {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(220px, 0.82fr);
    width: min(760px, 100%);
    overflow: hidden;
    border: 1px solid rgba(17, 17, 17, 0.3);
    border-radius: 4px;
    background: #edecea;
    box-shadow: 12px 14px 0 rgba(77, 118, 87, 0.3);
    transform: translateY(14px);
    transition: transform 0.25s ease;
  }

  .kumo-info-overlay.is-open .kumo-info-card {
    transform: translateY(0);
  }

  .kumo-info-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(34px, 6vw, 64px);
  }

  .kumo-info-copy h2 {
    margin: 0 0 18px;
    font-family: "Instrument Serif", serif;
    font-size: clamp(2.7rem, 6vw, 5rem);
    font-weight: 400;
    line-height: 0.92;
  }

  .kumo-info-copy > p:not(.head-prompt-label) {
    max-width: 28rem;
    margin: 0;
    font-family: "Courier Prime", monospace;
    font-size: 0.8rem;
    line-height: 1.6;
    color: #555555;
  }

  .kumo-info-copy > p:not(.head-prompt-label) + p:not(.head-prompt-label) {
    margin-top: 12px;
  }

  .kumo-info-image {
    min-height: 360px;
    background: #d5d3cf;
  }

  .kumo-info-image img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 360px;
    object-fit: cover;
  }

  .kumo-info-close {
    position: absolute;
    top: 14px;
    right: 16px;
    z-index: 1;
    width: 34px;
    height: 34px;
    border: 1px solid rgba(17, 17, 17, 0.25);
    border-radius: 50%;
    background: rgba(237, 236, 234, 0.82);
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
  }

  .kumo-info-close:hover {
    background: #4d7657;
    color: #ffffff;
  }

  .head-toast {
    position: fixed;
    top: 22px;
    right: 22px;
    z-index: 10000;

    max-width: min(330px, calc(100vw - 44px));
    padding: 13px 16px;

    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    background: linear-gradient(135deg, #4d7657, #628b6b);
    color: #ffffff;

    box-shadow: 0 12px 30px rgba(77, 118, 87, 0.24);

    font-family: "Courier Prime", monospace;
    font-size: 0.74rem;
    line-height: 1.4;

    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;

    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .head-toast.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* =========================
     PROJECT SECTION
     ========================= */

  .projects-section {
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    padding:
      110px 30px
      130px;

    background: #edecea;

    opacity: var(--projects-fade, 1);

    transition: opacity 0.18s linear;

    will-change: opacity;

    overflow: hidden;
  }

  .projects-inner {
    width:
      min(
        1700px,
        100%
      );

    margin: 0 auto;

    opacity: 0;

    transform:
      translateY(44px)
      scale(0.985);

    filter: blur(5px);

    transition:
      opacity 0.8s ease,
      transform
        0.8s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        ),
      filter 0.8s ease;

    will-change: opacity, transform, filter;
  }

  .projects-inner.is-visible {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);

    filter: blur(0);
  }

  .projects-heading {
    margin-bottom: 58px;
  }

  .projects-label {
    margin:
      0 0 14px;

    font-family:
      "Courier Prime",
      monospace;

    font-size: 0.74rem;

    letter-spacing:
      0.08em;

    color: #777777;
  }

  .projects-heading h2 {
    margin: 0;

    font-family:
      "Instrument Serif",
      serif;

    font-size:
      clamp(
        3rem,
        5vw,
        5.5rem
      );

    font-weight: 400;

    line-height: 0.95;

    letter-spacing:
      -0.025em;

    color: #111111;
  }

  /* =========================
     CAROUSEL
     ========================= */

  .projects-carousel {
    position: relative;

    width: 100%;
  }

  .projects-viewport {
    position: relative;

    width: 100%;

    overflow: hidden;

    padding:
      20px 2px
      30px;
  }

  .project-cards {
    --project-gap: 22px;

    position: relative;

    width: 100%;

    min-height: 300px;
  }

  /*
    THIS wrapper does the
    horizontal carousel motion.
  */

  .carousel-item {
    position: absolute;

    top: 0;
    left: 0;

    will-change: auto;

    transform:
      translate3d(
        0,
        0,
        0
      );
  }

  .carousel-item:not(.is-visible) .project-card {
    animation-play-state: paused;
  }

  .carousel-item.is-visible {
    will-change: transform;
  }

  /* =========================
     PROJECT CARD

     Card itself ONLY handles
     floating/rocking.
     ========================= */

  .project-card {
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding: 0;

    overflow: hidden;

    contain: layout paint;

    backface-visibility: hidden;

    appearance: none;

    text-align: left;

    text-decoration: none;

    color: inherit;

    cursor: pointer;

    background: #f6f5f2;

    border:
      1px solid
      rgba(
        17,
        17,
        17,
        0.17
      );

    border-radius: 18px;

    box-shadow:
      0 14px 30px
      rgba(
        17,
        17,
        17,
        0.07
      );

    animation:
      card-float
      5.8s
      ease-in-out
      infinite,

      card-rock
      7.5s
      ease-in-out
      infinite;

    transition:
      box-shadow
      0.28s ease,

      border-color
      0.28s ease,

      scale
      0.28s ease;
  }

  /*
    Different starting points
    so cards don't float together.
  */

  .carousel-item:nth-child(1)
  .project-card {
    animation-delay:
      -1.2s,
      -2.8s;
  }

  .carousel-item:nth-child(2)
  .project-card {
    animation-delay:
      -3.1s,
      -0.7s;
  }

  .carousel-item:nth-child(3)
  .project-card {
    animation-delay:
      -2.2s,
      -4.1s;
  }

  .carousel-item:nth-child(4)
  .project-card {
    animation-delay:
      -4.6s,
      -1.5s;
  }

  .carousel-item:nth-child(5)
  .project-card {
    animation-delay:
      -0.9s,
      -3.4s;
  }

  .carousel-item:nth-child(6)
  .project-card {
    animation-delay:
      -2.7s,
      -1.1s;
  }

  .carousel-item:nth-child(7)
  .project-card {
    animation-delay:
      -4s,
      -2.2s;
  }

  @media (hover: hover) and (pointer: fine) {
  .project-card:hover {
      scale: 1.035;

      animation-play-state:
        paused;

      border-color:
        rgba(
          77,
          118,
          87,
          0.4
        );

      box-shadow:
        0 22px 44px
        rgba(
          17,
          17,
          17,
          0.12
        );
    }
  }

  .placeholder-project {
    cursor: default;
  }

  .placeholder-project .project-video-background video {
    filter: blur(7px);
    opacity: 0.56;
    transform: scale(1.08);
  }

  .placeholder-project .project-card-image,
  .placeholder-project .project-card-footer {
    opacity: 0.58;
  }

  .placeholder-overlay {
    position: absolute;
    inset: 0;
    z-index: 5;

    display: flex;
    align-items: center;
    justify-content: center;

    pointer-events: none;

    color: #ffffff;
    text-align: center;
  }

  .placeholder-status {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 13px 18px 13px 14px;

    border: 1px solid rgba(255, 255, 255, 0.34);
    border-radius: 999px;

    background:
      radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.18), transparent 42%),
      linear-gradient(135deg, rgba(17, 17, 17, 0.58), rgba(17, 17, 17, 0.42));
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(13px) saturate(125%);
    -webkit-backdrop-filter: blur(13px) saturate(125%);
  }

  .placeholder-status-dot {
    width: 8px;
    height: 8px;
    flex: 0 0 8px;
    border-radius: 50%;
    background: #72d89a;
    box-shadow: 0 0 0 3px rgba(114, 216, 154, 0.12), 0 0 13px rgba(114, 216, 154, 0.78);
    animation: placeholder-status-blink 3.2s ease-in-out infinite;
  }

  @keyframes placeholder-status-blink {
    0%,
    100% {
      opacity: 0.42;
      box-shadow: 0 0 0 3px rgba(114, 216, 154, 0.08), 0 0 7px rgba(114, 216, 154, 0.38);
    }

    50% {
      opacity: 1;
      box-shadow: 0 0 0 3px rgba(114, 216, 154, 0.18), 0 0 15px rgba(114, 216, 154, 0.86);
    }
  }

  .placeholder-badge {
    padding: 0;
    color: #ffffff;
    font-family: "Courier Prime", monospace;
    font-size: 0.72rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    line-height: 1;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.72);
  }

  .project-card-image {
    position: relative;

    flex: 1;

    min-height: 0;

    z-index: 1;
  }

  /* =========================
     ARROWS
     ========================= */

  .carousel-button {
    position: absolute;

    top: calc((100% - 56px) / 2);

    z-index: 20;

    width: 46px;
    height: 46px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;

    border:
      1px solid
      rgba(
        17,
        17,
        17,
        0.16
      );

    border-radius: 999px;

    background:
      rgba(
        237,
        236,
        234,
        0.92
      );

    backdrop-filter:
      blur(10px);

    -webkit-backdrop-filter:
      blur(10px);

    color: #111111;

    font-family:
      "Courier Prime",
      monospace;

    font-size: 1.05rem;

    line-height: 1;

    cursor: pointer;

    transform:
      translateY(-50%);

    box-shadow:
      0 8px 24px
      rgba(
        17,
        17,
        17,
        0.08
      );

    transition:
      transform 0.2s ease,
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .carousel-button:hover {
      background: #4d7657;

      border-color: #4d7657;

      color: #ffffff;
    }
  }

  .carousel-button:active {
    transform:
      translateY(-50%)
      scale(0.92);
  }

  .carousel-button-left {
    left: -22px;
  }

  .carousel-button-right {
    right: -22px;
  }

  /* =========================
     VIDEO BACKGROUND
     ========================= */

  .project-card-video {
    background: #edecea;

    color: #ffffff;
  }

  .project-video-background {
    position: absolute;

    inset: 0;

    overflow: hidden;

    z-index: 0;

    background: #edecea;
  }

  .project-video-background video {
    position: absolute;

    inset: 0;

    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    object-position: center;

    pointer-events: none;

    opacity: 1;

    filter: none;

    transform: none;

    contain: strict;
  }

  .project-card-account .project-video-background {
    background: linear-gradient(135deg, #D2D9E1 0%, #93A7C1 31.2%, #B5C2D1 56.2%, #C6D0DB 72.2%, #EAE6DF 82.7%, #A8B7C9 100%);
  }

  /* =========================
     CARD CONTENT
     ========================= */

  .video-card-content {
    position: relative;

    z-index: 2;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    padding: 24px;

    color: #ffffff;
  }

  .video-card-type {
    font-family:
      "Courier Prime",
      monospace;

    font-size: 0.86rem;

    font-weight: 400;

    line-height: 1.4;

    letter-spacing:
      0.045em;

    color:
      rgba(
        255,
        255,
        255,
        0.98
      );

    text-shadow:
      0 2px 14px
      rgba(
        0,
        0,
        0,
        0.5
      );
  }

  .video-card-main {
    margin-top: auto;

    display: flex;
    flex-direction: column;
  }

  .video-card-main strong {
    font-family:
      "Instrument Serif",
      serif;

    font-size:
      clamp(
        2.8rem,
        3vw,
        4.6rem
      );

    font-weight: 400;

    line-height: 0.86;

    letter-spacing:
      -0.035em;

    color: #ffffff;

    overflow-wrap: anywhere;

    text-shadow:
      0 3px 20px
      rgba(
        0,
        0,
        0,
        0.48
      );
  }

  .video-card-main small {
    margin-top: 14px;

    max-width: 260px;

    font-family:
      "Courier Prime",
      monospace;

    font-size: 0.86rem;

    font-weight: 400;

    line-height: 1.45;

    color:
      rgba(
        255,
        255,
        255,
        0.98
      );

    text-shadow:
      0 2px 14px
      rgba(
        0,
        0,
        0,
        0.5
      );
  }

  /* =========================
     FOOTER
     ========================= */

  .project-card-footer {
    position: relative;

    z-index: 3;

    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 12px;

    padding:
      17px 19px;

    font-family:
      "Courier Prime",
      monospace;

    font-size: 0.82rem;

    font-weight: 400;
  }

  .video-card-footer {
    background:
      rgba(
        20,
        20,
        20,
        0.34
      );

    backdrop-filter:
      blur(8px);

    -webkit-backdrop-filter:
      blur(8px);

    color: #ffffff;

    border-top:
      1px solid
      rgba(
        255,
        255,
        255,
        0.15
      );
  }

  /* =========================
     ANIMATIONS
     ========================= */

  @keyframes head-prompt-float {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-7px);
    }
  }

  @keyframes float-scroll-cue {
    0%,
    100% {
      transform:
        translate(
          -50%,
          0
        );
    }

    50% {
      transform:
        translate(
          -50%,
          -6px
        );
    }
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }

    51%,
    100% {
      opacity: 0;
    }
  }

  @keyframes cv-float {
    0%,
    100% {
      transform: translateY(4px) rotate(-4deg);
    }

    50% {
      transform: translateY(-10px) rotate(4deg);
    }
  }

  /*
    IMPORTANT:

    Float ONLY controls translate.

    Rock ONLY controls rotate.

    They no longer fight over
    the same animation property.
  */

  @keyframes card-float {
    0%,
    100% {
      translate:
        0 3px;
    }

    50% {
      translate:
        0 -9px;
    }
  }

  @keyframes card-rock {
    0%,
    100% {
      rotate:
        -0.45deg;
    }

    50% {
      rotate:
        0.45deg;
    }
  }

  /* =========================
     TABLET
     ========================= */

  @media (
    max-width: 1100px
  ) and (
    min-width: 641px
  ) {

    .project-cards {
      --project-gap: 18px;
    }

    .carousel-button-left {
      left: -18px;
    }

    .carousel-button-right {
      right: -18px;
    }

    .video-card-type {
      font-size: 0.78rem;
    }

    .video-card-main small {
      font-size: 0.78rem;
    }
  }

  /* =========================
     MOBILE
     ========================= */

  @media (
    max-width: 640px
  ) {

    .hero {
      min-height:
        calc(
          100vh - 110px
        );

      padding:
        24px
        18px
        120px;
    }

    .hero-content {
      width: 100%;
    }

    .cv-download {
      margin-top: 30px;
    }

    .hero-intro {
      font-size:
        clamp(
          2rem,
          10vw,
          3.5rem
        );

      line-height: 1;
    }

    .typewriter-wrapper {
      min-height: 2.1em;

      margin-top: 12px;

      font-size:
        clamp(
          2.2rem,
          11vw,
          4rem
        );
    }

    .scroll-cue {
      bottom: 82px;

      padding:
        7px 11px;

      font-size: 0.56rem;
    }

    .projects-section {
      min-height: 100vh;

      padding:
        80px
        20px
      100px;
    }

    .head-prompt {
      min-height: calc(100dvh - 80px);

      padding: 72px 20px 90px;
    }

    .head-prompt h2 {
      font-size: clamp(2.8rem, 13vw, 4.2rem);
    }

    .head-prompt-actions {
      flex-wrap: wrap;
    }

    .kumo-info-card {
      grid-template-columns: 1fr;
    }

    .kumo-info-image {
      order: -1;
      min-height: 230px;
      max-height: 300px;
    }

    .kumo-info-image img {
      min-height: 230px;
    }

    .projects-heading {
      margin-bottom: 38px;
    }

    .projects-heading h2 {
      font-size: 3.2rem;
    }

    .projects-viewport {
      padding:
        16px 0
        26px;
    }

    .project-cards {
      --project-gap: 14px;
    }

    .video-card-content {
      padding: 20px;
    }

    .video-card-type {
      font-size: 0.72rem;

      line-height: 1.4;
    }

    .video-card-main strong {
      font-size:
        clamp(
          3rem,
          15vw,
          4.5rem
        );
    }

    .video-card-main small {
      margin-top: 10px;

      font-size: 0.76rem;

      line-height: 1.45;
    }

    .project-card-footer {
      padding:
        14px 15px;

      font-size: 0.72rem;
    }

    .carousel-button {
      width: 42px;
      height: 42px;

      font-size: 1rem;
    }

    .carousel-button-left {
      left: -12px;
    }

    .carousel-button-right {
      right: -12px;
    }

    .cv-download {
      padding: 14px 17px 13px;
      font-size: 0.74rem;
    }
  }

  /* =========================
     REDUCED MOTION
     ========================= */

  @media (
    prefers-reduced-motion:
    reduce
  ) {

    .scroll-cue,
    .cursor,
    .project-card,
    .head-prompt h2 {
      animation: none;

      transition: none;
    }

    .placeholder-status-dot {
      animation: none;
      opacity: 1;
    }

    .projects-inner {
      opacity: 1;

      transform: none;
      filter: none;

      transition: none;
    }

    .projects-section,
    .head-prompt {
      transition: none;
    }

    .project-card {
      translate: none;
      rotate: none;
    }

    .carousel-button {
      transition: none;
    }

    .cv-download {
      transition: none;
      transform: none;
      animation: none;
    }

    .head-prompt-button,
    .head-toast,
    .projects-scroll-cue {
      transition: none;
    }

    .carousel-item {
      transition: none !important;
    }
  }

</style>
````

## 3. Kumo chat

Full current contents of src/components/KumoChat.astro:

````astro
<div class="kumo">
  <button
    class="kumo__launcher"
    id="kumo-launcher"
    type="button"
    aria-label="Open Kumo"
  >
    <img
      class="kumo__launcher-avatar"
      src="/images/kumo_avatars/neutral.png"
      alt=""
      aria-hidden="true"
    />
    <span class="kumo__launcher-copy">
      <strong>KUMO.exe</strong>
      <small>
        <span class="kumo__launcher-dot" data-kumo-status-dot></span>
        <span data-kumo-status>ONLINE</span>
      </small>
    </span>
    <span class="kumo__launcher-hint">TALK TO ME</span>
  </button>

  <section
    class="kumo__window"
    id="kumo-window"
    aria-hidden="true"
  >
    <header class="kumo__header">
      <img
        class="kumo__avatar"
        id="kumo-avatar"
        src="/images/kumo_avatars/neutral.png"
        alt="Kumo's neutral face"
        title="Kumo.exe"
        role="button"
        tabindex="0"
      />

      <div>
        <div class="kumo__title-row">
          <strong>KUMO.exe</strong>

          <span class="kumo__status">
            <span class="kumo__status-dot" data-kumo-status-dot></span>
            <span data-kumo-status>ONLINE</span>
          </span>
        </div>

        <button
          class="kumo__about"
          type="button"
          data-kumo-who
        >
          WHO IS KUMO?
        </button>
      </div>

      <button
        class="kumo__close"
        id="kumo-close"
        type="button"
        aria-label="Close Kumo"
      >
        Ã—
      </button>
    </header>

    <div
      class="kumo__messages"
      id="kumo-messages"
      aria-live="polite"
    >
      <div class="kumo-message kumo-message--kumo">
        <img
          class="kumo-message__avatar"
          src="/images/kumo_avatars/neutral.png"
          alt=""
          aria-hidden="true"
        />

        <div class="kumo-message__bubble">
          <span class="kumo-message__author">KUMO</span>

          <p>
            Yo or Meow. Ask me something about Entwan. I know him quite well.
          </p>
        </div>
      </div>
    </div>

    <div class="kumo__suggestions" id="kumo-suggestions">
      <button
        type="button"
        class="kumo__suggestion"
        data-question="Who is Entwan?"
      >
        Who is Entwan?
      </button>

      <button
        type="button"
        class="kumo__suggestion"
        data-question="What projects has Entwan built?"
      >
        His projects
      </button>

      <button
        type="button"
        class="kumo__suggestion"
        data-question="What is Entwan learning right now?"
      >
        What he's learning
      </button>
    </div>

    <form class="kumo__form" id="kumo-form">
      <textarea
        id="kumo-input"
        class="kumo__input"
        placeholder="Ask Kumo something..."
        maxlength="1000"
        rows="1"
        aria-label="Ask Kumo something"
      ></textarea>

      <button
        id="kumo-send"
        class="kumo__send"
        type="submit"
      >
        Send
      </button>
    </form>
  </section>
</div>

<script>
  const kumoContainer =
    document.querySelector<HTMLElement>(".kumo");

  function positionKumoAwayFromFooter() {
    if (!kumoContainer) return;

    const footer =
      document.querySelector<HTMLElement>(".site-footer");

    if (!footer) return;

    const footerTop = footer.getBoundingClientRect().top;
    const normalBottom =
      window.innerHeight -
      (window.innerWidth <= 600 ? 16 : 24);
    const overlap = Math.max(
      0,
      normalBottom - footerTop,
    );

    kumoContainer.style.transform = overlap > 0
      ? `translateY(-${overlap + 12}px)`
      : "";
  }

  positionKumoAwayFromFooter();
  window.addEventListener(
    "scroll",
    positionKumoAwayFromFooter,
    { passive: true },
  );
  window.addEventListener(
    "resize",
    positionKumoAwayFromFooter,
  );

  const WORKER_URL =
    "https://enkhamgalan-spotify-api.zaecisama.workers.dev";

  const launcher =
    document.querySelector<HTMLButtonElement>("#kumo-launcher");

  const windowElement =
    document.querySelector<HTMLElement>("#kumo-window");

  const closeButton =
    document.querySelector<HTMLButtonElement>("#kumo-close");

  const form =
    document.querySelector<HTMLFormElement>("#kumo-form");

  const input =
    document.querySelector<HTMLTextAreaElement>("#kumo-input");

  const sendButton =
    document.querySelector<HTMLButtonElement>("#kumo-send");

  const messages =
    document.querySelector<HTMLElement>("#kumo-messages");

  const suggestionButtons =
    document.querySelectorAll<HTMLButtonElement>(
      ".kumo__suggestion",
    );

  let isLoading = false;
  let currentMood: KumoMood = "neutral";
  let interactionTimer: number | undefined;

  type KumoMood = "neutral" | "smile" | "confused" | "sleepy";

  const kumoAvatars: Record<KumoMood, string> = {
    neutral: "/images/kumo_avatars/neutral.png",
    smile: "/images/kumo_avatars/happy.png",
    confused: "/images/kumo_avatars/confused.png",
    sleepy: "/images/kumo_avatars/sleepy.png",
  };

  const avatar =
    document.querySelector<HTMLImageElement>("#kumo-avatar");

  const launcherAvatar =
    document.querySelector<HTMLImageElement>(".kumo__launcher-avatar");

  const statusDots =
    document.querySelectorAll<HTMLElement>("[data-kumo-status-dot]");

  const statusLabels =
    document.querySelectorAll<HTMLElement>("[data-kumo-status]");

  function avatarPath(mood: KumoMood) {
    return kumoAvatars[mood];
  }

  function setKumoMood(mood: KumoMood) {
    if (!avatar) return;

    currentMood = mood;
    avatar.src = avatarPath(mood);
    avatar.alt = `Kumo's ${mood} face`;
    if (launcherAvatar) {
      launcherAvatar.src = avatarPath(mood);
    }
  }

  function setKumoAvailability(isOnline: boolean) {
    statusDots.forEach((dot) => {
      dot.classList.toggle("is-offline", !isOnline);
    });

    statusLabels.forEach((label) => {
      label.textContent = isOnline ? "ONLINE" : "OFFLINE";
    });
  }

  function showRateLimitState() {
    setKumoAvailability(false);
    setKumoMood("sleepy");
    addMessage(
      "kumo",
      "I'm tired now... give me a moment, then try again.",
      "sleepy",
    );
  }

  function makeIdleKumoSmile() {
    if (currentMood !== "neutral") return;

    setKumoMood("smile");
    window.clearTimeout(interactionTimer);
    interactionTimer = window.setTimeout(() => {
      setKumoMood("neutral");
    }, 2600);
  }

  function responseMood(answer: string): KumoMood {
    return /\b(i('| a)m|do not|don't|not enough|cannot|can't|unknown|no idea)\b/i.test(answer)
      ? "confused"
      : "smile";
  }

  function openKumo() {
    if (!windowElement) return;

    windowElement.setAttribute(
      "aria-hidden",
      "false",
    );

    requestAnimationFrame(() => {
      input?.focus();
    });
  }

  function closeKumo() {
    if (!windowElement) return;

    setKumoMood("neutral");

    windowElement.setAttribute(
      "aria-hidden",
      "true",
    );
  }

  function scrollMessagesToBottom() {
    if (!messages) return;

    messages.scrollTop =
      messages.scrollHeight;
  }

  function addMessage(
    author: "you" | "kumo",
    text: string,
    mood: KumoMood = "neutral",
  ) {
    if (!messages) return null;

    if (author === "kumo") {
      messages
        .querySelectorAll<HTMLImageElement>(
          ".kumo-message--kumo .kumo-message__avatar",
        )
        .forEach((messageAvatar) => {
          messageAvatar.remove();
        });
    }

    const wrapper =
      document.createElement("div");

    wrapper.className =
      author === "kumo"
        ? "kumo-message kumo-message--kumo"
        : "kumo-message kumo-message--you";

    if (author === "kumo") {
      const messageAvatar =
        document.createElement("img");

      messageAvatar.className =
        "kumo-message__avatar";
      messageAvatar.src = avatarPath(mood);
      messageAvatar.alt = "";
      messageAvatar.setAttribute("aria-hidden", "true");
      wrapper.appendChild(messageAvatar);
    }

    const bubble =
      document.createElement("div");

    bubble.className =
      "kumo-message__bubble";

    const label =
      document.createElement("span");

    label.className =
      "kumo-message__author";

    label.textContent =
      author === "kumo"
        ? "KUMO"
        : "YOU";

    const paragraph =
      document.createElement("p");

    paragraph.textContent = text;

    bubble.appendChild(label);
    bubble.appendChild(paragraph);
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);

    scrollMessagesToBottom();

    return wrapper;
  }

  function addThinkingMessage() {
    const wrapper =
      addMessage(
        "kumo",
        "thinking...",
      );

    wrapper?.classList.add(
      "kumo-message--thinking",
    );

    return wrapper;
  }

  function typeMessage(
    wrapper: HTMLElement | null,
    text: string,
  ) {
    const paragraph =
      wrapper?.querySelector<HTMLParagraphElement>("p");

    if (!paragraph) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paragraph.textContent = text;
      return;
    }

    paragraph.textContent = "";

    let index = 0;
    const timer = window.setInterval(() => {
      paragraph.textContent = text.slice(0, index + 1);
      index += 1;
      scrollMessagesToBottom();

      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, 16);
  }

  function setLoading(
    loading: boolean,
  ) {
    isLoading = loading;

    if (sendButton) {
      sendButton.disabled =
        loading;
    }

    if (input) {
      input.disabled =
        loading;
    }

    suggestionButtons.forEach(
      (button) => {
        button.disabled =
          loading;
      },
    );
  }

  async function askKumo(
    question: string,
  ) {
    if (isLoading) return;

    setLoading(true);
    setKumoMood("neutral");

    const thinkingMessage =
      addThinkingMessage();

    try {
      const response =
        await fetch(
          `${WORKER_URL}/api/kumo/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              message: question,
            }),
          },
        );

      type KumoResponse = {
        answer?: string;
        error?: string;
        };

      thinkingMessage?.remove();

      if (response.status === 429) {
        showRateLimitState();
        return;
      }

        const data =
        await response.json() as KumoResponse;

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Kumo failed to answer.",
        );
      }

      const answer =
        typeof data.answer ===
        "string"
          ? data.answer
          : "Hmm. Something went weird there.";

      const answerMood = responseMood(answer);
      setKumoAvailability(true);
      setKumoMood(answerMood);

      const answerMessage = addMessage(
        "kumo",
        answer,
        answerMood,
      );
      typeMessage(answerMessage, answer);
    } catch (error) {
      thinkingMessage?.remove();

      console.error(
        "Kumo request failed:",
        error,
      );

      addMessage(
        "kumo",
        "Uh... my brain glitched for a second ðŸ˜­ Try that again.",
      );
      setKumoMood("confused");
    } finally {
      setLoading(false);

      input?.focus();
    }
  }

  function submitQuestion(
    question: string,
  ) {
    const cleanQuestion =
      question.trim();

    if (
      !cleanQuestion ||
      isLoading
    ) {
      return;
    }

    addMessage(
      "you",
      cleanQuestion,
    );

    if (input) {
      input.value = "";
      resizeTextarea();
    }

    void askKumo(
      cleanQuestion,
    );
  }

  function resizeTextarea() {
    if (!input) return;

    input.style.height =
      "auto";

    input.style.height =
      `${Math.min(
        input.scrollHeight,
        120,
      )}px`;
  }

  avatar?.addEventListener("pointerenter", () => {
    makeIdleKumoSmile();
  });

  avatar?.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse") return;

    if (currentMood === "smile") {
      window.clearTimeout(interactionTimer);
      setKumoMood("neutral");
    }
  });

  avatar?.addEventListener("click", makeIdleKumoSmile);

  launcherAvatar?.addEventListener("pointerenter", makeIdleKumoSmile);
  launcherAvatar?.addEventListener("click", makeIdleKumoSmile);
  launcherAvatar?.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse") return;

    if (currentMood === "smile") {
      window.clearTimeout(interactionTimer);
      setKumoMood("neutral");
    }
  });

  avatar?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      makeIdleKumoSmile();
    }
  });

  launcher?.addEventListener(
    "click",
    openKumo,
  );

  closeButton?.addEventListener(
    "click",
    closeKumo,
  );

  form?.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      submitQuestion(
        input?.value ?? "",
      );
    },
  );

  input?.addEventListener(
    "input",
    resizeTextarea,
  );

  input?.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {
        event.preventDefault();

        form?.requestSubmit();
      }
    },
  );

  suggestionButtons.forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          const question =
            button.dataset
              .question;

          if (!question) {
            return;
          }

          submitQuestion(
            question,
          );
        },
      );
    },
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key ===
          "Escape" &&
        windowElement?.getAttribute(
          "aria-hidden",
        ) === "false"
      ) {
        closeKumo();
      }
    },
  );
</script>

<style>
  .kumo {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1000;
    font-family:
      "Courier Prime",
      "Courier New",
      monospace;
    font-weight: 700;
    image-rendering: pixelated;
  }

  .kumo__launcher {
    display: inline-flex;
    align-items: center;
    gap: 9px;

    min-height: 58px;
    border: 2px solid #111;
    background: #111;
    color: #edecea;

    padding: 6px 12px 6px 7px;

    font: inherit;
    font-size: 13px;

    cursor: pointer;

    transition:
      transform 160ms ease,
      opacity 160ms ease;
  }

  .kumo__launcher:hover {
    transform:
      scale(1.04);
  }

  .kumo__launcher:active {
    transform:
      scale(0.98);
  }

  .kumo__launcher-avatar {
    width: 44px;
    height: 44px;
    object-fit: contain;
    image-rendering: pixelated;
    border: 0;
    outline: 0;
    box-shadow: none;
  }

  .kumo__launcher-copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }

  .kumo__launcher-copy strong {
    font-size: 13px;
    line-height: 1;
  }

  .kumo__launcher-copy small {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #b9c8b4;
    font-size: 8px;
    letter-spacing: 0.08em;
  }

  .kumo__launcher-dot {
    width: 6px;
    height: 6px;
    background: #4d7657;
  }

  .kumo__launcher-dot.is-offline,
  .kumo__status-dot.is-offline {
    background: #929292;
    box-shadow: 0 0 0 2px rgba(146, 146, 146, 0.18);
  }

  .kumo__launcher-hint {
    max-width: 0;
    overflow: hidden;
    opacity: 0;
    font-size: 8px;
    letter-spacing: 0.08em;
    white-space: nowrap;
    transition: max-width 160ms ease, opacity 160ms ease;
  }

  .kumo__launcher:hover .kumo__launcher-hint,
  .kumo__launcher:focus-visible .kumo__launcher-hint {
    max-width: 70px;
    opacity: 1;
  }

  .kumo__window {
    position: absolute;

    right: 0;
    bottom: 58px;

    width:
      min(
        400px,
        calc(
          100vw - 32px
        )
      );

    height:
      min(
        580px,
        calc(
          100vh - 120px
        )
      );

    display: flex;
    flex-direction:
      column;

    overflow: hidden;

    background: #edecea;

    border:
      1px solid #111;

    box-shadow:
      0 18px 50px
      rgb(
        0 0 0 /
        14%
      );

    transform-origin:
      bottom right;
  }

  .kumo__window[
    aria-hidden="true"
  ] {
    display: none;
  }

  .kumo__header {
    display: flex;

    align-items:
      flex-start;

    gap: 16px;

    padding: 16px;

    border-bottom:
      1px solid #111;

    flex-shrink: 0;
  }

  .kumo__avatar {
    width: 76px;
    height: 76px;
    max-width: 76px;
    max-height: 76px;
    flex: 0 0 76px;
    display: block;
    object-fit: contain;
    image-rendering: pixelated;
    cursor: pointer;
    border: 0;
    outline: 0;
    box-shadow: none;
  }

  .kumo__title-row {
    display: flex;

    align-items:
      center;

    gap: 10px;
  }

  .kumo__title-row strong {
    font-size: 14px;
    letter-spacing:
      0.02em;
  }

  .kumo__header > div {
    flex: 1;
    min-width: 0;
  }

  .kumo__header p {
    margin:
      5px 0 0;

    font-size: 11px;
    line-height: 1.35;

    opacity: 0.62;
  }

  .kumo__about {
    display: inline-flex;
    align-items: center;
    margin: 7px 0 0;
    padding: 10px 14px;
    border: 1px solid rgba(17, 17, 17, 0.35);
    border-radius: 999px;
    background: rgba(237, 236, 234, 0.5);
    color: #333333;
    font: inherit;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    cursor: pointer;
    text-align: left;
    transition:
      background 160ms ease,
      border-color 160ms ease,
      color 160ms ease;
  }

  .kumo__about:hover {
    border-color: #4d7657;
    background: #4d7657;
    color: #ffffff;
  }

  .kumo__status {
    display:
      inline-flex;

    align-items:
      center;

    gap: 5px;

    font-size: 9px;
    letter-spacing:
      0.05em;

    opacity: 0.7;
  }

  .kumo__status-dot {
    width: 7px;
    height: 7px;

    border-radius:
      50%;

    background:
      #4d7657;
  }

  .kumo__close {
    display: flex;

    align-items:
      center;

    justify-content:
      center;

    width: 28px;
    height: 28px;

    padding: 0;

    border: 0;

    background:
      transparent;

    color: #111;

    font: inherit;
    font-size: 21px;

    line-height: 1;

    cursor: pointer;

    opacity: 0.65;

    transition:
      opacity 150ms ease,
      transform 150ms ease;
  }

  .kumo__close:hover {
    opacity: 1;

    transform:
      rotate(4deg);
  }

  .kumo__messages {
    flex: 1;

    min-height: 0;

    overflow-y: auto;

    display: flex;

    flex-direction:
      column;

    gap: 20px;

    padding:
      18px;

    scroll-behavior:
      smooth;
  }

  :global(.kumo-message) {
    max-width: 88%;
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  :global(.kumo-message--kumo) {
    align-self:
      flex-start;
  }

  :global(.kumo-message--you) {
    align-self:
      flex-end;

    text-align:
      right;
  }

  :global(.kumo-message--you .kumo-message__bubble) {
    order: 1;
  }

  :global(.kumo-message__avatar) {
    width: 54px;
    height: 54px;
    max-width: 54px;
    max-height: 54px;
    flex: 0 0 54px;
    display: block;
    object-fit: contain;
    image-rendering: pixelated;
  }

  :global(.kumo-message__bubble) {
    min-width: 0;
  }

  :global(.kumo-message__author) {
    display: block;

    margin-bottom:
      5px;

    font-size: 9px;

    letter-spacing:
      0.08em;

    opacity: 0.42;
  }

  :global(.kumo-message p) {
    margin: 0;

    padding:
      10px 12px;

    border: 2px solid #111;
    border-radius: 0;
    box-shadow: 4px 4px 0 #111;
    clip-path: polygon(
      0 5px,
      5px 5px,
      5px 0,
      calc(100% - 5px) 0,
      calc(100% - 5px) 5px,
      100% 5px,
      100% calc(100% - 5px),
      calc(100% - 5px) calc(100% - 5px),
      calc(100% - 5px) 100%,
      5px 100%,
      5px calc(100% - 5px),
      0 calc(100% - 5px)
    );

    line-height: 1.5;

    font-size: 13px;
    font-weight: 700;

    white-space:
      pre-wrap;

    overflow-wrap:
      anywhere;
  }

  :global(.kumo-message--kumo p) {
    background:
      rgb(
        255 255 255 /
        22%
      );
    text-align: left;
  }

  :global(.kumo-message--you p) {
    background: #111;
    color: #edecea;
    border-color:
      #111;
    border-width: 1px;
    border-radius: 4px;
    box-shadow: none;
    clip-path: none;
  }

  :global(.kumo-message--you .kumo-message__author) {
    text-align: right;
  }

  :global(.kumo-message--thinking) {
    opacity: 0.52;
  }

  :global(.kumo-message--thinking p) {
    animation:
      kumo-thinking
      1.2s ease-in-out
      infinite;
  }

  .kumo__suggestions {
    display: flex;

    gap: 6px;

    overflow-x: auto;

    padding:
      8px 12px 4px;

    border-top:
      1px solid
      rgb(
        17 17 17 /
        12%
      );

    flex-shrink: 0;

    scrollbar-width:
      none;
  }

  .kumo__suggestions::-webkit-scrollbar {
    display: none;
  }

  .kumo__suggestion {
    flex-shrink: 0;

    appearance: none;

    border:
      1px solid
      rgb(
        17 17 17 /
        24%
      );

    background:
      transparent;

    color: #111111;

    padding:
      6px 9px;

    font: inherit;
    font-size: 10px;

    cursor: pointer;

    transition:
      background 150ms ease,
      color 150ms ease,
      border-color 150ms ease;
  }

  .kumo__suggestion:hover {
    background: #111;
    color: #edecea;
    border-color:
      #111;
  }

  .kumo__suggestion:disabled {
    opacity: 0.35;
    cursor:
      not-allowed;
  }

  .kumo__form {
    display: flex;

    align-items:
      flex-end;

    gap: 8px;

    padding: 12px;

    border-top:
      1px solid #111;

    flex-shrink: 0;
  }

  .kumo__input {
    flex: 1;

    min-width: 0;

    min-height: 42px;
    max-height: 120px;

    resize: none;

    overflow-y: auto;

    border:
      1px solid
      rgb(
        17 17 17 /
        50%
      );

    outline: none;

    background:
      transparent;

    color: #111;

    padding:
      10px;

    font: inherit;
    font-size: 12px;

    line-height: 1.45;

    transition:
      border-color
      150ms ease;
  }

  .kumo__input:focus {
    border-color:
      #111;
  }

  .kumo__input::placeholder {
    color:
      rgb(
        17 17 17 /
        40%
      );
  }

  .kumo__input:disabled {
    opacity: 0.5;
  }

  .kumo__send {
    min-height: 42px;

    border:
      1px solid #111;

    background: #111;
    color: #edecea;

    padding:
      0 14px;

    font: inherit;
    font-size: 11px;

    cursor: pointer;

    transition:
      transform 150ms ease,
      opacity 150ms ease;
  }

  .kumo__send:hover:not(
    :disabled
  ) {
    transform:
      translateY(-1px);
  }

  .kumo__send:active:not(
    :disabled
  ) {
    transform:
      translateY(0);
  }

  .kumo__send:disabled {
    opacity: 0.35;

    cursor:
      not-allowed;
  }

  @keyframes kumo-thinking {
    0%,
    100% {
      opacity: 0.45;
    }

    50% {
      opacity: 1;
    }
  }

  @media (
    prefers-reduced-motion:
      reduce
  ) {
    .kumo__launcher,
    .kumo__close,
    .kumo__send,
    .kumo__suggestion {
      transition: none;
    }

    :global(.kumo-message--thinking p) {
      animation: none;
    }

    .kumo__messages {
      scroll-behavior:
        auto;
    }
  }

  @media (
    max-width: 600px
  ) {
    .kumo {
      right: 16px;
      bottom: 16px;
    }

    .kumo__window {
      position: fixed;

      inset: 16px;

      width: auto;
      height: auto;

      max-width: none;
      max-height: none;
    }

    .kumo__launcher {
      min-height: 50px;
      gap: 6px;
      padding: 4px 9px 4px 5px;
    }

    .kumo__launcher-avatar {
      width: 38px;
      height: 38px;
    }

    .kumo__launcher-copy strong {
      font-size: 10px;
    }

    .kumo__launcher-copy small,
    .kumo__launcher-hint {
      display: none;
    }

    .kumo__input {
      font-size: 16px;
    }
  }
</style>
````

How it is opened:

- The floating launcher is button#kumo-launcher. Its click handler calls local openKumo().
- openKumo() sets #kumo-window aria-hidden to false and focuses #kumo-input on the next animation frame.
- KumoProject.astro has buttons with data-open-kumo. Its local script directly opens #kumo-window and focuses #kumo-input.
- There is no exported/shared open function or custom event. The project buttons duplicate the opening behavior.
- The chat submits through #kumo-form and POSTs to https://enkhamgalan-spotify-api.zaecisama.workers.dev/api/kumo/chat.

Important IDs that must not be duplicated or casually renamed:

#kumo-launcher, #kumo-window, #kumo-avatar, #kumo-close, #kumo-messages, #kumo-suggestions, #kumo-form, #kumo-input, #kumo-send.

Important classes include .kumo, .kumo__launcher, .kumo__window, .kumo__header, .kumo__avatar, .kumo__status, .kumo__status-dot, .kumo__messages, .kumo-message, .kumo-message--kumo, .kumo-message--you, .kumo__suggestions, .kumo__suggestion, .kumo__form, .kumo__input, and .kumo__send.

Important data/state hooks:

- data-kumo-status-dot and data-kumo-status update online/offline state.
- data-kumo-who opens the separate Kumo personal-information overlay in index.astro.
- data-question stores suggestion text.
- data-open-kumo opens the shared chat from KumoProject.
- #kumo-window[aria-hidden=false] is the open state.
- .is-offline is applied to status dots for rate-limit/offline state.
- Kumo moods are neutral, smile, confused, and sleepy.

Desktop/mobile behavior:

- The chat is fixed near the lower-right corner, around right: 24px and bottom: 24px on desktop.
- A media query around 600px makes the launcher/window wider, reduces edge insets, and uses a viewport-aware chat height.
- Scroll and resize handlers translate the .kumo wrapper upward if it would overlap the footer.
- Enter submits the input unless Shift is held; Shift+Enter preserves a newline.
- Escape closes the chat window.
- Reduced-motion handling disables typing/animation behavior when prefers-reduced-motion: reduce is active.

## 4. Layout and global styles

src/layouts/BaseLayout.astro:

````astro
---
import Header from "../components/Header.astro";
import "../styles/global.css";
import Footer from "../components/Footer.astro";

interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Entwan's Portfolio",
  description = "Portfolio of Entwan, a junior data scientist.",
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />

    <meta
      name="description"
      content={description}
    />

    <link
      rel="icon"
      type="image/png"
      href="/images/faces/straight-main.png"
    />

    <title>{title}</title>
  </head>

  <body>
    <Header />

    <main>
      <slot />
    </main>

    <Footer />
  </body>
</html>
````

src/styles/global.css:

````css
@import url("https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Instrument+Serif:ital@0;1&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Instrument+Serif:ital@0;1&display=swap");
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  font-family: "Courier Prime", monospace;

  background: #edecea;
  color: #111111;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

img,
svg {
  display: block;
}

main {
  flex: 1;

  display: flex;
  flex-direction: column;
}

.container {
  width: min(1200px, calc(100% - 48px));
  margin-inline: auto;
}

@media (max-width: 640px) {
  .container {
    width: min(100% - 32px, 1200px);
  }
}
````

Relevant facts:

- body is a full-height flex column with #edecea background, #111 text, and Courier Prime.
- main is the flexible column between Header and Footer.
- .container is min(1200px, calc(100% - 48px)); at max-width 640px it becomes min(100% - 32px, 1200px).
- Global img and svg are display:block; box-sizing:border-box applies universally.
- global.css currently contains a duplicated Google Fonts import.
- The global file has a 640px breakpoint; homepage and Kumo have additional inline breakpoints and media queries.

## 5. Homepage scripts

Homepage JavaScript is inline in index.astro after the component markup.

Scroll/reveal and animation:

- .reveal-section elements are observed with IntersectionObserver and receive .is-visible.
- Scroll and resize listeners update transition effects.
- The typewriter targets #typewriter and .cursor.
- The face prompt targets .head-prompt-face.
- prefers-reduced-motion is checked with matchMedia and changes animated behavior.

Dialogs and Kumo hooks:

- [data-kumo-who], [data-kumo-info-overlay], and [data-kumo-info-close] control the Kumo personal-information overlay.
- closeKumoInfo() removes .is-open and restores aria-hidden=true.
- Backdrop click and Escape close that overlay; opening focuses its close button.
- [data-head-not-yet], [data-head-did-it], and [data-head-toast] control the head prompt.

Project carousel and modals:

- [data-project-track] is the carousel track.
- [data-carousel-prev] and [data-carousel-next] are carousel controls.
- [data-project-open] values include receipt-project, account-project, kumo-project, and merchant-recommendation-project.
- ProjectModal.astro depends on those modal IDs and data-project-open values.

Selectors that must not break:

#typewriter, .cursor, .head-prompt-face, .reveal-section, [data-project-track], [data-carousel-prev], [data-carousel-next], [data-project-open], [data-kumo-who], [data-kumo-info-overlay], [data-kumo-info-close], [data-head-not-yet], [data-head-did-it], and [data-head-toast].

Keyboard risk: KumoChat has a document Escape handler; the homepage has Escape handling for the Kumo info overlay; the chat input owns Enter/Shift+Enter. Scope a game's keyboard handling to the active game root and avoid global preventDefault.

## 6. Existing assets

There is no dedicated pixel-game sprite sheet, dialogue-box asset, or Kumo game background.

| Asset | Dimensions | Format | Relevance |
|---|---:|---|---|
| public/images/kumo_avatars/confused.png | 1254×1254 | PNG | Kumo confused mood |
| public/images/kumo_avatars/happy.png | 1254×1254 | PNG | Kumo happy/smile mood |
| public/images/kumo_avatars/neutral.png | 1254×1254 | PNG | Kumo default mood |
| public/images/kumo_avatars/sleepy.png | 1254×1254 | PNG | Kumo sleepy/rate-limit mood |
| public/images/kumo_real.jpg | 2043×2048 | JPEG | Kumo information-dialog image |
| public/images/patterns/Ulzii.png | 2172×724 | PNG | Decorative patterned background/brand motif |
| public/images/projects/cactus.png | 1254×1254 | PNG | Project-card visual |
| public/images/projects/ger.png | 600×450 | PNG | Project-card visual |
| public/images/projects/ulzii_small.png | 1254×1254 | PNG | Project-card/brand visual |
| public/videos/patterns/vids/pattern1.mp4 through pattern7.mp4 | not inspected | MP4 | Animated project-card backgrounds |
| public/videos/accountancy/accountancy.mp4 | not inspected | MP4 | Accountancy project-card background |
| public/videos/reciept/receipt_portfolio_demo.mp4 | not inspected | MP4 | Receipt project-card/demo background |
| public/images/faces/*.png | 450×450 each | PNG | Face prompt/header frames, not Kumo-game assets |
| public/images/profile/about.jpeg | 2856×2142 | JPEG | About/profile image |
| public/images/projects/receipt-pics/* | varies | JPEG | Receipt case-study imagery |

Kumo avatar PNGs are the most reusable Kumo visuals, but each is 1254×1254 and relatively large. kumo_real.jpg is a real photo, not pixel art. The pattern MP4 files are animated backgrounds and may increase bandwidth/performance costs. There are no existing dialogue-box image files; current dialogue UI is HTML/CSS.

## 7. Existing Kumo project section

Relevant current contents of src/projects/KumoProject.astro:

````astro
---
import ProjectModal from "../components/ProjectModal.astro";
---

<ProjectModal
  id="kumo-project"
  ariaLabel="Kumo project"
>
  <article class="kumo-project">
    <section class="project-hero">
      <div class="project-hero-top">
        <span>03 / SELECTED WORK</span>
        <span>2026</span>
      </div>

      <div class="kumo-status">
        <span class="status-dot"></span>
        <span>ONLINE</span>
      </div>

      <h1>KUMO AI.exe</h1>

      <p class="project-tagline">
        A suspiciously well-informed little AI
        living inside my portfolio.
      </p>

      <p class="project-supporting">
        Kumo is a retrieval-augmented portfolio assistant built to answer
        questions about me, my work, projects, education, skills and interests
        without pretending to know things that are not actually in the
        knowledge base.
      </p>

      <div class="project-meta">
        <span>RAG</span>
        <span>CLOUDFLARE WORKERS AI</span>
        <span>VECTORIZE</span>
        <span>ASTRO</span>
        <span>TYPESCRIPT</span>
        <span>GEMMA</span>
        <span>EMBEDDINGS</span>
      </div>

      <button
        class="open-kumo-button"
        type="button"
        data-open-kumo
      >
        OPEN KUMO
        <span aria-hidden="true">â†—</span>
      </button>
    </section>

    <section class="intro-grid">
      <div class="intro-block">
        <span class="section-number">01</span>
        <h2>Why I built it.</h2>

        <p>
          I wanted the portfolio to do more than just show static text about me.
          The idea was to let visitors ask questions naturally and explore the
          person behind the projects, while keeping the answers grounded in
          information I actually provided.
        </p>
      </div>

      <div class="intro-block">
        <span class="section-number">02</span>
        <h2>What I wanted to learn.</h2>

        <p>
          Kumo became a practical way for me to learn how retrieval-augmented
          generation works end to end, including knowledge chunking,
          embeddings, vector search, retrieval quality, grounded generation
          and connecting an AI backend to a real frontend.
        </p>
      </div>
    </section>

    <section class="architecture-section">
      <div class="section-heading">
        <span>UNDER THE HOOD</span>

        <h2>
          Question in.<br />
          Relevant context out.
        </h2>
      </div>

      <div class="architecture-flow">
        <div class="architecture-node">
          <span>01</span>
          <strong>Visitor question</strong>
          <small>
            A natural-language question about me or my work.
          </small>
        </div>

        <div class="architecture-arrow">â†’</div>

        <div class="architecture-node">
          <span>02</span>
          <strong>Normalise</strong>
          <small>
            Aliases like Entwan and Enkh are mapped consistently for retrieval.
          </small>
        </div>

        <div class="architecture-arrow">â†’</div>

        <div class="architecture-node">
          <span>03</span>
          <strong>Embed</strong>
          <small>
            The question is converted into a vector using Workers AI.
          </small>
        </div>

        <div class="architecture-arrow">â†’</div>

        <div class="architecture-node">
          <span>04</span>
          <strong>Retrieve</strong>
          <small>
            Vectorize finds the most relevant chunks from the knowledge base.
          </small>
        </div>

        <div class="architecture-arrow">â†’</div>

        <div class="architecture-node">
          <span>05</span>
          <strong>Generate</strong>
          <small>
            Kumo answers using only the retrieved evidence.
          </small>
        </div>
      </div>
    </section>

    <section class="feature-section">
      <div class="section-heading">
        <span>THE PART I CARE ABOUT</span>

        <h2>
          It should know when
          it does not know.
        </h2>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <span>01</span>
          <h3>Grounded answers</h3>
          <p>
            Kumo is instructed to answer from retrieved evidence rather than
            filling gaps with invented details.
          </p>
        </article>

        <article class="feature-card">
          <span>02</span>
          <h3>Dynamic knowledge</h3>
          <p>
            Projects, skills and interests live in a separate knowledge base,
            so new topics can be added without rewriting Kumo's whole prompt.
          </p>
        </article>

        <article class="feature-card">
          <span>03</span>
          <h3>Unknown-answer handling</h3>
          <p>
            Similarity alone is not treated as proof. If retrieved chunks do
            not actually answer the question, Kumo simply says it does not know.
          </p>
        </article>

        <article class="feature-card">
          <span>04</span>
          <h3>A bit of personality</h3>
          <p>
            The assistant is designed to feel familiar and slightly playful,
            without inventing fake memories or turning into a generic chatbot.
          </p>
        </article>
      </div>
    </section>

    <section class="project-ending">
      <span class="ending-label">CURRENTLY LIVING IN THIS PORTFOLIO</span>

      <h2>
        Ask the portfolio<br />
        instead of reading it.
      </h2>

      <p class="ending-supporting">
        Kumo is still evolving as I add more projects, topics and knowledge.
      </p>

      <button
        class="open-kumo-button open-kumo-button-bottom"
        type="button"
        data-open-kumo
      >
        OPEN KUMO
        <span aria-hidden="true">â†—</span>
      </button>
    </section>
  </article>
</ProjectModal>

<script>
  const openKumoButtons =
    document.querySelectorAll<HTMLButtonElement>(
      "[data-open-kumo]",
    );

  openKumoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const kumoWindow =
        document.querySelector<HTMLElement>(
          "#kumo-window",
        );

      if (!kumoWindow) return;

      kumoWindow.setAttribute(
        "aria-hidden",
        "false",
      );

      const input =
        document.querySelector<HTMLTextAreaElement>(
          "#kumo-input",
        );

      requestAnimationFrame(() => {
        input?.focus();
      });
    });
  });
</script>

<style>
  .kumo-project {
    width: 100%;
    color: #3b241c;

    background:
      radial-gradient(
        circle at 12% 10%,
        rgba(245, 164, 126, 0.42),
        transparent 32%
      ),
      radial-gradient(
        circle at 88% 22%,
        rgba(250, 230, 211, 0.72),
        transparent 30%
      ),
      linear-gradient(
        135deg,
        #fbdac2 0%,
        #f9cbae 52%,
        #fbdac2 100%
      );
  }

  .project-hero {
    position: relative;

    min-height: 88vh;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    padding: 70px;
  }

  .project-hero-top {
    position: absolute;
    top: 28px;
    left: 70px;
    right: 90px;

    display: flex;
    justify-content: space-between;

    font:
      0.74rem "Courier Prime",
      monospace;

    letter-spacing: 0.06em;
    color: #8c4c36;
  }

  .kumo-status {
    display: inline-flex;

    align-items: center;
    gap: 8px;

    width: fit-content;

    margin-bottom: 20px;

    padding: 8px 12px;

    border: 1px solid
      rgba(17, 17, 17, 0.18);

    border-radius: 999px;

    font:
      0.7rem "Courier Prime",
      monospace;

    letter-spacing: 0.06em;
  }

  .status-dot {
    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: #4d7657;

    box-shadow:
      0 0 0 4px
      rgba(77, 118, 87, 0.1);
  }

  .project-hero h1 {
    margin: 0;

    font:
      400
      clamp(5rem, 13vw, 12rem) /
      0.82
      "Instrument Serif",
      serif;

    letter-spacing: -0.055em;
  }

  .project-tagline {
    max-width: 850px;

    margin: 42px 0 20px;

    font:
      400
      clamp(2rem, 3.6vw, 4rem) /
      0.98
      "Instrument Serif",
      serif;
  }

  .project-supporting,
  .intro-block p,
  .feature-card p,
  .ending-supporting {
    max-width: 760px;

    font:
      1rem / 1.6
      "Courier Prime",
      monospace;

    color: #6f4131;
  }

  .project-supporting {
    margin: 0;
  }

  .project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;

    margin-top: 28px;
  }

  .project-meta span {
    padding: 10px 14px;

    border:
      1px solid
      rgba(17, 17, 17, 0.18);

    border-radius: 999px;

    font:
      0.72rem
      "Courier Prime",
      monospace;
  }

  .open-kumo-button {
    display: inline-flex;

    align-items: center;
    gap: 12px;

    width: fit-content;

    margin-top: 34px;

    padding: 14px 18px;

    border: 1px solid #3b241c;

    background: #3b241c;
    color: #fae6d3;

    font:
      0.78rem
      "Courier Prime",
      monospace;

    letter-spacing: 0.05em;

    cursor: pointer;

    transition:
      transform 0.18s ease,
      background 0.18s ease,
      color 0.18s ease;
  }

  .open-kumo-button:hover {
    transform: translateY(-2px);

    background: #ea8966;
    color: #fff;
  }

  .intro-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 70px;

    padding:
      40px 70px 130px;
  }

  .intro-block {
    padding-top: 20px;

    border-top:
      1px solid
      rgba(17, 17, 17, 0.18);
  }

  .section-number {
    font:
      0.74rem
      "Courier Prime",
      monospace;

    color: #c45f42;
  }

  .intro-block h2,
  .section-heading h2,
  .feature-card h3,
  .project-ending h2 {
    font-family:
      "Instrument Serif",
      serif;

    font-weight: 400;
    letter-spacing: -0.025em;
  }

  .intro-block h2 {
    margin: 20px 0;

    font-size:
      clamp(
        2.8rem,
        4vw,
        4.8rem
      );

    line-height: 0.95;
  }

  .intro-block p {
    margin: 0;
  }

  .architecture-section {
    padding:
      110px 70px;

    background:
      linear-gradient(
        135deg,
        #6d3426,
        #9b4f38 55%,
        #c66a4c
      );

    color: #fae6d3;
  }

  .section-heading {
    margin-bottom: 54px;
  }

  .section-heading > span,
  .ending-label {
    font:
      0.74rem
      "Courier Prime",
      monospace;

    letter-spacing: 0.08em;
  }

  .architecture-section
    .section-heading
    > span {
    color: #f9cbae;
  }

  .section-heading h2 {
    max-width: 900px;

    margin: 14px 0 0;

    font-size:
      clamp(
        3.4rem,
        6vw,
        7rem
      );

    line-height: 0.9;
  }

  .architecture-flow {
    display: grid;

    grid-template-columns:
      repeat(
        4,
        minmax(0, 1fr)
        auto
      )
      minmax(0, 1fr);

    align-items: center;

    gap: 14px;
  }

  .architecture-node {
    min-width: 0;
    min-height: 190px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    gap: 18px;

    padding: 23px;

    border:
      1px solid
      rgba(255, 255, 255, 0.18);

    border-radius: 14px;
  }

  .architecture-node span,
  .architecture-node small {
    font-family:
      "Courier Prime",
      monospace;
  }

  .architecture-node span {
    font-size: 0.7rem;
    color: #f5a47e;
  }

  .architecture-node strong {
    font:
      400
      1.8rem / 1
      "Instrument Serif",
      serif;

    color: #fff4eb;
  }

  .architecture-node small {
    font-size: 0.78rem;
    line-height: 1.45;

    color: #fbdac2;
  }

  .architecture-arrow {
    color: #f5a47e;
  }

  .feature-section {
    padding:
      130px 70px;

    background:
      rgba(
        250,
        230,
        211,
        0.82
      );
  }

  .feature-grid {
    display: grid;

    grid-template-columns:
      repeat(2, 1fr);

    gap: 18px;
  }

  .feature-card {
    min-height: 280px;

    display: flex;
    flex-direction: column;

    padding: 28px;

    border:
      1px solid
      rgba(17, 17, 17, 0.12);

    border-radius: 18px;

    background:
      rgba(
        255,
        255,
        255,
        0.32
      );
  }

  .feature-card:nth-child(even) {
    background:
      rgba(
        245,
        164,
        126,
        0.28
      );
  }

  .feature-card > span {
    font:
      0.72rem
      "Courier Prime",
      monospace;

    color: #c45f42;
  }

  .feature-card h3 {
    margin: auto 0 20px;

    font-size:
      clamp(
        2rem,
        3vw,
        3.6rem
      );

    line-height: 0.95;
  }

  .feature-card p {
    margin: 0;
    font-size: 0.95rem;
  }

  .project-ending {
    min-height: 75vh;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding:
      120px 70px;

    background:
      linear-gradient(
        135deg,
        #f5a47e,
        #fbdac2
      );
  }

  .project-ending h2 {
    max-width: 1000px;

    margin: 24px 0 28px;

    font-size:
      clamp(
        4rem,
        8vw,
        8rem
      );

    line-height: 0.84;
  }

  .ending-supporting {
    margin: 0;
  }

  .open-kumo-button-bottom {
    margin-top: 32px;
  }

  @media (
    min-width: 641px
  ) and (
    max-width: 1350px
  ) {
    .architecture-flow {
      grid-template-columns:
        repeat(3, 1fr);

      gap: 18px;
    }

    .architecture-arrow {
      display: none;
    }

    .architecture-node {
      min-height: 165px;
    }
  }

  @media (
    max-width: 640px
  ) {
    .project-hero {
      min-height: 88dvh;

      padding:
        90px 20px 40px;
    }

    .project-hero-top {
      top: 20px;
      left: 20px;
      right: 72px;

      gap: 12px;

      flex-wrap: wrap;

      font-size: 0.6rem;
    }

    .project-hero h1 {
      font-size:
        clamp(
          4rem,
          25vw,
          7rem
        );
    }

    .project-tagline {
      margin:
        30px 0 18px;

      font-size:
        clamp(
          2rem,
          10vw,
          2.8rem
        );
    }

    .project-supporting,
    .intro-block p,
    .feature-card p {
      font-size: 0.9rem;
    }

    .project-meta {
      gap: 7px;

      margin-top: 22px;
    }

    .project-meta span {
      padding:
        8px 10px;

      font-size: 0.62rem;
    }

    .intro-grid {
      grid-template-columns: 1fr;

      gap: 60px;

      padding:
        20px 20px 90px;
    }

    .architecture-section,
    .feature-section,
    .project-ending {
      padding:
        90px 20px;
    }

    .section-heading h2 {
      font-size:
        clamp(
          3rem,
          14vw,
          5rem
        );
    }

    .architecture-flow {
      grid-template-columns: 1fr;

      gap: 12px;
    }

    .architecture-arrow {
      text-align: center;

      transform:
        rotate(90deg);
    }

    .architecture-node {
      min-height: 140px;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .feature-card {
      min-height: 260px;
    }

    .project-ending {
      min-height: 70dvh;
    }

    .project-ending h2 {
      font-size:
        clamp(
          3.5rem,
          17vw,
          5.5rem
        );
    }
  }
</style>
````

How it opens Kumo:

- It renders inside ProjectModal with id=kumo-project.
- It contains two buttons with data-open-kumo.
- Its local script finds #kumo-window, sets aria-hidden=false, then focuses #kumo-input on the next animation frame.
- It duplicates the effect of KumoChat's private openKumo() function; it does not call that function.
- A new game should not use data-open-kumo unless it is intentionally meant to open chat.

## 8. Recommended insertion point

Render KumoGameScene after the projects section closes and before the existing section with class=head-prompt and id=head-prompt.

Current document order: hero, #projects, #head-prompt, Kumo info overlay, project modal instances, floating KumoChat.

Recommended order: hero, #projects, Kumo game section, #head-prompt, Kumo info overlay, project modal instances, floating KumoChat.

This keeps the game in normal document flow near the existing Kumo content, without placing it inside the carousel, a modal, or the fixed chat wrapper.

## 9. Risks

CSS collisions:

- Use a unique namespace such as .kumo-game and .kumo-game__... . Avoid generic global names like .screen, .button, .dialog, .modal, .title, .pixel, or .active.
- Do not reuse the existing .kumo fixed-chat class.
- Global button, a, img, svg, body, main, and .container rules affect new markup.

Duplicate IDs:

- IDs are document-global. Do not duplicate Kumo IDs, project modal IDs, #projects, #head-prompt, #typewriter, #london-time, or Kumo info overlay IDs.

Mobile:

- Test narrow and landscape widths. Do not assume fixed chat viewport space.
- Avoid hover-only controls. Make controls touch-friendly and keyboard accessible.
- Preserve page scrolling while the game is inactive.
- For crisp pixel art, consider image-rendering: pixelated only on actual pixel art.

Performance:

- The homepage already has several videos and animated interactions. Prefer a small DOM scene or one canvas, pause animation when off-screen, and respect reduced motion.
- Avoid repeated layout reads/writes in a per-frame loop.
- Existing Kumo avatar PNGs are high-resolution; reuse them deliberately.

Other interference:

- Preserve carousel and modal hooks.
- Keep Kumo chat's existing z-index and do not alter its fixed positioning globally.
- Do not use data-kumo-status-dot, data-kumo-status, data-kumo-who, data-open-kumo, or existing Kumo IDs for game state.
- Do not expose Worker secrets or add unrelated API calls.

## IMPLEMENTATION NOTES FOR ANOTHER LLM

- Add src/components/KumoGameScene.astro and import/render it from index.astro.
- Insert it between #projects and #head-prompt.
- Namespace all classes under a unique root such as .kumo-game.
- Scope keyboard listeners to the active game root; avoid global key capture.
- Do not touch existing Kumo IDs, classes, data attributes, or data-open-kumo hooks.
- Reuse existing Kumo avatar assets only if appropriate; no pixel-art or dialogue-box assets currently exist.
- Use normal document flow, responsive sizing, touch-friendly controls, reduced-motion behavior, and off-screen animation pausing.
- Use component-local Astro style/script blocks for the new behavior.
- After implementation, run the build and test desktop, mobile, keyboard, reduced-motion, and coexistence with Kumo chat.
