export function render(arrayObjects) {
  if (arrayObjects.length === 0) {
    throw new Error();
  }

  const insert = arrayObjects
    .map(
      object => `<li class="gallery-object">
    <a href='${object.largeImageURL}' class="simple-gal"><img src='${object.webformatURL}' class="gallery-image" alt='${object.tags}' /></a>
    <ul class="gallery-stats">
    <li class="gallery-stats-likes">Likes <span>${object.likes}</span></li>
    <li class="gallery-stats-views">Views <span>${object.views}</span></li>
    <li class="gallery-stats-comments">Comments <span>${object.comments}</span></li>
    <li class="gallery-stats-downloads">Downloads <span>${object.downloads}</span></li>
    </ul>
    </li>`
    )
    .join('');
  return insert;
}
