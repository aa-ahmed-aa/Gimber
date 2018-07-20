var camera, scene, renderer;
var geometry, material, mesh;

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    // material.wireframe = true;


    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    //This will add a starfield to the background of a scene
var starsGeometry = new THREE.Geometry();

for ( var i = 0; i < 100 ; i ++ ) {

	var star = new THREE.Vector3();
	star.y = THREE.Math.randFloatSpread( 5 );
	star.z = THREE.Math.randFloatSpread( 4 );
    star.x = THREE.Math.randFloatSpread( 3 );

    star.velocity = 12;

	starsGeometry.vertices.push( star );
}

var starsMaterial = new THREE.PointsMaterial( { color: 0xFFFFFF , size : 0.0001 } );

var starField = new THREE.Points( starsGeometry, starsMaterial );

scene.add( starField );

    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);

    renderer.setSize(window.innerWidth, window.innerHeight);
    mesh.rotation.x += 0.01;

    renderer.render(scene, camera);
    $('#UserName').find("h1").text("Li");
}    