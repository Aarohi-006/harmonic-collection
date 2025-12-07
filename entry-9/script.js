// Flickity Initialization
const carousels = document.querySelectorAll('.carousel');
const flktyInstances = [];
carousels.forEach(carousel => {
  flktyInstances.push(new Flickity(carousel, { wrapAround: true, autoPlay: 2500 }));
});

// Language Dropdown Toggle
const languageDropdown = document.querySelector('.language-dropdown');
languageDropdown.addEventListener('click', () => {
  languageDropdown.classList.toggle('active');
});

// Filter Buttons
const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const genre = btn.getAttribute('data-genre');

    carousels.forEach(carousel => {
      const cells = carousel.querySelectorAll('.carousel-cell');
      cells.forEach(cell => {
        if (genre === 'all' || cell.getAttribute('data-genre') === genre) {
          cell.style.display = 'flex';
        } else {
          cell.style.display = 'none';
        }
      });
    });
  });
});

// Modal Functionality
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalRating = document.getElementById('modalRating');
const modalDesc = document.getElementById('modalDesc');
const modalTrailer = document.getElementById('modalTrailer');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.carousel-cell').forEach(cell => {
  cell.addEventListener('click', () => {
    modalTitle.textContent = cell.getAttribute('data-title');
    modalYear.textContent = 'Year: ' + cell.getAttribute('data-year');
    modalRating.textContent = 'Rating: ' + cell.getAttribute('data-rating');
    modalDesc.textContent = cell.getAttribute('data-desc');
    modalTrailer.innerHTML = `<iframe width="100%" height="200" src="${cell.getAttribute('data-trailer')}" frameborder="0" allowfullscreen></iframe>`;
    modalOverlay.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
  modalTrailer.innerHTML = '';
});

// Star Rating for Reviews
const stars = document.querySelectorAll('#starRating span');
stars.forEach(star => {
  star.addEventListener('click', () => {
    stars.forEach(s => s.classList.remove('active'));
    for (let i = 0; i < star.getAttribute('data-star'); i++) {
      stars[i].classList.add('active');
    }
  });
});

// Submit Review
const submitReview = document.getElementById('submitReview');
submitReview.addEventListener('click', () => {
  const reviewInput = document.getElementById('reviewInput');
  const reviewList = document.getElementById('reviewList');
  const rating = document.querySelectorAll('#starRating span.active').length;
  if (reviewInput.value.trim() === '') return;
  const li = document.createElement('li');
  li.textContent = `Rating: ${rating} ★ - ${reviewInput.value}`;
  reviewList.appendChild(li);
  reviewInput.value = '';
  stars.forEach(s => s.classList.remove('active'));
});