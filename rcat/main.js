import * as BABYLON from 'babylonjs';
import earcut from 'earcut';
import { GLTFFileLoader } from "@babylonjs/loaders/glTF";
import * as GUI from '@babylonjs/gui/2D';

BABYLON.SceneLoader.RegisterPlugin(new GLTFFileLoader());

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);

let shouldRotate = false; // Flag to control rotation

const createScene = async function() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    scene.createDefaultCameraOrLight(true, false, true);
        // Access the default camera
        const camera = scene.activeCamera;
        if (camera) {
            camera.position = new BABYLON.Vector3(0, 0, -10); // Adjust the Z value to zoom out
        }
    

    const fontData = await (await fetch('/fonts/Super Mario 256_Regular.json')).json();

    const rcat = await createRCat(scene);
    
    const letters = await createRetardioLetters(fontData, scene);

    // Load the sound but don't autoplay it
    var bgm = new BABYLON.Sound("clown", "sounds/bgm/cort_circocomica_dm-244055.mp3", scene, null, {
        loop: true,
        autoplay: false
    });

    // GUI must be initialized after the scene is created
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
    const button = GUI.Button.CreateSimpleButton("myButton", 'RETARDIO CAT!');
    button.width = '200px';
    button.height = '50px';
    button.color = 'white';

    // Set button alignment and position
    button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    button.top = "150px"; // Adjust this value to position the button slightly above the bottom edge
    button.onPointerUpObservable.add(function() {
        shouldRotate = !shouldRotate; // Toggle rotation flag
        if (bgm.isPlaying) {
            bgm.pause(); // Play the sound
        } else {
            bgm.play();
        }
    });

    advancedTexture.addControl(button);


    
    // DexScreener button
    const dexButton = GUI.Button.CreateSimpleButton("dexButton", 'DexScreener');
    dexButton.width = '300px';
    dexButton.height = '80px';
    dexButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    dexButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    dexButton.top = "-20px"; // Adjust this value to position the button slightly above the bottom edge
    dexButton.left = "20px"; // Adjust this value to position the button slightly from the left edge

    dexButton.onPointerUpObservable.add(function() {
        window.open('https://dexscreener.com/solana/gi1p3eucitan3zquy8ct62pfqxwkqpnbrbtsnc3huyx9', '_blank');
    });
    dexButton.color='white';
    advancedTexture.addControl(dexButton);

    // Memes button
    const memesButton = GUI.Button.CreateSimpleButton("memesButton", 'Memes');
    memesButton.width = '300px';
    memesButton.height = '80px';
    memesButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    memesButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    memesButton.top = "-20px"; // Adjust this value to position the button slightly above the bottom edge
    memesButton.left = "-20px"; // Adjust this value to position the button slightly from the right edge

    memesButton.onPointerUpObservable.add(function() {
        window.open('https://memedepot.com/d/retardiocat', '_blank');
    });

    memesButton.color = 'white';
    advancedTexture.addControl(memesButton);


    const xButton = GUI.Button.CreateSimpleButton("xButton", "X");
    xButton.width = '300px';
    xButton.height = '80px';
    xButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    xButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    xButton.top = "-20px"; // Adjust this value to position the button slightly above the bottom edge
    xButton.color = 'white';

    xButton.onPointerClickObservable.add(function(){
        window.open('https://x.com/RetardioCatCoin')
    });
    advancedTexture.addControl(xButton);

    return scene;
}

const scene = await createScene();

engine.runRenderLoop(function() {
    if (shouldRotate && scene.meshes.length > 0) {
        const rcat = scene.meshes[0];
        rcat.rotation.y += 0.05;
    }
    scene.render();
});

// This is outside createScene()
window.addEventListener('resize', function() {
    engine.resize();
});

