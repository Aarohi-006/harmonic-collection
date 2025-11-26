// Flickity Initialization
const carousels = document.querySelectorAll('.carousel');
const flktyInstances = [];
carousels.forEach(carousel => {
  flktyInstances.push(new Flickity(carousel, {wrapAround:true, autoPlay:2500}));
});

// Independent Genre Filters
const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const genre = button.dataset.genre;

    carousels.forEach((carousel, index) => {
      const flkty = flktyInstances[index];
      carousel.querySelectorAll('.carousel-cell').forEach(cell => {
        if (genre === 'all' || cell.dataset.genre === genre) cell.style.display = 'flex';
        else cell.style.display = 'none';
      });
      flkty.reloadCells(); 
    });
  });
});

// Modal + YouTube
const modalOverlay=document.getElementById('modalOverlay');
const modalTitle=document.getElementById('modalTitle');
const modalYear=document.getElementById('modalYear');
const modalRating=document.getElementById('modalRating');
const modalDesc=document.getElementById('modalDesc');
const modalTrailer=document.getElementById('modalTrailer');
const closeModal=document.getElementById('closeModal');

document.querySelectorAll('.carousel-cell').forEach(cell=>{
  cell.addEventListener('click',()=>{
    if(cell.dataset.title){
      modalTitle.textContent=cell.dataset.title;
      modalYear.textContent="Year: "+cell.dataset.year;
      modalRating.textContent="Rating: "+cell.dataset.rating;
      modalDesc.textContent=cell.dataset.desc;
      modalTrailer.innerHTML=`<iframe width="100%" height="250" src="${cell.dataset.trailer}" frameborder="0" allowfullscreen></iframe>`;
      modalOverlay.style.display='flex';
    }
  });
});

closeModal.addEventListener('click',()=>{modalOverlay.style.display='none'; modalTrailer.innerHTML='';});
modalOverlay.addEventListener('click',e=>{if(e.target===modalOverlay){modalOverlay.style.display='none'; modalTrailer.innerHTML='';}});

// Review System
const reviewInput=document.getElementById('reviewInput');
const submitBtn=document.getElementById('submitReview');
const reviewList=document.getElementById('reviewList');
let selectedStars=0;
const stars=document.querySelectorAll('#starRating span');
stars.forEach(star=>{
  star.addEventListener('mouseover',()=>{stars.forEach(s=>s.classList.remove('active')); for(let i=0;i<star.dataset.star;i++) stars[i].classList.add('active');});
  star.addEventListener('click',()=>selectedStars=star.dataset.star);
});
submitBtn.addEventListener('click',()=>{
  const text=reviewInput.value.trim();
  if(text===''){alert('Please write something before submitting!'); return;}
  const li=document.createElement('li');
  li.innerHTML=`<p>${text}</p><div>Rating: ${selectedStars} ★</div><div class="reaction-buttons"><button class="like-btn">👍</button><button class="dislike-btn">👎</button></div>`;
  const likeBtn=li.querySelector('.like-btn');
  const dislikeBtn=li.querySelector('.dislike-btn');
  likeBtn.addEventListener('click',()=>{likeBtn.classList.toggle('active'); dislikeBtn.classList.remove('active');});
  dislikeBtn.addEventListener('click',()=>{dislikeBtn.classList.toggle('active'); likeBtn.classList.remove('active');});
  reviewList.appendChild(li); reviewInput.value=''; stars.forEach(s=>s.classList.remove('active')); selectedStars=0;
});

// Floating Dots Background
const canvas=document.getElementById('dots-background');
const ctx=canvas.getContext('2d');
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resizeCanvas();
window.addEventListener('resize',resizeCanvas);

const dots=[];
for(let i=0;i<150;i++){dots.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,radius:Math.random()*2+1,speedX:(Math.random()-0.5)*0.5,speedY:(Math.random()-0.5)*0.5});}

function animateDots(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dots.forEach(dot=>{
    ctx.beginPath();
    ctx.arc(dot.x,dot.y,dot.radius,0,Math.PI*2);
    ctx.fillStyle='white';
    ctx.fill();
    dot.x+=dot.speedX; dot.y+=dot.speedY;
    if(dot.x<0||dot.x>canvas.width) dot.speedX*=-1;
    if(dot.y<0||dot.y>canvas.height) dot.speedY*=-1;
  });
  requestAnimationFrame(animateDots);
}
animateDots();
