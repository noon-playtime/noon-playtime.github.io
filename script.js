const frontCover = document.getElementById('frontCover');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const openBtn = document.getElementById('openBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let pageIndex = 0; // 0 = หน้า1+2 แรก, 1 = flip หน้า

// เปิดหนังสือ
openBtn.addEventListener('click', () => {
  // ปกหมุนไปฝั่งซ้าย
  gsap.to(frontCover, {duration:1, rotateY:-180, ease:"power2.inOut"});

  // ซ่อนปุ่มเปิด
  gsap.to(openBtn,{duration:0.5, opacity:0, pointerEvents:"none"});

  // แสดงหน้า1+2
  setTimeout(() => {
    page1.style.visibility='visible';
    page1.style.left='calc(50% - 200px)'; // ฝั่งซ้าย
    page1.style.transformOrigin='right center';
    page1.style.zIndex=101;

    page2.style.visibility='visible';
    page2.style.left='calc(50% + 200px)'; // ฝั่งขวา
    page2.style.transformOrigin='left center';
    page2.style.zIndex=100;

    // แสดงปุ่มนำทาง
    prevBtn.classList.add('visible');
    nextBtn.classList.add('visible');
  }, 800);
});

// พลิกไปหน้า 2
nextBtn.addEventListener('click', () => {
  if(pageIndex===0){
    // หน้า1 พลิกไปฝั่งซ้ายทับปก
    gsap.to(page1, {duration:1, rotateY:-180, transformOrigin:'right center', ease:"power2.inOut", zIndex:50});
    pageIndex++;
  }
});

// พลิกกลับ
prevBtn.addEventListener('click', () => {
  if(pageIndex===1){
    gsap.to(page1, {duration:1, rotateY:0, transformOrigin:'right center', ease:"power2.inOut", zIndex:101});
    pageIndex--;
  }
});
