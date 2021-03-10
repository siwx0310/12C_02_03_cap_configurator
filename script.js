"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"
  features[feature] = !features[feature];

  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);

    // TODO: More code
    // If feature is (now) turned on:
    // - mark target as chosen (add class "chosen")
    target.classList.add("chosen");
    // - un-hide the feature-layer(s) in the #product-preview;
    document
      .querySelector(`img[data-feature=${feature}]`)
      .classList.remove("hide");

    // - create featureElement and append to #selected ul
    const featureElement = createFeatureElement(feature);
    document.querySelector("#selected ul").append(featureElement);

    // - create FLIP-animation to animate featureElement from img in target

    // 1. first img :  find the start position (getBoundingClientRect)
    const start = target.getBoundingClientRect();

    // 2. last img: find the end position (getBoundingClientRect)
    const end = featureElement.getBoundingClientRect();

    // 3. invert: translate the element to the start-position
    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    featureElement.style.setProperty("--diffx", diffx);
    featureElement.style.setProperty("--diffy", diffy);

    // its intended position. Do it with normal animation or transition class!
    featureElement.classList = "animate-feature-in";
  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);

    // TODO: More code
    // Else - if the feature (became) turned off:

    // - no longer mark target as chosen
    target.classList.remove("chosen");

    // - hide the feature-layer(s) in the #product-preview
    document
      .querySelector(`img[data-feature=${feature}]`)
      .classList.add("hide");

    // - find the existing featureElement in #selected ul
    const existingFeatureElement = document.querySelector(
      `#selected ul li[data-feature=${feature}]`
    );

    // - create FLIP-animation to animate featureElement to img in target

    // 1. first img :  find the start position (getBoundingClientRect)
    const start = target.getBoundingClientRect();

    // 2. last img: find the end position (getBoundingClientRect)
    const end = existingFeatureElement.getBoundingClientRect();

    // 3. invert: translate the element to the start-position
    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    existingFeatureElement.style.setProperty("--diffx", diffx);
    existingFeatureElement.style.setProperty("--diffy", diffy);

    // its intended position. Do it with normal animation or transition class!
    existingFeatureElement.classList = "animate-feature-out";

    // - when animation is complete, remove featureElement from the DOM
    existingFeatureElement.addEventListener("animationend", () => {
      existingFeatureElement.remove();
    });
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  console.log("create img");
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
