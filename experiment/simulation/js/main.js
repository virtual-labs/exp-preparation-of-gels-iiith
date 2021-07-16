"use strict";
let overallIteration = -4;
let divWidth;
let videoSpeed = 1;
let speedFactor = 1.0;

let fillSyringe = async () => {
  document.getElementById("line3").style.stopColor = "#556c80";
  const line = document.getElementById("half-grad3");
  const yFinalPosition = 0;
  let yPos = 100;
  const interval = window.setInterval(() => {
    if (yPos < yFinalPosition) {
      line.setAttribute("y1", "0.1%");
      return window.clearInterval(interval);
    }
    yPos -= 0.6;
    line.setAttribute("y1", `${yPos}%`);
  }, 1);
  document.getElementById("solution-beaker").style.cursor = "default";
};

let emptySyringe = async () => {
  document.getElementById("line3").style.stopColor = "white";
  const line = document.getElementById("half-grad3");
  const yFinalPosition = 0;
  let yPos = 100;
  const interval = window.setInterval(() => {
    if (yPos < yFinalPosition) {
      line.setAttribute("y1", "0.1%");
      return window.clearInterval(interval);
    }
    yPos -= 0.6;
    line.setAttribute("y1", `${yPos}%`);
  }, 1);
};

let fillPipette = async () => {
  const line = document.getElementById("half-grad2");
  const yFinalPosition = 0;
  let yPos = 100;
  const interval = window.setInterval(() => {
    if (yPos < yFinalPosition) {
      line.setAttribute("y1", "0.1%");
      return window.clearInterval(interval);
    }
    yPos -= 0.6;
    line.setAttribute("y1", `${yPos}%`);
  }, 1);
};

function pur() {
  if (overallIteration === 1) {
    changeMessage();
    let image = document.getElementById("spoon1");
    image.setAttribute("opacity", "1");
    image.style.transform = "translate(200%, -5%);";
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#spoon1",
      duration: 800,
      easing: "linear",
    });
    a1.add({
      duration: 0,
      translateX: "280%",
      translateY: "-125%",
    })
      .add({
        duration: 800,
        translateY: "-55%",
      })
      .add({
        translateY: "-125%",
        update: function (anim) {
          document.getElementById("spoon-mouth").style.fill = "#b0b816";
          document.getElementById("spoon-mouth").style.opacity = "1";
        },
      })
      .add({
        duration: 800,
        translateX: "500%",
        translateY: "175%",
      })
      .add({
        delay: "800",
        rotateZ: "45",
      })
      .add({
        update: function (anim) {
          document.getElementById("spoon-mouth").style.fill = "#b0b816";
          document.getElementById("spoon-mouth").style.opacity = "0";
          document.getElementById("pink-bottom").style.fill = "#b0b816";
        },
        opacity: 0,
      });
    document
      .getElementById("buffer-beaker")
      .setAttribute("onclick", "movePipette()");
    overallIteration++;
    document.getElementById("agarose-beaker").style.cursor = "default";
    document.getElementById("buffer-beaker").style.cursor = "pointer";

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function liftPiston() {
  let image = document.getElementById("syringe-piston");
  image.style.transform = "translate(100%, -5%);";
  image.style.pointerEvents = "none";
  let a1 = anime.timeline({
    targets: "#syringe-piston",
    duration: 800,
    easing: "linear",
  });
  a1.add({
    duration: 0,
    translateY: "8%",
  }).add({
    duration: 800,
    translateY: "-3%",
  });
}

