// Enable Midi communication
WebMidi.enable().then(onMidiEnabled).catch(err => alert(err));

// Enable AudioContext on click
let toneEnabled = false;
window.onload = () => {
    document.body.addEventListener('click', () => {
        if(!toneEnabled){
            Tone.start()
            toneEnabled = true;
            document.getElementById("note").innerHTML = "";
        }
    })
}

// Called after Midi successfully enabled
function onMidiEnabled(){
    // Set Input/Output
    const midiIn = WebMidi["inputs"][0];
    const channel = midiIn["channels"][1];

    // Store note DOM reference
    const noteText = document.getElementById("note");

    // Create tone.js synth
    const synth = new Tone.Synth().toDestination();

    // Add listener for notes on channel
    channel.addListener("noteon", e => {
        if(toneEnabled){
            noteReceived(e.note.identifier, noteText, synth);
        }
    })
}

function noteReceived(note, noteText, synth){
    // If it receives the stopping note (59/B3)
    if(note === "B3"){
        // Update HTML
        noteText.innerHTML =  ""
        // Release synth note
        const now = Tone.now()
        synth.triggerRelease(now)
    // If it receives any other note
    } else{
        // Update HTML
        noteText.innerHTML =  note
        // Play note using tone.js synth
        const now = Tone.now()
        synth.triggerAttack(note, now)
    }
}