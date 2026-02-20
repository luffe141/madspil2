

// Slider med kategoriskift og 6 firkanter ad gangen
document.addEventListener('DOMContentLoaded', function () {
    let currentCategory = 'husholdning';
    let currentSlide = 0;
    const slides = document.querySelectorAll('.tips-slide');
    const dots = document.querySelectorAll('.tips-dot');
    const prevBtn = document.querySelector('.tips-prev');
    const nextBtn = document.querySelector('.tips-next');
    const categoryBtns = document.querySelectorAll('.tips-category-btn');
    const title = document.getElementById('tips-title');

    function getCategorySlides(category) {
        return Array.from(slides).filter(slide => slide.dataset.category === category);
    }

    function showSlide(index) {
        const categorySlides = getCategorySlides(currentCategory);
        const slidesPerPage = 6;
        const totalPages = Math.ceil(categorySlides.length / slidesPerPage);
        if (index < 0) index = totalPages - 1;
        if (index >= totalPages) index = 0;

        // Skjul alle slides
        slides.forEach(slide => slide.style.display = 'none');
        // Vis kun slides for valgt kategori og side
        for (let i = 0; i < slidesPerPage; i++) {
            let slideIndex = index * slidesPerPage + i;
            if (slideIndex < categorySlides.length) {
                categorySlides[slideIndex].style.display = 'flex';
            }
        }
        // Opdater dots
        dots.forEach((dot, i) => {
            dot.style.opacity = i === index ? '1' : '0.5';
            dot.style.display = i < totalPages ? 'inline-block' : 'none';
        });
        currentSlide = index;
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            currentSlide = 0;
            // Opdater titel
            title.textContent = btn.dataset.category === 'husholdning' ? 'Tips til husholdning' : 'Tips til virksomhed';
            showSlide(0);
        });
    });

    // Init
    showSlide(0);
});
