document.addEventListener("DOMContentLoaded", function() {
  const flipbook = $("#flipbook");
  
  flipbook.turn({
    width: 800,
    height: 500,
    autoCenter: true,
    display: 'double',
    acceleration: true,
    gradients: true
  });

  // คลิกในสารบัญไปหน้าที่กำหนด
  document.querySelectorAll('.go-to').forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const page = parseInt(this.dataset.page);
      $("#flipbook").turn("page", page);
    });
  });
});
