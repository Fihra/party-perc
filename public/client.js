/* Draw remotely with other people!
 *
 * JavaScript code for a website that sets up p5.js and talks
 * to another client using socket.io.
 * 
 * update the setup, draw, and p5.js event functions as you need to
 * for your interactions. you can also mix this with the other JavaScript
 * methods we've been using for event handling, styling, etc.
 */

const SOCKET_URL = window.location.host;
const socket = io.connect(SOCKET_URL);

const snare = new Instrument("snare",
    new Tone.NoiseSynth({
      envelope:{
        attack: 0.01,
        decay: 0.2,
        sustain: 0.001,
        release: 0.01
      }
    }).toDestination()
)

const kick = new Instrument("kick",
  new Tone.MembraneSynth({
  envelope:{
    attack: 0.1,
    decay: 0.5,
    sustain: 0.5,
    release: 0.2
  }
}).toDestination()
)

const hihat = new Instrument("hihat",
  new Tone.NoiseSynth({
  envelope:{
    attack: 0.01,
    decay: 0.2,
    sustain: 0.001,
    release: 0.01
  }
}).toDestination()
)

let highPassFilter = new Tone.Filter(500, "highpass").toDestination();

let lowPassFilter = new Tone.Filter(4500, "lowpass").toDestination();

snare.synth.connect(lowPassFilter);
kick.synth.connect(lowPassFilter);
hihat.synth.connect(highPassFilter);

const drumKit = [snare, kick, hihat];

let randomInstrument;

let hihatImg;
let kickImg;
let snareImg;
let imgLayer;

let currentAlphaValue = 255;
let mainAlpha = 255;

function preload(){
  hihatImg = loadImage("../assets/hihat_edit.png");
  snareImg = loadImage("../assets/snare_drum_edit.png");
  kickImg = loadImage("../assets/kick_drum.png");
}

function drumsetImages(){
  image(snareImg, width/2 - 400, height/2, 350, 350);

  image(kickImg, width/2 - 200, height/2, 350, 350);

  image(hihatImg, width/2 + 25, height/2, 350, 350);
}

// set up the sketch canvas and socket connection,
// including callback function for when the socket receives data.
function setup() {

  createCanvas(1200, 800);
  background(51);

  let randomNum = Math.floor(random(0,3));
  randomInstrument = drumKit[randomNum];

  console.log(randomInstrument);

  drumsetImages();

  // sets up socket connection for communicating with server,
  // DO NOT DELETE!
  socket.on("drawCircle", onDrawCircle);
}


function mouseDragged() {
  // in this app, when the user clicks and drags the mouse,
  // we need to send their mouse data to the server to
  // broadcast to other connected clients.
  
  // message needs 2 things:
  // name of message
  // data for that message

  createCanvas(1200, 800);
  background(51);

  // create an object for the data:
  let data = {
    x: mouseX,
    y: mouseY
  };

   drumsetImages();
  // send the message
  socket.emit("drawCircle", data);
  // snare.triggerAttackRelease("8n", "+0.001"); 

  noStroke();
  fill(255);

  // image(snareImg, mouseX, mouseY, 100, 100);
  // ellipse(mouseX, mouseY, 36, 36);
}

// This function is called when the server sends this
// client a message (see setup() function for where this is configured)
function onDrawCircle(data) {

  createCanvas(1200, 800);
  background(51);
  // Input data (from server) processing here. --->
 
  console.log(data);
  // snare.triggerAttackRelease("8n", "+0.001"); 
  drumsetImages();
  noStroke();
  // use both received color & coordinates
  fill(255, 0, 100);

  // image(snareImg, mouseX, mouseY, 100, 100);
  // ellipse(data.x, data.y, 36, 36);
}

function mousePressed(){
  console.log("hi");
  //  snare.triggerAttackRelease("8n", 0.05); 

  // console.log(randomInstrument);

  // currentAlphaValue = 0;

  console.log(randomInstrument.getName());

  switch(randomInstrument.getName().toLowerCase()){
    case "kick":
        randomInstrument.playSynth("C1", "8n", "+0.001");
        break;
    case "snare":
    case "hihat":
        randomInstrument.playSynth("8n", "+0.1");
        break;
    default:
        break;
  }


  
  // if(randomInstrument == kick){
  //     kick.triggerAttackRelease("C1", "8n", "+0.001"); 
  // } else {
  //     snare.triggerAttackRelease("8n", "+0.1"); 
  // }

  // kick.triggerRelease(1.08);
}

function draw() 
{
  // currentAlphaValue--;
  // console.log("current value: ", currentAlphaValue);

  // if(mouseIsPressed === true){
  //     snare.triggerAttackRelease("8n", 0.05); 
  // }
  //   console.log("mousex: ", mouseX)
  // console.log("mousey: ", mouseY);
}

