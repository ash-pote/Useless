// Rotating stars
// duplicate our stars content 8 times
const duplicateHtml = (element, quantity) => {
    const starsContent = element.innerHTML

    const starsBottom = new Array(quantity).fill(starsContent).join('')

    element.innerHTML = starsBottom
}

// duplicate stars using function
const starsBottom = document.querySelector('#stars-bottom')
duplicateHtml(starsBottom, 6)

// play on hover only
var starsBottomRotate = anime({
    targets: '#stars-bottom svg',
    rotate: '1turn',
    delay: (el, i) => i * 300,
    duration: 1300,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
    autoplay: false
  })

starsBottom.onmouseover = function() {
    starsBottomRotate.play() 
}

starsBottom.onmouseout = function() {
    starsBottomRotate.pause() 
}

// if mobile play animation once
if (window.innerWidth < 900) {
    var starsBottomRotate = anime({
        loop: false,
      })

    var starsBottomRotateMobile = anime({
        targets: '#stars-bottom svg',
        rotate: '1turn',
        delay: (el, i) => i * 300,
        duration: 2300,
        loop: false,
        direction: 'alternate',
        easing: 'easeInOutSine',
        autoplay: false
      })

    starsBottom.ontouchstart = function() {
        starsBottomRotateMobile.play()
    }
}

/////////////////////////////////////////////////
// Star tilt using tilt.js
VanillaTilt.init(document.querySelectorAll(".scale"), {
    max: 75,
    speed: 400,
    glare: 1
})

/////////////////////////////////////////////////
// Squares rotating
var squareDiv = document.getElementById("squares")

var squareAnimation = anime({
        targets: '#squares rect',
        translateX: ['-50%', '-50%'],
        translateY: ['-50%', '-50%'],
        rotate: [45, 0, -45],
        delay: (el, i) => 100 * i,
        duration: (el, i) => 750,
        loop: true,
        easing: 'easeInOutSine',
        direction: 'alternate',
        autoplay: false
    })

squareDiv.onmouseover = function() {
    squareAnimation.play() 
}

squareDiv.onmouseout = function() {
    squareAnimation.pause() 

    anime({
        targets: '#squares rect',
        delay: 1000,
        rotate: [0],
        duration: 3000
      });
}

// if mobile play square animation once
if (window.innerWidth < 900) {
    var squareAnimation = anime({
        targets: '#squares rect',
        translateX: ['-50%', '-50%'],
        translateY: ['-50%', '-50%'],
        rotate: [45, 0, -45, 0],
        delay: (el, i) => 100 * i,
        duration: (el, i) => 750,
        loop: false,
        easing: 'easeInOutSine',
        direction: 'alternate',
        autoplay: false
    })
}

/////////////////////////////////////////////////
// Fact Generator Non repeating
// the content for facts
const facts = [
    // `The Mona Lisa has her own mailbox in the Louvre because of all the love letters she receives. Over the years many have fallen prey to the portrait’s "limpid and burning eyes", leaving her offerings of flowers, poems and, yes, love notes. Artist Luc Maspero allegedly took his own life becaus “For years I have grappled desperately with her smile. I prefer to die. Who knew art appreciation could be so dark?`,
    `Art used to be an Olympic event. The Olympics wasn’t always about abs and doping scandals. The founder of the modern games, the Baron Pierre de Coubertin, was enamoured with the idea of the true Olympian being a talented artist and sportsperson. Thanks to him, between 1912 and 1948 medals were given out for sporting-inspired masterpieces of architecture, music, painting, sculpture and literature`,
    `The colour wheel predates the United States. Considering the US is one of the oldest modern democracies, this is pretty amazing. Sir Isaac Newton invented the colour wheel in 1706 by refracting white sunlight into its six colours. The realisation that light alone was responsible for colour was radical, and the wheel proved especially useful for artists, who could now observe colour more effectively.`,
    `Artist Willard Wigan once inhaled his own work. What’s that, you say? He inhaled a painting?? The man must be enormous! Not quite. Wigan’s works are micro-sculptures’, so tiny they must be viewed through a microscope. In creating his art, Wigan has to slow his heartbeat and work between pulses. The work he inhaled was Alice, from Alice in Wonderland, but apparently she was even better when remade.`,
    `In 2003 street artist Banksy stuck his own work to the wall in the Tate Modern Museum. The prank was soon undone by its inadequate glue, but for a few hours Crimewatch UK Has Ruined the Countryside For All of Us was hung in one of the world’s most famous museums. It also inspired Andrzej Sobiepan, a Polish art student, to a similar feat in 2005, where for three days he successfully passed off his work as part of the National Museum’s collection.`
]

