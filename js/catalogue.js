// Course catalogue: four sections, chapters in the order of the schoolbooks.
// Each chapter id is the "chapter" key used by the slides files.
window.MATHS_COURS = {
  niveaux: [
    {
      id: 'automatismes',
      nom: 'Automatismes',
      court: 'Automatismes',
      sousTitre: 'Les réflexes de calcul',
      resume: 'Fractions, puissances, pourcentages, calcul littéral : ce qu’il faut savoir faire sans hésiter, sans calculatrice.',
      accent: '#8fcbb6',
      chapitres: [
        { id: 'fractions', titre: 'Fractions', resume: 'Simplifier, additionner, multiplier, diviser.' },
        { id: 'puissances', titre: 'Puissances et racines', resume: 'Règles de calcul, exposants négatifs, racines carrées.' },
        { id: 'pourcentages', titre: 'Pourcentages', resume: 'Un pourcentage est une multiplication.' },
        { id: 'calcul-litteral', titre: 'Calcul littéral', resume: 'Développer, factoriser, identités remarquables.' },
        { id: 'equations-auto', titre: 'Équations et inéquations', resume: 'Isoler l’inconnue, gérer un signe négatif.' },
        { id: 'valeur-absolue', titre: 'Valeur absolue', resume: 'Distance entre deux réels.' },
        { id: 'derivees-auto', titre: 'Dérivées usuelles', resume: 'Les formules à connaître par cœur.' },
      ],
    },
    {
      id: 'premiere',
      nom: 'Première Spé',
      court: 'Première',
      sousTitre: 'Spécialité mathématiques',
      resume: 'Le programme de première : algèbre, analyse, géométrie, probabilités et statistiques.',
      accent: '#e3c79e',
      chapitres: [
        { id: 'second-degre', titre: 'Second degré', resume: 'Forme canonique, discriminant, signe et variations.' },
        { id: 'polynomes-degre-3', titre: 'Polynômes de degré 3', resume: 'Racine évidente, factorisation, signe.' },
        { id: 'suites', titre: 'Suites : généralités', resume: 'Génération, représentation, sens de variation.' },
        { id: 'suites-ag', titre: 'Suites arithmétiques et géométriques', resume: 'Terme général, sommes, modélisation.' },
        { id: 'derivation', titre: 'Dérivation', resume: 'Nombre dérivé, tangente, fonction dérivée.' },
        { id: 'etude-fonctions', titre: 'Étude des fonctions', resume: 'Variations, extremums, tableau de variations.' },
        { id: 'exponentielle', titre: 'Fonction exponentielle', resume: 'Définition, propriétés, dérivée.' },
        { id: 'trigo', titre: 'Trigonométrie', resume: 'Cercle trigonométrique, angles associés, équations.' },
        { id: 'produit-scalaire', titre: 'Produit scalaire', resume: 'Angles, longueurs, orthogonalité dans le plan.' },
        { id: 'geometrie-reperee', titre: 'Géométrie repérée', resume: 'Vecteurs, droites, cercles dans un repère.' },
        { id: 'probabilites-conditionnelles', titre: 'Probabilités conditionnelles', resume: 'Arbres pondérés, tableaux, indépendance.' },
        { id: 'variables-aleatoires', titre: 'Variables aléatoires', resume: 'Loi, espérance, variance, écart type.' },
        { id: 'echantillonnage', titre: 'Échantillonnage', resume: 'Fluctuation, intervalle de confiance.' },
        { id: 'algorithmique', titre: 'Algorithmique et Python', resume: 'Boucles, fonctions, suites et probabilités.' },
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
        { id: 'suites-limites', titre: 'Suites : limites et récurrence', resume: 'Convergence, théorèmes de comparaison, récurrence.' },
        { id: 'limites-fonctions', titre: 'Limites de fonctions', resume: 'Asymptotes, formes indéterminées, croissances comparées.' },
        { id: 'continuite', titre: 'Continuité et TVI', resume: 'Théorème des valeurs intermédiaires, dichotomie.' },
        { id: 'derivation-convexite', titre: 'Dérivation et convexité', resume: 'Dérivée seconde, convexité, points d’inflexion.' },
        { id: 'logarithme', titre: 'Logarithme népérien', resume: 'Définition, propriétés algébriques, limites.' },
        { id: 'exponentielle-complements', titre: 'Fonctions exponentielles', resume: 'Croissances comparées, dérivées, équations.' },
        { id: 'trigo-complements', titre: 'Trigonométrie : compléments', resume: 'Dérivées, formules d’addition, équations.' },
        { id: 'primitives', titre: 'Primitives', resume: 'Reconnaître une forme u′u, u′/u, u′eᵘ.' },
        { id: 'integrale', titre: 'Calcul intégral', resume: 'Intégrale, aire, valeur moyenne.' },
        { id: 'equations-differentielles', titre: 'Équations différentielles', resume: 'y′ = ay + b, y′ = ay, modélisation.' },
        { id: 'combinatoire', titre: 'Combinatoire et dénombrement', resume: 'Arrangements, combinaisons, binôme.' },
        { id: 'loi-binomiale', titre: 'Probabilités et loi binomiale', resume: 'Indépendance, schéma de Bernoulli, loi binomiale.' },
        { id: 'espace-vecteurs', titre: 'Vecteurs, droites et plans', resume: 'Repérage et positions relatives dans l’espace.' },
        { id: 'espace-orthogonalite', titre: 'Orthogonalité et distances', resume: 'Produit scalaire dans l’espace, distances.' },
        { id: 'espace-reperage', titre: 'Repérage dans l’espace', resume: 'Représentation paramétrique, équation de plan.' },
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
        { id: 'complexes-algebrique', titre: 'Nombres complexes : algèbre', resume: 'Forme algébrique, conjugué, module, équations.' },
        { id: 'complexes-trigo', titre: 'Nombres complexes : géométrie', resume: 'Argument, forme exponentielle, transformations.' },
        { id: 'polynomes-complexes', titre: 'Équations polynomiales', resume: 'Racines, factorisation, degré n.' },
        { id: 'arithmetique-congruences', titre: 'Divisibilité et congruences', resume: 'Division euclidienne, congruences, critères.' },
        { id: 'arithmetique-pgcd', titre: 'PGCD et nombres premiers', resume: 'Euclide, Bézout, Gauss, nombres premiers.' },
        { id: 'graphes', titre: 'Graphes', resume: 'Sommets, arêtes, degrés, chaînes, connexité.' },
        { id: 'matrices', titre: 'Matrices et chaînes de Markov', resume: 'Calcul matriciel, puissances, suites, Markov.' },
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
