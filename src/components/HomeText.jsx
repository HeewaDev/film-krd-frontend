import React from 'react';
import './HomeText.css'; // Ensure this path is correct

const HomeText = () => {
  return (
    <div className="home-text-container">
      <h2>Welcome to FilmKRD</h2>
      <p>
        FilmKRD is your ultimate guide to Kurdish cinema, showcasing the rich
        culture and diversity through films. Explore our curated collection,
        discover new releases, and dive into the world of Kurdish cinema.
      </p>
      <img className="home-img" src='https://images.squarespace-cdn.com/content/v1/660ad4b8807560011c7a5e1f/1711985874596-1H9CPAM5I28F29F37PB4/623e2172bac446468055fd0c_scroll-arrows-light.gif' alt='scroll-down-mouse' />
    </div>
  );
};

export default HomeText;
