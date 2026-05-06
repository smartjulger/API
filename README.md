# API


## Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).




## web api's

voor de web api wil ik gebruik maken van:

canvas api:https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

web GL: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API

View transitions:https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API

## content api's

star wars api

https://swapi.dev/documentation#starships


## idee

voor mijn idee wil ik een Star Wars api gebruiken waarin je starships kan zien en dan bepaalde info kan zien. Je kan dan eerst door wat schepen gaan en als je op een schip klikt dan ga je naar het informatie scherm en dan krijg je meer details over het gekozen starship. Dit wil ik in een character selector style maken zodat het lijkt alsof je een schip kiest voor een missie.


## 2e idee 

Mijn nieuwe idee die uit het 1e feedback gesprek kwam is om met three js planeten te maken en ze dan ook textures te geven en dan wil ik een solar system gaan maken met daarin als het lukt ook wat satalieten. Als je op een planeet of sataliet klikt dan ga je naar de detail pagina waarin ik de content wil inladen aan de hand van de nasa api


## 01/04/2026 (nienke)

### wat heb ik gedaan vandaag?

vandaag ben ik zoek gegaan naar een api die ik wil gebruiken daar ben ik op een star wars api gekomen en een concept bedacht en astro opgezet

### wat heb ik geleerd?

hoe je de basis kan opzetten met astro

### wat ga ik morgen doen?

morgen ga ik feedback gesprekken houden en als het idee goed gekeurt word dan proberen of ik three js kan toevoegen.


## 08/04/2026

### wat heb ik gedaan vandaag?

vandaag heb ik een workshop gevolgt over hoe Astro werkt en hoe je components kan inladen en hoe het een beetje te werkgaat

Daarna ben ik begonnen met het maken van een sphere die nu ook een glow heeft.
<img width="746" height="512" alt="image" src="https://github.com/user-attachments/assets/a989b4df-0e77-4bbf-b290-169588637bfe" />


### wat heb ik geleerd?

hoe je components maakt in astro en hoe je een sphere maakt in three js plus een glow add.

### wat ga ik morgen doen?

kijken of ik een andere sphere kan toevoegen en dan gravitie kan  toevoegen aan mijn zon zodat er een planeet omheen kan draaien.

## 09/04/2026

### wat heb ik gedaan vandaag?

vandaag heb ik een workshop gevolt over local storage en daarna ben ik extra planeten gaan toevoegenen gaan kijken dat je vrij kan rond bewegen binnen mijn website.

### wat heb ik geleerd?

hoe je een extra planeet kan toevoegen en hoe je die dan kan verplaatsen zodat die niet op de zon zelf staat.

### wat ga ik volgende keer doen?

Ik kijken of ik de maan kan laten rotaten om de aarde heen 


## 22/04/2026

### wat heb ik gedaan vandaag?

vandaag ben ik aan de slag geweest met de array van mijn planeten aan te maken zodat je met een viewtransition naar de planeten kan gaan

### wat heb ik geleerd?

Hoe je met three js een array kan maken en ben bezig met leren hoe je dan kan transitionen naar de planeet

### wat ga ik volgende keer doen?
verder werken aan de array zodat hij kan transitionen naar de planeet.

## 23/04/2026

### wat heb ik gedaan vandaag?

vandaag ben ik bezig geweest met ervoor zorgen dat je smoothly naar een planeet gaat en dan dat hij de planeet blijft volgen

### wat heb ik geleerd?

hoe .clone werkt zodat je de huidige locatie ophaalt van een item.

### wat ga ik volgende keer doen?

feedback gesprek houden en daarna data van de api inladen binnen de detail pagina.

## bronnen 

**Raycaster — klikbare planeten**

https://threejs.org/docs/#api/en/core/Raycaster
Officiële documentatie van de Raycaster-klasse. Gebruikt voor het detecteren welke planeet de gebruiker aanklikt.

https://threejs-journey.com/lessons/raycaster-and-mouse-events
Bruno Simon's uitleg over `setFromCamera()`, `intersectObject()` en `intersectObjects()` — precies de methodes die ik gebruik in mijn click-handler.

https://syntaxbytetutorials.com/three-js-raycasting-for-mouse-picking/
Praktische walkthrough van mouse picking met genormaliseerde device coordinates (de `(e.clientX / window.innerWidth) * 2 - 1` berekening).

https://discourse.threejs.org/t/how-to-create-sketchfab-like-annotations-with-three-js/12595
Forum-thread over klikbare annotaties + camera-tween — dezelfde combinatie van raycaster + GSAP die ik in mijn `flyTo()` gebruik.


**GSAP camera-animatie (flyTo)**

