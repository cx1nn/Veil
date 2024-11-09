particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 100, // Number of particles
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#FFFFFF" // Color of the particles
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#FFF"
            }
        },
        "opacity": {
            "value": 1,
            "random": false,
            "anim": {
                "enable": true,
                "speed": 1, // Speed of opacity change
                "opacity_min": 0.1, // Minimum opacity
                "sync": false
            }
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false // Disable line linking
        },
        "move": {
            "enable": true,
            "speed": 6, // Adjust speed of particles
            "direction": "right", // Set direction to 'right'
            "random": true, // Allow random movement
            "straight": true, // Particles move in a straight line
            "out_mode": "out", // Particles disappear when they go out of bounds
            "bounce": false,
            "attract": {
                "enable": false
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        }
    },
    "retina_detect": true
});

// Function to flash particles every few seconds
