$(document).ready(function () {
  // Define the drum kits
  const heaterKit = [
      {
        keyCode: 81,
        keyTrigger: "Q",
        id: "Heater 1",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      },
      {
        keyCode: 87,
        keyTrigger: "W",
        id: "Heater 2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      },
      {
        keyCode: 69,
        keyTrigger: "E",
        id: "Heater 3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      },
      {
        keyCode: 65,
        keyTrigger: "A",
        id: "Heater 4",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      },
      {
        keyCode: 83,
        keyTrigger: "S",
        id: "Clap",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      },
      {
        keyCode: 68,
        keyTrigger: "D",
        id: "Open HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      },
      {
        keyCode: 90,
        keyTrigger: "Z",
        id: "Kick n' Hat",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      },
      {
        keyCode: 88,
        keyTrigger: "X",
        id: "Kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      },
      {
        keyCode: 67,
        keyTrigger: "C",
        id: "Closed HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      },
    ],
    smoothPianoKit = [
      {
        keyCode: 81,
        keyTrigger: "Q",
        id: "Chord 1",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
      },
      {
        keyCode: 87,
        keyTrigger: "W",
        id: "Chord 2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
      },
      {
        keyCode: 69,
        keyTrigger: "E",
        id: "Chord 3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
      },
      {
        keyCode: 65,
        keyTrigger: "A",
        id: "Shaker",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
      },
      {
        keyCode: 83,
        keyTrigger: "S",
        id: "Open HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
      },
      {
        keyCode: 68,
        keyTrigger: "D",
        id: "Closed HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
      },
      {
        keyCode: 90,
        keyTrigger: "Z",
        id: "Punchy Kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
      },
      {
        keyCode: 88,
        keyTrigger: "X",
        id: "Side Stick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
      },
      {
        keyCode: 67,
        keyTrigger: "C",
        id: "Snare",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
      },
    ];

  // Initialize variables
  let powerBtn = $("#powerBtn");
  let bankBtn = $("#bankBtn");
  let volumeSlider = $("#volumeSlider");
  let isPowerOn = false;
  let currentBank = "Heater Kit";
  let currentSet = heaterKit; // Default to Heater Kit
  let volume = 0.5; // Default volume level
  let drumPad = $(".drum-pad");
  let displayPanel = $("#display");

  powerBtn.on("click", () => {
    isPowerOn = !isPowerOn;
    powerBtn.toggleClass("bg-red-500 hover:bg-red-600");
    powerBtn.toggleClass("bg-green-500 hover:bg-green-600");

    // Update button label
    powerBtn.find("span").text(isPowerOn ? "Power: ON" : "Power: OFF");
  });

  // Volume Control
  volumeSlider.on("input", () => {
    if (!isPowerOn) return;
    volume = volumeSlider.val() / 100; // Convert to percentage
    $("#volumeDisplay").text(`Volume: ${Math.floor(volume * 100)}%`);
  });

  // Toggle between heater kit and smooth piano kit
  bankBtn.on("click", () => {
    if (!isPowerOn) return;
    currentBank =
      currentBank === "Heater Kit" ? "Smooth Piano Kit" : "Heater Kit";
    bankBtn.text(`Bank: ${currentBank}`);
    currentSet = currentBank === "Heater Kit" ? heaterKit : smoothPianoKit;
    for (let i = 0; i < drumPad.length; i++) {
      const pad = $(drumPad[i]);
      const sound = currentSet[i];
      pad.find(".label").text(sound.id);
      pad
        .find("audio.clip")
        .attr("id", sound.keyTrigger)
        .attr("src", sound.url);
    }
  });

  //Play sound
  const playSound = (url) => {
    if (!isPowerOn) return;
    const audio = new Audio(url);
    audio.play();
    audio.volume = volume; // Set volume
  };

  //Handle keydown events
  $(document).on("keydown", (e) => {
    if (!isPowerOn) return;
    const pad = currentSet.find((s) => s.keyCode === e.keyCode);
    if (!pad) return;
    const audioEl = $(`audio#${pad.keyTrigger}`)[0];
    audioEl.currentTime = 0;
    audioEl.volume = volume;
    audioEl.play();
    displayPanel.text(pad.id);
  });

  //Handle click events on drum pads
  drumPad.on("click", function (e) {
    if (!isPowerOn) return;
    const key = $(this).data("key");
    const audio = $(this).find("audio.clip")[0];
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
    const sound = currentSet.find((s) => s.keyTrigger === key);
    const keyTrigger = $(this).data("key"); // Correct selector
    const pad = currentSet.find((s) => s.keyTrigger === keyTrigger);

    displayPanel.text(sound.id);
  });
});