https://waelyasmina.net/articles/animating-camera-transitions-in-three-js-using-gsap/
Volledige tutorial over `gsap.to()` op `camera.position` met `onUpdate` om `camera.lookAt()` mee te animeren — exact het patroon achter mijn `flyTo()`-functie.

https://gsap.com/docs/v3/GSAP/gsap.to()
Officiële GSAP-documentatie van de `to()`-methode, inclusief easing (`power4.out`, `power2.in`) en het `kill()`-mechanisme dat ik gebruik om lopende tweens af te breken bij een nieuwe klik.

https://gsap.com/docs/v3/Eases/
Visuele easing-cheatsheet — handig om te begrijpen waarom `power4.out` zo goed werkt voor een vliegbeweging die soepel uitloopt.


**HTML-labels boven 3D-objecten**

https://www.ramijames.com/learn-threejs/interaction/html-overlays-and-labels
Behandelt precies de aanpak die ik gebruik: `Vector3.project(camera)` om wereldcoördinaten naar NDC te brengen, dan naar pixels schalen en de label-`div` daarop positioneren. Inclusief de `pos.z > 1`-check om labels achter de camera te verbergen.

https://discourse.threejs.org/t/how-to-understand-vector3-project-and-ndc-space/26535
Forum-discussie over wat NDC-space precies betekent en wanneer `project()` rare waarden teruggeeft.

https://threejs.org/docs/#api/en/math/Vector3.project
Documentatie van de `project()`-methode zelf.


**Solar System OpenData API**

https://api.le-systeme-solaire.net/en/
Officiële documentatie van de API die ik gebruik om de Engelse planeetnamen op te halen. Geeft ook toegang tot velden als `sideralOrbit`, `sideralRotation`, `axialTilt`, `gravity`, `meanRadius` — bruikbaar als ik mijn hardcoded waarden door echte data wil vervangen.

https://github.com/systeme-solaire/api-rest
GitHub-repo met querystring-parameters (`data=`, `exclude=`, `order=`) en het volledige veldenoverzicht.


**Bobby Roe — basis van getFresnelMat & getStarfield**

https://github.com/bobbyroe/threejs-earth
De originele repo waar `getFresnelMat.js` en `getStarfield.js` vandaan komen, inclusief de aarde met dag-/nacht-textures, additieve lights-laag en Fresnel-glow.

https://www.youtube.com/watch?v=FntV9iEJ0tU
Begeleidende video van Bobby Roe waarin hij de multi-layered earth stap voor stap opbouwt.


**Planeet-textures (alternatieve bron)**

https://www.solarsystemscope.com/textures/
Equirectangulaire planeetkaarten gebaseerd op NASA-data, gratis onder CC-BY 4.0. Hogere resolutie dan Planet Pixel Emporium en consistenter qua belichting tussen planeten.


**Postprocessing — bloom rond de zon**

https://threejs.org/examples/#webgl_postprocessing_unreal_bloom
Officieel Three.js-voorbeeld waarin de drie parameters van `UnrealBloomPass` (strength, radius, threshold) interactief zijn — handig om mijn waarden `1.5, 0.4, 0.85` te begrijpen.

https://medium.com/@kareemelbahrawy/post-processing-with-three-js-unreal-bloom-effect-1-cb4b6a87de7e
Achtergrondartikel over hoe `EffectComposer` werkt als pipeline (`RenderPass` → `UnrealBloomPass`) en wanneer je überhaupt postprocessing nodig hebt.


**Delta-time animatie**

https://discoverthreejs.com/book/first-steps/animation-loop/
Uitleg over waarom je `(now - prevTime) / 1000` gebruikt in plaats van een vaste rotatie per frame — zorgt dat snelheden constant blijven onafhankelijk van framerate.

https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
MDN-documentatie van `requestAnimationFrame`, de basis van mijn `animate()`-loop.


**Axiale kanteling van planeten**

https://nssdc.gsfc.nasa.gov/planetary/factsheet/
NASA Planetary Fact Sheet — bron van de echte axiale-tilt-waarden (-23.4° voor Aarde, -177.4° voor Venus, -97.8° voor Uranus, etc.) die ik in `rotation.z` zet voor elke planeetgroep.


**localStorage — actieve planeet onthouden**

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
MDN-documentatie van `localStorage.setItem()` / `getItem()`, gebruikt om de laatst geselecteerde planeet over een refresh heen te bewaren.


**RingGeometry — ringen van Saturnus**

https://threejs.org/docs/#api/en/geometries/RingGeometry
Documentatie van `RingGeometry(innerRadius, outerRadius, segments)`, gebruikt voor de ringen rond Saturnus met `DoubleSide` en transparantie.