export function createGalleryMarkup(dataPhotos) {
  return dataPhotos
    .map(photo => {
    //   const poster = movie.poster_path
    //     ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    //     : noposter;
      return `    
      <li>
        <div class="photo-card">
            <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <p>${photo.likes}</p>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <p>${photo.views}</p>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <p>${photo.comments}</p>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <p>${photo.downloads}</p>
                </p>
            </div>
        </div>
      </li>`;
    })
    .join('');
}