async function movePipette() {
  if (overallIteration === 2) {
    changeMessage();
    let image = document.getElementById("pipette");
    image.setAttribute("opacity", "1");
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#pipette",
      duration: 800,
      easing: "linear",
    });
    let startX = "-980%";
    let startY = "150%";

    screenWidth();

    if (divWidth > 1759) {
      startY = "-150%";
      startX = "450%";
    }

    if (divWidth < 769) {
      startY = "120%";
      startX = "-980%";
    }

    a1.add({
      duration: 0,
      translateY: startY,
      translateX: startX,
    });
    fillPipette();
    await new Promise((r) => setTimeout(r, 1000));
    a1.add({
      duration: 500,
      translateX: "-110%",
    })
      .add({
        duration: 800,
        translateY: "170%",
      })
      .add({
        update: function (anim) {
          document.getElementById("layer-above-pink").style.fill = "#a37bd1";
        },
        opacity: 0,
      });
    document
      .getElementById("solution-beaker")
      .setAttribute("onclick", "shakeBeaker()");
    overallIteration++;
    document.getElementById("buffer-beaker").style.cursor = "default";
    document.getElementById("solution-beaker").style.cursor = "pointer";

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function shakeBeaker() {
  if (overallIteration === 3) {
    changeMessage();
    let image = document.getElementById("solution-beaker");
    let a1 = anime
      .timeline({
        targets: "#solution-beaker",
        duration: 800,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: 0,
      })
      .add({
        duration: 0,
        translateX: "0%",
      })
      .add({
        rotate: [10, 0, -10, 0],
      })
      .add({
        update: function (anim) {
          document.getElementById("layer-above-pink").style.fill = "#556c80";
          document.getElementById("pink-bottom").style.fill = "#556c80";
        },
      });
    document
      .getElementById("solution-beaker")
      .setAttribute("onclick", "moveBeaker()");
    overallIteration++;

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function moveBeaker() {
  let image = document.getElementById("solution-beaker");
  image.setAttribute("opacity", "1");
  document.getElementById("solution-label").style.opacity = 0;
  let a1 = anime.timeline({
    targets: "#solution-beaker",
    duration: 800,
    easing: "easeInOutSine",
  });
  if (overallIteration === 4) {
    a1.add({
      duration: 1000,
      translateY: -260,
      translateX: 250,
      scale: 0.45,
    }).add({
      opacity: 0,
    });
    overallIteration++;
  }
  document.getElementById("solution-beaker").style.cursor = "default";
  document.getElementById("microwave").style.cursor = "pointer";
  document.getElementById("microwave").setAttribute("onclick", "getBeaker()");
  changeMessage();
}

async function getBeaker() {
  let image = document.getElementById("solution-beaker");
  image.setAttribute("opacity", "1");
  let a1 = anime.timeline({
    targets: "#solution-beaker",
    duration: 800,
    easing: "easeInOutSine",
  });
  if (overallIteration === 5) {
    a1.add({
      duration: 1000,
      translateY: 0,
      translateX: 0,
      scale: 1,
    });
    overallIteration++;
  }
  document.getElementById("solution-label").style.opacity = 1;
  document
    .getElementById("solution-beaker")
    .setAttribute("onclick", "moveSyringe()");
  document.getElementById("solution-beaker").style.cursor = "pointer";
  document.getElementById("microwave").style.cursor = "default";
  changeMessage();
}

async function resetBeaker() {
  let image = document.getElementById("solution-beaker");
  image.setAttribute("opacity", "1");
  let a1 = anime.timeline({
    targets: "#solution-beaker",
    duration: 800,
    easing: "easeInOutSine",
  });
  a1.add({
    duration: 1000,
    translateY: 0,
    translateX: 0,
    scale: 1,
  });
}

async function moveSyringe() {
  if (overallIteration === 6) {
    let image = document.getElementById("syringe");
    image.style.opacity = 1;
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#syringe",
      duration: 800,
      easing: "linear",
    });

    let startX = "-1040%";
    let startY = "-410%";
    let endX = "240%";
    let endY = "-245%";

    screenWidth();

    if (divWidth > 1759) {
      startX = "-1300%";
      startY = "-370%";
      endX = "150%";
      endY = "-135%";
    }

    if (divWidth < 769) {
      startX = "260%";
      startY = "-1550%";
      endX = "120%";
      endY = "-280%";
    }

    a1.add({
      duration: 0,
      translateY: startY,
      translateX: startX,
      rotateZ: 0,
    });
    liftPiston();
    fillSyringe();
    await new Promise((r) => setTimeout(r, 1000));
    a1.add({
      duration: 100,
      rotateZ: 90,
    }).add({
      duration: 1000,
      translateY: endY,
      translateX: endX,
    });
    await new Promise((r) => setTimeout(r, 1300));
    emptySyringe();
    fillMold("inside1");
    fillMold("inside2");
    await new Promise((r) => setTimeout(r, 1300));
    document.getElementById("syringe").style.opacity = 0;
    changeMessage();
    overallIteration++;

    if (restartAnimation) {
      a1.restart();
    }
    restartAnimation = false;
    setTimeout(function () {
      document.getElementById("instruction").innerHTML =
        "Click on Restart option in the Control Menu to restart the experiment from scratch.";
      document.getElementById("observation").innerHTML =
        "Click on Restart option in the Control Menu to restart the experiment from scratch.";
    }, 10000);
  }
}

