import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { GSDevTools } from "gsap/GSDevTools";
import storageAvailable from "./storage_available";


const main = gsap.timeline();
const animationWrapper = document.querySelector(".loading-animation");
const pageContent = document.querySelector(".loading-animation__page-content");
const skipAnimationInstructions = document.querySelector(
  ".skip-animation-instructions"
);

function cleanUpDOM() {
  animationWrapper.remove();
  skipAnimationInstructions.remove();
  pageContent.classList.remove("loading-animation__page-content");
  document.querySelector('body').classList.remove('u-overflow-hidden');
}

function introAnimation() {
  gsap.registerPlugin(MorphSVGPlugin);

  const getRect = (e) => e.getBoundingClientRect();

  const getCenterX = (ww, ew) => ww / 2 - ew / 2;
  const getCenterY = (wh, eh) => wh / 2 - eh / 2;

  const pageContentClone = document.querySelector(".loading-animation__page-content-clone");
  const animationSvg = document.querySelector(".loading-animation > svg");
  const logoType = document.querySelector(".loading-animation__logotype");
  const logoTypeDiameter = getRect(logoType).width;
  const logoStatic = document.querySelector(".header__logo-static");
  const logoStaticRect = getRect(logoStatic);
  const puffyCircle = document.querySelector("#puffy-circle");
  const puffyCircleDiameter = getRect(puffyCircle).width;
  const puffyCircleStatic = document.querySelector("#puffy-circle-static");
  const puffyCircleStaticRect = getRect(puffyCircleStatic);
  const logoMarkStatic = document.querySelector("#logomark-static");
  const logoMarkStaticRect = getRect(logoMarkStatic);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const LOGO_FINAL_POS_X = logoStaticRect.x;
  const LOGO_FINAL_POS_Y = logoStaticRect.y;

  function clonePageContent() {
    const clone = pageContent.cloneNode(true);

    pageContentClone.append(clone);
  };

  animationWrapper.classList.remove("loading-animation--hidden");
  skipAnimationInstructions.classList.remove("skip-animation-instructions--hidden");

  //TODO: UPDATE TO() AND FROMTO() TO USE DURATION PROP
  function animationComplete() {
    const skipAnimationRect = getRect(skipAnimationInstructions);
    const skipAnimationTranslateY = skipAnimationRect.height + skipAnimationRect.y;
    gsap.to(animationWrapper, 1, { opacity: 0 });
    gsap.to(skipAnimationInstructions, 0.5, { y: skipAnimationTranslateY * -1, ease: "back.in(4)", onComplete: cleanUpDOM });
  }

  //TODO: CREATE A NAMED FUNCTION FOR THIS
  //TODO: SEE IF YOU CAN MOVE window.focus() TO THIS LISTENER
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();

      main.kill();
      cleanUpDOM();
    }
  });

  // ###################
  // SCENE 1
  // ###################

  const scene1 = () => {
    const tl = gsap.timeline();

    //forces focus to the window so that the spacebar to skip event works.
    window.focus();

    const pathToClone = document.querySelector(".path-to-clone");
    const rotateWrapper = document.querySelector(".rotate");
    const scaleXPath = document.querySelector(".scale-x");
    const scaleXPathWidth = getRect(scaleXPath).width;

    tl.timeScale(3);

    tl.set(logoType, {
      x: windowWidth / 2 - logoTypeDiameter,
      y: windowHeight / 2 - logoTypeDiameter
    });

    tl.set(".scale-x", {
      scaleX: 0,
      transformOrigin: `${scaleXPathWidth}px 0`
    });

    tl.to(".scale-x", 2, {
      scaleX: 1,
      transformOrigin: `${scaleXPathWidth}px 0`
    });

    tl.set("#morph-start", { opacity: 1 });

    tl.to("#morph-start", 0.25, {
      morphSVG: { shape: "#morph-end", shapeIndex: 0 }
    });

    tl.set(".rotate", { opacity: 1 });

    const ANGLE = 45;
    let angleCounter = ANGLE;
    let tlPosition = 0;

    for (let i = 0; i <= 3; i++) {
      let pathCloneTop = pathToClone.cloneNode();
      let pathCloneBottom = pathToClone.cloneNode();
      let pathCloneTopClass = `rotate-top-${i}`;
      let pathCloneBottomClass = `rotate-bottom-${i}`;

      pathCloneTop.removeAttribute("id");
      pathCloneBottom.removeAttribute("id");

      pathCloneTop.classList.remove(...pathCloneTop.classList);
      pathCloneBottom.classList.remove(...pathCloneBottom.classList);

      pathCloneTop.classList.add(pathCloneTopClass);
      pathCloneBottom.classList.add(pathCloneBottomClass);

      rotateWrapper.append(pathCloneTop, pathCloneBottom);

      tl.to(
        pathCloneTop,
        0.4,
        {
          rotation: angleCounter,
          transformOrigin: "100% 50%"
        },
        `-=${tlPosition}`
      );

      tl.to(
        pathCloneBottom,
        0.4,
        {
          rotation: angleCounter * -1,
          transformOrigin: "100% 50%"
        },
        `-=0.4`
      );

      tlPosition = 0.3;

      angleCounter = angleCounter + ANGLE;
    }

    tl.set([".morph", ".rotate"], { opacity: 0 });
    tl.set([".loading-animation__logotype .final", ".mask"], { opacity: 1 });

    tl.to(".mask", 2, { scaleX: 0, transformOrigin: "0 0" });

    return tl;
  };

  // ###################
  // SCENE 2
  // ###################

  const scene2 = () => {
    const tl = gsap.timeline();

    const bgStatic = document.querySelector("#bg-static");
    const bgAnimated = document.querySelector("#bg-animated");
    const clipPath = document.querySelector("#clip");

    const l = Math.pow(windowWidth, 2);
    const w = Math.pow(windowHeight, 2);
    const diagonalOfViewport = Math.sqrt(l + w);
    const marginOfError = 0.2;

    tl.set(bgStatic, { opacity: 0 });
    tl.set(bgAnimated, { opacity: 1 });

    tl.set(puffyCircle, {
      x: windowWidth / 2 - puffyCircleDiameter / 2,
      y: windowHeight / 2 - puffyCircleDiameter / 2,
      scale: diagonalOfViewport / puffyCircleDiameter + marginOfError,
      transformOrigin: "50% 50%"
    });

    tl.to(puffyCircle, 2, { scale: 1 });
    tl.to(puffyCircle, 4, { rotation: "360_cw" }, "-=2");

    return tl;
  };

  const scene3 = () => {
    const tl = gsap.timeline({ onStart: clonePageContent, onComplete: animationComplete });

    const gradientBg = document.querySelector("#bg-animated");
    const gradientOffsetStart = document.querySelector("#offsetStart");
    const gradientOffsetEnd = document.querySelector("#offsetEnd");


    const getGradientStart = () => {
      const x = windowWidth / 2 - logoStaticRect.width / 2;
      return `${(x / windowWidth) * 100}%`;
    };

    const getGradientEnd = () => {
      const x = windowWidth / 2 + logoStaticRect.width / 2;
      return `${(x / windowWidth) * 100}%`;
    };

    tl.fromTo(
      pageContentClone,
      1,
      { y: windowHeight },
      { y: LOGO_FINAL_POS_Y + logoStaticRect.height + 16 }
    );

    tl.to(
      gradientOffsetStart,
      0.8,
      {
        attr: { offset: getGradientStart() }
      },
      "-=0.8"
    );

    tl.to(
      gradientOffsetEnd,
      0.8,
      {
        attr: { offset: getGradientEnd() }
      },
      "-=0.8"
    );

    const cloudFinalPos = ((puffyCircleDiameter - puffyCircleStaticRect.width) / 2 - 16) * -1;

    //TODO: CHECK THE LOGOMARK UNSCALED TO SEE HOW POSITIONING IS CALCULATED
    const logoMarkFinalPos =
      ((logoTypeDiameter - logoMarkStaticRect.width) / 2 + 9) * -1;

    tl.to(puffyCircle, 0.8, { y: cloudFinalPos, scale: 0.6 }, "-=0.8");

    tl.to(
      logoType,
      0.8,
      { y: logoMarkFinalPos, scale: 0.6, transformOrigin: "50%" },
      "-=0.8"
    );

    return tl;
  };

  main.add(scene1()).add(scene2()).add(scene3(), "-=2");

}


if (storageAvailable('localStorage') && !localStorage.getItem('introAnimationPlayed')) {

  introAnimation();

  localStorage.setItem('introAnimationPlayed', true);
}
else {
  main.kill();
  cleanUpDOM();
}

//localStorage.removeItem('introAnimationPlayed');
//GSDevTools.create();