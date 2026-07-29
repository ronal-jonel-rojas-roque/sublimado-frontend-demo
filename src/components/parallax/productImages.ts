// Importaciones base de colores
import shirtWhite from "./../../assets/parallax/shirt-white.webp";
import shirtBlue from "./../../assets/parallax/shirt-blue.webp";
import shirtBlack from "./../../assets/parallax/shirt-black.webp";
import shirtOrange from "./../../assets/parallax/shirt-orange.webp";

import capWhite from "./../../assets/parallax/cap-white.webp";
import capBlue from "./../../assets/parallax/cap-blue.webp";
import capBlack from "./../../assets/parallax/cap-black.webp";
import capOrange from "./../../assets/parallax/cap-orange.webp";

import kitWhite from "./../../assets/parallax/kit-white.webp";
import kitBlue from "./../../assets/parallax/kit-blue.webp";
import kitBlack from "./../../assets/parallax/kit-black.webp";
import kitOrange from "./../../assets/parallax/kit-orange.webp";

// Importaciones de acabados para SHIRT
import shirtWhiteFinishModel1 from "./../../assets/parallax/shirt-white-finish-model1.webp";
import shirtWhiteFinishModel2 from "./../../assets/parallax/shirt-white-finish-model2.webp";
import shirtWhiteFinishModel3 from "./../../assets/parallax/shirt-white-finish-model3.webp";

import shirtBlackFinishModel1 from "./../../assets/parallax/shirt-black-finish-model1.webp";
import shirtBlackFinishModel2 from "./../../assets/parallax/shirt-black-finish-model2.webp";
import shirtBlackFinishModel3 from "./../../assets/parallax/shirt-black-finish-model3.webp";

import shirtBlueFinishModel1 from "./../../assets/parallax/shirt-blue-finish-model1.webp";
import shirtBlueFinishModel2 from "./../../assets/parallax/shirt-blue-finish-model2.webp";
import shirtBlueFinishModel3 from "./../../assets/parallax/shirt-blue-finish-model3.webp";

import shirtOrangeFinishModel1 from "./../../assets/parallax/shirt-orange-finish-model1.webp";
import shirtOrangeFinishModel2 from "./../../assets/parallax/shirt-orange-finish-model2.webp";
import shirtOrangeFinishModel3 from "./../../assets/parallax/shirt-orange-finish-model3.webp";

// Importaciones de acabados para CAP (Gorra)
import capBlackFinishModel1 from "./../../assets/parallax/cap-black-finish-model1.webp";
import capBlackFinishModel2 from "./../../assets/parallax/cap-black-finish-model2.webp";

import capWhiteFinishModel1 from "./../../assets/parallax/cap-white-finish-model1.webp";
import capWhiteFinishModel2 from "./../../assets/parallax/cap-white-finish-model2.webp";

// Importaciones de acabados para KIT (Conjunto)
import kitBlackFinishModel1 from "./../../assets/parallax/kit-black-finish-model1.webp";
import kitBlackFinishModel2 from "./../../assets/parallax/kit-black-finish-model2.webp";

import kitWhiteFinishModel1 from "./../../assets/parallax/kit-white-finish-model1.webp";
import kitWhiteFinishModel2 from "./../../assets/parallax/kit-white-finish-model2.webp";

export const baseImages = {
  shirt: { white: shirtWhite, blue: shirtBlue, black: shirtBlack, orange: shirtOrange },
  cap: { white: capWhite, blue: capBlue, black: capBlack, orange: capOrange },
  kit: { white: kitWhite, blue: kitBlue, black: kitBlack, orange: kitOrange },
};

export const finishImages: Record<string, string> = {
  // Shirts
  "shirt-white-model1": shirtWhiteFinishModel1,
  "shirt-white-model2": shirtWhiteFinishModel2,
  "shirt-white-model3": shirtWhiteFinishModel3,
  "shirt-black-model1": shirtBlackFinishModel1,
  "shirt-black-model2": shirtBlackFinishModel2,
  "shirt-black-model3": shirtBlackFinishModel3,
  "shirt-blue-model1": shirtBlueFinishModel1,
  "shirt-blue-model2": shirtBlueFinishModel2,
  "shirt-blue-model3": shirtBlueFinishModel3,
  "shirt-orange-model1": shirtOrangeFinishModel1,
  "shirt-orange-model2": shirtOrangeFinishModel2,
  "shirt-orange-model3": shirtOrangeFinishModel3,

  // Caps
  "cap-black-model1": capBlackFinishModel1,
  "cap-black-model2": capBlackFinishModel2,
  "cap-white-model1": capWhiteFinishModel1,
  "cap-white-model2": capWhiteFinishModel2,

  // Kits
  "kit-black-model1": kitBlackFinishModel1,
  "kit-black-model2": kitBlackFinishModel2,
  "kit-white-model1": kitWhiteFinishModel1,
  "kit-white-model2": kitWhiteFinishModel2,
};