/* leave this here so that Glitch will not mark global p5.js and socket.io functions as errors */
/* globals io, ADD, ALT, ARROW, AUDIO, AUTO, AXES, BACKSPACE, BASELINE, BEVEL, BEZIER, BLEND, BLUR, BOLD, BOLDITALIC, BOTTOM, BURN, CENTER, CHORD, CLAMP, CLOSE, CONTROL, CORNER, CORNERS, CROSS, CURVE, DARKEST, DEGREES, DEG_TO_RAD, DELETE, DIFFERENCE, DILATE, DODGE, DOWN_ARROW, ENTER, ERODE, ESCAPE, EXCLUSION, FALLBACK, FILL, GRAY, GRID, HALF_PI, HAND, HARD_LIGHT, HSB, HSL, IMAGE, IMMEDIATE, INVERT, ITALIC, LABEL, LANDSCAPE, LEFT, LEFT_ARROW, LIGHTEST, LINEAR, LINES, LINE_LOOP, LINE_STRIP, MIRROR, MITER, MOVE, MULTIPLY, NEAREST, NORMAL, OPAQUE, OPEN, OPTION, OVERLAY, P2D, PI, PIE, POINTS, PORTRAIT, POSTERIZE, PROJECT, QUADRATIC, QUADS, QUAD_STRIP, QUARTER_PI, RADIANS, RADIUS, RAD_TO_DEG, REMOVE, REPEAT, REPLACE, RETURN, RGB, RIGHT, RIGHT_ARROW, ROUND, SCREEN, SHIFT, SOFT_LIGHT, SQUARE, STROKE, SUBTRACT, TAB, TAU, TESS, TEXT, TEXTURE, THRESHOLD, TOP, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, TWO_PI, UP_ARROW, VIDEO, WAIT, WEBGL, accelerationX, accelerationY, accelerationZ, deltaTime, deviceOrientation, displayHeight, displayWidth, focused, frameCount, height, isKeyPressed, key, keyCode, keyIsPressed, mouseButton, mouseIsPressed, mouseX, mouseY, movedX, movedY, pAccelerationX, pAccelerationY, pAccelerationZ, pRotateDirectionX, pRotateDirectionY, pRotateDirectionZ, pRotationX, pRotationY, pRotationZ, pixels, pmouseX, pmouseY, pwinMouseX, pwinMouseY, rotationX, rotationY, rotationZ, touches, turnAxis, width, winMouseX, winMouseY, windowHeight, windowWidth, abs, acos, alpha, ambientLight, ambientMaterial, angleMode, append, applyMatrix, arc, arrayCopy, asin, atan, atan2, background, beginContour, beginShape, bezier, bezierDetail, bezierPoint, bezierTangent, bezierVertex, blend, blendMode, blue, boolean, box, brightness, byte, camera, ceil, char, circle, clear, clearStorage, color, colorMode, concat, cone, constrain, copy, cos, createA, createAudio, createButton, createCamera, createCanvas, createCapture, createCheckbox, createColorPicker, createDiv, createElement, createFileInput, createGraphics, createImage, createImg, createInput, createNumberDict, createP, createRadio, createSelect, createShader, createSlider, createSpan, createStringDict, createVector, createVideo, createWriter, cursor, curve, curveDetail, curvePoint, curveTangent, curveTightness, curveVertex, cylinder, day, debugMode, degrees, describe, describeElement, directionalLight, displayDensity, dist, downloadFile, ellipse, ellipseMode, ellipsoid, emissiveMaterial, endContour, endShape, erase, exitPointerLock, exp, fill, filter, float, floor, fract, frameRate, frustum, fullscreen, get, getFrameRate, getItem, getURL, getURLParams, getURLPath, green, gridOutput, hex, hour, httpDo, httpGet, httpPost, hue, image, imageMode, int, isLooping, join, keyIsDown, lerp, lerpColor, lightFalloff, lightness, lights, line, loadBytes, loadFont, loadImage, loadJSON, loadModel, loadPixels, loadShader, loadStrings, loadTable, loadXML, log, loop, mag, map, match, matchAll, max, millis, min, minute, model, month, nf, nfc, nfp, nfs, noCanvas, noCursor, noDebugMode, noErase, noFill, noLights, noLoop, noSmooth, noStroke, noTint, noise, noiseDetail, noiseSeed, norm, normalMaterial, orbitControl, ortho, perspective, pixelDensity, plane, point, pointLight, pop, popMatrix, popStyle, pow, print, push, pushMatrix, pushStyle, quad, quadraticVertex, radians, random, randomGaussian, randomSeed, rect, rectMode, red, redraw, registerPromisePreload, removeElements, removeItem, requestPointerLock, resetMatrix, resetShader, resizeCanvas, reverse, rotate, rotateX, rotateY, rotateZ, round, saturation, save, saveCanvas, saveFrames, saveGif, saveJSON, saveJSONArray, saveJSONObject, saveStrings, saveTable, scale, second, select, selectAll, set, setAttributes, setCamera, setFrameRate, setMoveThreshold, setShakeThreshold, shader, shearX, shearY, shininess, shorten, shuffle, sin, smooth, sort, specularColor, specularMaterial, sphere, splice, split, splitTokens, spotLight, sq, sqrt, square, storeItem, str, stroke, strokeCap, strokeJoin, strokeWeight, subset, tan, text, textAlign, textAscent, textDescent, textFont, textLeading, textOutput, textSize, textStyle, textWidth, texture, textureMode, textureWrap, tint, torus, translate, triangle, trim, unchar, unhex, updatePixels, vertex, writeFile, year */
