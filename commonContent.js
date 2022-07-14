//Scene
var scene = new THREE.Scene();
//Camera
var camera = new THREE.PerspectiveCamera(85,window.innerWidth/(window.innerHeight*1.5));
//Renderer
var renderer = new THREE.WebGLRenderer({antilias:true});
renderer.setSize(window.innerWidth-14,window.innerHeight-17);     
$('body').append(renderer.domElement);    


//Creating Backgroud
//Import images to the cube
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('./images/4.png');
let texture_bk = new THREE.TextureLoader().load('./images/5.png');
let texture_up = new THREE.TextureLoader().load('./images/2.png');
let texture_dn = new THREE.TextureLoader().load('./images/6.png');
let texture_rt = new THREE.TextureLoader().load('./images/3.png');
let texture_lf = new THREE.TextureLoader().load('./images/1.png');

materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

for(let i=0;i<6;i++){
    materialArray[i].side = THREE.BackSide;
}

let skyboxGeo = new THREE.BoxGeometry(1500,250,1500);       //Creats the backgroud cube
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);
skybox.rotation.z -= Math.PI/2;         //Set the position of the cube
skybox.position.set(119,0,0);


//Mouse Event Listeners
const domEvents = new THREEx.DomEvents(camera,renderer.domEvents);
function addMouseEvents(cube, buildingID){                                      //This function sets particular mouse event listeners to transparent doors
    domEvents.addEventListener(cube,'click',event => {                          //Click listener (Signals when user has clicked on the building)
        if(out==0 && ViewMode=="walk"){                 //These functions work only when mouse poister is over the scene and user is in the walk view
            if(clicked){                                                            //If user has already clicked (it means now he has clicked to unclick the previous click)
                if(expanded){       //If more_information panel is expanded      
                    document.getElementById("list").style.opacity = 1;      //Shows the main information list       
                    document.getElementById("more_information").style.opacity = 0;     //Dissappears the more information label
                    document.getElementById("main_information").style.height = "50%";    //Expands the main information label
                    document.getElementById("hint").style.backgroundColor = "#0E6655";   //Change the background colour of the bar at the bottom of the main_info panel  
                    expanded = 0;           //Set the expanded flag to 0
                }    
                document.getElementById("hint").innerHTML = "Click on the blue panel for more details";
                document.getElementById("information").style.height = "40%";
                document.getElementById("main_information").style.height = "75%";
                document.getElementById("hint").style.height = "7.5%";
                document.getElementById("controlLayout").style.height = "20%";
                document.getElementById("more_information").style.removeProperty('min-height');
                document.getElementById("more_information").style.padding = "0%";
                document.getElementById("more_information").style.marginTop = "0%";
                document.getElementById("more_information").style.margin = "0%";
                document.getElementById("label2").style.fontSize = "0vmin";
                document.getElementById("list2").style.fontSize = "0vmin";
                for(var i=0;i<idNUM;i++){
                    transparentMaterialArray[i].opacity = 0.6;
                }
                document.getElementById("label3").style.backgroundColor = "#1A5276";
                showNavigator();        //Show the navigating panel
                clicked = !clicked;                                                 //change the 'clicked' flag to 0
                roomInfo(defaultID);    
            }else{                                                                  //If user hasn't clicked earlier
                document.getElementById("hint").innerHTML = "More details below ↓";
                document.getElementById("information").style.height = "60%";
                document.getElementById("main_information").style.height = "50%";
                document.getElementById("hint").style.height = "5%";
                document.getElementById("controlLayout").style.height = "70%";
                document.getElementById("more_information").style.minHeight = "50%";
                document.getElementById("more_information").style.padding = "5%";
                document.getElementById("more_information").style.marginTop = "2.5%";
                document.getElementById("more_information").style.margin = "1.5%";
                document.getElementById("label2").style.fontSize = "2.8vmin";
                document.getElementById("list2").style.fontSize = "2.15vmin";
                cube.material.opacity = 0.9;    
                document.getElementById("label3").style.backgroundColor = "#5F6A6A";
                hideNavigator();        //Hide the navigating panel
                clicked = !clicked;                                                 //change the 'clicked' flag to 1
            }
        }
    });
    domEvents.addEventListener(cube,'mouseover',event => {                      //Onmousemove listener (Signals when mouse pointer is moving on the building)
        if(clicked==0 && out==0 && ViewMode=="walk"){                                                         //If user hasn't clicked some building (logic is when user has clicked on a particular building, data on the labels are not changing unitil he again clicks on that)
            for(var i=0;i<idNUM;i++){                                           //Set opacity of all the doors to 0.6
                transparentMaterialArray[i].opacity = 0.6;
            }
            cube.material.opacity = 0.8;
            roomInfo(buildingID);    
        }
    });    
    domEvents.addEventListener(cube,'mouseout',event => {                       //Onmouseout listener (Signals when mouse pointer is moving out from the building)
        if(clicked==0 && out==0 && ViewMode=="walk"){                                                         //If user hasn't clicked some building (logic is when user has clicked on a particular building, data on the labels are not changing unitil he again clicks on that)
            cube.material.opacity = 0.6;
            roomInfo(defaultID); 
        }
    }); 
}

function addMouseEventsForWalls(cube,buildingID){                                      //This function sets particular mouse event listeners to transparent walls
    domEvents.addEventListener(cube,'click',event => {                          //Click listener (Signals when user has clicked on the building)
        if(out==0 && ViewMode=="walk"){                         //These functions work only when mouse poister is over the scene and user is in the drone/bird view
            if(clicked){                                                            //If user has already clicked (it means now he has clicked to unclick the previous click)
                if(expanded){       //If more_information panel is expanded
                    document.getElementById("list").style.opacity = 1;      //Shows the main information list       
                    document.getElementById("more_information").style.opacity = 0;     //Dissappears the more information label
                    document.getElementById("main_information").style.height = "50%";    //Expands the main information label
                    document.getElementById("hint").style.backgroundColor = "#0E6655";      //Change the background colour of the bar at the bottom of the main_info panel   
                    expanded = 0;           //Set the expanded flag to 0
                }
                document.getElementById("information").style.height = "40%";
                document.getElementById("hint").innerHTML = "Click on the blue panel for more details";
                document.getElementById("main_information").style.height = "75%";
                document.getElementById("hint").style.height = "7.5%";
                document.getElementById("controlLayout").style.height = "20%";
                document.getElementById("more_information").style.removeProperty('min-height');
                document.getElementById("more_information").style.padding = "0%";
                document.getElementById("more_information").style.marginTop = "0%";
                document.getElementById("more_information").style.margin = "0%";
                document.getElementById("label2").style.fontSize = "0vmin";
                document.getElementById("list2").style.fontSize = "0vmin";
                document.getElementById("label3").style.backgroundColor = "#1A5276";
                showNavigator();        //Show the navigating panel
                clicked = !clicked;                                                 //change the 'clicked' flag to 0
                roomInfo(defaultID);
            }else{                                                                  //If user hasn't clicked earlier
                document.getElementById("hint").innerHTML = "More details below ↓";
                document.getElementById("information").style.height = "60%";
                document.getElementById("main_information").style.height = "50%";
                document.getElementById("hint").style.height = "5%";
                document.getElementById("controlLayout").style.height = "70%";
                document.getElementById("more_information").style.minHeight = "50%";
                document.getElementById("more_information").style.padding = "5%";
                document.getElementById("more_information").style.marginTop = "2.5%";
                document.getElementById("more_information").style.margin = "1.5%";
                document.getElementById("label2").style.fontSize = "2.8vmin";
                document.getElementById("list2").style.fontSize = "2.15vmin";
                document.getElementById("label3").style.backgroundColor = "#5F6A6A";
                hideNavigator();        //Hide the navigating panel
                clicked = !clicked;                                                 //change the 'clicked' flag to 1
            }
        }
    });
    domEvents.addEventListener(cube,'mousemove',event => {                      //Onmousemove listener (Signals when mouse pointer is moving on the building)
        if(clicked==0 && out==0 && ViewMode=="walk"){                                                         //If user hasn't clicked some building (logic is when user has clicked on a particular building, data on the labels are not changing unitil he again clicks on that)
        }
    });             //Eventhough these two methods don't have a content, they stop other unnecessary objects from reacting to events 
    domEvents.addEventListener(cube,'mouseout',event => {                      //Onmousemove listener (Signals when mouse pointer is moving on the building)
        if(clicked==0 && out==0 && ViewMode=="walk"){                                                         //If user hasn't clicked some building (logic is when user has clicked on a particular building, data on the labels are not changing unitil he again clicks on that)
        }
    }); 
}