const factTag = document.getElementById('fact-text')
const factBtn = document.getElementById("fact-btn")

let chooseFact = function () {
    num = Math.floor(Math.random() * facts.length - 6);
    let name = facts.splice(num,1);
    facts.push(name);

    factTag.innerHTML = name
}
chooseFact()

// new random fact on click
factBtn.addEventListener("click", function() {
    chooseFact()
})

/////////////////////////////////////////////////
// Three star spin 
var stars = document.getElementById("three-stars")

var starAnimation = anime({
    targets: '#bottom-star',
    autoplay: false,

    translateY: {
        value: -108,
    },

    rotate: {
        value: 360,
        duration: 1800,
        easing: 'easeInOutSine'
      },
  });

  var starAnimationTwo = anime({
    targets: '#top-star',
    autoplay: false,

    translateY: {
        value: 108,
    },

    rotate: {
        value: -360,
        duration: 1800,
        easing: 'easeInOutSine'
      },
  });


  stars.onmouseover = function() {
    starAnimation.play(), starAnimationTwo.play()
}


/////////////////////////////////////////////////
// Delete Bubble on Hover
const circle = document.querySelectorAll('#bubble-container circle')
circle.forEach(function(circle){
    circle.setAttribute("id", "bubble");
});

const path = document.querySelectorAll('#bubble-container path')
path.forEach(function(path){
    path.setAttribute("id", "bubble");
});

const element = document.querySelectorAll('#bubble')
element.forEach(function(el){
  el.addEventListener('mouseover', function () {
    this.classList.add("bubble-delete");
  });
});


/////////////////////////////////////////////////
// Matter js shapes
const sectionTag = document.querySelector("section.shapes")

// On click change cursor to grabbed
sectionTag.addEventListener("mousedown", function () {
    sectionTag.style.cursor = "-webkit-grabbing"
})

sectionTag.addEventListener("mouseup", function () {
    sectionTag.style.cursor = "-webkit-grab"
})


// create engine - computation and math behind
// then add renderer - this draws the engine

// alias is a shortcut to make our code cleaner
// const Engine = Matter.Engine
// const Render = Matter.render
const {Engine, Render, Bodies, World, MouseConstraint, Composites, Query} = Matter

// work out section size
const sectionHeight = document.getElementById("shapesSection").clientHeight
const sectionWidth = document.getElementById("shapesSection").clientWidth


// where is matter being deployed

const engine = Matter.Engine.create()
const renderer = Matter.Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        height: sectionHeight,
        width: sectionWidth,
        background: "#FDFCFD",
        wireframes: false,
        pixelRatio: devicePixelRatio
    }
})

// have the ability to create a brand new shape
const createShapeH = function (x, y) {
    const randNum = true

        {
        return Bodies.rectangle (x, y, 18, 22, {
            render: {
                sprite: {
                    texture: "img/h-shape.png",
                    xScale: 0.5,
                    yScale: 0.5
                }
            }
        })
    } 
}

const createShapeA = function (x, y) {
    const randNum = true

        {
        return Bodies.rectangle (x, y, 18, 22, {
            render: {
                sprite: {
                    texture: "img/a-shape.png",
                    xScale: 0.5,
                    yScale: 0.5
                }
            }
        })
    } 
}

const createShapeS = function (x, y) {
    const randNum = true

        {
        return Bodies.rectangle (x, y, 18, 22, {
            render: {
                sprite: {
                    texture: "img/s-shape.png",
                    xScale: 0.5,
                    yScale: 0.5
                }
            }
        })
    } 
}


const wallOptions = {
    isStatic: true,
    render: {
        visible: false
    }
}

const ground = Bodies.rectangle(sectionWidth - (sectionWidth / 2), sectionHeight, sectionWidth, 1, wallOptions)
const ceiling = Bodies.rectangle(sectionWidth - (sectionWidth / 2), sectionHeight - sectionHeight + 1, sectionWidth, 1, wallOptions)
const leftWall = Bodies.rectangle(-50, sectionHeight / 2, 100, sectionHeight + 100, wallOptions)
const rightWall = Bodies.rectangle(sectionWidth + 50, sectionHeight / 2, 100, sectionHeight + 100, wallOptions)

