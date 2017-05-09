// Project Organizer
// by Michael G. Braverman
// July 20, 2016

// project SETUP
function projectSetup(projectNumber, projectName) {

  var pageTitle = document.getElementById('page-title');
  pageTitle.innerHTML = doubleDigit(projectNumber) + " - " + projectName;

  var name = document.getElementById('project-name');
  name.innerHTML = projectName;

  if (projectNumber > 1) {
    var pastProject = document.getElementById('past-project');
    pastLink = "../" + doubleDigit(projectNumber-1) + "/index.html";
    pastProject.innerHTML = "<a href='"+ pastLink+ "'>" + doubleDigit(projectNumber-1)+ " </a>";
  }

  var nextProject = document.getElementById('next-project');
  nextLink = "../" + doubleDigit(projectNumber+1) + "/index.html";
  nextProject.innerHTML = "<a href='"+ nextLink+ "'>" + doubleDigit(projectNumber+1) + " </a>";

  function doubleDigit(n){
      return n > 9 ? "" + n: "0" + n;
  }
}

// THREE.js setup for shaders
var container;
var camera, scene, renderer;
var uniforms;

init();
animate();

function init() {
  container = document.getElementById( 'container' );

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };

  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  } );

  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );

  container.appendChild( renderer.domElement );

  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false );

  document.onmousemove = function(e){
    uniforms.u_mouse.value.x = e.pageX
    uniforms.u_mouse.value.y = e.pageY
  }
}

function onWindowResize( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  uniforms.u_time.value += 0.05;
  renderer.render( scene, camera );
}