function addMouseEventsForPanels(cube, buildingID){                                      //This function sets particular mouse event listeners to panels
    domEvents.addEventListener(cube,'click',event => {                          //Click listener (Signals when user has clicked on the building)
        if(out==0 && ViewMode!="walk"){                 //These functions work only when mouse poister is over the scene and user is in the drone/bird view
            if(clicked){                                                            //If user has already clicked (it means now he has clicked to unclick the previous click)
                if(expanded){       //If more_information panel is expanded      
                    document.getElementById("list").style.opacity = 1;      //Shows the main information list       
                    document.getElementById("more_information").style.opacity = 0;     //Dissappears the more information label
                    document.getElementById("main_information").style.height = "50%";    //Expands the main information label
                    document.getElementById("hint").style.backgroundColor = "#0E6655";  
                    expanded = 0;           //Set the expanded flag to 0
                }    
                document.getElementById("hint").innerHTML = "Click on the blue panel for more details";
                document.getElementById("information").style.height = "40%";
                document.getElementById("main_information").style.height = "75%";
                document.getElementById("hint").style.height = "7.5%";
                document.getElementById("controlLayout").style.height = "20%";
                document.getElementById("more_information").style.removeProperty('min-height');
                document.getElementById("more_information").style.padding = "0%";
                document.getElementById("more_information").style.marginTop = "0%";
                document.getElementById("more_information").style.margin = "0%";
                document.getElementById("label2").style.fontSize = "0vmin";
                document.getElementById("list2").style.fontSize = "0vmin";
                for(var i=0;i<idNUM;i++){
                    transparentMaterialForPanelsArray[i].opacity = 0;
                }
                document.getElementById("label3").style.backgroundColor = "#1A5276";
                showNavigator();        //Show the navigating panel
                clicked = !clicked;                                                 //change the 'clicked' flag to 0
                roomInfo(defaultID);
            }else{                                                                  //If user hasn't clicked earlier
                document.getElementById("hint").innerHTML = "More details below ↓";
                document.getElementById("information").style.height = "60%";
                document.getElementById("main_information").style.height = "50%";
                document.getElementById("hint").style.height = "5%";
                document.getElementById("controlLayout").style.height = "70%";
                document.getElementById("more_information").style.minHeight = "50%";
                document.getElementById("more_information").style.padding = "5%";
                document.getElementById("more_information").style.marginTop = "2.5%";
                document.getElementById("more_information").style.margin = "1.5%";
                document.getElementById("label2").style.fontSize = "2.8vmin";
                document.getElementById("list2").style.fontSize = "2.15vmin";
                cube.material.opacity = 0.6;
                document.getElementById("label3").style.backgroundColor = "#5F6A6A";
                hideNavigator();        //Hide the navigating panel
                clicked = !clicked;                                                 //change the 'clicked' flag to 1
            }
        }
    });
    domEvents.addEventListener(cube,'mousemove',event => {                      //Onmousemove listener (Signals when mouse pointer is moving on the building)
        if(clicked==0 && out==0 && ViewMode!="walk"){                                                         //If user hasn't clicked some building (logic is when user has clicked on a particular building, data on the labels are not changing unitil he again clicks on that)
            for(var i=0;i<idNUM;i++){                                           //Set opacity of all the panels to 0
                transparentMaterialForPanelsArray[i].opacity = 0;
            }
            cube.material.opacity = 0.4;
            roomInfo(buildingID);
        }
    });    
    domEvents.addEventListener(cube,'mouseout',event => {                       //Onmouseout listener (Signals when mouse pointer is moving out from the building)
        if(clicked==0 && out==0 && ViewMode!="walk"){                                                         //If user hasn't clicked some building (logic is when user has clicked on a particular building, data on the labels are not changing unitil he again clicks on that)
            cube.material.opacity = 0;
            roomInfo(defaultID);
        }
    }); 
}

//Import Blender Objects
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function(){
    document.getElementById("glass").style.opacity = 0.7;
}
loadingManager.onLoad = function(){
    document.getElementById("glass").style.opacity = 0;
    document.getElementById("waiting").remove();
}
let buildingloader = new THREE.GLTFLoader(loadingManager);    //Create a loader to load the objects

function importObject(location,xValue,yValue,zValue,xrotatevalue,scale=1){   //This function imports the blender object, sets the position, angle and adds to the scene
    var blenderBuilding;
    buildingloader.load(location,(gltf) => {
        blenderBuilding = gltf.scene;
        blenderBuilding.scale.set(scale,scale,scale);                                            //Set the scale of the object
        scene.add(blenderBuilding);                                                  //Add to the scene
        blenderBuilding.position.x = xValue;                                         //Set the position
        blenderBuilding.position.y = yValue;
        blenderBuilding.position.z = zValue;
        blenderBuilding.rotation.z = Math.PI/2;                                      //Set the rotation
        blenderBuilding.rotation.x = xrotatevalue;
        blenderBuilding.rotation.y = Math.PI;
        blenderBuilding.side = THREE.FrontSide;
    });
    return blenderBuilding;
}


//Creating Transparent doors
var transparentMaterialArray = [];
for(var i=0;i<idNUM;i++){           //Creating necessary materials for doors
    transparentMaterialArray[i] = new THREE.MeshBasicMaterial({color: 0x2758E7, transparent:true, opacity:0.6});
}
function createTransparentObject(buildingID,horv,yPosition,zPosition){      //These are different door types
    if(horv=="h"){
        var geometry = new THREE.BoxGeometry(6.5617,2.7,0.2);
    }else if(horv=="v"){
        var geometry = new THREE.BoxGeometry(6.5617,0.2,2.7);
    }else if(horv=="th"){
        var geometry = new THREE.BoxGeometry(6.5617,1.1,0.2);
    }else if(horv=="hl"){
        var geometry = new THREE.BoxGeometry(6.54,3,0.2);
    }else if(horv=="hss"){
        var geometry = new THREE.BoxGeometry(7.6,1.95,0.05);
    }else if(horv=="vs"){
        var geometry = new THREE.BoxGeometry(6.5617,0.1,2.7);
    }else if(horv=="hss2"){
        var geometry = new THREE.BoxGeometry(7.4,1.98,0.05);
    }else if(horv=="hs"){
        var geometry = new THREE.BoxGeometry(7.5,1.9,0.1);
    }else if(horv=="hl3"){
        var geometry = new THREE.BoxGeometry(6.6,3,0.1);
    }else if(horv=="th4"){
        var geometry = new THREE.BoxGeometry(6.5617,1.6,0.2);
    }else if(horv=="tv" || horv=="a"){
        var geometry = new THREE.BoxGeometry(6.5617,0.2,1.6);
    }
    var material = transparentMaterialArray[buildingID]
    var cube = new THREE.Mesh(geometry,material);
    scene.add(cube);
    cube.position.x = doorHeight;
    cube.position.y = yPosition;
    cube.position.z = zPosition;
    if(horv=="a"){      
        cube.rotation.x = Math.PI*0.12;
    }
    addMouseEvents(cube,buildingID);    //Add mouse events for doors
    return cube;
}

