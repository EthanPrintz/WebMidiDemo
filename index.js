// Enable Midi communication
WebMidi.enable().then(onMidiEnabled).catch(err => alert(err));

// Called after Midi successfully enabled
function onMidiEnabled(){
    // Set Input/Output
    const midiOut = WebMidi["outputs"][0]
    const channel = midiOut.channels[1];

    // Setup divs in javascript
    const keys = ["C4","Db4","D4"]
    const midiKeys = [60,61,62]
    const keyDivs = keys.map(k => document.getElementById(k))

    keyDivs.forEach((kd, i) => {
        // Send key on mousedown
        kd.addEventListener("mousedown", () => {
            sendMidiMessage(midiKeys[i], channel)
        }, false)
        // Send stopping key (59/B4) on mouseup or out
        kd.addEventListener("mouseup", () => {
            stopMidiMessage(channel)
        }, false)
        kd.addEventListener("mouseout", () => {
            stopMidiMessage(channel)
        }, false)
    })
}

function sendMidiMessage(note, channel){
    channel.playNote(note)
}

function stopMidiMessage(channel){
    channel.playNote("B3")
}