export const Color = {
  // colorMapsCodeに対応しているコード
  // ColorMaps: [
  //   '', 'jet', 'hot','cool','spring','summer','autumn','winter','bone',
  //   'copper','greys','YIGnBu','greens','YIOrRd','bluered','RdBu',
  //   'rainbow','portland','blackbody','earth','electric',
  //   'viridis', 'inferno', 'magma', 'plasma', 'warm', 'cool',
  //   'bathymetry', 'cdom', 'chlorophyll', 'density', 'freesurface-blue', 'freesurface-red',
  //   'oxygen', 'par', 'phase', 'salinity', 'temperature', 'turbidity',
  //   'velocity-blue', 'velocity-green',
  //   // 'hsv', 'picnic', 'rainbow-soft',
  // ],
  // ComicShareのHEXコード
  ComicShare: [
    "#CD5C5C", "#F08080", "#FF0000", "#DC143C", "#B22222", "#8B0000", "#FF7F50", "#FF6347",
    "#FF4500", "#FFA500", "#FFD700", "#FFFF00", "#FFC0CB", "#FF69B4", "#FF1493", "#FF00FF",
    "#FF00FF", "#800080", "#2E8B57", "#228B22", "#008000", "#006400", "#6B8E23", "#808000",
    "#00BFFF", "#6495ED", "#4169E1", "#0000FF", "#00008B", "#191970", "#DAA520", "#B8860B",
    "#D2691E", "#8B4513", "#A52A2A", "#800000", "#FFFFFF", "#FFFAFA", "#DCDCDC", "#D3D3D3",
    "#C0C0C0", "#A9A9A9", "#808080", "#696969", "#778899", "#708090", "#2F4F4F", "#000000",
  ],

  ComicShareColors: {
    Default: { // ComicShareのDefault HEXコード
      text: "デフォルト",
      class: "default",
      hex: [
        "#000000",
        "#191970", "#191970", "#191970", "#ffa500",
        "#ffa500", "#ffa500", "#ffffff", "#ffffff",
        // "#800080", "#ff6347", "#ff69b4", "#ffa500",
        // "#ff69b4", "#ffd700", "#ffc0cb", "#dcdcdc",
        "#ffffff",
      ],
    },
    Sample: [
      // {
      //   text: "popular 00 *recommend",
      //   id: "sample-color-00",
      //   category: 'comic',
      //   hex: [
      //     "#000000", "#800080", "#ff6347", "#ff69b4", "#ffa500",
      //     "#ff69b4", "#ffd700", "#ffc0cb", "#dcdcdc", "#ffffff",
      //   ],
      // },
      {
        text: "popular 01 *recommend",
        id: "sample-color-01",
        category: 'comic',
        hex: [
          "#000000", "#800080", "#ff6347", "#ff69b4", "#ffa500",
          "#ff69b4", "#ffd700", "#ffc0cb", "#dcdcdc", "#ffffff",
          // "#000000", "#191970", "#ff1493", "#ff69b4", "#ffa500",
          // "#ff69b4", "#ffd700", "#ffc0cb", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "popular 02 *recommend",
        id: "sample-color-03",
        category: 'comic',
        hex: [
          "#000000", "#2f4f4f", "#708090", "#cd5c5c", "#ff69b4",
          "#ff69b4", "#ffc0cb", "#ffc0cb", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "popular 03 *recommend",
        id: "sample-color-04",
        category: 'comic',
        hex: [
          "#000000", "#ff6347", "#ff69b4", "#ffa500", "#ff69b4",
          "#ffc0cb", "#ffd700", "#ffc0cb", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "pale",
        id: "sample-color-02",
        category: 'comic',
        hex: [
          "#8b4513", "#2f4f4f", "#708090", "#808080", "#c0c0c0",
          "#ffc0cb", "#ffc0cb", "#ffc0cb", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "pale and dark",
        id: "sample-color-05",
        category: 'comic',
        hex: [
          "#000000", "#a52a2a", "#a52a2a", "#cd5c5c", "#f08080",
          "#ff69b4", "#ffc0cb", "#ffd700", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "dark",
        id: "sample-color-06",
        category: 'comic',
        hex: [
          "#000000", "#ff1493", "#8b0000", "#ff6347", "#ff69b4",
          "#ffc0cb", "#ffc0cb", "#ffd700", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "vary dark",
        id: "sample-color-07",
        category: 'comic',
        hex: [
          "#000000", "#ff69b4", "#ffa500", "#ffc0cb", "#ffc0cb",
          "#ffc0cb", "#ffd700", "#dcdcdc", "#ffffff", "#ffffff",
        ],
      },

      {
        text: "letter 01",
        id: "sample-color-08",
        category: 'comic',
        hex: [
          "#00008b", "#800080", "#ff1493", "#ff1493", "#ffa500",
          "#ff69b4", "#ffa500", "#ffc0cb", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "letter 02",
        id: "sample-color-12",
        category: 'comic',
        hex: [
          "#000000", "#a52a2a", "#a52a2a", "#cd5c5c", "#f08080",
          "#ff69b4", "#6495ed", "#ffff00", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "tropical",
        id: "sample-color-13",
        category: 'comic',
        hex: [
          "#000000", "#800080", "#ff1493", "#ffc0cb", "#6b8e23",
          "#6495ed", "#00bfff", "#ffd700", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "samba",
        id: "sample-color-14",
        category: 'comic',
        hex: [
          "#000000", "#800080", "#ff0000", "#ff1493", "#ff6347",
          "#2e8b57", "#00bfff", "#ffd700", "#ffff00", "#ffffff",
        ],
      },

      {
        text: "pink",
        id: "sample-color-10",
        category: 'comic',
        hex: [
          "#000000", "#8b0000", "#b22222", "#dc143c", "#cd5c5c",
          "#f08080", "#ffc0cb", "#ffc0cb", "#dcdcdc", "#ffffff",
        ],
      },
      {
        text: "blue",
        id: "sample-color-11",
        category: 'comic',
        hex: [
          "#000000", "#191970", "#00008b", "#0000ff", "#4169e1",
          "#4169e1", "#6495ed", "#6495ed", "#dcdcdc", "#ffffff",
        ],
      },

      {
        text: "pseudo 2color",
        id: "sample-color-09",
        category: 'illustration',
        hex: [
          "#0000ff", "#4169e1", "#6495ed", "#ff69b4", "#ffc0cb",
          "#ffc0cb", "#ffc0cb", "#dcdcdc", "#ffffff", "#ffffff",
        ],
      },

      // {
      //   text: "2tone red (no white)",
      //   id: "sample-color-30",
      //   category: 'illustration',
      //   hex: [
      //     "#000000", "#000000", "#b22222", "#b22222", "#ff0000",
      //     "#cd5c5c", "#f08080", "#ffc0cb", "#ffc0cb", "#ffc0cb",
      //   ],
      // },
      // {
      //   text: "2tone peach (no white)",
      //   id: "sample-color-31",
      //   category: 'illustration',
      //   hex: [
      //     "#000000", "#000000", "#dc143c", "#dc143c", "#cd5c5c",
      //     "#cd5c5c", "#f08080", "#ffc0cb", "#ffc0cb", "#ffc0cb",
      //   ],
      // },
      // {
      //   text: "2tone orange (no white)",
      //   id: "sample-color-34",
      //   category: 'illustration',
      //   hex: [
      //     "#000000", "#000000", "#ff4500", "#ff4500", "#ff6347",
      //     "#ffa500", "#ffa500", "#ffd700", "#ffd700", "#ffd700",
      //   ],
      // },
      // {
      //   text: "2tone brown (no white)",
      //   id: "sample-color-35",
      //   category: 'illustration',
      //   hex: [
      //     "#000000", "#000000", "#800000", "#800000", "#d2691e",
      //     "#ffa500", "#ffa500", "#ffd700", "#ffd700", "#ffd700",
      //   ],
      // },
      // {
      //   text: "2tone green (no white)",
      //   id: "sample-color-33",
      //   category: 'illustration',
      //   hex: [
      //     "#000000", "#000000", "#006400", "#006400", "#008000",
      //     "#6b8e23", "#6b8e23", "#ffd700", "#ffd700", "#ffd700",
      //   ],
      // },
      // {
      //   text: "2tone blue (no white)",
      //   id: "sample-color-32",
      //   category: 'illustration',
      //   hex: [
      //     "#000000", "#000000", "#191970", "#191970", "#0000ff",
      //     "#4169e1", "#4169e1", "#6495ed", "#6495ed", "#6495ed",
      //   ],
      // },
      // {
      //   text: "2tone slate (no white)",
      //   id: "sample-color-36",
      //   category: 'illustration',
      //   hex: [
      //     "#000000", "#000000", "#2f4f4f", "#2f4f4f", "#708090",
      //     "#708090", "#a9a9a9", "#d3d3d3", "#d3d3d3", "#d3d3d3",
      //   ],
      // },

      // {
      //   text: "if possible #1 *Out of color range",
      //   id: "sample-color-97",
      //   category: 'comic',
      //   hex: [
      //     "#000000", "#791a3d", "#b92d5d", "#e63b7a", "#ff8c82",
      //     "#ff8c82", "#ffc5ab", "#f9d3e0", "#fff2d5", "#ffffff",
      //   ],
      // },
      // {
      //   text: "if possible #2 *Out of color range",
      //   id: "sample-color-98",
      //   category: 'comic',
      //   hex: [
      //     "#000000", "#5c5c5c", "#e63b7a", "#ff6250", "#ff8c82",
      //     "#ff8c82", "#ffc5ab", "#f9d3e0", "#fff2d5", "#ffffff",
      //   ],
      // },
      // {
      //   text: "if possible #3 *Out of color range",
      //   id: "sample-color-99",
      //   category: 'comic',
      //   hex: [
      //     "#371a94", "#4169e1", "#6495ed", "#b18cfe", "#e292fe",
      //     "#ffc0cb", "#f9d3e0", "#ffdbd8", "#fff2d5", "#ffffff",
      //   ],
      // },
    ],
  },
};