//Creating Transparent panels
var transparentMaterialForPanelsArray = [];
for(var i=0;i<idNUM;i++){                   //Creating necessary materials for panels
    transparentMaterialForPanelsArray[i] = new THREE.MeshBasicMaterial({color: 0x2758E7, transparent:true, opacity:0});
}
function createTransparentPanel(buildingID,yvalue,zvalue,yPosition,zPosition){
    var geometry = new THREE.BoxGeometry(0.01,yvalue,zvalue);
    var material = transparentMaterialForPanelsArray[buildingID];
    var cube = new THREE.Mesh(geometry,material);
    scene.add(cube);
    cube.position.x = panelHeight;
    cube.position.y = yPosition;
    cube.position.z = zPosition;
    addMouseEventsForPanels(cube,buildingID);   //Add mouse events for panels
    idsOfPanelList.push(buildingID);            //Add buildingID to the array
    let cubeBB = new THREE.Box3(new THREE.Vector3(),new THREE.Vector3());   //Creating bounding boxes for panels to check intersections
    cubeBB.setFromObject(cube);             
    return cubeBB;
}

//Creating Transparent Walls
function createWall(y,z,Y,Z){
    var geometry = new THREE.BoxGeometry(8.3,y,z);//2
    var material = new THREE.MeshBasicMaterial({color: 0x2758E7, transparent:true, opacity:0});
    var cube = new THREE.Mesh(geometry,material);
    scene.add(cube);
    cube.position.x = wallHeight; 
    cube.position.y = Y;
    cube.position.z = Z;
    addMouseEventsForWalls(cube);               //Add mouse events for walls
    let cubeBB = new THREE.Box3(new THREE.Vector3(),new THREE.Vector3());   //Creating bounding boxes for walls to check intersections
    cubeBB.setFromObject(cube);
    return cubeBB;
}

//Creating Navigating bars
var NavigatingMaterialArray = [];
for(var i=0;i<barNUM;i++){              //Creating necessary materials for bars
    NavigatingMaterialArray[i] = new THREE.MeshBasicMaterial({color: 0x58DF54 , transparent:true, opacity:0});
}
function createNavigatingBars(buildingID,horv,length,yPosition,zPosition){
    if(horv=="h"){
        var geometry5 = new THREE.BoxGeometry(0.001,length,0.5);
    }else if(horv=="v"){
        var geometry5 = new THREE.BoxGeometry(0.001,0.5,length);
    }else if(horv=="V"){
        var geometry5 = new THREE.BoxGeometry(0.001,0.4,length);
    }else if(horv=="H"){
        var geometry5 = new THREE.BoxGeometry(0.001,length,0.6);
    }

    var material5 = NavigatingMaterialArray[buildingID];
    var cube5 = new THREE.Mesh(geometry5,material5);
    scene.add(cube5);
    cube5.position.x = barHeight;
    cube5.position.y = yPosition;
    cube5.position.z = zPosition;
    return cube5;
}


//Set Lights
function setDirectionalLight(X,Y,Z) {                           //This function set the light
    var lightId = new THREE.DirectionalLight(0xffffff,0.2); //Soft white light
    scene.add(lightId);                           //Add light to the scene
    lightId.position.set(X,Y,Z);
    return lightId;
}

function setPointLight(X,Y,Z) {                           //This function set the light
    var lightId = new THREE.PointLight(0xffffff,0.3); //Soft white light
    scene.add(lightId);                           //Add light to the scene
    lightId.position.set(X,Y,Z);
    return lightId;
}


//Controls
async function sleep(miliseconds){  //This function sleeps for particular time 
    return new Promise((resolve) => setTimeout(resolve,miliseconds));
}

var okToGoFront = 1, okToGoBack = 1;

async function turnleft(){          //This function turns the camera to left by unit amount
    if(ViewMode=="sky"){
        for(var i =0;i<10;i++){         //Used a loop for smooth movements
            await sleep(20);                        //Sleep for 20 millieseconds
            camera.position.y += Math.cos(angle_x)*S;       //Rotate the cmaera around x axis by 0.9 degrees to the left
            frontCameraBall.position.y += Math.cos(angle_x)*S; 
            backCameraBall.position.y += Math.cos(angle_x)*S;
            topCameraBall.position.y += Math.cos(angle_x)*S;
            camera.position.z += Math.sin(angle_x)*S;       //Rotate the cmaera around x axis by 0.9 degrees to the left
            frontCameraBall.position.z += Math.sin(angle_x)*S; 
            backCameraBall.position.z += Math.sin(angle_x)*S;
            topCameraBall.position.z += Math.sin(angle_x)*S;
        }
    }else{
        for(var i =0;i<10;i++){         //Used a loop for smooth movements
            await sleep(20);                        //Sleep for 20 millieseconds
            camera.rotation.x += Math.PI/200;       //Rotate the cmaera around x axis by 0.9 degrees to the left
            angle_x = angle_x + Math.PI/200;        //Update the new camera angle
            frontCameraBall.rotation.x += Math.PI/200;
            frontCameraBall.position.y = camera.position.y + (Math.sin(angle_x)*R);
            frontCameraBall.position.z = camera.position.z - (Math.cos(angle_x)*R);
            backCameraBall.rotation.x += Math.PI/200;
            backCameraBall.position.y = camera.position.y - (Math.sin(angle_x)*R);
            backCameraBall.position.z = camera.position.z + (Math.cos(angle_x)*R);
        }
    }
}
async function turnright(){         //This function turns the camera to left by unit amount
    if(ViewMode=="sky"){
        for(var i =0;i<10;i++){         //Used a loop for smooth movements
            await sleep(20);                        //Sleep for 20 millieseconds
            camera.position.y -= Math.cos(angle_x)*S;       //Rotate the cmaera around x axis by 0.9 degrees to the left
            frontCameraBall.position.y -= Math.cos(angle_x)*S; 
            backCameraBall.position.y -= Math.cos(angle_x)*S;
            topCameraBall.position.y -= Math.cos(angle_x)*S;
            camera.position.z -= Math.sin(angle_x)*S;       //Rotate the cmaera around x axis by 0.9 degrees to the left
            frontCameraBall.position.z -= Math.sin(angle_x)*S; 
            backCameraBall.position.z -= Math.sin(angle_x)*S;
            topCameraBall.position.z -= Math.sin(angle_x)*S;
        
        }
    }else{
        for(var i =0;i<10;i++){         //Used a loop for smooth movements
            await sleep(20);                        //Sleep for 20 millieseconds
            camera.rotation.x -= Math.PI/200;       //Rotate the camera around x axis by 0.9 degrees to the right
            angle_x = angle_x - Math.PI/200;        //Update the new camera angle
            frontCameraBall.rotation.x -= Math.PI/200;
            frontCameraBall.position.y = camera.position.y + (Math.sin(angle_x)*R);
            frontCameraBall.position.z = camera.position.z - (Math.cos(angle_x)*R);
            backCameraBall.rotation.x -= Math.PI/200;
            backCameraBall.position.y = camera.position.y - (Math.sin(angle_x)*R);
            backCameraBall.position.z = camera.position.z + (Math.cos(angle_x)*R);
        }
    }
}
async function turnup(){            //This function turns the camera to left by unit amount
    for(var i =0;i<10;i++){         //Used a loop for smooth movements
        await sleep(20);                        //Sleep for 20 millieseconds
        camera.rotation.y -= Math.PI/200;       //Rotate the cmaera around y axis by 0.9 degrees to the up 
        angle_y = angle_y - Math.PI/200;        //Update the new camera angle
    }
}
async function turndown(){          //This function turns the camera to left by unit amount
    for(var i =0;i<10;i++){         //Used a loop for smooth movements
        await sleep(20);                        //Sleep for 20 millieseconds
        camera.rotation.y += Math.PI/200;       //Rotate the camera around y axis by 0.9 degrees to the down
        angle_y = angle_y + Math.PI/200;        //Update the new camera angle
    }
}
async function forward(){           //This function brings the camera to back by unit amount
    for(var i =0;i<10;i++){         //Used a loop for smooth movements                                    //Sleep for 20 millieseconds
        await sleep(20);
        if(okToGoFront){
            camera.position.y += (Math.sin(angle_x)*S);      //Change the position of camera on y axis towards the facing direction
            camera.position.z -= (Math.cos(angle_x)*S);      //Change the position of camera on z axis towards the facing direction
            frontCameraBall.position.y += (Math.sin(angle_x)*S);
            backCameraBall.position.y += (Math.sin(angle_x)*S);
            topCameraBall.position.y += (Math.sin(angle_x)*S);
            frontCameraBall.position.z -= (Math.cos(angle_x)*S);
            backCameraBall.position.z -= (Math.cos(angle_x)*S);
            topCameraBall.position.z -= (Math.cos(angle_x)*S);
        }
    }
}
async function backward(){          //This function brings the camera to front by unit amount
    for(var i =0;i<10;i++){         //Used a loop for smooth movements
        await sleep(20);                                    //Sleep for 20 millieseconds
        if(okToGoBack){
            camera.position.y -= (Math.sin(angle_x)*S);        //Change the position of camera on y axis towards the facing direction
            camera.position.z += (Math.cos(angle_x)*S);        //Change the position of camera on z axis towards the facing direction
            frontCameraBall.position.y -= (Math.sin(angle_x)*S);
            backCameraBall.position.y -= (Math.sin(angle_x)*S);
            topCameraBall.position.y -= (Math.sin(angle_x)*S);
            frontCameraBall.position.z += (Math.cos(angle_x)*S);
            backCameraBall.position.z += (Math.cos(angle_x)*S);
            topCameraBall.position.z += (Math.cos(angle_x)*S);
        }
    }    
}

