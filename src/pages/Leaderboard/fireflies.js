// const createFirefly = () => {
//     const firefly = document.createElement('div');
//     firefly.className = 'firefly';
//     document.body.appendChild(firefly);
  
//     // Apply custom styles for fireflies
//     const fireflySize = Math.random() * 5 + 3; // Decreased size
//     firefly.style.width = `${fireflySize}px`;
//     firefly.style.height = `${fireflySize}px`;
//     firefly.style.backgroundColor = '#FFA500'; // Orangish color
//     firefly.style.borderRadius = '50%';
//     firefly.style.opacity = '0.8'; // Increased opacity
//     firefly.style.boxShadow = '0 0 20px 10px #FFA500'; // Increased glow effect
  
//     // Define the central rectangular area within the viewport
//     const centralBoxWidth = window.innerWidth / 2;
//     const centralBoxHeight = window.innerHeight / 2;
//     const minX = (window.innerWidth - centralBoxWidth) / 2;
//     const minY = (window.innerHeight - centralBoxHeight) / 2;
    
//     // Calculate random position within the central box
//     const randomX = Math.random() * centralBoxWidth + minX;
//     const randomY = Math.random() * centralBoxHeight + minY;
//     firefly.style.left = `${randomX}px`;
//     firefly.style.top = `${randomY}px`;
  
//     // Add animation for movement
//     const animationDuration = Math.random() * 10 + 5; // Increased duration for slower movement
//     const randomTranslateX = Math.random() * 20 - 10; // Random horizontal movement within a smaller range
//     const randomTranslateY = Math.random() * 20 - 10; // Random vertical movement within a smaller range
//     firefly.style.transform = `translate(${randomTranslateX}px, ${randomTranslateY}px)`;
  
//     // Add flicker effect to some fireflies
//     if (Math.random() < 0.2) { // Adjust the probability for flicker effect
//       firefly.style.animation = `flicker ${animationDuration}s infinite alternate`; // Flicker animation
//     } else {
//       firefly.style.animation = `move ${animationDuration}s infinite linear`; // Regular movement animation
//     }
  
//     setTimeout(() => {
//       firefly.remove();
//     }, animationDuration * 1000);
//   };
  
//   setInterval(createFirefly, 1000);
  