// Save as app.js

document.addEventListener('DOMContentLoaded', function () {

  // STEP2: GET ELEMENTS
  const descriptionInput = document.getElementById('description');
  const saveButton = document.getElementById('saveButton');
  const itemList = document.getElementById('itemList');

  // Guard: required elements must exist
  if (!descriptionInput || !saveButton || !itemList) {
    console.error('Required DOM elements missing:', { descriptionInput, saveButton, itemList });
    return;
  }

  // STEP3: LOAD SAVED DATA
  let items = [];
  try {
    const savedData = localStorage.getItem('myItems');
    if (savedData) {
      items = JSON.parse(savedData);
      console.log('Loaded items:', items);
    }
  } catch (err) {
    console.error('Failed to parse saved items from localStorage:', err);
    items = [];
  }

  // safe HTML escape for rendering user input
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  // STEP4: DISPLAY FUNCTION
  function displayItems() {
    // Clear current list
    itemList.innerHTML = '';

    if (items.length === 0) {
      itemList.innerHTML = '<div class="empty">No items yet</div>';
      return;
    }

    // Add each item
    items.forEach(function (item, index) {
      const div = document.createElement('div');
      div.className = 'list-item';

      // Add content (escape user input)
      div.innerHTML = `
        <span class="description">${escapeHtml(item.description)}</span>
        <span class="date">${escapeHtml(item.date)}</span>
      `;

      // Add to page
      itemList.appendChild(div);
    });
  }

  // STEP5: SAVE FUNCTION
  function saveItem() {
    // Get value from input
    const description = descriptionInput.value.trim();

    // Validate (check if not empty)
    if (description === '') {
      alert('Please enter something!');
      return;
    }

    // Create new item object
    const newItem = {
      description: description,
      date: new Date().toLocaleDateString(),
      id: Date.now() // Unique ID based on timestamp
    };

    // Add to array
    items.push(newItem);

    // Save to localStorage (convert to String)
    localStorage.setItem('myItems', JSON.stringify(items));

    // Clear input
    descriptionInput.value = '';

    // Refresh display
    displayItems();

    console.log('Saved:', newItem);
  }

  // STEP6: CONNECT EVENTS
  // When button is clicked, run saveItem
  saveButton.addEventListener('click', saveItem);

  // Also save when Enter key is pressed in input
  descriptionInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveItem();
    }
  });

  // STEP7 : INITIAL DISPLAY
  displayItems();

  console.log('App is ready!');
});
