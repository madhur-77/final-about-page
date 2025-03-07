document.addEventListener('DOMContentLoaded', function() {
  
  const domainData = {
      ai: [
          "Yash Gunjal", "Mansi Barse", "Rajwardhan Mali", 
          "Anshul Khaire", "Karan Rajput", "Vighnesh Gupta", 
          "Mahendrakumar Suthar", "Jayesh Bairagi", "Swara Shetye", "Aaryan Shelar", "Krishna Yamsalwar"
      ],
      webdev: [
          "Smrutikant Parida", "Ajaya Nandiyawar", "Om Agarwal", 
          "Aryan Gupta", "Madhur Biradar", 
          "Vedant Nikam", 
          "Ayush Sahare", "Krushna Kodgirwar", 
          "Saurabh Gangurde", "Sahil Unhale"
      ],
      appdev: [
          "Pratik Paithankar", "Aditya Kale", "Anushka Dabhade", 
          "Tanmay Patil"
      ],
      cloud: [
          "Shivanand Satao", "Omkar Patil", "Mustafa Nazir", 
          "Samruddha Barhanpurkar"
      ],
      rd: [
          "Anshul Khaire", "Mrugesh Kulkarni", "Atharv Bhavsar", 
          "Pranav Chinthala", "Anup Deshmukh", "Anand Nair", 
          "Raghav Vyas"
      ]
  };
  
  
  const exploreBtn = document.getElementById('but1');
  const optionsContainer = document.getElementById('domainOptions');
  const options = document.querySelectorAll('.domain-option');
  const cardContainer = document.getElementById('domainCardContainer');
  const cardsWrapper = document.querySelector('.domain-cards-wrapper');
  const cardsEl = document.querySelector('.domain-cards');
  const prevBtn = document.querySelector('.domain-prev');
  const nextBtn = document.querySelector('.domain-next');
  const indicatorsContainer = document.querySelector('.domain-indicators');
  

  let currentDomain = null;
  let currentIndex = 0;
  let totalItems = 0;
  let cardWidth = 0;
  let visibleCards = 3;
  let maxIndex = 0;

  if (exploreBtn) {
      exploreBtn.addEventListener('click', toggleOptions);
  }
  
  options.forEach(option => {
      option.addEventListener('click', selectDomain);
  });
  
  if (prevBtn) {
      prevBtn.addEventListener('click', () => navigateCards('prev'));
  }
  
  if (nextBtn) {
      nextBtn.addEventListener('click', () => navigateCards('next'));
  }
  
  
  function toggleOptions() {
      if (optionsContainer.style.display === 'flex') {
          optionsContainer.style.display = 'none';
          cardContainer.style.display = 'none';
      } else {
          optionsContainer.style.display = 'flex';
      }
  }
  
  function selectDomain(e) {
     
      options.forEach(opt => opt.classList.remove('active'));
      
      e.target.classList.add('active');
      
      currentDomain = e.target.dataset.domain;
      
      loadCards(currentDomain);
      
      cardContainer.style.display = 'block';
      
      currentIndex = 0;
      updateCardsPosition();
  }
  
  function loadCards(domain) {
      
      cardsEl.innerHTML = '';
      indicatorsContainer.innerHTML = '';
     
      const data = domainData[domain];
      totalItems = data.length;
      
      data.forEach(item => {
          const card = document.createElement('div');
          card.className = 'domain-card';
          
          const title = document.createElement('h3');
          title.textContent = item;
          
          card.appendChild(title);
          cardsEl.appendChild(card);
      });
      
      maxIndex = Math.ceil(totalItems / visibleCards);
      for (let i = 0; i < maxIndex; i++) {
          const indicator = document.createElement('div');
          indicator.className = 'domain-indicator';
          if (i === 0) indicator.classList.add('active');
          
          indicator.addEventListener('click', () => {
              currentIndex = i * visibleCards;
              updateCardsPosition();
          });
          
          indicatorsContainer.appendChild(indicator);
      }
      
      setTimeout(() => {
          const firstCard = document.querySelector('.domain-card');
          if (firstCard) {
              const style = getComputedStyle(firstCard);
              cardWidth = firstCard.offsetWidth + parseInt(style.marginLeft || 0) + parseInt(style.marginRight || 0) + 20; 
              updateCardsPosition();
          }
      }, 0);
  }
  
  function navigateCards(direction) {
      if (direction === 'prev' && currentIndex > 0) {
          currentIndex--;
      } else if (direction === 'next' && currentIndex < totalItems - visibleCards) {
          currentIndex++;
      }
      
      updateCardsPosition();
  }
  
  function updateCardsPosition() {
      const translateX = -currentIndex * cardWidth;
      cardsEl.style.transform = `translateX(${translateX}px)`;
      
      const indicators = document.querySelectorAll('.domain-indicator');
      indicators.forEach((ind, index) => {
          ind.classList.toggle('active', Math.floor(currentIndex / visibleCards) === index);
      });
      
      if (prevBtn) {
          prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
          prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
      }
      if (nextBtn) {
          const isAtEnd = currentIndex >= totalItems - visibleCards;
          nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
          nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
      }
  }
  
  function adjustVisibleCards() {
      if (window.innerWidth < 768) {
          visibleCards = 1;
      } else if (window.innerWidth < 1024) {
          visibleCards = 2;
      } else {
          visibleCards = 3;
      }
      
      if (totalItems > 0) {
          maxIndex = Math.ceil(totalItems / visibleCards);
          
          indicatorsContainer.innerHTML = '';
          for (let i = 0; i < maxIndex; i++) {
              const indicator = document.createElement('div');
              indicator.className = 'domain-indicator';
              if (i === Math.floor(currentIndex / visibleCards)) indicator.classList.add('active');
              
              indicator.addEventListener('click', () => {
                  currentIndex = i * visibleCards;
                  updateCardsPosition();
              });
              
              indicatorsContainer.appendChild(indicator);
          }
      }
      
      if (currentIndex > totalItems - visibleCards) {
          currentIndex = Math.max(0, totalItems - visibleCards);
      }
      
      updateCardsPosition();
  }
  
  window.addEventListener('resize', adjustVisibleCards);
  
  adjustVisibleCards();
});