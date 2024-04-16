import  { useEffect, useRef } from 'react';
import '../Styles/prodDesc.css';

function ProdDesc() {
  const revealElements = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      revealElements.current.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="prodDesc">
      <div className="cont reveal" ref={(el) => (revealElements.current[0] = el)}>
        <img
          src="https://images.unsplash.com/photo-1578604665675-9aee692f6ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvbGx1dGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          className="img"
          id="img1"
          alt="imagesforreact"
        />
        <div className="prodTextRight">
        <h3>Check Air Quality Index</h3>
          <p>Get real-time air quality data for your location and stay informed about the air you breathe.</p>
        </div>
      </div>

      <div className="cont2 reveal" ref={(el) => (revealElements.current[1] = el)}>
        <div className="prodTextLeft">
        <h3>Discover Plant Recommendations</h3>
          <p>Find the perfect plants for your home or garden based on your preferences and location.</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1626024134882-b1fcdc3e9902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBsYW50JTIwZ3Jvd3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          className="img"
          id="img2"
          alt="imagesforreact"
        />
      </div>

      <div className="cont reveal" ref={(el) => (revealElements.current[2] = el)}>
        <img
          src="https://images.unsplash.com/photo-1598902468171-0f50e32a7bf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnQlMjBudXJzZXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          className="img"
          id="img3"
          alt="imagesforreact"
        />

        <div className="prodTextRight">
        <h3>Explore Local Nurseries</h3>
          <p>Find nearby nurseries and explore a variety of plants and gardening essentials for your home.</p>
        </div>
      </div>
    </div>
  );
}

export default ProdDesc;