function createRetardioLetters(fontData, scene) {
    const letterR = BABYLON.MeshBuilder.CreateText('letterR', 'R', fontData, { size: 1, depth: 0.2, resolution: 64 }, scene, earcut);
    const letterE = BABYLON.MeshBuilder.CreateText('letterE', 'E', fontData, { size: 1, depth: 0.2, resolution: 64 }, scene, earcut);
    const letterT = BABYLON.MeshBuilder.CreateText('letterT', 'T', fontData, { size: 1, depth: 0.2, resolution: 64 }, scene, earcut);
    const letterA = BABYLON.MeshBuilder.CreateText('letterA', 'A', fontData, { size: 1, depth: 0.2, resolution: 64 }, scene, earcut);
    const letterR2 = BABYLON.MeshBuilder.CreateText('letterR', 'R', fontData, { size: 1, depth: 0.2, resolution: 64 }, scene, earcut);
    const letterD = BABYLON.MeshBuilder.CreateText('letterD', 'D', fontData, { size: 1, depth: 0.2, resolution: 64 }, scene, earcut);
    const letterI = BABYLON.MeshBuilder.CreateText('letterI', 'I', fontData, { size: 1, depth: 0.2, resolution: 64 }, scene, earcut);
    const letterO = BABYLON.MeshBuilder.CreateText('letterO', 'O', fontData, { size: 1, depth: 0.2, resolution: 64 }, scene, earcut);
    // Position the text at x = -3
    letterR.position.x = -3;
    letterR.position.y = 1.5;
    letterE.position.x = -2;
    letterE.position.y = 1.5;
    letterT.position.x = -1;
    letterT.position.y = 1.5;
    letterA.position.x = 0;
    letterA.position.y = 1.5;
    letterR2.position.x = 1.1;
    letterR2.position.y = 1.5;
    letterD.position.x = 2.1;
    letterD.position.y = 1.5;
    letterI.position.y = 1.5;
    letterI.position.x = 2.9;
    letterO.position.x = 3.7;
    letterO.position.y = 1.5;

    // Materials
    const letterRMaterial = new BABYLON.StandardMaterial("letterRMaterial", scene);
    letterRMaterial.diffuseColor = BABYLON.Color3.FromHexString("#009ddb");
    const emissiveIntensity = 0.5; // Adjust this value between 0 and 1 to control the intensity
    letterRMaterial.emissiveColor = BABYLON.Color3.FromHexString("#009ddb").scale(emissiveIntensity);
    letterR.material = letterRMaterial;

    const letterEMaterial = new BABYLON.StandardMaterial("letterEMaterial", scene);
    letterEMaterial.diffuseColor = BABYLON.Color3.FromHexString("#fcd000");
    letterEMaterial.emissiveColor = BABYLON.Color3.FromHexString("#fcd000").scale(emissiveIntensity);
    letterE.material = letterEMaterial;

    letterO.material = letterEMaterial;

    const letterTMaterial = new BABYLON.StandardMaterial("letterTMaterial", scene);
    letterTMaterial.diffuseColor = BABYLON.Color3.FromHexString("#e71e07");
    letterTMaterial.emissiveColor = BABYLON.Color3.FromHexString("#e71e07").scale(emissiveIntensity);
    letterT.material = letterTMaterial;

    const letterAMaterial = new BABYLON.StandardMaterial("letterAMaterial", scene);
    letterAMaterial.diffuseColor = BABYLON.Color3.FromHexString("#42b132");
    letterAMaterial.emissiveColor = BABYLON.Color3.FromHexString("#42b132").scale(emissiveIntensity);
    letterA.material = letterAMaterial;

    letterI.material = letterAMaterial;

    letterD.material = letterTMaterial;

    const letterR2Material = new BABYLON.StandardMaterial("letterR2Material", scene);
    letterR2Material.diffuseColor = BABYLON.Color3.FromHexString("#009ddb");
    letterR2Material.emissiveColor = BABYLON.Color3.FromHexString("#009ddb").scale(emissiveIntensity);
    letterR2.material = letterR2Material;

    // Enable outline renderer
    scene.getEngine().getRenderingCanvas().outlineRenderer = new BABYLON.OutlineRenderer(scene);

    // Set outline color and width
    const outlineColor = BABYLON.Color3.Black();
    const outlineWidth = 0.02;

    [letterR, letterE, letterT, letterA, letterR2, letterD, letterI, letterO].forEach(letter => {
        letter.renderOutline = true;
        letter.outlineColor = outlineColor;
        letter.outlineWidth = outlineWidth;
    });
}

async function createRCat(scene) {
    await BABYLON.SceneLoader.AppendAsync("/models/", "rcat.glb", scene);

    // Assuming the first mesh is the one you want to rotate
    const rcat = scene.meshes[0];
    rcat.rotation = new BABYLON.Vector3(0, 50, 0);
    return rcat;
}
