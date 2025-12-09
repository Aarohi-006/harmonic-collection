// === Flickity Initialization ===
const flktyInstances = Array.from(document.querySelectorAll('.carousel'))
  .map(carousel => new Flickity(carousel, { wrapAround: true, autoPlay: 2500 }));

// === Genre Filtering ===
const genreButtons = document.querySelectorAll('.genre-btn');
genreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    genreButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const genre = btn.dataset.genre;

    flktyInstances.forEach(flkty => {
      flkty.cells.forEach(cell => {
        const el = cell.element;
        el.style.display = (genre === 'all' || el.dataset.genre === genre) ? 'flex' : 'none';
      });
      flkty.resize();
    });
  });
});

// === Search Filtering ===
const searchInput = document.getElementById('movieSearch');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  flktyInstances.forEach(flkty => {
    flkty.cells.forEach(cell => {
      const el = cell.element;
      el.style.display = el.dataset.title.toLowerCase().includes(searchTerm) ? 'flex' : 'none';
    });
    flkty.resize();
  });
});

// === Review Submission with Stars ===
const reviewInput = document.getElementById('reviewInput');
const submitBtn = document.getElementById('submitReview');
const reviewList = document.getElementById('reviewList');
const starContainer = document.getElementById('starRating');

let selectedRating = 0;

// Star hover & click
starContainer.querySelectorAll('span').forEach(star => {
  star.addEventListener('mouseover', () => highlightStars(star.dataset.value));
  star.addEventListener('click', () => { selectedRating = star.dataset.value; highlightStars(selectedRating); });
  star.addEventListener('mouseout', () => highlightStars(selectedRating));
});

function highlightStars(rating) {
  starContainer.querySelectorAll('span').forEach(star => {
    star.classList.toggle('active', star.dataset.value <= rating);
  });
}

// Submit review
submitBtn.addEventListener('click', () => {
  const title = document.getElementById('movieTitle').value.trim();
  const text = reviewInput.value.trim();
  if (!title || !text || selectedRating == 0) return alert('Please enter movie title, review, and select stars!');

  const li = document.createElement('li');
  li.innerHTML = `<strong>${title}</strong> <span class="rating">${'★'.repeat(selectedRating)}</span><br>${text}`;
  reviewList.prepend(li);

  document.getElementById('movieTitle').value = '';
  reviewInput.value = '';
  selectedRating = 0;
  highlightStars(0);
});