const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        render: {
            visible: false
        }
    }
})

const initalShapes = Composites.stack(50, 50, 5, 5, 10, 40, function (x, y) {
    return createShapeH(x, y)
})
const secondShapes = Composites.stack(20, 50, 15, 5, 40, 40, function (x, y) {
    return createShapeA(x, y)
})
const thirdShapes = Composites.stack(10, 30, 15, 5, 40, 40, function (x, y) {
    return createShapeS(x, y)
})

World.add(engine.world, [
    // bigBall, 
    ground,
    ceiling,
    leftWall,
    rightWall,
    mouseControl,
    initalShapes,
    secondShapes,
    thirdShapes
])

// when we click the page add a new shape
sectionTag.addEventListener("click", function (event) {
    const shape = createShapeH(100, 50)
    World.add(engine.world, shape)
})

// run both the engine, and the renderer
Matter.Engine.run(engine)
Matter.Render.run(renderer)

// reload on resize
// only on larger screens
if (window.innerWidth > 900) {
    window.addEventListener("resize", function () {
        location.reload();
      })
}

/////////////////////////////////////////////////
// Clock
function runClock() {
    var now = new Date()

    var hour = now.getHours() % 12
    var min = now.getMinutes()
    var sec = now.getSeconds()
    var ms = now.getMilliseconds()

    var clock = document.querySelector('div.clock')
    var hourHand = clock.querySelector('div.hour')
    var minHand = clock.querySelector('div.minute')
    var secHand = clock.querySelector('div.second')

    var hourRotation = 30 * hour + (0.5 * min)
    var minRotation = 6 * min + (0.1 * sec)
    var secRotation = 6 * sec + 0.006 * ms

    hourHand.style.transform = "rotate(" + hourRotation + "deg)"
    minHand.style.transform = "rotate(" + minRotation + "deg)"
    secHand.style.transform = "rotate(" + secRotation + "deg)"

    requestAnimationFrame(runClock)
}

runClock()

/////////////////////////////////////////////////
// Draggable squares
Draggable.create(".drag");


/////////////////////////////////////////////////
// flashes
var flashes = document.getElementById("flashes")

var flashAnimation = anime({
    targets: '#flashes .flash',
    fill: '#BBADEF',
    delay: anime.stagger(80),
    duration: 30,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
    autoplay: false
})

flashes.onmouseover = function() {
    flashAnimation.play() 
}

flashes.onmouseout = function() {
    flashAnimation.pause() 

    anime({
        targets: '#flashes .flash',
        delay: 1000,
        fill: '#D4FFB8',
        duration: 3000
      });
}

// if mobile play  animation once
if (window.innerWidth < 900) {
    var flashAnimation = anime({
        loop: false,
        autoplay: false
    })

    var flashAnimationtl = anime.timeline({
        autoplay: false
      });

      flashAnimationtl.add({
        targets: '#flashes .flash',
        fill: '#BBADEF',
        delay: anime.stagger(80),
        duration: 30,
        loop: false,
        direction: 'alternate',
        easing: 'easeInOutSine',
        autoplay: false
      })

      flashAnimationtl.add({
        /* fade */
        targets: '#flashes .flash',
        delay: 2000,
        fill: '#D4FFB8',
        duration: 3000
      })

    flashes.ontouchstart = function() {
        flashAnimationtl.play() 
    }
}


/////////////////////////////////////////////////
// Space effect
var tl = anime.timeline({
    targets: '.planet_01',
    translateY: '-140%',
    scale: 0,
    duration: 3500,
    direction: 'alternate',
    loop: true,
    easing: 'linear',
    autoplay: false
  });

tl .add({
    targets: '.planet_02',
    translateY: '-130%',
    scale: 0.5,
    duration: 3500,
    direction: 'alternate',
    loop: true,
    easing: 'linear',
    autoplay: false
}, '-=20')

.add({
    targets: '.planet_03',
    translateY: '-130%',
    scale: 0.6,
    duration: 3500,
    direction: 'alternate',
    loop: true,
    easing: 'linear',
    autoplay: false
}, '-=3500')

