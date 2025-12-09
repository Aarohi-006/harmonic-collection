// === Flickity Carousels ===
const carousels = document.querySelectorAll('.carousel');
carousels.forEach(carousel => {
  new Flickity(carousel, {
    wrapAround: true,
    autoPlay: 2500,
    cellAlign: 'left',
    contain: true,
    pageDots: false
  });
});

// === Language Dropdown ===
const languageDropdown = document.querySelector('.language-dropdown');
languageDropdown.addEventListener('click', () => {
  languageDropdown.classList.toggle('active');
});

// === Golden Floating Dots Background ===
const canvas = document.getElementById('dots-background');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const dots = [];
for(let i=0;i<100;i++){
  dots.push({x:Math.random()*width,y:Math.random()*height,r:Math.random()*3+1,speedY:Math.random()*1+0.2,speedX:Math.random()*0.5-0.25,alpha:Math.random()*0.5+0.3});
}
function animateDots(){
  ctx.clearRect(0,0,width,height);
  dots.forEach(dot=>{
    dot.y-=dot.speedY; dot.x+=dot.speedX;
    if(dot.y<0) dot.y=height; if(dot.x>width) dot.x=0; if(dot.x<0) dot.x=width;
    ctx.beginPath(); ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,204,0,${dot.alpha})`; ctx.fill();
  });
  requestAnimationFrame(animateDots);
}
animateDots();
window.addEventListener('resize',()=>{width=canvas.width=window.innerWidth;height=canvas.height=window.innerHeight;});

// === Filters ===
const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const genre=btn.getAttribute('data-genre');
    carousels.forEach(carousel=>{
      const flkty=Flickity.data(carousel);
      const cells=carousel.querySelectorAll('.carousel-cell');
      cells.forEach(cell=>cell.style.display=(genre==='all'||cell.getAttribute('data-genre')===genre)?'flex':'none');
      flkty.reloadCells();
    });
  });
});

// === Search Bar ===
const searchInput = document.querySelector('#searchInput');
searchInput.addEventListener('input',()=>{
  const query = searchInput.value.toLowerCase();
  carousels.forEach(carousel=>{
    const flkty=Flickity.data(carousel);
    const cells=carousel.querySelectorAll('.carousel-cell');
    cells.forEach(cell=>{
      const title=cell.getAttribute('data-title').toLowerCase();
      cell.style.display=title.includes(query)?'flex':'none';
    });
    flkty.reloadCells();
  });
});

// === Modal ===
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalRating = document.getElementById('modalRating');
const modalDesc = document.getElementById('modalDesc');
const modalTrailer = document.getElementById('modalTrailer');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.carousel-cell').forEach(cell=>{
  cell.addEventListener('click',()=>{
    modalTitle.textContent = cell.getAttribute('data-title');
    modalYear.textContent = 'Year: '+cell.getAttribute('data-year');
    modalRating.textContent = 'Rating: '+cell.getAttribute('data-rating');
    modalDesc.textContent = 'Description: '+cell.getAttribute('data-desc');
    const trailerURL = cell.getAttribute('data-trailer');
    modalTrailer.innerHTML = `<iframe width="100%" height="200" src="${trailerURL}" frameborder="0" allowfullscreen></iframe>`;
    modalOverlay.style.display='flex';
  });
});
closeModal.addEventListener('click',()=>{modalOverlay.style.display='none'; modalTrailer.innerHTML='';});
modalOverlay.addEventListener('click',e=>{if(e.target===modalOverlay){modalOverlay.style.display='none'; modalTrailer.innerHTML='';}});

// === Fixed Review System ===
document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('#starRating span');
  const submitReview = document.getElementById('submitReview');
  const reviewInput = document.getElementById('reviewInput');
  const reviewList = document.getElementById('reviewList');

  let selectedStars = 0;

  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s, i) => s.classList.toggle('active', i <= index));
    });
    star.addEventListener('mouseout', () => {
      stars.forEach((s, i) => s.classList.toggle('active', i < selectedStars));
    });
    star.addEventListener('click', () => {
      selectedStars = index + 1;
      stars.forEach((s, i) => s.classList.toggle('active', i < selectedStars));
    });
  });

  submitReview.addEventListener('click', () => {
    const reviewText = reviewInput.value.trim();
    if(!reviewText) return alert('Please write a review!');
    if(selectedStars === 0) return alert('Please select a star rating!');

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

    reviewInput.value='';
    selectedStars=0;
    stars.forEach(s=>s.classList.remove('active'));

    const likeBtn = li.querySelector('.like-btn');
    const dislikeBtn = li.querySelector('.dislike-btn');
    likeBtn.addEventListener('click',()=>{likeBtn.classList.toggle('active'); dislikeBtn.classList.remove('active');});
    dislikeBtn.addEventListener('click',()=>{dislikeBtn.classList.toggle('active'); likeBtn.classList.remove('active');});
  });
});
