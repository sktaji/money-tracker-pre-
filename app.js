// Save as app.js

// STEP1: WAITLoaded FOR PAGE TO LOAD
document.addEventListenr('DOMContentLoaded',function(){

    // STEP2: GET ELEMENTS
    const descriptionInput=document.getElementById('description');
    const saveButton = document.getElementById('saveButton');
    const itemList = document.getElementById('itemList');

    //STEP3: LOAD SAVED DATA
    //Chec if we have saved data
    let items = [];

    //Try to load from localStorage
    const savedData = localStorage.getItem('myItems');
    if (savedData) {
        items = JSON.parse(savedData);
        console.log('Loaded items:', items);
    }

    //STEP4: DISPLAY FUNCTION
    function displayItems(){
        //Clear current list
        itemList.innerHTML = '';

        //Add each item
        items.forEach(function(item,index){
            //Create div element
            const div = document.createElement('div');
            div.className = 'list-item';

            //Add content
            div.innerHTML = `
            <span>${item.description}</span>
            <span>${item.date}</span>
            `;

            //Add to page
            itemList.appendChild(div);
        });
    }

    // STEP5: SAVE FUNCTION
    function saveItem(){
        // Get value from input
        const description = descriptionInput.value.trim();

        // Validate (check if not empty)
        if (description === ''){
            alert('Please enter something!');
            return;
        }

        // Create new item object
        const newItem = {
            description: description;
            date: new Date().toLocaleDateString();
            id: Date.now() // Unique ID based on timestamp
        };

        // Add to array
        items.push(newItem);

        // Save to localStorage (convert to String)
        localStorage.setItem('myItems',JSON.stringify(items));

        // Clear input
        descriptionInput.value = '';

        // Refresh display
        displayItems();

        console.log('Saved:', newItem);
    }

    // STEP6: CONNECT EVENT
    // When button is clicked, run saveItem
    saveButton.addEventListener('click', saveItem);

    // Also save when Enter key is presented in input
    descriptionInput.addEventListenr('keypress',function(event){
        if (event.key === 'Enter') {
            saveItem();
        }
    });

    // STEP7 : INITIAL DISPLAY
    displayItems();

    console.log('App is ready!');
});
