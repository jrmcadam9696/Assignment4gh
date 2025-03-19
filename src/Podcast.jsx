import React from 'react';

const Podcast = ({ season, episode, episodeTitle, setCurrentTrack }) => {
  return (
    <div className="podcast" onClick={() => setCurrentTrack(episodeTitle)}>
      <h3>{episodeTitle}</h3>
      <p>
        {season ? `Season ${season} Episode ${episode}` : `Episode ${episode}`}
      </p>
    </div>
  );
};

export default Podcast;