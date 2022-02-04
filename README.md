# Web Midi Demo

*Created by Ethan Printz*
*Hosted on [Netlify](https://webmidi.netlify.app)*

I had quite a bit of difficulty thinking of a novel idea for this homework, so I ended up just going with the tried and true virtual piano interface. This mini piano can play the first three notes of our prompt (60/61/62, or C4, C#4, and D4). I used 59 as a note cutoff signal that plays when a note is released, so the tone is held exactly as long as the performer intends it to be. Tone.js is used to generate the synthesized notes on the audience page.