var mouseIN = 0;    //This is used to flag whether mouse pointer is on the controllayout or not (if on-> 1)

//Information Panel movements
async function showInformation(){               //This function shrinks the top right main information label and makes the more information label appear
    if(clicked){mouseIN=1;}                     //Flag that mouse pointer is over the control layout
    if(clicked&&(!expanding)&&(!expanded)){     //If a building is clicked, labels are not expanding currently and more information label is dissappeared
        expanding=1;                            //set the expanding flag to 1
        document.getElementById("label2").innerHTML = "More information about "+document.getElementById("label").innerHTML;     //set the second label
        // document.getElementById("label").style.whiteSpace = "nowrap";
        for(var i =0;i<10;i++){                 //Used a loop for smooth animations
            await sleep(20);                    //Sleep for 20 millieseconds
            document.getElementById("list").style.opacity = 1-(0.1*(i+1));                  //dissappears the main information list
            document.getElementById("more_information").style.opacity = 0.09*(i+1);         //Shows the more information label
            document.getElementById("main_information").style.height = 50-4.4*(i+1)+"%";   //Shrinks the main information label
            document.getElementById("link").style.height = 15-0.75*i+"%";
        }
        document.getElementById("label").style.whiteSpace = "nowrap";
        document.getElementById("hint").style.backgroundColor = "#21618C";
        expanding=0;        //set the expanding flag to 0
        expanded = 1;       //Set the expanded flag to 1
    }
    await sleep(50);
    if(!mouseIN){           //If mouse pointer has gone out of the layout hide again
        hideInformation();
    }
}

async function hideInformation(){               //This function expands the top right main information label and makes the more information label dissappear
    if(clicked){mouseIN=0;}                     //Flag that mouse pointer is out of the layout
    if(clicked&&(!expanding)&&expanded){        //If a building is clicked, labels are not expanding currently and more information label is appeared
        expanding=1;                            //set the expanding flag to 1
        document.getElementById("list").style.opacity = 1;      //Shows the main information list
        document.getElementById("label").style.whiteSpace = "normal";
        for(var i =0;i<10;i++){                 //Used a loop for smooth animations
            await sleep(20);                    //Sleep for 20 millieseconds
            document.getElementById("more_information").style.opacity = 0.9-0.09*(i+1);     //Dissappears the more information label
            document.getElementById("main_information").style.height = 6+4.4*(i+1)+"%";    //Expands the main information label
            document.getElementById("link").style.height = 7.5+0.85*i+"%";
        }
        document.getElementById("hint").style.backgroundColor = "#0E6655";
        expanding=0;            //set the expanding flag to 0
        expanded = 0;           //Set the expanded flag to 0
    }
    await sleep(50);
    if(mouseIN){            //If mouse pointer has come on to the layout show again
        showInformation();
    }
}

//Latter Panel movements
async function hideNavigator(){
    for(var i =0;i<10;i++){                 //Used a loop for smooth animations
            await sleep(20);                    //Sleep for 20 millieseconds
            document.getElementById("navigator").style.height = 93 - (i+1)*8.6 + "%";     //Dissappears the more information label
            document.getElementById("navigator").style.opacity = 0.9 - (i+1)*0.07;
            document.getElementById("main_information").style.opacity = 0.6 + (i+1)*0.04;
        }
    document.getElementById("roomList").style.height = "0";
    document.getElementById("searchBar").style.opacity = 0;
    document.getElementById("link").style.height = "7.5%";
    document.getElementById("link").style.opacity = 1;
    for(var i =0;i<10;i++){                 //Used a loop for smooth animations
        await sleep(20);                    //Sleep for 20 millieseconds
        document.getElementById("link").style.height = 7.5+0.85*i+"%";
    }
}
async function showNavigator(){
    for(var i =0;i<5;i++){                 //Used a loop for smooth animations
        await sleep(20);                    //Sleep for 20 millieseconds
        document.getElementById("link").style.height = 15-1.5*i+"%";
    }
    document.getElementById("link").style.opacity = 0;
    document.getElementById("roomList").style.height = "100%";
    document.getElementById("searchBar").style.opacity = 1;
    for(var i =0;i<10;i++){                 //Used a loop for smooth animations
            await sleep(20);                    //Sleep for 20 millieseconds
            document.getElementById("navigator").style.height = 7 + (i+1)*8.6 + "%";     //Dissappears the more information label
            document.getElementById("navigator").style.opacity = 0.2 + (i+1)*0.07;
            document.getElementById("main_information").style.opacity = 1 - (i+1)*0.04;
        }
}

//Maintain angles
function updateAngles(){        //As time goes, since angles can be large, this function takes them down to simple values
    angle_x %= (Math.PI*2); 
    angle_y %= (Math.PI*2);
    camera.rotation.x %= (Math.PI*2);
    camera.rotation.y %= (Math.PI*2);
    if(Math.abs(angle_x)>Math.PI){
        angle_x = (angle_x>0)?-(2*Math.PI-angle_x):2*Math.PI+angle_x;
    }
    if(Math.abs(angle_y)>Math.PI){
        angle_y = (angle_y>0)?-(2*Math.PI-angle_y):2*Math.PI+angle_y;
    }
    if(Math.abs(camera.rotation.x)>Math.PI){
        camera.rotation.x = (camera.rotation.x>0)?-(2*Math.PI-camera.rotation.x):2*Math.PI+camera.rotation.x;
    }
    if(Math.abs(camera.rotation.y)>Math.PI){
        camera.rotation.y = (camera.rotation.y>0)?-(2*Math.PI-camera.rotation.y):2*Math.PI+camera.rotation.y;
    }
}

//Camera Position
var ViewMode = "walk";  //There are three views (walk,drone,sky(bird)  defalut is walk)
var transition = 0;     //This is to flag whether view is being changed

