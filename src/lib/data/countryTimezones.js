/**
 * @typedef {Object} CountryTimezone
 * @property {string} id
 * @property {string} label
 * @property {string} timezone
 * @property {[number, number]} coords - Coordenadas [longitud, latitud]
 */

/** @type {Record<string, CountryTimezone[]>} */
export const countryTimezones = {
  Spain: [
    {
      id: 'es-mainland',
      label: 'España peninsular',
      timezone: 'Europe/Madrid',
      coords: [-3.7038, 40.4168]
    },
    {
      id: 'es-canary',
      label: 'Islas Canarias',
      timezone: 'Atlantic/Canary',
      coords: [-15.5994, 28.1484]
    }
  ],
  France: [
    {
      id: 'fr-metropolitan',
      label: 'Francia',
      timezone: 'Europe/Paris',
      coords: [2.2137, 46.2276]
    }
  ],
  Germany: [
    {
      id: 'de-mainland',
      label: 'Alemania',
      timezone: 'Europe/Berlin',
      coords: [10.4515, 51.1657]
    }
  ],
  'United States of America': [
    {
      id: 'us-east',
      label: 'EE. UU. Este',
      timezone: 'America/New_York',
      coords: [-77.0369, 38.9072]
    },
    {
      id: 'us-central',
      label: 'EE. UU. Centro',
      timezone: 'America/Chicago',
      coords: [-94.5786, 39.0997]
    },
    {
      id: 'us-mountain',
      label: 'EE. UU. Montaña',
      timezone: 'America/Denver',
      coords: [-105.2705, 40.015]
    },
    {
      id: 'us-pacific',
      label: 'EE. UU. Pacífico',
      timezone: 'America/Los_Angeles',
      coords: [-118.2437, 34.0522]
    },
    {
      id: 'us-alaska',
      label: 'Alaska',
      timezone: 'America/Anchorage',
      coords: [-149.4937, 64.2008]
    },
    {
      id: 'us-hawaii',
      label: 'Hawái',
      timezone: 'Pacific/Honolulu',
      coords: [-157.8583, 21.3069]
    }
  ],
  Brazil: [
    {
      id: 'br-east',
      label: 'Brasil Este',
      timezone: 'America/Sao_Paulo',
      coords: [-46.6333, -23.5505]
    },
    {
      id: 'br-northeast',
      label: 'Brasil Nordeste',
      timezone: 'America/Fortaleza',
      coords: [-38.5016, -3.7319]
    },
    {
      id: 'br-amazon',
      label: 'Brasil Amazonia',
      timezone: 'America/Manaus',
      coords: [-60.0217, -3.119]
    },
    {
      id: 'br-acre',
      label: 'Brasil Acre',
      timezone: 'America/Rio_Branco',
      coords: [-67.813, -9.9747]
    }
  ],
  Colombia: [
    {
      id: 'co-main',
      label: 'Colombia',
      timezone: 'America/Bogota',
      coords: [-74.0721, 4.711]
    }
  ],
  Peru: [
    {
      id: 'pe-main',
      label: 'Perú',
      timezone: 'America/Lima',
      coords: [-77.0428, -12.0464]
    }
  ],
  Ecuador: [
    {
      id: 'ec-continent',
      label: 'Ecuador continental',
      timezone: 'America/Guayaquil',
      coords: [-79.8891, -2.1701]
    },
    {
      id: 'ec-galapagos',
      label: 'Islas Galápagos',
      timezone: 'Pacific/Galapagos',
      coords: [-90.9656, -0.9538]
    }
  ],
  Venezuela: [
    {
      id: 've-main',
      label: 'Venezuela',
      timezone: 'America/Caracas',
      coords: [-66.9036, 10.4806]
    }
  ],
  Bolivia: [
    {
      id: 'bo-main',
      label: 'Bolivia',
      timezone: 'America/La_Paz',
      coords: [-68.1193, -16.4897]
    }
  ],
  Paraguay: [
    {
      id: 'py-main',
      label: 'Paraguay',
      timezone: 'America/Asuncion',
      coords: [-57.5759, -25.2637]
    }
  ],
  Uruguay: [
    {
      id: 'uy-main',
      label: 'Uruguay',
      timezone: 'America/Montevideo',
      coords: [-56.1645, -34.9011]
    }
  ],
  China: [
    {
      id: 'cn-mainland',
      label: 'China',
      timezone: 'Asia/Shanghai',
      coords: [104.1954, 35.8617]
    }
  ],
  Japan: [
    {
      id: 'jp-main',
      label: 'Japón',
      timezone: 'Asia/Tokyo',
      coords: [138.2529, 36.2048]
    }
  ],
  Australia: [
    {
      id: 'au-east',
      label: 'Australia Este',
      timezone: 'Australia/Sydney',
      coords: [151.2093, -33.8688]
    },
    {
      id: 'au-central',
      label: 'Australia Central',
      timezone: 'Australia/Adelaide',
      coords: [138.6007, -34.9285]
    },
    {
      id: 'au-west',
      label: 'Australia Oeste',
      timezone: 'Australia/Perth',
      coords: [115.8575, -31.9505]
    }
  ],
  Canada: [
    {
      id: 'ca-pacific',
      label: 'Canadá Pacífico',
      timezone: 'America/Vancouver',
      coords: [-123.1207, 49.2827]
    },
    {
      id: 'ca-mountain',
      label: 'Canadá Montañas Rocosas',
      timezone: 'America/Edmonton',
      coords: [-113.4909, 53.5444]
    },
    {
      id: 'ca-central',
      label: 'Canadá Central',
      timezone: 'America/Winnipeg',
      coords: [-97.1384, 49.8951]
    },
    {
      id: 'ca-eastern',
      label: 'Canadá Este',
      timezone: 'America/Toronto',
      coords: [-79.3832, 43.6532]
    },
    {
      id: 'ca-atlantic',
      label: 'Canadá Atlántico',
      timezone: 'America/Halifax',
      coords: [-63.5752, 44.6488]
    },
    {
      id: 'ca-newfoundland',
      label: 'Canadá Terranova',
      timezone: 'America/St_Johns',
      coords: [-52.7126, 47.5615]
    }
  ],
  'Greenland': [
    {
      id: 'gl-southwest',
      label: 'Groenlandia Suroeste',
      timezone: 'America/Nuuk',
      coords: [-51.7216, 64.1814]
    },
    {
      id: 'gl-east',
      label: 'Groenlandia Este',
      timezone: 'America/Scoresbysund',
      coords: [-21.9667, 70.4833]
    },
    {
      id: 'gl-northwest',
      label: 'Groenlandia Noroeste',
      timezone: 'America/Thule',
      coords: [-68.7833, 76.5667]
    },
    {
      id: 'gl-northeast',
      label: 'Groenlandia Noreste',
      timezone: 'America/Danmarkshavn',
      coords: [-18.6667, 76.7667]
    }
  ],
  Bermuda: [
    {
      id: 'bm-main',
      label: 'Bermudas',
      timezone: 'Atlantic/Bermuda',
      coords: [-64.7505, 32.3078]
    }
  ],
  Mexico: [
    {
      id: 'mx-northwest',
      label: 'México Noroeste',
      timezone: 'America/Tijuana',
      coords: [-117.0382, 32.5149]
    },
    {
      id: 'mx-pacific',
      label: 'México Pacífico',
      timezone: 'America/Mazatlan',
      coords: [-106.4111, 23.2494]
    },
    {
      id: 'mx-central',
      label: 'México Centro',
      timezone: 'America/Mexico_City',
      coords: [-99.1332, 19.4326]
    },
    {
      id: 'mx-southeast',
      label: 'México Sureste',
      timezone: 'America/Cancun',
      coords: [-86.8515, 21.1619]
    }
  ],
  Guatemala: [
    {
      id: 'gt-main',
      label: 'Guatemala',
      timezone: 'America/Guatemala',
      coords: [-90.5069, 14.6349]
    }
  ],
  Belize: [
    {
      id: 'bz-main',
      label: 'Belice',
      timezone: 'America/Belize',
      coords: [-88.1976, 17.5046]
    }
  ],
  'El Salvador': [
    {
      id: 'sv-main',
      label: 'El Salvador',
      timezone: 'America/El_Salvador',
      coords: [-89.2182, 13.6929]
    }
  ],
  Honduras: [
    {
      id: 'hn-main',
      label: 'Honduras',
      timezone: 'America/Tegucigalpa',
      coords: [-87.2068, 14.0723]
    }
  ],
  Nicaragua: [
    {
      id: 'ni-main',
      label: 'Nicaragua',
      timezone: 'America/Managua',
      coords: [-86.2514, 12.1364]
    }
  ],
  'Costa Rica': [
    {
      id: 'cr-main',
      label: 'Costa Rica',
      timezone: 'America/Costa_Rica',
      coords: [-84.0907, 9.9281]
    }
  ],
  Panama: [
    {
      id: 'pa-main',
      label: 'Panamá',
      timezone: 'America/Panama',
      coords: [-79.5167, 8.9833]
    }
  ],
  Cuba: [
    {
      id: 'cu-main',
      label: 'Cuba',
      timezone: 'America/Havana',
      coords: [-82.3666, 23.1136]
    }
  ],
  'Dominican Republic': [
    {
      id: 'do-main',
      label: 'República Dominicana',
      timezone: 'America/Santo_Domingo',
      coords: [-69.9312, 18.4861]
    }
  ],
  'Puerto Rico': [
    {
      id: 'pr-main',
      label: 'Puerto Rico',
      timezone: 'America/Puerto_Rico',
      coords: [-66.1057, 18.4655]
    }
  ],
  Jamaica: [
    {
      id: 'jm-main',
      label: 'Jamaica',
      timezone: 'America/Jamaica',
      coords: [-76.792, 17.997]
    }
  ],
  Bahamas: [
    {
      id: 'bs-main',
      label: 'Bahamas',
      timezone: 'America/Nassau',
      coords: [-77.3554, 25.047]
    }
  ],
  Barbados: [
    {
      id: 'bb-main',
      label: 'Barbados',
      timezone: 'America/Barbados',
      coords: [-59.6145, 13.0975]
    }
  ],
  'Trinidad and Tobago': [
    {
      id: 'tt-main',
      label: 'Trinidad y Tobago',
      timezone: 'America/Port_of_Spain',
      coords: [-61.5189, 10.6549]
    }
  ],
  'Antigua and Barbuda': [
    {
      id: 'ag-main',
      label: 'Antigua y Barbuda',
      timezone: 'America/Antigua',
      coords: [-61.8456, 17.1175]
    }
  ],
  'Saint Kitts and Nevis': [
    {
      id: 'kn-main',
      label: 'San Cristóbal y Nieves',
      timezone: 'America/St_Kitts',
      coords: [-62.7806, 17.3026]
    }
  ],
  'Dominica': [
    {
      id: 'dm-main',
      label: 'Dominica',
      timezone: 'America/Dominica',
      coords: [-61.387, 15.3092]
    }
  ],
  'Saint Lucia': [
    {
      id: 'lc-main',
      label: 'Santa Lucía',
      timezone: 'America/St_Lucia',
      coords: [-60.9875, 14.0101]
    }
  ],
  'Saint Vincent and the Grenadines': [
    {
      id: 'vc-main',
      label: 'San Vicente y las Granadinas',
      timezone: 'America/St_Vincent',
      coords: [-61.227, 13.1553]
    }
  ],
  Grenada: [
    {
      id: 'gd-main',
      label: 'Granada',
      timezone: 'America/Grenada',
      coords: [-61.7486, 12.0561]
    }
  ],
  Argentina: [
    {
      id: 'ar-main',
      label: 'Argentina',
      timezone: 'America/Argentina/Buenos_Aires',
      coords: [-58.3816, -34.6037]
    }
  ],
  Chile: [
    {
      id: 'cl-continental',
      label: 'Chile continental',
      timezone: 'America/Santiago',
      coords: [-70.6693, -33.4489]
    },
    {
      id: 'cl-south',
      label: 'Magallanes',
      timezone: 'America/Punta_Arenas',
      coords: [-70.9081, -53.1638]
    },
    {
      id: 'cl-rapa-nui',
      label: 'Rapa Nui',
      timezone: 'Pacific/Easter',
      coords: [-109.3497, -27.1212]
    }
  ],
  'United Kingdom': [
    {
      id: 'uk-main',
      label: 'Reino Unido',
      timezone: 'Europe/London',
      coords: [-0.1276, 51.5072]
    }
  ],
  India: [
    {
      id: 'in-main',
      label: 'India',
      timezone: 'Asia/Kolkata',
      coords: [77.209, 28.6139]
    }
  ],
  Russia: [
    {
      id: 'ru-west',
      label: 'Rusia Occidental',
      timezone: 'Europe/Moscow',
      coords: [37.6173, 55.7558]
    },
    {
      id: 'ru-central',
      label: 'Rusia Ural',
      timezone: 'Asia/Yekaterinburg',
      coords: [60.6122, 56.8389]
    },
    {
      id: 'ru-siberia',
      label: 'Rusia Siberia',
      timezone: 'Asia/Irkutsk',
      coords: [104.296, 52.2869]
    },
    {
      id: 'ru-far-east',
      label: 'Rusia Extremo Oriente',
      timezone: 'Asia/Vladivostok',
      coords: [131.8855, 43.1155]
    },
    {
      id: 'ru-novosibirsk',
      label: 'Rusia Novosibirsk',
      timezone: 'Asia/Novosibirsk',
      coords: [82.9204, 55.0302]
    },
    {
      id: 'ru-krasnoyarsk',
      label: 'Rusia Krasnoyarsk',
      timezone: 'Asia/Krasnoyarsk',
      coords: [92.8526, 56.0153]
    },
    {
      id: 'ru-kamchatka',
      label: 'Rusia Kamchatka',
      timezone: 'Asia/Kamchatka',
      coords: [158.6559, 53.037]
    },
    {
      id: 'ru-kaliningrad',
      label: 'Kaliningrado',
      timezone: 'Europe/Kaliningrad',
      coords: [20.5101, 54.7104]
    },
    {
      id: 'ru-samara',
      label: 'Samara',
      timezone: 'Europe/Samara',
      coords: [50.1001, 53.1959]
    },
    {
      id: 'ru-omsk',
      label: 'Omsk',
      timezone: 'Asia/Omsk',
      coords: [73.3686, 54.9885]
    },
    {
      id: 'ru-yakutsk',
      label: 'Yakutsk',
      timezone: 'Asia/Yakutsk',
      coords: [129.7333, 62.0355]
    },
    {
      id: 'ru-magadan',
      label: 'Magadán',
      timezone: 'Asia/Magadan',
      coords: [150.8000, 59.5500]
    },
    {
      id: 'ru-sakhalin',
      label: 'Sajalín',
      timezone: 'Asia/Sakhalin',
      coords: [142.7333, 46.9667]
    },
    {
      id: 'ru-anadyr',
      label: 'Anadyr',
      timezone: 'Asia/Anadyr',
      coords: [177.5167, 64.7333]
    }
  ],
  'South Africa': [
    {
      id: 'za-main',
      label: 'Sudáfrica',
      timezone: 'Africa/Johannesburg',
      coords: [28.0473, -26.2041]
    }
  ],
  Indonesia: [
    {
      id: 'id-west',
      label: 'Indonesia Occidental',
      timezone: 'Asia/Jakarta',
      coords: [106.8456, -6.2088]
    },
    {
      id: 'id-central',
      label: 'Indonesia Central',
      timezone: 'Asia/Makassar',
      coords: [119.431, -5.1477]
    },
    {
      id: 'id-east',
      label: 'Indonesia Oriental',
      timezone: 'Asia/Jayapura',
      coords: [140.7181, -2.5916]
    }
  ],
  'New Zealand': [
    {
      id: 'nz-main',
      label: 'Nueva Zelanda',
      timezone: 'Pacific/Auckland',
      coords: [174.7633, -36.8485]
    },
    {
      id: 'nz-chatham',
      label: 'Islas Chatham',
      timezone: 'Pacific/Chatham',
      coords: [-176.55, -44.0]
    }
  ],
  Portugal: [
    {
      id: 'pt-mainland',
      label: 'Portugal continental',
      timezone: 'Europe/Lisbon',
      coords: [-9.1393, 38.7223]
    },
    {
      id: 'pt-madeira',
      label: 'Madeira',
      timezone: 'Atlantic/Madeira',
      coords: [-16.9241, 32.6669]
    },
    {
      id: 'pt-azores',
      label: 'Azores',
      timezone: 'Atlantic/Azores',
      coords: [-25.6667, 37.7412]
    }
  ],
  Italy: [
    {
      id: 'it-main',
      label: 'Italia',
      timezone: 'Europe/Rome',
      coords: [12.4964, 41.9028]
    }
  ],
  Netherlands: [
    {
      id: 'nl-main',
      label: 'Países Bajos',
      timezone: 'Europe/Amsterdam',
      coords: [5.2913, 52.1326]
    }
  ],
  Belgium: [
    {
      id: 'be-main',
      label: 'Bélgica',
      timezone: 'Europe/Brussels',
      coords: [4.4699, 50.5039]
    }
  ],
  Switzerland: [
    {
      id: 'ch-main',
      label: 'Suiza',
      timezone: 'Europe/Zurich',
      coords: [8.2275, 46.8182]
    }
  ],
  Austria: [
    {
      id: 'at-main',
      label: 'Austria',
      timezone: 'Europe/Vienna',
      coords: [16.3738, 48.2082]
    }
  ],
  Poland: [
    {
      id: 'pl-main',
      label: 'Polonia',
      timezone: 'Europe/Warsaw',
      coords: [21.0122, 52.2297]
    }
  ],
  Greece: [
    {
      id: 'gr-main',
      label: 'Grecia',
      timezone: 'Europe/Athens',
      coords: [23.7275, 37.9838]
    }
  ],
  Turkey: [
    {
      id: 'tr-main',
      label: 'Turquía',
      timezone: 'Europe/Istanbul',
      coords: [28.9784, 41.0082]
    }
  ],
  Sweden: [
    {
      id: 'se-main',
      label: 'Suecia',
      timezone: 'Europe/Stockholm',
      coords: [18.0686, 59.3293]
    }
  ],
  Norway: [
    {
      id: 'no-main',
      label: 'Noruega',
      timezone: 'Europe/Oslo',
      coords: [10.7522, 59.9139]
    }
  ],
  Finland: [
    {
      id: 'fi-main',
      label: 'Finlandia',
      timezone: 'Europe/Helsinki',
      coords: [24.9384, 60.1699]
    }
  ],
  Iceland: [
    {
      id: 'is-main',
      label: 'Islandia',
      timezone: 'Atlantic/Reykjavik',
      coords: [-21.8174, 64.1265]
    }
  ],
  Ireland: [
    {
      id: 'ie-main',
      label: 'Irlanda',
      timezone: 'Europe/Dublin',
      coords: [-6.2603, 53.3498]
    }
  ],
  Morocco: [
    {
      id: 'ma-main',
      label: 'Marruecos',
      timezone: 'Africa/Casablanca',
      coords: [-6.8498, 34.0209]
    }
  ],
  Algeria: [
    {
      id: 'dz-main',
      label: 'Argelia',
      timezone: 'Africa/Algiers',
      coords: [3.0588, 36.7538]
    }
  ],
  Tunisia: [
    {
      id: 'tn-main',
      label: 'Túnez',
      timezone: 'Africa/Tunis',
      coords: [10.1815, 36.8065]
    }
  ],
  Egypt: [
    {
      id: 'eg-main',
      label: 'Egipto',
      timezone: 'Africa/Cairo',
      coords: [31.2357, 30.0444]
    }
  ],
  Nigeria: [
    {
      id: 'ng-main',
      label: 'Nigeria',
      timezone: 'Africa/Lagos',
      coords: [3.3792, 6.5244]
    }
  ],
  Ghana: [
    {
      id: 'gh-main',
      label: 'Ghana',
      timezone: 'Africa/Accra',
      coords: [-0.186964, 5.603717]
    }
  ],
  Senegal: [
    {
      id: 'sn-main',
      label: 'Senegal',
      timezone: 'Africa/Dakar',
      coords: [-17.4441, 14.6937]
    }
  ],
  Kenya: [
    {
      id: 'ke-main',
      label: 'Kenia',
      timezone: 'Africa/Nairobi',
      coords: [36.8219, -1.2921]
    }
  ],
  Ethiopia: [
    {
      id: 'et-main',
      label: 'Etiopía',
      timezone: 'Africa/Addis_Ababa',
      coords: [38.7578, 8.9806]
    }
  ],
  'Saudi Arabia': [
    {
      id: 'sa-main',
      label: 'Arabia Saudí',
      timezone: 'Asia/Riyadh',
      coords: [46.6753, 24.7136]
    }
  ],
  'United Arab Emirates': [
    {
      id: 'ae-main',
      label: 'Emiratos Árabes Unidos',
      timezone: 'Asia/Dubai',
      coords: [54.3773, 24.4539]
    }
  ],
  Iran: [
    {
      id: 'ir-main',
      label: 'Irán',
      timezone: 'Asia/Tehran',
      coords: [51.389, 35.6892]
    }
  ],
  Pakistan: [
    {
      id: 'pk-main',
      label: 'Pakistán',
      timezone: 'Asia/Karachi',
      coords: [67.0099, 24.8615]
    }
  ],
  Thailand: [
    {
      id: 'th-main',
      label: 'Tailandia',
      timezone: 'Asia/Bangkok',
      coords: [100.5018, 13.7563]
    }
  ],
  Vietnam: [
    {
      id: 'vn-main',
      label: 'Vietnam',
      timezone: 'Asia/Ho_Chi_Minh',
      coords: [106.6297, 10.8231]
    }
  ],
  Philippines: [
    {
      id: 'ph-main',
      label: 'Filipinas',
      timezone: 'Asia/Manila',
      coords: [120.9842, 14.5995]
    }
  ],
  'South Korea': [
    {
      id: 'kr-main',
      label: 'Corea del Sur',
      timezone: 'Asia/Seoul',
      coords: [126.978, 37.5665]
    }
  ],
  Singapore: [
    {
      id: 'sg-main',
      label: 'Singapur',
      timezone: 'Asia/Singapore',
      coords: [103.8198, 1.3521]
    }
  ],
  Malaysia: [
    {
      id: 'my-main',
      label: 'Malasia',
      timezone: 'Asia/Kuala_Lumpur',
      coords: [101.6869, 3.139]
    }
  ],
  Israel: [
    {
      id: 'il-main',
      label: 'Israel',
      timezone: 'Asia/Jerusalem',
      coords: [35.2137, 31.7683]
    }
  ],
  Afghanistan: [
    {
      id: 'af-main',
      label: 'Afganistán',
      timezone: 'Asia/Kabul',
      coords: [69.2075, 34.5553]
    }
  ],
  Nepal: [
    {
      id: 'np-main',
      label: 'Nepal',
      timezone: 'Asia/Kathmandu',
      coords: [85.324, 27.7172]
    }
  ],
  Myanmar: [
    {
      id: 'mm-main',
      label: 'Birmania (Myanmar)',
      timezone: 'Asia/Yangon',
      coords: [96.1951, 16.8661]
    }
  ],
  Bangladesh: [
    {
      id: 'bd-main',
      label: 'Bangladesh',
      timezone: 'Asia/Dhaka',
      coords: [90.4125, 23.8103]
    }
  ],
  Ukraine: [
    {
      id: 'ua-main',
      label: 'Ucrania',
      timezone: 'Europe/Kyiv',
      coords: [30.5234, 50.4501]
    }
  ],
  Taiwan: [
    {
      id: 'tw-main',
      label: 'Taiwán',
      timezone: 'Asia/Taipei',
      coords: [121.5654, 25.0330]
    }
  ],
  Romania: [
    {
      id: 'ro-main',
      label: 'Rumanía',
      timezone: 'Europe/Bucharest',
      coords: [26.1025, 44.4268]
    }
  ],
  Hungary: [
    {
      id: 'hu-main',
      label: 'Hungría',
      timezone: 'Europe/Budapest',
      coords: [19.0402, 47.4979]
    }
  ],
  'Czech Republic': [
    {
      id: 'cz-main',
      label: 'República Checa',
      timezone: 'Europe/Prague',
      coords: [14.4378, 50.0755]
    }
  ],
  Kazakhstan: [
    {
      id: 'kz-main',
      label: 'Kazajistán',
      timezone: 'Asia/Almaty',
      coords: [76.8512, 43.2220]
    }
  ],
  Uzbekistan: [
    {
      id: 'uz-main',
      label: 'Uzbekistán',
      timezone: 'Asia/Tashkent',
      coords: [69.2401, 41.2995]
    }
  ],
  Denmark: [
    {
      id: 'dk-main',
      label: 'Dinamarca',
      timezone: 'Europe/Copenhagen',
      coords: [12.5683, 55.6761]
    }
  ],
  Croatia: [
    {
      id: 'hr-main',
      label: 'Croacia',
      timezone: 'Europe/Zagreb',
      coords: [15.9819, 45.8150]
    }
  ],
  Serbia: [
    {
      id: 'rs-main',
      label: 'Serbia',
      timezone: 'Europe/Belgrade',
      coords: [20.4489, 44.7866]
    }
  ],
  Slovakia: [
    {
      id: 'sk-main',
      label: 'Eslovaquia',
      timezone: 'Europe/Bratislava',
      coords: [17.1077, 48.1486]
    }
  ],
  Slovenia: [
    {
      id: 'si-main',
      label: 'Eslovenia',
      timezone: 'Europe/Ljubljana',
      coords: [14.5058, 46.0569]
    }
  ],
  Bulgaria: [
    {
      id: 'bg-main',
      label: 'Bulgaria',
      timezone: 'Europe/Sofia',
      coords: [23.3219, 42.6977]
    }
  ],
  Estonia: [
    {
      id: 'ee-main',
      label: 'Estonia',
      timezone: 'Europe/Tallinn',
      coords: [24.7536, 59.4370]
    }
  ],
  Latvia: [
    {
      id: 'lv-main',
      label: 'Letonia',
      timezone: 'Europe/Riga',
      coords: [24.1052, 56.9496]
    }
  ],
  Lithuania: [
    {
      id: 'lt-main',
      label: 'Lituania',
      timezone: 'Europe/Vilnius',
      coords: [25.2797, 54.6872]
    }
  ],
  'Sri Lanka': [
    {
      id: 'lk-main',
      label: 'Sri Lanka',
      timezone: 'Asia/Colombo',
      coords: [79.8612, 6.9271]
    }
  ],
  Cambodia: [
    {
      id: 'kh-main',
      label: 'Camboya',
      timezone: 'Asia/Phnom_Penh',
      coords: [104.9282, 11.5564]
    }
  ],
  Qatar: [
    {
      id: 'qa-main',
      label: 'Catar',
      timezone: 'Asia/Qatar',
      coords: [51.5310, 25.2854]
    }
  ],
  Lebanon: [
    {
      id: 'lb-main',
      label: 'Líbano',
      timezone: 'Asia/Beirut',
      coords: [35.5018, 33.8938]
    }
  ],
  Jordan: [
    {
      id: 'jo-main',
      label: 'Jordania',
      timezone: 'Asia/Amman',
      coords: [35.9284, 31.9454]
    }
  ],
  Iraq: [
    {
      id: 'iq-main',
      label: 'Irak',
      timezone: 'Asia/Baghdad',
      coords: [44.3661, 33.3152]
    }
  ],
  Tanzania: [
    {
      id: 'tz-main',
      label: 'Tanzania',
      timezone: 'Africa/Dar_es_Salaam',
      coords: [39.2083, -6.7924]
    }
  ],
  Uganda: [
    {
      id: 'ug-main',
      label: 'Uganda',
      timezone: 'Africa/Kampala',
      coords: [32.5825, 0.3476]
    }
  ],
  Sudan: [
    {
      id: 'sd-main',
      label: 'Sudán',
      timezone: 'Africa/Khartoum',
      coords: [32.5599, 15.5007]
    }
  ],
  Fiji: [
    {
      id: 'fj-main',
      label: 'Fiyi',
      timezone: 'Pacific/Fiji',
      coords: [178.4419, -18.1416]
    }
  ],
  Samoa: [
    {
      id: 'ws-main',
      label: 'Samoa',
      timezone: 'Pacific/Apia',
      coords: [-171.7633, -13.8333]
    }
  ],
  Tonga: [
    {
      id: 'to-main',
      label: 'Tonga',
      timezone: 'Pacific/Tongatapu',
      coords: [-175.1972, -21.1393]
    }
  ],
  Maldives: [
    {
      id: 'mv-main',
      label: 'Maldivas',
      timezone: 'Indian/Maldives',
      coords: [73.5093, 4.1755]
    }
  ],
  Seychelles: [
    {
      id: 'sc-main',
      label: 'Seychelles',
      timezone: 'Indian/Mahe',
      coords: [55.4513, -4.6191]
    }
  ],
  Mauritius: [
    {
      id: 'mu-main',
      label: 'Mauricio',
      timezone: 'Indian/Mauritius',
      coords: [57.5012, -20.1609]
    }
  ],
  Malta: [
    {
      id: 'mt-main',
      label: 'Malta',
      timezone: 'Europe/Malta',
      coords: [14.5146, 35.8989]
    }
  ],
  Cyprus: [
    {
      id: 'cy-main',
      label: 'Chipre',
      timezone: 'Asia/Nicosia',
      coords: [33.3823, 35.1856]
    }
  ],
  Luxembourg: [
    {
      id: 'lu-main',
      label: 'Luxemburgo',
      timezone: 'Europe/Luxembourg',
      coords: [6.1296, 49.6116]
    }
  ],
  Andorra: [
    {
      id: 'ad-main',
      label: 'Andorra',
      timezone: 'Europe/Andorra',
      coords: [1.5218, 42.5063]
    }
  ],
  Monaco: [
    {
      id: 'mc-main',
      label: 'Mónaco',
      timezone: 'Europe/Monaco',
      coords: [7.4246, 43.7384]
    }
  ],
  'Cape Verde': [
    {
      id: 'cv-main',
      label: 'Cabo Verde',
      timezone: 'Atlantic/Cape_Verde',
      coords: [-23.5125, 14.9330]
    }
  ],
  Brunei: [
    {
      id: 'bn-main',
      label: 'Brunéi',
      timezone: 'Asia/Brunei',
      coords: [114.9401, 4.9031]
    }
  ],
  Bhutan: [
    {
      id: 'bt-main',
      label: 'Bután',
      timezone: 'Asia/Thimphu',
      coords: [89.6177, 27.4728]
    }
  ],
  'Timor-Leste': [
    {
      id: 'tl-main',
      label: 'Timor Oriental',
      timezone: 'Asia/Dili',
      coords: [125.5736, -8.5569]
    }
  ],
  Haiti: [
    {
      id: 'ht-main',
      label: 'Haití',
      timezone: 'America/Port-au-Prince',
      coords: [-72.3333, 18.5333]
    }
  ],
  Aruba: [
    {
      id: 'aw-main',
      label: 'Aruba',
      timezone: 'America/Aruba',
      coords: [-70.0358, 12.5186]
    }
  ],
  Curacao: [
    {
      id: 'cw-main',
      label: 'Curazao',
      timezone: 'America/Curacao',
      coords: [-68.9333, 12.1167]
    }
  ],
  Kiribati: [
    {
      id: 'ki-tarawa',
      label: 'Islas Gilbert (Tarawa)',
      timezone: 'Pacific/Tarawa',
      coords: [172.9717, 1.4518]
    },
    {
      id: 'ki-phoenix',
      label: 'Islas Fénix',
      timezone: 'Pacific/Enderbury',
      coords: [-171.0833, -3.1333]
    },
    {
      id: 'ki-line',
      label: 'Islas de la Línea (Kiritimati)',
      timezone: 'Pacific/Kiritimati',
      coords: [-157.3999, 1.8721]
    }
  ],
  'Papua New Guinea': [
    {
      id: 'pg-main',
      label: 'Papúa Nueva Guinea',
      timezone: 'Pacific/Port_Moresby',
      coords: [147.1803, -9.4438]
    }
  ],
  Madagascar: [
    {
      id: 'mg-main',
      label: 'Madagascar',
      timezone: 'Indian/Antananarivo',
      coords: [47.5079, -18.8792]
    }
  ],
  Zimbabwe: [
    {
      id: 'zw-main',
      label: 'Zimbabue',
      timezone: 'Africa/Harare',
      coords: [31.0522, -17.8216]
    }
  ],
  Namibia: [
    {
      id: 'na-main',
      label: 'Namibia',
      timezone: 'Africa/Windhoek',
      coords: [17.0658, -22.5609]
    }
  ],
  Botswana: [
    {
      id: 'bw-main',
      label: 'Botsuana',
      timezone: 'Africa/Gaborone',
      coords: [25.9231, -24.6282]
    }
  ],
  Mongolia: [
    {
      id: 'mn-main',
      label: 'Mongolia',
      timezone: 'Asia/Ulaanbaatar',
      coords: [106.9176, 47.9188]
    }
  ],
  Laos: [
    {
      id: 'la-main',
      label: 'Laos',
      timezone: 'Asia/Vientiane',
      coords: [102.6331, 17.9757]
    }
  ],
  Georgia: [
    {
      id: 'ge-main',
      label: 'Georgia',
      timezone: 'Asia/Tbilisi',
      coords: [44.8271, 41.7151]
    }
  ],
  Armenia: [
    {
      id: 'am-main',
      label: 'Armenia',
      timezone: 'Asia/Yerevan',
      coords: [44.5090, 40.1872]
    }
  ],
  Azerbaijan: [
    {
      id: 'az-main',
      label: 'Azerbaiyán',
      timezone: 'Asia/Baku',
      coords: [49.8671, 40.4093]
    }
  ],
  Albania: [
    {
      id: 'al-main',
      label: 'Albania',
      timezone: 'Europe/Tirane',
      coords: [19.8187, 41.3275]
    }
  ],
  'North Macedonia': [
    {
      id: 'mk-main',
      label: 'Macedonia del Norte',
      timezone: 'Europe/Skopje',
      coords: [21.4254, 41.9981]
    }
  ],
  'Bosnia and Herzegovina': [
    {
      id: 'ba-main',
      label: 'Bosnia y Herzegovina',
      timezone: 'Europe/Sarajevo',
      coords: [18.4131, 43.8563]
    }
  ],
  Montenegro: [
    {
      id: 'me-main',
      label: 'Montenegro',
      timezone: 'Europe/Podgorica',
      coords: [19.2598, 42.4304]
    }
  ],
  Moldova: [
    {
      id: 'md-main',
      label: 'Moldavia',
      timezone: 'Europe/Chisinau',
      coords: [28.8638, 47.0105]
    }
  ],
  Belarus: [
    {
      id: 'by-main',
      label: 'Bielorrusia',
      timezone: 'Europe/Minsk',
      coords: [27.5615, 53.9045]
    }
  ],
  Guyana: [
    {
      id: 'gy-main',
      label: 'Guyana',
      timezone: 'America/Guyana',
      coords: [-58.1553, 6.8013]
    }
  ],
  Suriname: [
    {
      id: 'sr-main',
      label: 'Surinam',
      timezone: 'America/Paramaribo',
      coords: [-55.2038, 5.8520]
    }
  ],
  Kuwait: [
    {
      id: 'kw-main',
      label: 'Kuwait',
      timezone: 'Asia/Kuwait',
      coords: [47.9774, 29.3759]
    }
  ],
  Bahrain: [
    {
      id: 'bh-main',
      label: 'Baréin',
      timezone: 'Asia/Bahrain',
      coords: [50.5860, 26.2285]
    }
  ],
  Oman: [
    {
      id: 'om-main',
      label: 'Omán',
      timezone: 'Asia/Muscat',
      coords: [58.4059, 23.5859]
    }
  ],
  Cameroon: [
    {
      id: 'cm-main',
      label: 'Camerún',
      timezone: 'Africa/Douala',
      coords: [9.7085, 4.0511]
    }
  ],
  Angola: [
    {
      id: 'ao-main',
      label: 'Angola',
      timezone: 'Africa/Luanda',
      coords: [13.2344, -8.8390]
    }
  ],
  Zambia: [
    {
      id: 'zm-main',
      label: 'Zambia',
      timezone: 'Africa/Lusaka',
      coords: [28.3228, -15.3875]
    }
  ],
  Rwanda: [
    {
      id: 'rw-main',
      label: 'Ruanda',
      timezone: 'Africa/Kigali',
      coords: [30.0619, -1.9441]
    }
  ],
  Syria: [
    {
      id: 'sy-main',
      label: 'Siria',
      timezone: 'Asia/Damascus',
      coords: [36.2765, 33.5138]
    }
  ],
  Yemen: [
    {
      id: 'ye-main',
      label: 'Yemen',
      timezone: 'Asia/Aden',
      coords: [45.0187, 12.7855]
    }
  ],
  Tajikistan: [
    {
      id: 'tj-main',
      label: 'Tayikistán',
      timezone: 'Asia/Dushanbe',
      coords: [68.7802, 38.5598]
    }
  ],
  Kyrgyzstan: [
    {
      id: 'kg-main',
      label: 'Kirguistán',
      timezone: 'Asia/Bishkek',
      coords: [74.5698, 42.8746]
    }
  ],
  Turkmenistan: [
    {
      id: 'tm-main',
      label: 'Turkmenistán',
      timezone: 'Asia/Ashgabat',
      coords: [58.3261, 37.9601]
    }
  ],
  'Vatican City': [
    {
      id: 'va-main',
      label: 'Ciudad del Vaticano',
      timezone: 'Europe/Rome',
      coords: [12.4534, 41.9029]
    }
  ],
  'San Marino': [
    {
      id: 'sm-main',
      label: 'San Marino',
      timezone: 'Europe/San_Marino',
      coords: [12.4578, 43.9424]
    }
  ],
  Liechtenstein: [
    {
      id: 'li-main',
      label: 'Liechtenstein',
      timezone: 'Europe/Vaduz',
      coords: [9.5209, 47.1410]
    }
  ],
  Vanuatu: [
    {
      id: 'vu-main',
      label: 'Vanuatu',
      timezone: 'Pacific/Efate',
      coords: [168.3273, -17.7333]
    }
  ],
  'Solomon Islands': [
    {
      id: 'sb-main',
      label: 'Islas Salomón',
      timezone: 'Pacific/Guadalcanal',
      coords: [160.1562, -9.4456]
    }
  ],
  Palau: [
    {
      id: 'pw-main',
      label: 'Palaos',
      timezone: 'Pacific/Palau',
      coords: [134.5825, 7.5150]
    }
  ],
  Mozambique: [
    {
      id: 'mz-main',
      label: 'Mozambique',
      timezone: 'Africa/Maputo',
      coords: [32.5892, -25.9692]
    }
  ],
  Malawi: [
    {
      id: 'mw-main',
      label: 'Malaui',
      timezone: 'Africa/Blantyre',
      coords: [35.0058, -15.7861]
    }
  ],
  Mali: [
    {
      id: 'ml-main',
      label: 'Malí',
      timezone: 'Africa/Bamako',
      coords: [-8.0029, 12.6392]
    }
  ],
  'North Korea': [
    {
      id: 'kp-main',
      label: 'Corea del Norte',
      timezone: 'Asia/Pyongyang',
      coords: [125.7625, 39.0392]
    }
  ],
  'Hong Kong': [
    {
      id: 'hk-main',
      label: 'Hong Kong',
      timezone: 'Asia/Hong_Kong',
      coords: [114.1694, 22.3193]
    }
  ],
  Macau: [
    {
      id: 'mo-main',
      label: 'Macao',
      timezone: 'Asia/Macau',
      coords: [113.5439, 22.1987]
    }
  ],
  Gibraltar: [
    {
      id: 'gi-main',
      label: 'Gibraltar',
      timezone: 'Europe/Gibraltar',
      coords: [-5.3536, 36.1408]
    }
  ],
  'Marshall Islands': [
    {
      id: 'mh-majuro',
      label: 'Islas Marshall (Majuro)',
      timezone: 'Pacific/Majuro',
      coords: [171.3800, 7.1068]
    },
    {
      id: 'mh-kwajalein',
      label: 'Islas Marshall (Kwajalein)',
      timezone: 'Pacific/Kwajalein',
      coords: [167.7333, 8.7167]
    }
  ],
  Micronesia: [
    {
      id: 'fm-pohnpei',
      label: 'Micronesia (Pohnpei)',
      timezone: 'Pacific/Pohnpei',
      coords: [158.1550, 6.9248]
    },
    {
      id: 'fm-chuuk',
      label: 'Micronesia (Chuuk)',
      timezone: 'Pacific/Chuuk',
      coords: [151.8466, 7.4467]
    },
    {
      id: 'fm-kosrae',
      label: 'Micronesia (Kosrae)',
      timezone: 'Pacific/Kosrae',
      coords: [162.9832, 5.3248]
    }
  ],
  Nauru: [
    {
      id: 'nr-main',
      label: 'Nauru',
      timezone: 'Pacific/Nauru',
      coords: [166.9315, -0.5228]
    }
  ],
  Tuvalu: [
    {
      id: 'tv-main',
      label: 'Tuvalu',
      timezone: 'Pacific/Funafuti',
      coords: [179.1940, -8.5241]
    }
  ],
  'Falkland Islands': [
    {
      id: 'fk-main',
      label: 'Islas Malvinas',
      timezone: 'Atlantic/Stanley',
      coords: [-57.8500, -51.7000]
    }
  ],
  'Cayman Islands': [
    {
      id: 'ky-main',
      label: 'Islas Caimán',
      timezone: 'America/Cayman',
      coords: [-81.2546, 19.3133]
    }
  ],
  'British Virgin Islands': [
    {
      id: 'vg-main',
      label: 'Islas Vírgenes Británicas',
      timezone: 'America/Tortola',
      coords: [-64.6230, 18.4207]
    }
  ],
  'US Virgin Islands': [
    {
      id: 'vi-main',
      label: 'Islas Vírgenes de los EE. UU.',
      timezone: 'America/St_Thomas',
      coords: [-64.8963, 18.3358]
    }
  ],
  Libya: [
    {
      id: 'ly-main',
      label: 'Libia',
      timezone: 'Africa/Tripoli',
      coords: [13.1801, 32.8852]
    }
  ],
  Somalia: [
    {
      id: 'so-main',
      label: 'Somalia',
      timezone: 'Africa/Mogadishu',
      coords: [45.3419, 2.0469]
    }
  ],
  Djibouti: [
    {
      id: 'dj-main',
      label: 'Yibuti',
      timezone: 'Africa/Djibouti',
      coords: [43.1456, 11.8251]
    }
  ],
  Eritrea: [
    {
      id: 'er-main',
      label: 'Eritrea',
      timezone: 'Africa/Asmara',
      coords: [38.9296, 15.3229]
    }
  ],
  Gabon: [
    {
      id: 'ga-main',
      label: 'Gabón',
      timezone: 'Africa/Libreville',
      coords: [9.4537, 0.4162]
    }
  ],
  'Republic of the Congo': [
    {
      id: 'cg-main',
      label: 'República del Congo',
      timezone: 'Africa/Brazzaville',
      coords: [15.2832, -4.2634]
    }
  ],
  'Democratic Republic of the Congo': [
    {
      id: 'cd-west',
      label: 'RDC (Kinshasa)',
      timezone: 'Africa/Kinshasa',
      coords: [15.2663, -4.4419]
    },
    {
      id: 'cd-east',
      label: 'RDC (Lubumbashi)',
      timezone: 'Africa/Lubumbashi',
      coords: [27.4794, -11.6609]
    }
  ],
  'Equatorial Guinea': [
    {
      id: 'gq-main',
      label: 'Guinea Ecuatorial',
      timezone: 'Africa/Malabo',
      coords: [8.7371, 3.7504]
    }
  ],
  Palestine: [
    {
      id: 'ps-gaza',
      label: 'Palestina (Gaza)',
      timezone: 'Asia/Gaza',
      coords: [34.4668, 31.5016]
    },
    {
      id: 'ps-hebron',
      label: 'Palestina (Hebrón)',
      timezone: 'Asia/Hebron',
      coords: [35.0998, 31.5326]
    }
  ],
  'Turks and Caicos Islands': [
    {
      id: 'tc-main',
      label: 'Islas Turcas y Caicos',
      timezone: 'America/Grand_Turk',
      coords: [-71.1419, 21.4675]
    }
  ],
  'Cook Islands': [
    {
      id: 'ck-main',
      label: 'Islas Cook',
      timezone: 'Pacific/Rarotonga',
      coords: [-159.7762, -21.2079]
    }
  ],
  Niue: [
    {
      id: 'nu-main',
      label: 'Niue',
      timezone: 'Pacific/Niue',
      coords: [-169.9187, -19.0544]
    }
  ],
  'Sint Maarten': [
    {
      id: 'sx-main',
      label: 'Sint Maarten',
      timezone: 'America/Lower_Princes',
      coords: [-63.0548, 18.0425]
    }
  ],
  France_Overseas: [
    {
      id: 'fr-reunion',
      label: 'Reunión',
      timezone: 'Indian/Reunion',
      coords: [55.5364, -21.1151]
    },
    {
      id: 'fr-guadeloupe',
      label: 'Guadalupe',
      timezone: 'America/Guadeloupe',
      coords: [-61.551, 16.265]
    },
    {
      id: 'fr-martinique',
      label: 'Martinica',
      timezone: 'America/Martinique',
      coords: [-61.0242, 14.6415]
    },
    {
      id: 'fr-guyane',
      label: 'Guayana Francesa',
      timezone: 'America/Cayenne',
      coords: [-52.326, 4.9224]
    },
    {
      id: 'fr-tahiti',
      label: 'Polinesia Francesa (Tahití)',
      timezone: 'Pacific/Tahiti',
      coords: [-149.4068, -17.6509]
    },
    {
      id: 'fr-noumea',
      label: 'Nueva Caledonia (Numea)',
      timezone: 'Pacific/Noumea',
      coords: [166.4572, -22.2758]
    }
  ],
  // Puedes extender esta tabla con más países y zonas horarias.

  // Ejemplos de zonas horarias faltantes:
  'Western Sahara': [
    {
      id: 'eh-main',
      label: 'Sahara Occidental',
      timezone: 'Africa/El_Aaiun',
      coords: [-13.2032, 27.1536]
    }
  ],
  Guadeloupe: [
    {
      id: 'gp-main',
      label: 'Guadalupe',
      timezone: 'America/Guadeloupe',
      coords: [-61.551, 16.265]
    }
  ],
  Martinique: [
    {
      id: 'mq-main',
      label: 'Martinica',
      timezone: 'America/Martinique',
      coords: [-61.0242, 14.6415]
    }
  ],
  Réunion: [
    {
      id: 're-main',
      label: 'Reunión',
      timezone: 'Indian/Reunion',
      coords: [55.5364, -21.1151]
    }
  ],
  Mayotte: [
    {
      id: 'yt-main',
      label: 'Mayotte',
      timezone: 'Indian/Mayotte',
      coords: [45.1662, -12.8275]
    }
  ],
  Guernsey: [
    {
      id: 'gg-main',
      label: 'Guernsey',
      timezone: 'Europe/Guernsey',
      coords: [-2.5895, 49.4657]
    }
  ],
  Jersey: [
    {
      id: 'je-main',
      label: 'Jersey',
      timezone: 'Europe/Jersey',
      coords: [-2.1312, 49.2144]
    }
  ],
  'Isle_of_Man': [
    {
      id: 'im-main',
      label: 'Isla de Man',
      timezone: 'Europe/Isle_of_Man',
      coords: [-4.5481, 54.2361]
    }
  ],
  'Faroe_Islands': [
    {
      id: 'fo-main',
      label: 'Islas Feroe',
      timezone: 'Atlantic/Faroe',
      coords: [-6.9118, 62.0079]
    }
  ],
  Svalbard: [
    {
      id: 'sj-main',
      label: 'Svalbard',
      timezone: 'Arctic/Longyearbyen',
      coords: [15.6333, 78.2167]
    }
  ],
  'Saint Barthelemy': [
    {
      id: 'bl-main',
      label: 'San Bartolomé',
      timezone: 'America/St_Barthelemy',
      coords: [-62.8333, 17.9]
    }
  ],
  'Saint Martin': [
    {
      id: 'mf-main',
      label: 'San Martín',
      timezone: 'America/Marigot',
      coords: [-63.0822, 18.0708]
    }
  ],
  'Wallis and Futuna': [
    {
      id: 'wf-main',
      label: 'Wallis y Futuna',
      timezone: 'Pacific/Wallis',
      coords: [-176.2, -13.3]
    }
  ],
  'French Guiana': [
    {
      id: 'gf-main',
      label: 'Guayana Francesa',
      timezone: 'America/Cayenne',
      coords: [-52.326, 4.9224]
    }
  ],
  'French Polynesia': [
    {
      id: 'pf-main',
      label: 'Polinesia Francesa',
      timezone: 'Pacific/Tahiti',
      coords: [-149.4068, -17.6509]
    }
  ],
  'New Caledonia': [
    {
      id: 'nc-main',
      label: 'Nueva Caledonia',
      timezone: 'Pacific/Noumea',
      coords: [166.4572, -22.2758]
    }
  ],
  'South Sudan': [
    {
      id: 'ss-main',
      label: 'Sudán del Sur',
      timezone: 'Africa/Juba',
      coords: [31.582, 4.85]
    }
  ],
  Eswatini: [
    {
      id: 'sz-main',
      label: 'Esuatini',
      timezone: 'Africa/Mbabane',
      coords: [31.1333, -26.3167]
    }
  ],
  Lesotho: [
    {
      id: 'ls-main',
      label: 'Lesoto',
      timezone: 'Africa/Maseru',
      coords: [27.4833, -29.3167]
    }
  ]
  ,
  'Pitcairn Islands': [
    {
      id: 'pn-main',
      label: 'Islas Pitcairn',
      timezone: 'Pacific/Pitcairn',
      coords: [-130.1015, -25.0667]
    }
  ],
  'Saint Helena': [
    {
      id: 'sh-main',
      label: 'Santa Elena',
      timezone: 'Atlantic/St_Helena',
      coords: [-5.7089, -15.965]
    }
  ],
  'Ascension Island': [
    {
      id: 'ac-main',
      label: 'Isla Ascensión',
      timezone: 'Atlantic/St_Helena',
      coords: [-14.3533, -7.9467]
    }
  ],
  'Tristan da Cunha': [
    {
      id: 'ta-main',
      label: 'Tristán da Cunha',
      timezone: 'Atlantic/St_Helena',
      coords: [-12.3, -37.1052]
    }
  ],
  'Norfolk Island': [
    {
      id: 'nf-main',
      label: 'Isla Norfolk',
      timezone: 'Pacific/Norfolk',
      coords: [167.9547, -29.0408]
    }
  ],
  'Christmas Island': [
    {
      id: 'cx-main',
      label: 'Isla Christmas',
      timezone: 'Indian/Christmas',
      coords: [105.6904, -10.4475]
    }
  ],
  'Cocos (Keeling) Islands': [
    {
      id: 'cc-main',
      label: 'Islas Cocos',
      timezone: 'Indian/Cocos',
      coords: [96.8294, -12.1642]
    }
  ],
  'Heard and McDonald Islands': [
    {
      id: 'hm-main',
      label: 'Islas Heard y McDonald',
      timezone: 'Indian/Kerguelen',
      coords: [73.5042, -53.0818]
    }
  ],
  'South Georgia and the South Sandwich Islands': [
    {
      id: 'gs-main',
      label: 'Islas Georgias del Sur y Sandwich del Sur',
      timezone: 'Atlantic/South_Georgia',
      coords: [-36.5872, -54.4296]
    }
  ],
  'Bouvet Island': [
    {
      id: 'bv-main',
      label: 'Isla Bouvet',
      timezone: 'UTC',
      coords: [3.3464, -54.4208]
    }
  ],
  'Saint Pierre and Miquelon': [
    {
      id: 'pm-main',
      label: 'San Pedro y Miquelón',
      timezone: 'America/Miquelon',
      coords: [-56.1964, 46.8854]
    }
  ],
  'South Ossetia': [
    {
      id: 'os-main',
      label: 'Osetia del Sur',
      timezone: 'Asia/Tbilisi',
      coords: [43.9632, 42.2333]
    }
  ],
  Abkhazia: [
    {
      id: 'ab-main',
      label: 'Abjasia',
      timezone: 'Asia/Tbilisi',
      coords: [41.0151, 43.0015]
    }
  ],
  'Saint Martin (French part)': [
    {
      id: 'mf-fr',
      label: 'San Martín (Francia)',
      timezone: 'America/Marigot',
      coords: [-63.0822, 18.0708]
    }
  ],
  'Sint Eustatius': [
    {
      id: 'bq-se',
      label: 'San Eustaquio',
      timezone: 'America/Kralendijk',
      coords: [-62.9736, 17.4894]
    }
  ],
  'Saba': [
    {
      id: 'bq-sa',
      label: 'Saba',
      timezone: 'America/Kralendijk',
      coords: [-63.2295, 17.6355]
    }
  ],
  'Bonaire': [
    {
      id: 'bq-bo',
      label: 'Bonaire',
      timezone: 'America/Kralendijk',
      coords: [-68.2575, 12.1784]
    }
  ],
  'Saint Barthélemy': [
    {
      id: 'bl-main',
      label: 'San Bartolomé',
      timezone: 'America/St_Barthelemy',
      coords: [-62.8333, 17.9]
    }
  ],
  'South Pole': [
    {
      id: 'aq-pole',
      label: 'Polo Sur',
      timezone: 'Antarctica/South_Pole',
      coords: [0, -90]
    }
  ],
  'Macquarie Island': [
    {
      id: 'au-macquarie',
      label: 'Isla Macquarie',
      timezone: 'Antarctica/Macquarie',
      coords: [158.95, -54.5]
    }
  ]
};

