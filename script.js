/* =========================================
   WEDDING DATE
========================================= */

const weddingDate =
    new Date("November 26, 2026 19:00:00").getTime();


const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


function updateCountdown() {

    const now = new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    daysElement.textContent =
        String(days).padStart(2, "0");


    hoursElement.textContent =
        String(hours).padStart(2, "0");


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================
   LOADER
========================================= */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                document
                    .getElementById("loader")
                    .classList
                    .add("hide");

            },
            700
        );

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("show");

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(
        function (element) {

            observer.observe(element);

        }
    );


/* =========================================
   NAVBAR SCROLL
========================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }
);


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");


menuButton.addEventListener(
    "click",
    function () {

        navigation.classList.toggle("active");

    }
);


document
    .querySelectorAll("#navigation a")
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navigation.classList.remove(
                        "active"
                    );

                }
            );

        }
    );


/* =========================================
   MUSIC
========================================= */

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

let musicStarted = false;


/* -----------------------------------------
   UPDATE MUSIC BUTTON
----------------------------------------- */

function updateMusicButton() {

    if (music.paused) {

        musicButton.textContent = "♪";
        musicButton.classList.remove("playing");

    } else {

        musicButton.textContent = "❚❚";
        musicButton.classList.add("playing");

    }

}


/* -----------------------------------------
   START MUSIC
----------------------------------------- */

async function startMusic() {

    try {

        await music.play();

        musicStarted = true;

        updateMusicButton();

    } catch (error) {

        console.log(
            "Autoplay blocked. Waiting for user interaction."
        );

    }

}


/* -----------------------------------------
   MUSIC BUTTON
   PLAY / PAUSE
----------------------------------------- */

musicButton.addEventListener(
    "click",
    async function (event) {

        event.stopPropagation();

        if (music.paused) {

            try {

                await music.play();

                musicStarted = true;

            } catch (error) {

                console.error(
                    "Music play error:",
                    error
                );

            }

        } else {

            music.pause();

        }

        updateMusicButton();

    }
);


/* -----------------------------------------
   TRY AUTOPLAY ON PAGE LOAD
----------------------------------------- */

window.addEventListener(
    "load",
    function () {

        startMusic();

    }
);


/* -----------------------------------------
   FALLBACK
   FIRST USER INTERACTION
----------------------------------------- */

function startMusicOnFirstInteraction() {

    if (!musicStarted) {

        startMusic();

    }

}


/* First click */
document.addEventListener(
    "click",
    startMusicOnFirstInteraction,
    {
        once: true
    }
);


/* First touch */
document.addEventListener(
    "touchstart",
    startMusicOnFirstInteraction,
    {
        once: true
    }
);


/* First keyboard interaction */
document.addEventListener(
    "keydown",
    startMusicOnFirstInteraction,
    {
        once: true
    }
);


/* =========================================
   RSVP WHATSAPP
========================================= */

const rsvpForm =
    document.getElementById("rsvpForm");


rsvpForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("guestName")
                .value
                .trim();


        const attendance =
            document
                .getElementById("attendance")
                .value;


        /*
          अपना WhatsApp number यहाँ डालें।

          Country code के साथ number लिखें।
          Example:

          India:
          917500795719

          + sign नहीं लगाना।
        */

        const whatsappNumber =
            "917500795719";


        const message =
            `Hello! I am ${name}. ${attendance} for Avdesh & Aarti's wedding on 26 November 2026. ❤️`;


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* =========================================
   SHARE BUTTON
========================================= */

const shareButton =
    document.getElementById("shareButton");


shareButton.addEventListener(
    "click",
    async function () {

        const shareData = {

            title:
                "Wedding Invitation | Avdesh & Aarti",

            text:
                "You are invited to Avdesh & Aarti's wedding ❤️",

            url:
                window.location.href

        };


        try {

            if (
                navigator.share
            ) {

                await navigator.share(
                    shareData
                );

            } else {

                await navigator.clipboard.writeText(
                    window.location.href
                );


                alert(
                    "Invitation link copied!"
                );

            }

        }

        catch (error) {

            console.log(
                "Share cancelled."
            );

        }

    }
);

/* =========================================================
   3D MOUSE / TOUCH PARALLAX
   Gives the supplied wedding artwork a subtle depth effect.
========================================================= */

const parallaxItems =
    document.querySelectorAll(".parallax-3d");

let pointerX = 0;
let pointerY = 0;

function updateParallax() {

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    pointerX = (pointerX - centerX) / centerX;
    pointerY = (pointerY - centerY) / centerY;

    parallaxItems.forEach(function (element) {

        const depth =
            Number(element.dataset.depth || 0.4);

        const moveX = pointerX * depth * 22;
        const moveY = pointerY * depth * 18;

        element.style.transform =
            `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${pointerY * depth * -3}deg) rotateY(${pointerX * depth * 3}deg)`;

    });

}