async function switchtoWALK(){      //This function changes the view to 'WALK'
    transition = 1;     //Flag that view is changing
    defaultID=0;
    updateAngles();     
    document.getElementById("rightTop").innerHTML = "W";
    document.getElementById("rightBottom").innerHTML = "WALK";
    document.getElementById("leftTopButton").innerHTML = "BIRD";
    document.getElementById("leftBottomButton").innerHTML = "DRONE";
    if(ViewMode=="sky" || ViewMode=="drone"){
        if(clicked){                                                            //If user has already clicked (it means now he has clicked to unclick the previous click)
            //Decrease the opacity of top right main information label to 0.5 
            if(expanded){      
                document.getElementById("list").style.opacity = 1;      //Shows the main information list       
                document.getElementById("more_information").style.opacity = 0;     //Dissappears the more information label
                document.getElementById("main_information").style.height = "50%";    //Expands the main information label
                document.getElementById("hint").style.backgroundColor = "#0B5345";  
                expanded = 0;           //Set the expanded flag to 0
            }
            document.getElementById("hint").innerHTML = "Click on the building for more details";
            document.getElementById("information").style.height = "40%";
            document.getElementById("main_information").style.height = "75%";
            document.getElementById("hint").style.height = "7.5%";
            document.getElementById("controlLayout").style.height = "20%";
            document.getElementById("more_information").style.removeProperty('min-height');
            document.getElementById("more_information").style.padding = "0%";
            document.getElementById("more_information").style.marginTop = "0%";
            document.getElementById("more_information").style.margin = "0%";
            document.getElementById("label2").style.fontSize = "0vmin";
            document.getElementById("list2").style.fontSize = "0vmin";
            document.getElementById("label3").style.backgroundColor = "#1A5276";
            showNavigator();
            clicked = !clicked;    
        }
        for(var i=0;i<transparentMaterialArray.length;i++){
            transparentMaterialArray[i].color.set(0x2758E7);
            transparentMaterialArray[i].opacity = 0.6;
            transparentMaterialForPanelsArray[i].opacity = 0;
        }
        var y  = camera.position.y;
        var z = camera.position.z;
        var x = camera.position.x;
        var xr = camera.rotation.x;
        for(var i=0;i<15;i++){
            await sleep(20);
            if(ViewMode=="sky"){
                camera.position.y = y - (i+1)*((y-initialCamera_Y)/15);
                camera.position.z = z - (i+1)*((z-initialCamera_Z)/15);
                camera.rotation.x = xr-(i+1)*((xr-initialCamera_Xangle)/15);

            }
            camera.position.x=x-((i+1)*(x/15));    //8,20
            camera.rotation.y = angle_y-(i+1)*(angle_y/15);
        }
        if(ViewMode=="sky"){
            frontCameraBall.position.y = initialCamera_Y-yR;
            backCameraBall.position.y = initialCamera_Y+yR;
            topCameraBall.position.y = initialCamera_Y;
            frontCameraBall.position.z = initialCamera_Z-zR;
            backCameraBall.position.z = initialCamera_Z+zR;
            topCameraBall.position.z = initialCamera_Z;
            frontCameraBall.rotation.x = initialCamera_Xangle;
            backCameraBall.rotation.x = initialCamera_Xangle;
            angle_x = initialCamera_Xangle;
        }
        okToGoBack = 0;
        okToGoFront = 0;
        angle_y = 0;
    }
    roomInfo(defaultID);
    lastpanel = -1;
    ViewMode = "walk";
    transition = 0;            
}

async function switchtoDRONE(){
    transition = 1;
    defaultID=0;
    updateAngles();
    document.getElementById("rightTop").innerHTML = "D";
    document.getElementById("rightBottom").innerHTML = "DRONE";
    document.getElementById("leftTopButton").innerHTML = "BIRD";
    document.getElementById("leftBottomButton").innerHTML = "WALK";
    if(ViewMode=="walk"){
        if(clicked){                                                            //If user has already clicked (it means now he has clicked to unclick the previous click)
            //Decrease the opacity of top right main information label to 0.5 
            if(expanded){      
                document.getElementById("list").style.opacity = 1;      //Shows the main information list       
                document.getElementById("more_information").style.opacity = 0;     //Dissappears the more information label
                document.getElementById("main_information").style.height = "50%";    //Expands the main information label
                document.getElementById("hint").style.backgroundColor = "#0B5345";  
                expanded = 0;           //Set the expanded flag to 0
            }
            document.getElementById("hint").innerHTML = "Click on the building for more details";
            document.getElementById("information").style.height = "40%";
            document.getElementById("main_information").style.height = "75%";
            document.getElementById("hint").style.height = "7.5%";
            document.getElementById("controlLayout").style.height = "20%";
            document.getElementById("more_information").style.removeProperty('min-height');
            document.getElementById("more_information").style.padding = "0%";
            document.getElementById("more_information").style.marginTop = "0%";
            document.getElementById("more_information").style.margin = "0%";
            document.getElementById("label2").style.fontSize = "0vmin";
            document.getElementById("list2").style.fontSize = "0vmin";
            document.getElementById("label3").style.backgroundColor = "#1A5276";
            showNavigator();
            clicked = !clicked;    
        }
        for(var i=0;i<transparentMaterialArray.length;i++){
            transparentMaterialArray[i].color.set(0x000000);
            transparentMaterialArray[i].opacity = 1;
            transparentMaterialForPanelsArray[i].opacity = 0;
        }        
        for(var i=0;i<10;i++){
            await sleep(20);
            camera.position.x=(i+1)*1;
            camera.rotation.y = angle_y-(i+1)*((angle_y-Math.PI/8)/10); 
        }
        okToGoBack = 1;
        okToGoFront = 1;
        angle_y = Math.PI/8;
        roomInfo(defaultID);
    }else if(ViewMode=="sky"){
        for(var i=0;i<20;i++){
            await sleep(20);
            camera.position.x = 40 -(i+1)*1.5;
            camera.rotation.y = angle_y-(i+1)*((angle_y-(Math.PI/8))/20); 
        }
        okToGoBack = 1;
        okToGoFront = 1;
        angle_y = Math.PI/8;
    }
    ViewMode = "drone";
    transition = 0;
}

