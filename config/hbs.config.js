const hbs = require("hbs");



hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("isSelected", function (id, cast, options) {
  // Verifica si el id está en el array cast
  if (cast.includes(id)) {
    return "selected";
  }

  return "";
});

// Dado un value del array, queremos encontrar el label para pintarlo bonito
hbs.registerHelper("getCategoryLabel", function (category, cast, options) {
  const categoryFound = CATEGORIES.find(arrCategory => arrCategory.value === category)

  return categoryFound.label || "";
});



hbs.registerHelper('randomPosition', (maxWidth, maxHeight, leftOffset = 320, topBuffer = 43, elementBuffer = 0) => {
  const availableWidth = maxWidth - leftOffset - elementBuffer; // Available width for creatures
  const availableHeight = maxHeight - topBuffer - elementBuffer; // Available height for creatures
  
  const randomLeft = Math.floor(Math.random() * availableWidth) + leftOffset;
  const randomTop = Math.floor(Math.random() * availableHeight) + topBuffer;

  return `top: ${randomTop}px; left: ${randomLeft}px;`;
});

hbs.registerHelper('addOne', function(value) {
  return value + 1;
});