window.addEventListener(
    "pointermove",
    function (event) {

        pointerX = event.clientX;
        pointerY = event.clientY;

        requestAnimationFrame(updateParallax);

    },
    { passive: true }
);

/* Reset the 3D tilt on smaller touch devices. */
window.addEventListener(
    "pointerleave",
    function () {

        parallaxItems.forEach(function (element) {

            element.style.transform = "";

        });

    }
);

/* Add a gentle scroll depth to decorative artwork. */
window.addEventListener(
    "scroll",
    function () {

        const scrollY = window.scrollY;

        document
            .querySelectorAll(".section-bg-art, .events-bg-frame, .venue-bg-palace")
            .forEach(function (element) {

                element.style.transform =
                    `translate3d(0, ${scrollY * 0.025}px, 0)`;

            });

    },
    { passive: true }
);

/* =========================================
   SMART GALLERY FRAME SIZING
   -----------------------------------------
   Ye function har image ka original
   width/height check karta hai aur uske
   according gallery frame ki height set
   karta hai.
========================================= */

function setupSmartGallery() {

    const gallery = document.querySelector(".gallery");

    // Agar gallery page par nahi hai to function stop.
    if (!gallery) {
        return;
    }

    const galleryItems = [
        ...gallery.querySelectorAll(".gallery-item")
    ];


    /* =====================================
       RESIZE GALLERY
    ===================================== */

    function resizeGallery() {

        const galleryStyles = getComputedStyle(gallery);

        // CSS me grid-auto-rows: 1px hai.
        const rowHeight =
            parseFloat(galleryStyles.gridAutoRows) || 1;

        // Current column gap.
        const rowGap =
            parseFloat(galleryStyles.rowGap) || 12;


        galleryItems.forEach((item) => {

            const image = item.querySelector("img");

            if (!image) {
                return;
            }


            /* =================================
               IMAGE SIZE APPLY FUNCTION
            ================================= */

            function applyImageSize() {

                const naturalWidth =
                    image.naturalWidth;

                const naturalHeight =
                    image.naturalHeight;


                // Image load nahi hui to stop.
                if (!naturalWidth || !naturalHeight) {
                    return;
                }


                /* ==============================
                   BLURRED BACKGROUND
                ============================== */

                item.style.setProperty(
                    "--gallery-bg",
                    `url("${image.currentSrc || image.src}")`
                );


                /* ==============================
                   FRAME WIDTH
                ============================== */

                const frameWidth =
                    item.getBoundingClientRect().width;


                if (!frameWidth) {
                    return;
                }


                /* ==============================
                   ORIGINAL IMAGE RATIO
                   
                   Example:
                   1200 x 800
                   = landscape

                   800 x 1200
                   = portrait
                ============================== */

                const imageRatio =
                    naturalHeight / naturalWidth;


                /* ==============================
                   REQUIRED IMAGE HEIGHT
                ============================== */

                const imageHeight =
                    frameWidth * imageRatio;


                /* ==============================
                   GRID ROW CALCULATION
                ============================== */

                const rowSpan = Math.max(
                    1,
                    Math.ceil(
                        (imageHeight + rowGap) /
                        (rowHeight + rowGap)
                    )
                );


                /* ==============================
                   SET FRAME HEIGHT
                ============================== */

                item.style.gridRowEnd =
                    `span ${rowSpan}`;
            }


            /* =================================
               IMAGE ALREADY LOADED
            ================================= */

            if (
                image.complete &&
                image.naturalWidth
            ) {

                applyImageSize();

            } else {

                /* =============================
                   WAIT FOR IMAGE LOAD
                ============================= */

                image.addEventListener(
                    "load",
                    applyImageSize,
                    {
                        once: true
                    }
                );
            }

        });
    }


    /* =====================================
       INITIAL CALCULATION
    ===================================== */

    resizeGallery();


    /* =====================================
       WINDOW RESIZE
       -------------------------------------
       Mobile/Desktop change hone par
       gallery dobara calculate hogi.
    ===================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                resizeGallery,
                120
            );

        }
    );


    /* =====================================
       RESIZE OBSERVER
       -------------------------------------
       Gallery ki actual width change hone
       par bhi images recalculate hongi.
    ===================================== */

    if ("ResizeObserver" in window) {

        const galleryObserver =
            new ResizeObserver(() => {

                resizeGallery();

            });

        galleryObserver.observe(gallery);
    }

}


/* =========================================
   START SMART GALLERY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    setupSmartGallery
);