async function switchtoSKY(){
    transition = 1;
    defaultID=0;
    updateAngles();
    document.getElementById("rightTop").innerHTML = "B";
    document.getElementById("rightBottom").innerHTML = "BIRD";
    document.getElementById("leftTopButton").innerHTML = "DRONE";
    document.getElementById("leftBottomButton").innerHTML = "WALK";
    if(ViewMode=="walk"){   //Going up
        if(clicked){                                                            //If user has already clicked (it means now he has clicked to unclick the previous click)
                    //Decrease the opacity of top right main information label to 0.5 
            if(expanded){      
                document.getElementById("list").style.opacity = 1;      //Shows the main information list       
                document.getElementById("more_information").style.opacity = 0;     //Dissappears the more information label
                document.getElementById("main_information").style.height = "50%";    //Expands the main information label
                document.getElementById("hint").style.backgroundColor = "#0B5345";  
                expanded = 0;           //Set the expanded flag to 0
            }
            document.getElementById("hint").innerHTML = "Click on the building for more details";
            document.getElementById("information").style.height = "40%";
            document.getElementById("main_information").style.height = "75%";
            document.getElementById("hint").style.height = "7.5%";
            document.getElementById("controlLayout").style.height = "20%";
            document.getElementById("more_information").style.removeProperty('min-height');
            document.getElementById("more_information").style.padding = "0%";
            document.getElementById("more_information").style.marginTop = "0%";
            document.getElementById("more_information").style.margin = "0%";
            document.getElementById("label2").style.fontSize = "0vmin";
            document.getElementById("list2").style.fontSize = "0vmin";
            document.getElementById("label3").style.backgroundColor = "#1A5276";
            showNavigator();
            clicked = !clicked;    
        }
        for(var i=0;i<transparentMaterialArray.length;i++){
            transparentMaterialArray[i].color.set(0x000000);
            transparentMaterialArray[i].opacity = 1;
            transparentMaterialForPanelsArray[i].opacity = 0;
        }
        var y = camera.position.y;
        var z = camera.position.z;
        var xr = camera.rotation.x;
        for(var i=0;i<20;i++){
            await sleep(20);
            camera.position.x=(i+1)*2;
            camera.position.y = y - (i+1)*(y/20-(initialBirdY/20));
            camera.position.z = z - (i+1)*(z/20-(initialBirdZ/20));
            camera.rotation.x = xr - (i+1)*(xr/20);
            camera.rotation.y = angle_y-(i+1)*((angle_y-(Math.PI/2))/20); 
        }
        frontCameraBall.position.y = initialBirdY; 
        backCameraBall.position.y = initialBirdY;
        topCameraBall.position.y = initialBirdY;
        frontCameraBall.position.z = initialBirdZ-R;
        backCameraBall.position.z = initialBirdZ+R;
        topCameraBall.position.z = initialBirdZ;
        frontCameraBall.rotation.x = 0;
        backCameraBall.rotation.x = 0;
        okToGoBack = 1;
        okToGoFront = 1;
        angle_y = Math.PI/2;
        angle_x = 0;
        roomInfo(defaultID);
    }else if(ViewMode=="drone"){
        var y = camera.position.y;
        var z = camera.position.z;
        var xr = camera.rotation.x;
        for(var i=0;i<20;i++){
            await sleep(20);
            camera.position.x = 10 +(i+1)*1.5;
            camera.position.y = y - (i+1)*(y/20-(initialBirdY/20));
            camera.position.z = z - (i+1)*(z/20-(initialBirdZ/20));
            camera.rotation.x = xr - (i+1)*(xr/20);
            camera.rotation.y = angle_y-(i+1)*((angle_y-(Math.PI/2))/20); 
        }
        frontCameraBall.position.y = initialBirdY; 
        backCameraBall.position.y = initialBirdY;
        topCameraBall.position.y = initialBirdY;
        frontCameraBall.position.z = initialBirdZ-R;
        backCameraBall.position.z = initialBirdZ+R;
        topCameraBall.position.z = initialBirdZ;
        frontCameraBall.rotation.x = 0;
        backCameraBall.rotation.x = 0;
        okToGoBack = 1;
        okToGoFront = 1;
        angle_y = Math.PI/2;
        angle_x = 0;
    }
    ViewMode = "sky";
    transition = 0;
    if(initNo!=-1){         //This will show the path if there is a hash segment in the URL
        showPath(initNo);
        initNo = -1;
    }
}

function leftTop(){
    if(!transition){    //Switching to views
        switch(ViewMode){
            case "walk":
                switchtoSKY();    
                break;
            case "sky":
                switchtoDRONE();
                break;
            case "drone":
                switchtoSKY();    
                break;
        }
    }
}

function leftBottom(){
    if(!transition){    //Switching to views
        switch(ViewMode){
            case "walk":
                switchtoDRONE();    
                break;
            case "sky":
                switchtoWALK();    
                break;
            case "drone":
                switchtoWALK();    
                break;
        }
    }
}

//Corner Controls
function changeCorners(){   //Change the shape of the corners of the layouts
    if(circleCorners==1){
        circleCorners = 0;
        document.getElementById("changeCorners").innerHTML = "Circle Corners";
        document.getElementById("main_information").style.borderRadius = "0vmin";
        document.getElementById("hint").style.borderRadius = "0vmin";
        document.getElementById("more_information").style.borderRadius = "0vmin";
        document.getElementById("navigator").style.borderRadius = "0vmin";
        document.getElementById("changeCorners").style.borderRadius = "0vmin";
        document.getElementById("RightButton").style.borderRadius = "0vmin";
        document.getElementById("leftTopButton").style.borderRadius = "0vmin";
        document.getElementById("leftBottomButton").style.borderRadius = "0vmin";
        document.getElementById("link").style.borderRadius = "0vmin";
        document.getElementById("otherpages").style.borderRadius = "0vmin";
        document.getElementById("buttonControlswitch").style.borderRadius = "0vmin";
    }else{
        circleCorners = 1;
        document.getElementById("changeCorners").innerHTML = "Square Corners";
        document.getElementById("main_information").style.borderRadius = "3.5vmin 3.5vmin 0vmin 0vmin";
        document.getElementById("hint").style.borderRadius = "0vmin 0vmin 3.5vmin 3.5vmin";
        document.getElementById("more_information").style.borderRadius = "3.5vmin";
        document.getElementById("navigator").style.borderRadius = "3.5vmin 3.5vmin 0vmin 0vmin";
        document.getElementById("changeCorners").style.borderRadius = "1.65vmin";
        document.getElementById("RightButton").style.borderRadius = "0 1.4vmin 1.4vmin 0";
        document.getElementById("leftTopButton").style.borderRadius = "1.4vmin 0 0 0";
        document.getElementById("leftBottomButton").style.borderRadius = "0 0 0 1.4vmin";
        document.getElementById("link").style.borderRadius = "3vmin";
        document.getElementById("otherpages").style.borderRadius = "1vmin";
        document.getElementById("buttonControlswitch").style.borderRadius = "1.4vmin";
    }
}

document.getElementById("searchQueryInput").addEventListener('input',function(evt){     //When the input changes
    var currentInput = document.getElementById("searchQueryInput").value;       //Take the text in the input field
    document.getElementById("roomList").scrollTo(0, 0);                         //Scroll to top
    for(var i=0;i<buildingIDList.length;i++){                       //Sort the buildingID List according to the text
        for(var j=i+1;j<buildingIDList.length;j++){ 
            if(buildingIDList[i][0].toLowerCase().indexOf(currentInput.toLowerCase())==-1){
                if(buildingIDList[j][0].toLowerCase().indexOf(currentInput.toLowerCase())!=-1){
                    var wordHolder = buildingIDList[i];
                    buildingIDList[i] = buildingIDList[j];
                    buildingIDList[j] = wordHolder;
                }
            }else if(buildingIDList[j][0].toLowerCase().indexOf(currentInput.toLowerCase())==-1){
            }else if(buildingIDList[i][0].toLowerCase().indexOf(currentInput.toLowerCase())>buildingIDList[j][0].toLowerCase().indexOf(currentInput.toLowerCase())){
                var wordHolder = buildingIDList[i];
                buildingIDList[i] = buildingIDList[j];
                buildingIDList[j] = wordHolder;
            }
        }
    }
    for(var i=0;i<navigatingItemList.length;i++){       //Update the navigating Item list according to the new buildingID list
            document.getElementById(navigatingItemList[i]).innerHTML = buildingIDList[i][0];    
    }
    if(itemSelected){
        for(var i=0;i<navigatingItemList.length;i++){       //Highlight the earlier highlighed item
            document.getElementById(navigatingItemList[i]).style.color = buildingIDList[i][1] ==lastID?"#000000":"#BBBBBB";    
        }
    }
});
    
