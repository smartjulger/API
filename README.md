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



## bronnen 

**camera controls binnen three js** 

https://medium.com/geekculture/how-to-control-three-js-camera-like-a-pro-a8575a717a2



**maan rotaten om de aarde heen.**

https://waelyasmina.net/articles/how-to-make-an-object-rotate-around-another-object-in-three-js/

https://medium.com/@wwdhfernando/circular-motion-with-javascript-48d49a713bf4



**Three.js documentatie**
https://threejs.org/docs/
Gebruikt voor het opzetten van de 3D-scene: renderer, camera, geometrie en materialen.

**Three.js OrbitControls**
https://threejs.org/docs/#examples/en/controls/OrbitControls
Gebruikt om de camera met de muis te besturen — draaien, zoomen en pannen.


**fly controls**

https://threejs.org/docs/#FlyControls

**Three.js UnrealBloomPass**
https://threejs.org/docs/#examples/en/postprocessing/UnrealBloomPass
Gebruikt voor het gloei-effect (bloom) op de zon.

**Three.js EffectComposer**
https://threejs.org/docs/#examples/en/postprocessing/EffectComposer
Gebruikt als post-processing pipeline om de bloom-pass toe te voegen aan de render.

**Medium — How to control Three.js camera like a pro**
https://medium.com/geekculture/how-to-control-three-js-camera-like-a-pro-a8575a717a2
Gebruikt als uitleg bij het correct instellen van OrbitControls met damping.
