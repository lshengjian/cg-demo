import * as THREE from 'three';

/**
 * This is a basic asyncronous shader loader for THREE.js.
 * 
 * It uses the built-in THREE.js async loading capabilities to load shaders from files!
 * 
 * `onProgress` and `onError` are stadard TREE.js stuff. Look at 
 * https://threejs.org/examples/webgl_loader_obj.html for an example. 
 * 
 * @param {String} vertex_url URL to the vertex shader code.
 * @param {String} fragment_url URL to fragment shader code
 * @param {function(String, String)} onLoad Callback function(vertex, fragment) that take as input the loaded vertex and fragment contents.
 * @param {function} onProgress Callback for the `onProgress` event. 
 * @param {function} onError Callback for the `onError` event.
 */
function ShaderLoader(vertex_url, fragment_url, onLoad, onProgress, onError) {
    var vertex_loader = new THREE.XHRLoader(THREE.DefaultLoadingManager);
    vertex_loader.setResponseType('text');
    vertex_loader.load(vertex_url, function (vertex_text) {
      var fragment_loader = new THREE.XHRLoader(THREE.DefaultLoadingManager);
      fragment_loader.setResponseType('text');
      fragment_loader.load(fragment_url, function (fragment_text) {
        onLoad(vertex_text, fragment_text);
      });
    }, onProgress, onError);
  }
  
var container;
var camera, scene, renderer;
var uniforms;
ShaderLoader("shaders/demo.vert", "shaders/demo.frag", (vertex, fragment)=>{
   init(vertex,fragment);
    animate();
  });
function init(vertex,fragment) {

    container = document.getElementById('container');

    camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry(2, 2);

    uniforms = {
        "time": { value: 1.0 }
    };

    var material = new THREE.ShaderMaterial({

        uniforms: uniforms,
        vertexShader:vertex,
        fragmentShader:fragment
       // vertexShader: document.getElementById('vertexShader').textContent,
       // fragmentShader: document.getElementById('fragmentShader').textContent

    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    onWindowResize();

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    renderer.setSize(window.innerWidth, window.innerHeight);

}



function animate(timestamp) {

    requestAnimationFrame(animate);

    uniforms["time"].value = timestamp / 1000;

    renderer.render(scene, camera);

}