var lastID = -5;        //BuldingID of the last showPath function call
var itemSelected = 0;   //Used to flag whether item has been selected or not
async function showPath(buildingID){
    if(itemSelected){   //If item has been selected
        for(var i=0;i<navigatingItemList.length;i++){
            document.getElementById(navigatingItemList[i]).style.color = "#616160";     //Set colours of the items to default    
        }
        for(var i=0;i<NavigatingMaterialArray.length;i++){          //Dissapear the showed path
            NavigatingMaterialArray[i].opacity = 0;
        }
        if(ViewMode=="sky" || ViewMode=="drone"){
            for(var i=0;i<idNUM;i++){                                           //Set opacity of all the panels to 0
                transparentMaterialForPanelsArray[i].opacity = 0;
            }
            roomInfo(defaultID);
        }
        lastID = -5;    //Set lastItem to -5
        itemSelected = !itemSelected;
    }else if(ViewMode=="sky"){              //If item hasn't been selected
        for(var i=0;i<navigatingItemList.length;i++){
            document.getElementById(navigatingItemList[i]).style.color = i==buildingID?"#000000":"#BBBBBB";     //Highlight the selected item    
        }
        for(var i=0;i<buildingIDList[buildingID][2].length;i++){
            NavigatingMaterialArray[buildingIDList[buildingID][2][i]].opacity = 1;   //Show thw path (using bars)
        }
        for(var i=0;i<idNUM;i++){                                           //Set opacity of all the panels to 0
            transparentMaterialForPanelsArray[i].opacity = 0;
        }
        transparentMaterialForPanelsArray[buildingIDList[buildingID][1]].opacity = 0.4;
        roomInfo(buildingIDList[buildingID][1]);
        lastID = buildingIDList[buildingID][1];        //Set the LastID
        itemSelected = !itemSelected;
    }else{
        initNo = buildingID;
        switchtoSKY();
    }
    // itemSelected = !itemSelected;   //Change the flag
}

function findData(){    //This function gives the search results of navigating panel
    
    var newBuildingIDList = [];
    var currentWord = document.getElementById("searchQueryInput").value.toLowerCase();
    for(var i=0;i<currentWord.length;i++){      //Here all the substrings in gvien word will be searched (exx:-  for 'abc' -> abc, ab, bc, a, b ,c)
        for(var k=0;k<i+1;k++){
            currentInput = currentWord.substr(k,currentWord.length-i);
            for(var j=0;j<buildingIDList.length;){               
                if(my_json[buildingIDList[j][1]].id.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');       //Creating the regular expression
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].id.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");   //Replacing the regular expression by bold word
                    newBuildingIDList.push(buildingIDList[j]);      //Add that to a new list
                    buildingIDList.splice(j,1);                     //Remove from the previous list
                    j=j-1;                                          //Decrease j since element is removed from the list
                }else if(my_json[buildingIDList[j][1]].name.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].name.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }else if(my_json[buildingIDList[j][1]].accessibility.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].accessibility.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }else if(my_json[buildingIDList[j][1]].more.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].more.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }else if(my_json[buildingIDList[j][1]].tags.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].tags.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }else if(my_json[buildingIDList[j][1]].hasOwnProperty("capacity") && my_json[buildingIDList[j][1]].capacity.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].capacity.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }else if(my_json[buildingIDList[j][1]].hasOwnProperty("staff") && my_json[buildingIDList[j][1]].staff.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].staff.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }else if(my_json[buildingIDList[j][1]].hasOwnProperty("features") && my_json[buildingIDList[j][1]].features.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].features.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }else if(my_json[buildingIDList[j][1]].hasOwnProperty("contact") && my_json[buildingIDList[j][1]].contact.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].contact.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }else if(my_json[buildingIDList[j][1]].hasOwnProperty("contact1") && my_json[buildingIDList[j][1]].contact1.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].contact1.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }else if(my_json[buildingIDList[j][1]].hasOwnProperty("contact2") && my_json[buildingIDList[j][1]].contact2.toLowerCase().includes(currentInput)){
                    var regx = new RegExp(currentInput,'gi');
                    buildingIDList[j][3] = my_json[buildingIDList[j][1]].contact2.replace(regx,"<highlighted style='color:black;'>"+currentInput+"</highlighted>");
                    newBuildingIDList.push(buildingIDList[j]);
                    buildingIDList.splice(j,1);
                    j=j-1;
                }
                j=j+1;    
            }
        }
    }
    for(var i=0;i<buildingIDList.length;i++){       //Update the navigating Item list according to the new buildingID list
        buildingIDList[i][3] = "<not style='color:#CBAAAA'>not found</not>";    
    }
    buildingIDList = newBuildingIDList.concat(buildingIDList);
    for(var i=0;i<navigatingItemList.length;i++){       //Update the navigating Item list according to the new buildingID list
        document.getElementById(navigatingItemList[i]).innerHTML = buildingIDList[i][0] + "<div class='hel'>"+buildingIDList[i][3]+"</div>";
    }
}


//Redirecting to other pages
function redirecttoPage(pageID){
    switch(pageID){
        case 0:
            window.open("FloorG.html");
            break;
        case 1:
            window.open("Floor1.html");
            break;
        case 2:
            window.open("Floor2.html");
            break;
        case 3:
            window.open("Floor3.html");
            break;
        case 4:
            window.open("Floor4.html");
            break;
    }
}

//Key Controls
document.onkeydown = function(event){   //Set event listeners for key presses
    if(document.getElementById("searchQueryInput")!=document.activeElement && (!transition)){    //If input field hasn't been focused
        switch (event.keyCode){
            case 37:    //arrow left
                turnleft();
                break;
            case 38:    //Aroow up
                forward();
                break;
            case 39:    //Arrow right
                turnright();
                break;
            case 40:    //Arrow down
                backward();
                break;
            case 83:    //Letter s
                turnup();
                break;
            case 65:    //Letter a
                turndown();
                break;
            case 87:    //Letter w
                if(ViewMode=="sky" || ViewMode=="drone"){
                    switchtoWALK();
                }
                break;
            case 68:    //Letter d
                if(ViewMode=="sky" || ViewMode=="walk"){
                    switchtoDRONE();
                }
                break;
            case 66:    //Letter b
                if(ViewMode=="drone" || ViewMode=="walk"){
                    switchtoSKY();
                }
                break;
        }
    }
}

buttoncontrolsarray = ["left","right","up","down","front","back"];

async function activeButtons(){
    if(activebuttons){
        for(var i =0;i<10;i++){                 //Used a loop for smooth animations
            await sleep(20);                    //Sleep for 20 millieseconds
            buttoncontrolsarray.forEach(element => {
                document.getElementById(element).style.width = 10-(i+1)*1 + "vmin";
                document.getElementById(element).style.fontSize = 2-(i+1)*0.2 + "vmin";
            });
        }
        buttoncontrolsarray.forEach(element => {
            document.getElementById(element).style.opacity = 0;    
            document.getElementById(element).disabled = true;
        });
    }else{
        buttoncontrolsarray.forEach(element => {
            document.getElementById(element).style.opacity = 0.7;    
            document.getElementById(element).disabled = false;
        });
        for(var i =0;i<10;i++){                 //Used a loop for smooth animations
            await sleep(20);                    //Sleep for 20 millieseconds
            buttoncontrolsarray.forEach(element => {
                document.getElementById(element).style.width = (i+1)*1 + "vmin";    
                document.getElementById(element).style.fontSize = (i+1)*0.2 + "vmin";
            });
        }
    }
    activebuttons = !activebuttons;
}

function buttonControls(buttonID){
    if(!transition){    //If input field hasn't been focused
        switch (buttonID){
            case 1:    //left
                turnleft();
                break;
            case 2:    //right
                turnright();
                break;
            case 3:    //up
                turnup();
                break;
            case 4:    //down
                turndown();
                break;
            case 5:    //front
                forward();
                break;
            case 6:    //back
                backward();
                break;
        }
    }
}

var initNo = -1;

async function checkURL(){  //If there is a hash segment in the URL, this functon will switch camera to bird mode and show the particular room 
    urlHash = location.hash.substring(1);   //Take the hash segment
    if(urlHash!=""){                        //Checking whether it is empty
        for(var i=0;i<buildingIDList.length;i++){   //Match with room id s
            if(my_json[buildingIDList[i][1]].id==urlHash){      //If there is a matching id,
                switchtoSKY();      //Switch to bird mode
                initNo = i;         //Flag to switchtoSKY function that path to the room should be shown
                return 0;           //Stop looping
            }
        }
    }
}


