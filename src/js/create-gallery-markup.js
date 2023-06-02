export function createGalleryMarkup(dataPhotos) {
  return dataPhotos
    .map(photo => {
      return `    
      <li>
        <div class="photo-card">
            <a href="${photo.largeImageURL}">    
                <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/>
            </a>
            <div class="info">
                <div class="info-item">
                    <p class="info-item-title">
                        <b>Likes</b>
                    </p>
                    <p>${photo.likes}</p>
                </div>
                <div class="info-item">
                    <p class="info-item-title">
                        <b>Views</b>
                    </p>
                    <p>${photo.views}</p>
                </div>
                <div class="info-item">
                    <p class="info-item-title">
                        <b>Comments</b>
                    </p>
                    <p>${photo.comments}</p>
                </div>
                <div class="info-item">
                    <p class="info-item-title">
                        <b>Downloads</b>
                    </p>
                    <p>${photo.downloads}</p>
                </div>
            </div>
        </div>
      </li>`;
    })
    .join('');
}
