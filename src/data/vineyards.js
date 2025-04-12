export const featuredVineyards = [
  {
    id: 1,
    name: "Domaine de la Romanée-Conti",
    location: 'Vosne-Romanée',
    image: '/images/romanee-conti-domaine.jpg',
    description: 'Le Domaine de la Romanée-Conti, situé à Vosne-Romanée, est l\'un des domaines viticoles les plus prestigieux au monde. Fondé en 1760, il produit des vins d\'une complexité et d\'une élégance inégalées. Nos activités incluent des dégustations privées de nos grands crus, des visites historiques du domaine et des ateliers d\'initiation à l\'œnologie animés par nos sommeliers.',
    latitude: 47.1947,
    longitude: 4.9504,
    rating: 4.9, // Added rating
    wines: [
      {
        name: 'Romanée-Conti',
        year: '2018',
        type: 'Pinot Noir',
        description: 'Le vin le plus prestigieux de Bourgogne, d\'une complexité et d\'une élégance inégalées.'
      },
      {
        name: 'La Tâche',
        year: '2017',
        type: 'Pinot Noir',
        description: 'Un grand cru d\'une puissance et d\'une longueur exceptionnelles.'
      }
    ]
  },
  {
    id: 2,
    name: 'Château de Pommard',
    location: 'Pommard',
    image: '/images/pommard-chateausite.png',
    description: 'Le Château de Pommard, fondé en 1726, allie tradition et innovation dans la production de vins de Bourgogne. Nos activités comprennent des visites guidées des caves historiques, des dégustations commentées de nos cuvées, ainsi que des dîners gastronomiques dans notre salle voûtée du XVIIIe siècle.',
    latitude: 47.0025,
    longitude: 4.7833,
    rating: 4.7, // Added rating
    wines: [
      {
        name: 'Clos Marey-Monge',
        year: '2019',
        type: 'Pinot Noir',
        description: 'Un Pommard d\'une grande structure et d\'une belle persistance en bouche.'
      },
      {
        name: 'Simone',
        year: '2020',
        type: 'Pinot Noir',
        description: 'Un vin élégant aux arômes de fruits rouges et d\'épices douces.'
      }
    ]
  },
  {
    id: 3,
    name: 'Domaine Leflaive',
    location: 'Puligny-Montrachet',
    image: '/images/article_pp_DomaineLeflaive_Entete.jpg',
    description: 'Le Domaine Leflaive, situé à Puligny-Montrachet, est célèbre pour ses grands vins blancs de Bourgogne. Nous proposons des visites de nos vignobles biologiques, des dégustations verticales de nos millésimes, ainsi que des ateliers sur l\'accord mets-vins avec notre chef sommelier.',
    latitude: 46.9731,
    longitude: 4.7534,
    rating: 4.8, // Added rating
    wines: [
      {
        name: 'Montrachet',
        year: '2018',
        type: 'Chardonnay',
        description: 'Le plus grand vin blanc de Bourgogne, d\'une richesse et d\'une complexité inégalées.'
      },
      {
        name: 'Chevalier-Montrachet',
        year: '2019',
        type: 'Chardonnay',
        description: 'Un grand cru d\'une grande finesse et d\'une belle minéralité.'
      }
    ]
  },
];