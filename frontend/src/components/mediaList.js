import React from 'react';

const MediaList = ({ media }) => {
  const blobBaseUrl = 'https://uniquestorageacct456.blob.core.windows.net/media';

  return (
    <div>
      <h2>Media List</h2>
      <ul>
        {media.map((item) => (
          <li key={item.id}>
            <a href={`${blobBaseUrl}/${item.fileName}`} target="_blank" rel="noopener noreferrer">
              {item.originalName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaList;