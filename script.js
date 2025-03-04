// Fare hareketine duyarlı şekiller
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    // index'e göre farklı hızlar veriyoruz
    const speed = (index + 1) * 5; // shape1 => 10, shape2 => 20, shape3 => 30
    // Fare x ve y konumuna göre bir hesaplama yapıyoruz
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    
    // shape'in transform özelliğini değiştiriyoruz
    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
});