let fillMold = async (id) => {
  let path = document.getElementById(id);
  let finalPosition = 1;
  let curPosition = 0;
  while (true) {
    if (curPosition > finalPosition) break;
    curPosition += 0.01;
    path.setAttribute("offset", curPosition);
    await new Promise((resolve) => setTimeout(resolve, 0.5));
  }
};

let setupMessages = [
  "Click on the Agarose Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Buffer Solution Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Solution Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Microwave option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Gel Mold option in the Apparatus Menu to introduce it into the workspace.",
];

let setup = 0;

function setupMessage() {
  document.getElementById("instruction").innerHTML = setupMessages[setup];
  document.getElementById("observation").innerHTML = setupMessages[setup];
  setup++;
}

setupMessage();
async function visibility(x) {
  if (x === 1 && overallIteration === -4) {
    document.getElementById("agarose-beaker").style.visibility = "visible";
    overallIteration++;
    setupMessage();
  } else if (x === 2 && overallIteration === -3) {
    document.getElementById("buffer-beaker").style.visibility = "visible";
    overallIteration++;
    setupMessage();
  } else if (x === 3 && overallIteration === -2) {
    document.getElementById("solution-beaker").style.visibility = "visible";
    overallIteration++;
    setupMessage();
  } else if (x === 4 && overallIteration === -1) {
    document.getElementById("microwave-row").style.visibility = "visible";
    overallIteration++;
    setupMessage();
  } else if (x === 5 && overallIteration === 0) {
    document.getElementById("mold-row").style.visibility = "visible";
    overallIteration++;
    changeMessage();
  }
}

let instructionMessages = [
  "Click on the Agarose Beaker to transfer small amount (around 1mg) of Aragose into the empty Solution Beaker",
  "Click on the Buffer Beaker to transfer 5 ml of the Buffer Solvent to the Solution Beaker.",
  "Click on the  Solution Beaker to shake it and make a clear solution.",
  "Click on the Solution Beaker to place it in the Microwave. The solution needs to be heated on high temperature for some time.",
  "Click on the Microwave now to take out the Solution Beaker.",
  "Click on the Solution Beaker to transer some amount of the Gel Solution to the Gel Mold",
  "Wait for the Gel Solution to cool down in the mold and then you have succesfully prepared your Gel.",
];
let iter1 = -1;
function changeMessage() {
  iter1++;
  document.getElementById("instruction").innerHTML = instructionMessages[iter1];
  document.getElementById("observation").innerHTML = instructionMessages[iter1];
}

document.getElementById("agarose-beaker").style.cursor = "pointer";

function screenWidth() {
  divWidth = document.getElementById("workspace").clientWidth;
}

let originalSimulationHeight =
  document.getElementById("simulation").clientHeight;

document.getElementById("simulation").style.minHeight =
  originalSimulationHeight + "px";

let restartAnimation = false;

async function restart() {
  document.getElementById("simulation").style.height = originalSimulationHeight;

  document.getElementById("head-instructions").innerHTML = "Instructions";
  document.getElementById("head-observations").innerHTML = "Instructions";
  document.getElementById("instruction").innerHTML = "";
  document.getElementById("observation").innerHTML = "";
  overallIteration = -4;

  iter1 = -1;
  setup = 0;
  setupMessage();
  document.getElementById("syringe").style.opacity = 0;
  document.getElementById("apparatus-bottles").style.display = "block";
  document.getElementById("apparatus-microwave").style.display = "block";
  document.getElementById("agarose-beaker").style.visibility = "hidden";
  document.getElementById("buffer-beaker").style.visibility = "hidden";
  document.getElementById("solution-beaker").style.visibility = "hidden";
  document.getElementById("microwave-row").style.visibility = "hidden";
  document.getElementById("mold-row").style.visibility = "hidden";

  restartAnimation = true;

  document.getElementById("buffer-beaker").style.cursor = "default";
  document.getElementById("agarose-beaker").style.cursor = "pointer";
  document.getElementById("solution-beaker").style.cursor = "default";

  // Resetting the Solution Beaker
  resetBeaker();
  document.getElementById("solution-label").style.opacity = 1;
  document.getElementById("pink-bottom").style.fill = "none";
  document.getElementById("layer-above-pink").style.fill = "none";

  //Resetting the Mold
  document.getElementById("inside1").setAttribute("offset", "0%");
  document.getElementById("inside2").setAttribute("offset", "0%");
}

let sample = document.getElementById("agarose-beaker");
sample.addEventListener("click", pur);
