document.addEventListener('DOMContentLoaded', function(){
  const flipbook = document.getElementById('flipbook');
  if(flipbook){
    $(flipbook).turn({
      width: 600,
      height: 400,
      autoCenter: true,
      display: 'single', // ใช้ 'single' สำหรับมือถือ/คอม
    });
  }
});