//Front cube
var frontCameraBall = new THREE.Mesh(
    new THREE.BoxGeometry(1,0.2,1),
    new THREE.MeshBasicMaterial({color: 0x2758E7, transparent:true, opacity:0})
);
scene.add(frontCameraBall);
frontCameraBall.position.x = initialCamera_X+3.2;   //Set the position of the front ball
frontCameraBall.position.y = initialCamera_Y-yR;
frontCameraBall.position.z = initialCamera_Z-zR;
frontCameraBall.rotation.x = initialCamera_Xangle;
let frontballBB = new THREE.Box3(new THREE.Vector3(),new THREE.Vector3());  //Create a bounding box to check intersections
frontballBB.setFromObject(frontCameraBall);

//Back cube
var backCameraBall = new THREE.Mesh(
    new THREE.BoxGeometry(2,0.2,1),
    new THREE.MeshBasicMaterial({color: 0x2758E7, transparent:true, opacity:0})
);
scene.add(backCameraBall);
backCameraBall.position.x = initialCamera_X;        //Set the position of the back ball
backCameraBall.position.y = initialCamera_Y+yR;
backCameraBall.position.z = initialCamera_Z+zR;
backCameraBall.rotation.x = initialCamera_Xangle;
let backballBB = new THREE.Box3(new THREE.Vector3(),new THREE.Vector3());   //Create a bounding box to check intersections
backballBB.setFromObject(backCameraBall);

//Top cube
var topCameraBall = new THREE.Mesh(
    new THREE.BoxGeometry(0.1,0.1,0.1),
    new THREE.MeshBasicMaterial({color: 0x2758E7, transparent:true, opacity:0})
);
scene.add(topCameraBall);
topCameraBall.position.x = 3.8;                     //Set the position of the top ball
topCameraBall.position.y = initialCamera_Y;
topCameraBall.position.z = initialCamera_Z;
let topballBB = new THREE.Box3(new THREE.Vector3(),new THREE.Vector3());    //Create a bounding box to check intersections
topballBB.setFromObject(topCameraBall);


function checkfrontIntersection(){      //Checking whether front ball is intersecting with any wall
    var sum=0;
    for(var i=0;i<transparentWallsList.length;i++){
        if(frontballBB.intersectsBox(transparentWallsList[i])){
            return 1;
        } 
    }
    return 0;
}
function checkbackIntersection(){       //Checking whether back ball is intersecting with any wall
    var sum=0;
    for(var i=0;i<transparentWallsList.length;i++){
        if(backballBB.intersectsBox(transparentWallsList[i])){
            return 1;
        } 
    }
    return 0;
}

function checkCollision(){          //Checking whether front or back ball is intersecting with any wall
    if(checkfrontIntersection()){
        okToGoFront = 0;
    }else{
        okToGoFront = 1;
    }
    if(checkbackIntersection()){
        okToGoBack = 0;
    }else{
        okToGoBack = 1;
    }
}

var lastpanel = -1;         //The id of the last panel top camera ball was intersecting with (default-> -1)
function checkRoom(){       //This function checks whether top camera ball is intersecting with any panel
    for(var i=0;i<PanelsList.length;i++){
        if(topballBB.intersectsBox(PanelsList[i])){
            if((!clicked) && (i!=lastpanel)){           //If object hasn't been clicked and if top camera ball intersects with a new panel
                defaultID=idsOfPanelList[i];
                roomInfo(defaultID);
                lastpanel = i;
            }else if((clicked) && (i!=lastpanel)){
                defaultID=idsOfPanelList[i];
                lastpanel = i;
            }        
            return 0;
        }
    }
    if(defaultID !=0 && (!clicked)){
        defaultID=0;                
        roomInfo(defaultID);
    }
    
}

function nowin(){       //Flags that mouse pointer is now over the 3D scene
    out = 0;
}
function nowout(){      //Flags that mouse pointer is out of the 3D scene
    out = 1;
} 

camera.position.x = initialCamera_X;              //Set the camera elevation (default value is 0)
camera.position.y = initialCamera_Y;
camera.position.z = initialCamera_Z;
camera.rotation.x += initialCamera_Xangle;
camera.rotation.z -= Math.PI/2;     //Set the rotation of the camera


//Rendering
var animate = function(){
    renderer.setSize(window.innerWidth-14,window.innerHeight-17);
    frontballBB.copy(frontCameraBall.geometry.boundingBox).applyMatrix4(frontCameraBall.matrixWorld);   //Update the position of the front bounding box
    backballBB.copy(backCameraBall.geometry.boundingBox).applyMatrix4(backCameraBall.matrixWorld);      //Update the position of the back bounding box
    topballBB.copy(topCameraBall.geometry.boundingBox).applyMatrix4(topCameraBall.matrixWorld);         //Update the position of the top bounding box
    if(ViewMode=="walk"){
        checkRoom();
        checkCollision();
    }
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
};

//Update information panel
function roomInfo(buildingID){

    document.getElementById("label").innerHTML = my_json[buildingID].name;                           //Update the default information about the department on the top right labels
                               //Update the default information about the department on the top right labels
    
    if(my_json[buildingID].category==1){

    document.getElementById("url").href = my_json[buildingID].contact;
    document.getElementById("list").innerHTML ='<li>Accessible for : '+my_json[buildingID].accessibility+                         //Update the main information panel
                                                '</li><li>Incharge : '+my_json[buildingID].staff+
                                                '</li><li>Capacity : '+my_json[buildingID].capacity+' students'+
                                                '</li><li>'+my_json[buildingID].more+
                                                '</li>';
                                                                  //Update the more information panel
    document.getElementById("list2").innerHTML ='<li>Location ID : '+my_json[buildingID].id+
                                                '</li><li>'+my_json[buildingID].features+
                                                '</li><li>This is a '+my_json[buildingID].tags+' area'
                                                '</li>';
    }
    else if(my_json[buildingID].category==2){
        document.getElementById("url").href = my_json[buildingID].more;
        document.getElementById("list").innerHTML ='<li>Accessible for : '+my_json[buildingID].accessibility+                         //Update the main information panel
                                                    '</li><li>Incharge : '+my_json[buildingID].staff+
                                                    '</li><li>Office No : '+my_json[buildingID].contact1+
                                                    '</li><li>Email  : '+my_json[buildingID].contact2+
                                                    '</li>';
                                                                      //Update the more information panel
        document.getElementById("list2").innerHTML ='<li>Location ID : '+my_json[buildingID].id+
                                                    '</li><li>This is a '+my_json[buildingID].tags+' area'
                                                    '</li>';
    }
    else if(my_json[buildingID].category==3){
        document.getElementById("url").href = my_json[0].data5;
        document.getElementById("list").innerHTML ='<li>Accessible for : '+my_json[buildingID].accessibility+                         //Update the main information panel
                                                    '</li><li>'+my_json[buildingID].more+
                                                    '</li>';
                                                                      //Update the more information panel
        document.getElementById("list2").innerHTML ='<li>Location ID : '+my_json[buildingID].id+
                                                    '</li><li>'+my_json[buildingID].features+
                                                    '</li><li>This is a '+my_json[buildingID].tags+' area'
                                                    '</li>';
    }
    else {
        document.getElementById("url").href = my_json[buildingID].data5;
        document.getElementById("list").innerHTML ='<li>'+my_json[buildingID].data1+                         //Update the main information panel
                                                    '</li><li>'+my_json[buildingID].data2+
                                                    '</li>';
                                                                      //Update the more information panel
        document.getElementById("list2").innerHTML ='<li>Location ID : '+my_json[buildingID].id+
                                                    '</li><li>'+my_json[buildingID].data3+
                                                    '</li><li>'+my_json[buildingID].data4+
                                                    '</li>';
    }
                               
   }