/** @type {Record<string, string>} */
const countryNameAliases = {
  'Antigua and Barb.': 'Antigua and Barbuda',
  'Bosnia and Herz.': 'Bosnia and Herzegovina',
  'British Virgin Is.': 'British Virgin Islands',
  'Cabo Verde': 'Cape Verde',
  'Cayman Is.': 'Cayman Islands',
  Congo: 'Republic of the Congo',
  'Cook Is.': 'Cook Islands',
  'Curaçao': 'Curacao',
  Czechia: 'Czech Republic',
  'Dem. Rep. Congo': 'Democratic Republic of the Congo',
  'Dominican Rep.': 'Dominican Republic',
  'Eq. Guinea': 'Equatorial Guinea',
  'Faeroe Is.': 'Faroe_Islands',
  'Falkland Is.': 'Falkland Islands',
  'Fr. Polynesia': 'French Polynesia',
  'Heard I. and McDonald Is.': 'Heard and McDonald Islands',
  'Isle of Man': 'Isle_of_Man',
  Macao: 'Macau',
  Macedonia: 'North Macedonia',
  'Marshall Is.': 'Marshall Islands',
  'Pitcairn Is.': 'Pitcairn Islands',
  'S. Geo. and the Is.': 'South Georgia and the South Sandwich Islands',
  'S. Sudan': 'South Sudan',
  'Solomon Is.': 'Solomon Islands',
  'St-Barthélemy': 'Saint Barthélemy',
  'St-Martin': 'Saint Martin',
  'St. Kitts and Nevis': 'Saint Kitts and Nevis',
  'St. Pierre and Miquelon': 'Saint Pierre and Miquelon',
  'St. Vin. and Gren.': 'Saint Vincent and the Grenadines',
  'Turks and Caicos Is.': 'Turks and Caicos Islands',
  'U.S. Virgin Is.': 'US Virgin Islands',
  Vatican: 'Vatican City',
  'W. Sahara': 'Western Sahara',
  'Wallis and Futuna Is.': 'Wallis and Futuna',
  eSwatini: 'Eswatini'
};

/**
 * @param {string} countryName
 */
export function normalizeCountryName(countryName) {
  return countryNameAliases[countryName] ?? countryName;
}

/**
 * @param {string} countryName
 * @returns {CountryTimezone[]}
 */
export function getCountryTimezones(countryName) {
  const normalizedName = normalizeCountryName(countryName);
  const entries = countryTimezones[normalizedName];

  if (!entries) {
    return [];
  }

  return entries.map((entry) => ({
    id: entry.id,
    label: entry.label,
    timezone: entry.timezone,
    coords: entry.coords
  }));
}

/**
 * @param {string} timezone
 */
export function findTimezoneData(timezone) {
  for (const [country, zones] of Object.entries(countryTimezones)) {
    const match = zones.find((entry) => entry.timezone === timezone);
    if (match) {
      return { country, label: match.label };
    }
  }
  return null;
}