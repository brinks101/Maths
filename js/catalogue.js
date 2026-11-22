// Course catalogue: the three sections of the schoolbooks, chapters in the
// order of the manuals (Lelivrescolaire / Sésamath).
// Each chapter id is the "chapter" key used by the slides files.
window.MATHS_COURS = {
  niveaux: [
    {
      id: 'premiere',
      nom: 'Première Spé',
      court: 'Première',
      sousTitre: 'Spécialité mathématiques',
      resume: 'Le programme de première : suites, fonctions, dérivation, trigonométrie, géométrie et probabilités.',
      accent: '#e3c79e',
      chapitres: [
        { id: 'suites', titre: 'Suites numériques', resume: 'Génération, variations, suites arithmétiques et géométriques, sommes.' },
        { id: 'fonctions-reference', titre: 'Fonctions de référence', resume: 'Carré, cube, inverse, racine carrée : parité, variations, transformations.' },
        { id: 'second-degre', titre: 'Équations et inéquations du second degré', resume: 'Forme canonique, discriminant, signe, variations.' },
        { id: 'derivation', titre: 'Dérivation', resume: 'Nombre dérivé, tangente, dérivées usuelles et opérations.' },
        { id: 'applications-derivation', titre: 'Applications de la dérivation', resume: 'Variations, extremums, optimisation, position relative.' },
        { id: 'exponentielle', titre: 'Fonction exponentielle', resume: 'Définition, propriétés algébriques, dérivée, équations.' },
        { id: 'trigo', titre: 'Trigonométrie', resume: 'Cercle trigonométrique, angles associés, valeurs, équations.' },
        { id: 'fonctions-trigo', titre: 'Fonctions trigonométriques', resume: 'Courbes de cos et sin, parité, périodicité, dérivées.' },
        { id: 'produit-scalaire', titre: 'Produit scalaire', resume: 'Angles, longueurs, orthogonalité et projections.' },
        { id: 'configurations-geometriques', titre: 'Configurations géométriques', resume: 'Vecteurs, droites, cercles, distances et lieux.' },
        { id: 'probabilites-conditionnelles', titre: 'Probabilités conditionnelles', resume: 'Conditionnement, arbres, probabilités totales, indépendance.' },
        { id: 'variables-aleatoires', titre: 'Variables aléatoires réelles', resume: 'Loi, espérance, variance, lois uniforme, Bernoulli et binomiale.' },
      ],
    },
    {
      id: 'terminale',
      nom: 'Terminale Spé',
      court: 'Terminale',
      sousTitre: 'Spécialité mathématiques',
      resume: 'Le programme de terminale : analyse, intégration, probabilités et géométrie de l’espace.',
      accent: '#b4a8f0',
      chapitres: [
        { id: 'combinatoire', titre: 'Combinatoire et dénombrement', resume: 'Permutations, arrangements, combinaisons, binôme.' },
        { id: 'espace-vecteurs', titre: 'Vecteurs, droites et plans de l’espace', resume: 'Colinéarité, coplanarité, positions relatives, repérage.' },
        { id: 'espace-orthogonalite', titre: 'Orthogonalité et distances dans l’espace', resume: 'Produit scalaire, plans normaux, distances, sphères.' },
        { id: 'suites-limites', titre: 'Suites', resume: 'Limites, comparaison, convergence monotone, récurrence.' },
        { id: 'limites-fonctions', titre: 'Limites de fonctions', resume: 'Asymptotes, formes indéterminées, croissances comparées.' },
        { id: 'continuite', titre: 'Continuité', resume: 'Théorème des valeurs intermédiaires, dichotomie.' },
        { id: 'derivation-convexite', titre: 'Compléments sur la dérivation', resume: 'Dérivée seconde, convexité, points d’inflexion.' },
        { id: 'logarithme', titre: 'Logarithme népérien', resume: 'Définition, propriétés, dérivée, limites.' },
        { id: 'trigo-complements', titre: 'Fonctions trigonométriques', resume: 'Dérivées, formules d’addition, équations.' },
        { id: 'primitives-equations-differentielles', titre: 'Primitives et équations différentielles', resume: 'Primitives usuelles, y′ = ay + b, modélisation.' },
        { id: 'integrale', titre: 'Calcul intégral', resume: 'Intégrale, aire, valeur moyenne, intégration par parties.' },
        { id: 'loi-binomiale', titre: 'Loi binomiale', resume: 'Schéma de Bernoulli, coefficients, espérance, variance.' },
        { id: 'sommes-va', titre: 'Sommes de variables aléatoires', resume: 'Espérance et variance d’une somme, lois de sommes.' },
        { id: 'loi-grands-nombres', titre: 'Loi des grands nombres', resume: 'Concentration, échantillonnage, intervalle de fluctuation.' },
      ],
    },
    {
      id: 'expertes',
      nom: 'Maths Expertes',
      court: 'Expertes',
      sousTitre: 'Option mathématiques expertes',
      resume: 'Nombres complexes, arithmétique, graphes et matrices : le programme de l’option.',
      accent: '#8fcbb6',
      chapitres: [
        { id: 'complexes-algebrique', titre: 'Nombres complexes : point de vue algébrique', resume: 'Forme algébrique, conjugué, module, équations.' },
        { id: 'complexes-trigo', titre: 'Nombres complexes : point de vue géométrique', resume: 'Affixe, argument, forme exponentielle, transformations.' },
        { id: 'arithmetique-divisibilite', titre: 'Divisibilité dans ℤ', resume: 'Division euclidienne, congruences, critères.' },
        { id: 'arithmetique-pgcd', titre: 'PGCD et applications', resume: 'Euclide, Bézout, Gauss, équations diophantiennes.' },
        { id: 'arithmetique-premiers', titre: 'Nombres premiers', resume: 'Décomposition, diviseurs, Fermat, primalité.' },
        { id: 'matrices-graphes', titre: 'Calcul matriciel et applications aux graphes', resume: 'Opérations, inverse, puissances, graphes, matrice d’adjacence.' },
        { id: 'suites-matrices', titre: 'Suites et matrices', resume: 'Uₙ₊₁ = A Uₙ + B, graphes probabilistes, chaînes de Markov.' },
      ],
    },
  ],

  niveau(id) {
    return this.niveaux.find((n) => n.id === id) || this.niveaux[0];
  },

  chapitre(niveauId, chapitreId) {
    const n = this.niveau(niveauId);
    return n.chapitres.find((c) => c.id === chapitreId) || null;
  },
};
