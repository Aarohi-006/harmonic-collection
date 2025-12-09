// === Flickity Carousels ===
const carousels = document.querySelectorAll('.carousel');
const flktyInstances = [];
carousels.forEach(carousel => {
  flktyInstances.push(new Flickity(carousel, { wrapAround: true, autoPlay: 2500 }));
});

// === Language Dropdown ===
const languageDropdown = document.querySelector('.language-dropdown');
languageDropdown.addEventListener('click', () => {
  languageDropdown.classList.toggle('active');
});

// === Floating Dots Background ===
const dotsContainer = document.getElementById('dots-background');
const dotsCount = 50;
const dots = [];

for (let i = 0; i < dotsCount; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.left = Math.random() * window.innerWidth + 'px';
  dot.style.top = Math.random() * window.innerHeight + 'px';
  dot.style.animationDuration = (3 + Math.random() * 5) + 's';
  dotsContainer.appendChild(dot);
  dots.push(dot);
}

// === Filters ===
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
      const flkty = Flickity.data(carousel);
      flkty.reloadCells();
    });
  });
});

// === Search Bar ===
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  carousels.forEach(carousel => {
    const cells = carousel.querySelectorAll('.carousel-cell');
    cells.forEach(cell => {
      const title = cell.getAttribute('data-title').toLowerCase();
      if (title.includes(query)) {
        cell.style.display = 'flex';
      } else {
        cell.style.display = 'none';
      }
    });
    const flkty = Flickity.data(carousel);
    flkty.reloadCells();
  });
});

// === Modal Functionality ===
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

    // Embed YouTube trailer using thumbnail
    const trailerURL = cell.getAttribute('data-trailer');
    const videoId = trailerURL.split('/embed/')[1];
    const thumbnailURL = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    modalTrailer.innerHTML = `
      <a href="${trailerURL}" target="_blank">
        <img src="${thumbnailURL}" alt="Trailer" style="width:100%;border-radius:10px;" />
      </a>
    `;
    modalOverlay.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
  modalTrailer.innerHTML = '';
});

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = 'none';
    modalTrailer.innerHTML = '';
  }
});

// === Review System ===
const stars = document.querySelectorAll('#starRating span');
let selectedStars = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedStars = star.getAttribute('data-star');
    stars.forEach(s => s.classList.remove('active'));
    for (let i = 0; i < selectedStars; i++) stars[i].classList.add('active');
  });
});

const submitReview = document.getElementById('submitReview');
submitReview.addEventListener('click', () => {
  const reviewInput = document.getElementById('reviewInput');
  const reviewList = document.getElementById('reviewList');
  const reviewText = reviewInput.value.trim();

  if (reviewText === '') return alert('Please write a review!');

  const li = document.createElement('li');
  li.innerHTML = `
    <p>${reviewText}</p>
    <div>Rating: ${selectedStars} ★</div>
    <div class="reaction-buttons">
      <button class="like-btn">👍</button>
      <button class="dislike-btn">👎</button>
    </div>
  `;
  reviewList.appendChild(li);
  reviewInput.value = '';
  selectedStars = 0;
  stars.forEach(s => s.classList.remove('active'));

  const likeBtn = li.querySelector('.like-btn');
  const dislikeBtn = li.querySelector('.dislike-btn');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('active');
    dislikeBtn.classList.remove('active');
  });
  dislikeBtn.addEventListener('click', () => {
    dislikeBtn.classList.toggle('active');
    likeBtn.classList.remove('active');
  });
});
