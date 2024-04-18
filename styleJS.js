
const cursorWrapper = document.getElementById('cursorWrapper');

    let prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const animation = (e, interacting, interactiable) => {
        let x = e.clientX - cursorWrapper.offsetWidth / 2,
            y = e.clientY - cursorWrapper.offsetHeight / 2;

        let keyframes;

        if (!prefersDarkMode){
            keyframes = {
                transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`,
                opacity: interacting ? '0.2' : '1'
            };
        } else {
            keyframes = {
                transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`,
                opacity: interacting ? '0.2' : '1'
            }
        }


        if (interactiable && interactiable.hasAttribute('btn-type')) {
            const btnType = interactiable.getAttribute('btn-type');
            if (btnType === 'link') {
                const icon = interactiable.getAttribute('ico-type');
                keyframes = {
                    transform: `translate(${x}px, ${y}px) scale(${interacting ? 2.5 : 1})`,
                };
                cursorWrapper.innerHTML = `<span class="material-symbols-rounded" style="font-size: 15px">${icon}</span>`;
            }
        } else {
            cursorWrapper.innerHTML = null;
        }

        cursorWrapper.animate(keyframes, {
            duration: 500,
            fill: 'forwards'
        });
    };

    window.onmousemove = e => {
        const interactiable = e.target.closest('.interactable');
        const interacting = interactiable !== null;
        animation(e, interacting, interactiable);
    };

    const showObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('show');
            else entry.target.classList.remove('show');
        })
    })


    const PLZOverlay = document.querySelector('.plz-wrapper');
    const topWrapper = document.getElementById('top-wrapper');
    const hiddenElements = document.querySelectorAll('.hiddenByScroll');
    hiddenElements.forEach((el) => showObserver.observe(el));
    let lastScroll = 0;

    window.onscroll = () => {
        const currentScoll = window.pageYOffset || document.documentElement.scrollTop;

            const wrapperStyle = {
                top: (currentScoll / 4) * -1 + 'px',
                opacity: 1 - (currentScoll / 700)
            };

            Object.assign(topWrapper.style, wrapperStyle);

        if (currentScoll > lastScroll) {
            PLZOverlay.classList.add('closed');
        } else {
            PLZOverlay.classList.remove('closed');
        }
        lastScroll = Math.max(currentScoll, 0);
    };




