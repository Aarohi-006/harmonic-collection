// === Language Dropdown ===
const langDropdown = document.getElementById('languageDropdown');
langDropdown.addEventListener('click', () => {
  langDropdown.classList.toggle('active');
});

// === Search Bar ===
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const cells = document.querySelectorAll('.carousel-cell[data-title]');
  cells.forEach(cell => {
    const title = cell.dataset.title.toLowerCase();
    cell.style.display = title.includes(query) ? 'flex' : 'none';
  });
});

// === Genre Filtering ===
const genreButtons = document.querySelectorAll('.genre-buttons button');
genreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    genreButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const genre = btn.textContent.toLowerCase();
    const cells = document.querySelectorAll('.carousel-cell[data-title]');
    cells.forEach(cell => {
      const cellGenres = cell.dataset.genre ? cell.dataset.genre.toLowerCase().split(',') : [];
      cell.style.display = cellGenres.includes(genre) || genre === 'all' ? 'flex' : 'none';
    });
  });
});

// === Review System ===
const reviewInput = document.getElementById('reviewInput');
const submitBtn = document.getElementById('submitReview');
const reviewList = document.getElementById('reviewList');
let selectedStars = 0;

const stars = document.querySelectorAll('#starRating span');
stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    stars.forEach(s => s.classList.remove('active'));
    for (let i = 0; i < star.dataset.star; i++) stars[i].classList.add('active');
  });
  star.addEventListener('click', () => {
    selectedStars = star.dataset.star;
  });
});

submitBtn.addEventListener('click', () => {
  const text = reviewInput.value.trim();
  if (text === '') {
    alert('Please write a review before submitting!');
    return;
  }
  const li = document.createElement('li');
  li.innerHTML = `
    <p>${text}</p>
    <div>Rating: ${selectedStars} ★</div>
    <div class="reaction-buttons">
      <button class="like-btn">👍</button>
      <button class="dislike-btn">👎</button>
    </div>
  `;
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

  reviewList.appendChild(li);
  reviewInput.value = '';
  stars.forEach(s => s.classList.remove('active'));
  selectedStars = 0;
});

// === Modal Popup ===
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalRating = document.getElementById('modalRating');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');

const carouselCells = document.querySelectorAll('.carousel-cell');
carouselCells.forEach(cell => {
  cell.addEventListener('click', () => {
    if(cell.dataset.title){ // only movie cells
      modalTitle.textContent = cell.dataset.title;
      modalYear.textContent = "Year: " + cell.dataset.year;
      modalRating.textContent = "Rating: " + cell.dataset.rating;
      modalDesc.textContent = cell.dataset.desc;
      modalOverlay.style.display = 'flex';
    }
  });
});

closeModal.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});
modalOverlay.addEventListener('click', (e) => {
  if(e.target === modalOverlay) modalOverlay.style.display = 'none';
});

// === Flickity Carousels Initialization ===
const flktyElements = document.querySelectorAll('.carousel');
flktyElements.forEach(el => {
  new Flickity(el, {
    wrapAround: true,
    autoPlay: parseInt(el.dataset.autoplay) || 2500,
    cellAlign: 'left',
    contain: true,
  });
});
