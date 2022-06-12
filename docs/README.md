---
layout: home
permalink: index.html

# Please update this with your repository name and title
repository-name: e18-co227-Interactive-Department-Map-GroupA
title: Interactive Department Map 
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# Interactive Department Map

---

## Team
-  e/18/327, M.D.C.D.Senevirathna, [e18327@eng.pdn.ac.lk](mailto:name@email.com)
-  e/18/354, K.K.D.R.Tharaka, [e18354@eng.pdn.ac.lk](mailto:name@email.com)
-  e/18/318, S.A.P.Sandunika, [e18318@eng.pdn.ac.lk](mailto:name@email.com)

## Table of Contents
1. [Introduction](#introduction)
2. [Objectives](#objectives)
3. [Problem Domain](#problem_domain)
4. [Solution and Specifications](#solution_and_specifications)
5. [Solution Architecture](#solution_architecture)
6. [Technology Stack](#technology_stack)
7. [Links](#links)

---

## Introduction

 The aim of this project is to develop an up to date web-based 3D map for the Department of Computer Engineering building including all labs, staff rooms, server room, lecture rooms etc. and link relevant information of staff members then the users will be able to access them in a convenient way.

## Objectives

There are 4 main stakeholders. They are student, academic staff, non-academic staff and visitors. They can get following uses from IDM.
* Provides a 3D interactive Map of the Department to the visitors 
* Ease to contact department lecturers 
* Make it easy to find a particular place (ex: labs, lecture rooms)
* Provides information about department lecturers via their webpages 
* Save your time and effort

## Problem_Domain
It is common to see that there’re visitors to the Department and usually they would ask someone about the particular person or the place. As almost everyone is having a busy schedule here it would be inconvenient for both of the parties.
Also, sometimes it is possible to have conflicts in identifying the needed person due to same names, etc. Considering these facts, it is obvious that this typical methods waste time and effort.

## Solution_and_Specifications
As a solution this web-based application can be introduced that anyone can access anytime easily.  
This system will allow user to move along the paths of the whole building while observing and getting details about each lecture rooms/labs by clicking on the 3d model. Those relevant information will be displayed on the information panel on the web page as he moves along the 3D model.
Also here it facilitates user to search for the place they expect to visit or the person they want to meet. Then users will be directed to that particular place with relevant floor number in the 3D model.  
Also, it is directly linked to the official pages of the department lecturers. So, users can easily access the necessary details like contact information etc.  


## Solution_Architecture
---
![dd2](https://user-images.githubusercontent.com/73444543/172698244-b0fe3424-ce60-44d2-90ca-218b9667cc60.png)

Our web-based application mainly consists of 3 parts; User interface, 3D model and the Information panel. 
User Interface will get the user input of name of the lecturer or the building which they want to search for. Then relevant data will be retrieved from the database and it will navigate to that particular place in the 3D model. At the same time relevant information will be displayed on the information panel. This process is handled by the controller. Department website is linked to information panel as well as the web page such that user can directly access the information about the relevant lecturer.

The other approach of this system is navigating through the map. It will get commands(directions) from the user from the arrow keys and navigate through the whole model which consists of all 4 floors inside and outside. These movements are handled by three.js program and blender is used for creating 3D objects. Those objects and data will be retrieved from a local database as necessarily.

---
Sample model demonstrating the information panel
#

---
![1111111111](https://user-images.githubusercontent.com/73444543/172698738-858c8617-8f72-4593-9682-ed8edef4b286.png)|![2222222222](https://user-images.githubusercontent.com/73444543/172698754-77f91daa-7202-4b99-9b5c-5d3ac02360ee.png)

## Technology_Stack

* ThreeJS : Is a cross-browser JavaScript library and application programming interface (API) used to create and display animated 3D computer graphics in a web browser using WebGL
* Blender : Is a free and open-source 3D computer graphics software toolset used for creating animated films, visual effects, art, 3D-printed models, motion graphics, interactive 3D applications, virtual reality, and, formerly, video games. Blender's features include 3D modelling, UV mapping, texturing, digital drawing, raster graphics editing, rigging and skinning, fluid and smoke simulation, particle simulation, soft body simulation, sculpting, animation, match moving, rendering, motion graphics, video editing, and compositing.
* MySQL : Fast, reliable, scalable Open Source SQL database management system developed by Oracle Corporation
* Underlying Code : HTML , CSS , JavaScript


## Links

- [Project Repository](https://github.com/cepdnaclk/e18-co227-Interactive-Department-Map-GroupA.git)
- [Project Page](https://cepdnaclk.github.io/e18-co227-Interactive-Department-Map-GroupA)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)


[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