.add({
    targets: '.planet_04',
    translateY: '-140%',
    scale: 1.6,
    duration: 3500,
    direction: 'alternate',
    loop: true,
    easing: 'linear',
    autoplay: false
}, '-=3500')

.add({
    targets: '.planet_05',
    translateY: '-135%',
    scale: [1.5],
    duration: 3500,
    direction: 'alternate',
    loop: true,
    easing: 'linear',
    autoplay: false
}, '-=3500')


.add({
    targets: '.planet_06',
    translateY: '-135%',
    scale: [0, 1],
    duration: 3500,
    direction: 'alternate',
    loop: true,
    easing: 'linear',
    autoplay: false
}, '-=3500')


var spaceDiv = document.getElementById("space_div")

spaceDiv.onmouseover = function() {
    tl.play() 
}

spaceDiv.onmouseout = function() {
    tl.pause() 
}

// if mobile auto play
if (window.innerWidth < 900) {
    tl.play() 
}

/////////////////////////////////////////////////
// Conveyor effect
var conveyorDiv = document.getElementById("conveyor")

var conveyorAnimation = anime({
    targets: '.conveyor',
    translateX: '-50%',
    duration: 6500,
    loop: true,
    easing: 'linear',
    autoplay: false
})

conveyorDiv.onmouseover = function() {
    conveyorAnimation.play() 
}

conveyorDiv.onmouseout = function() {
    conveyorAnimation.pause() 
}

// if mobile play once
if (window.innerWidth < 900) {
    var conveyorAnimation = anime({
        targets: '.conveyor',
        translateX: '-50%',
        duration: 6500,
        loop: false,
        easing: 'linear',
        autoplay: false
    })
}


/////////////////////////////////////////////////
// Reactive Type
document.getElementById("reactive-div").addEventListener("mousemove", function (event) {
    const x = event.clientX
    const y = event.clientY

    document.querySelectorAll(".reactive div").forEach(div => {
        const dx = div.offsetLeft + 0.1 - x
        const dy = div.offsetTop + 50 - y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const score = Math.exp(dist * -0.008)

        // span.innerHTML = score.toFixed(2)
        div.style.transform = "scale(" + score + ")"
        div.style.fontWeight = 100 + (100 * Math.round(8 * score))
    })
})


/////////////////////////////////////////////////
// Number Hover

const numberEl = document.querySelector('#number');

let numberAnimate = anime({
    targets: numberEl,
    innerHTML: [0, 9],
    round: 1,
    direction: 'alternate',
    easing: 'linear',
    loop: true,
    autoplay: false,
  })

numberEl.onmouseover = function() {
    numberAnimate.play() 
}

numberEl.onmouseout = function() {
    numberAnimate.pause() 
}

// if mobile play animation once
if (window.innerWidth < 900) {
    numberAnimate = anime({
        loop: false,
      })

    let numberAnimateMobile = anime({
        targets: numberEl,
        innerHTML: [0, 9, 0],
        duration: 2500,
        round: 1,
        direction: 'alternate',
        easing: 'easeInOutSine',
        loop: false,
        autoplay: false,
      })

      numberEl.ontouchstart = function() {
        numberAnimateMobile.play()
    }
}

/////////////////////////////////////////////////
/* ******************************** */
//	P5js
/* ******************************** */

var myWidth;
var myHeight;
var isTouchDevice = false;
var backColor = 0;

/* ******************************** */
// SETUP 
function setup() {
	myWidth = document.getElementById("squiggle").offsetWidth;
	myHeight = document.getElementById("squiggle").offsetHeight;
  
  // store the canvas in a pointer variable
  // now its methods can be accessed
	var myCanvas = createCanvas(myWidth, myHeight);
    myCanvas.style("z-index: -1000");

// adding canvas as a child of a container
  myCanvas.parent('my-container');
  noStroke();
}

//detect if it is a touch device
function touchStarted() {
	isTouchDevice = true;
}
function mousePressed() {
	isTouchDevice = false;
}
function mouseMoved() {
	isTouchDevice = false;
}

// p5 drawing
function draw() {
    if (mouseIsPressed) {
      pen()
    }
  }
  
  function pen() {
      // set the color and weight of the stroke 
      stroke(0, 0, 0, 255)
      strokeWeight(2)
    
      // draw a line from current mouse point to previous mouse point
    line(mouseX, mouseY, pmouseX, pmouseY)
  }