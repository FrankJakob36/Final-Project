// Initialize an array to store the composition
let composition = [];

// Function to play a single note
function playAudio(note) {
    const audio = new Audio(`/static/player/sounds/${note}.mp3`);
    audio.play();
}

// Function to add a note to the composition and play it
function addNoteAndPlay(note) {
    composition.push(note);
    document.getElementById('composition').innerText = 
        `Current Composition: ${composition.join(' - ')}`;
    playAudio(note);
}

// Function to play the entire composition
function playComposition() {
    if (composition.length === 0) {
        alert('No notes in the composition!');
        return;
    }
    let delay = 0;
    composition.forEach(note => {
        setTimeout(() => playAudio(note), delay);
        delay += 500; // Play each note with a 500ms delay
    });
}

// Function to save the composition
function saveComposition() {
    fetch('/save/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}' // CSRF Token for Django POST requests
        },
        body: JSON.stringify({ composition: composition })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Composition saved successfully!');
        } else {
            alert('Error saving composition: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to start a new composition
function newComposition() {
    composition = [];
    document.getElementById('composition').innerText = 'Current Composition: None';
}
