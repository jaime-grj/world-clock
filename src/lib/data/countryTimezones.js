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
  'Saint Pierre and Miquelon': [
    {
      id: 'pm-main',
      label: 'San Pedro y Miquelón',
      timezone: 'America/Miquelon',
      coords: [-56.1964, 46.8854]
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
  ]
  // Puedes extender esta tabla con más países y zonas horarias.
};

/**
 * @param {string} countryName
 * @returns {CountryTimezone[]}
 */
export function getCountryTimezones(countryName) {
  const entries = countryTimezones[countryName];

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