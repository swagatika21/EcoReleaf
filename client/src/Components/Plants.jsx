/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
const Plants=[
  {
   "name": "Gerbera daisy (Gerbera jamesonii)",
   "Rating": 5,
   "Sunlight": "Full Sun",
   "water": "Moderate (water when soil feels dry)",
   "Mature Size": "Up to 18 inches tall",
   "Id": 1
  },
  {
   "name": "English ivy (Hedera heix)",
   "Rating": "NR (Needs Research)",
   "Sunlight": "Climbing vine tolerates various light conditions",
   "water": "Moderate to High (water)",
   "Mature Size": "Up to 80 ft long vines",
   "Id": 2
  },
  {
   "name": "Marginata (Dracaena marginata)",
   "Rating": 5,
   "Sunlight": "Bright Indirect Light",
   "water": "Moderate (water when soil feels dry)",
   "Mature Size": "Up to 8 ft tall",
   "Id": 3
  },
  {
   "name": "Peace lily (Spathiphyllum \"Mauna Loa\")",
   "Rating": 5,
   "Sunlight": "Indirect Light (tolerates low light)",
   "water": "Moderate (water when soil feels slightly dry)",
   "Mature Size": "Up to 3 ft tall",
   "Id": 4
  },
  {
   "name": "Mother-in-law's tongue (Sansevieria laurentii)",
   "Rating": 4,
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Low (water)",
   "Mature Size": "Up to 8 ft tall",
   "Id": 5
  },
  {
   "name": "Warneckei (Dracaena deremensis \"\")",
   "Rating": "3 (Likely same as Janet Craig)",
   "Sunlight": "Bright Indirect Light",
   "water": "Moderate (water when top inch of soil dries)",
   "Mature Size": "Up to 10 ft tall",
   "Id": 6
  },
  {
   "name": "Bamboo palm (Chamaedorea seifritzii)",
   "Rating": 5,
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Moderate (water when top inch of soil dries)",
   "Mature Size": "Up to 8 ft tall indoors",
   "Id": 7
  },
  {
   "name": "Mass cane (Dracaena massangeana)",
   "Rating": 2,
   "Sunlight": "Bright Indirect Light",
   "water": "Moderate (water)",
   "Mature Size": "Up to 8 ft tall",
   "Id": 8
  },
  {
   "name": "Janet Craig (Dracaena deremensis)",
   "Rating": 3,
   "Sunlight": "Bright Indirect Light",
   "water": "Moderate (water when top inch of soil dries)",
   "Mature Size": "Up to 10 ft tall",
   "Id": 9
  },
  {
   "name": "Banana (Musa oriana)",
   "Rating": 2,
   "Sunlight": "Full Sun to Part Shade",
   "water": "High (water)",
   "Mature Size": "Up to 6-8 ft tall indoors",
   "Id": 10
  },
  {
   "name": "Heart leaf philodendron (Philodendron oxycardium)",
   "Rating": 3,
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Varies depending on species (water)",
   "Mature Size": "Varies depending on species (2-6 ft)",
   "Id": 11
  },
  {
   "name": "Elephant ear philodendron (Philodendron domesticum)",
   "Rating": 2,
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Moderate (water)",
   "Mature Size": "Up to 4-6 ft tall",
   "Id": 12
  },
  {
   "name": "Green spider plant (Chlorophytum elatum)",
   "Rating": 2,
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Low to Moderate (water)",
   "Mature Size": "Up to 2 ft tall with cascading babies",
   "Id": 13
  },
  {
   "name": "Golden pothos (Scindapsus aureus)",
   "Rating": 1,
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Low (water)",
   "Mature Size": "Up to 6 ft long vines",
   "Id": 14
  },
  {
   "name": "Lacy tree philodendron (Philodendron selloum)",
   "Rating": 3,
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Moderate (water)",
   "Mature Size": "Up to 6-8 ft tall",
   "Id": 15
  },
  {
   "name": "Chinese evergreen (Aglonema modestum)",
   "Rating": 1,
   "Sunlight": "Low Light",
   "water": "Moderate (water)",
   "Mature Size": "Up to 2-3 ft tall",
   "Id": 16
  },
  {
   "name": "Aloe vera",
   "Rating": 1,
   "Sunlight": "Full Sun to Part Shade",
   "water": "Low (water)",
   "Mature Size": "Up to 2 ft tall",
   "Id": 17
  },
  {
   "name": "Basil",
   "Rating": 3,
   "Sunlight": "Full Sun",
   "water": "Moderate (water)",
   "Mature Size": "Up to 2 ft tall",
   "Id": 18
  },
  {
   "name": "Daisy",
   "Rating": 2,
   "Sunlight": "Full Sun to Part Shade",
   "water": "Moderate (water)",
   "Mature Size": "Up to 1 ft tall",
   "Id": 19
  },
  {
   "name": "Mint",
   "Rating": 3,
   "Sunlight": "Full Sun to Part Shade",
   "water": "High (water)",
   "Mature Size": "Up to 2 ft tall (can be invasive)",
   "Id": 20
  },
  {
   "name": "Marigold",
   "Rating": 2,
   "Sunlight": "Full Sun",
   "water": "Moderate (water)",
   "Mature Size": "Up to 3 ft tall",
   "Id": 21
  },
  {
   "name": "Snake Plant",
   "Rating": 4,
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Low (water)",
   "Mature Size": "Up to 8 ft tall",
   "Id": 22
  },
  {
   "name": "Lemon Verbena",
   "Rating": "NR (Not Rated)",
   "Sunlight": "Full Sun",
   "water": "Moderate (water)",
   "Mature Size": "Up to 7 ft tall",
   "Id": 23
  },
  {
   "name": "Money Plant",
   "Rating": 2,
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Low (water)",
   "Mature Size": "Up to 6 ft long vines",
   "Id": 24
  },
  {
   "name": "Philodendron",
   "Rating": "3 (average rating based on limited data)",
   "Sunlight": "Bright Indirect Light (tolerates low light)",
   "water": "Moderate (water)",
   "Mature Size": "Varies depending on species (2 ft - 10 ft)",
   "Id": 25
  },
  {
   "name": "Orchid",
   "Rating": 1,
   "Sunlight": "Indirect Light (bright but not direct)",
   "water": "Moderate (water when roots turn silver)",
   "Mature Size": "Varies depending on species (1 ft - 3 ft)",
   "Id": 26
  },
  {
   "name": "Rubber Plant",
   "Rating": 3,
   "Sunlight": "Bright Indirect Light",
   "Id": 27
  }
 ]