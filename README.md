# The Salt Ritual

An editorial botanical design inspired by your orchid references: olive-black, warm ivory, restrained gold and fine serif typography. This revision replaces the illustrated jars, shell badge and playful wording.

## Open the website

Unzip this download and double-click `index.html`. Keep the assets folder and JavaScript/CSS files alongside it. You do not need to install anything.

## Shopping journey

1. Choose Small (£8, single use), Medium (£20), or Large (£30).
2. Choose scrub base, base oil, scent, skin booster and botanicals, one screen at a time.
3. One botanical is included. A second different botanical is £2 extra **per jar**. Customers can choose no botanical.
4. Review the blend and add it to the basket.
5. Change quantities, edit or remove blends, or download the saved choices.

Jar weights are intentionally omitted because they are undecided. Payments are explicitly unavailable until Stripe is set up. No order is submitted by this version.

## Ingredient menu

**Bases:** fine sea salt, pink Himalayan salt, Epsom salt, fine sugar. No brown sugar.

**Base oils:** fractionated coconut, sweet almond, jojoba, argan.

**Scents:** lavender, pink grapefruit, coconut, ylang ylang, vanilla, orange, oud, amber.

**Skin boosters:** vitamin E, squalane, rosehip oil, avocado oil, or no booster.

**Botanicals:** rose petals, lavender flowers, calendula petals, chamomile, finely ground oats, cosmetic shimmer, or no botanicals. This combines the previous botanical and finishing categories under your chosen label.

The menu is a selection experience; final product ingredients and fragrance details should match the actual products when ordering opens.

## GitHub Pages

1. Create a GitHub repository such as `the-salt-ritual`.
2. Upload the contents of this ZIP, not the ZIP itself. Place `index.html` at the top level, with the assets folder next to it.
3. Commit the files to `main`.
4. Go to **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then `main` and `/(root)`. Save.
5. GitHub will show the website link in Pages settings after deployment completes.

Official setup instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Stripe later

Stripe is **not connected or implemented** in this version. The checkout button is disabled and says “coming soon”. The basket is stored only in the customer's browser and can be downloaded as text.

When you have a Stripe account, we can add a hosted checkout service to turn the customised basket into a payment session and an order. GitHub Pages hosts static files; secret Stripe credentials and order handling belong in a separate server service, never in these public files. Before enabling payments, finalise jar quantities, delivery options, product information and order fulfilment details.

## Editing

- `index.html`: homepage and website text.
- `styles.css`: colours and responsive layout.
- `model.js`: ingredient menu, size prices and validated basket calculations. Prices are integer pence (800, 2000, 3000; extra botanical 200).
- `script.js`: step-by-step builder, basket, browser storage and downloads.
- `guide.js`: five-tab ingredient library with two concise benefit bullets per option, category artwork, and notes on scent, texture and cosmetic roles.
- `assets/`: local botanical artwork and monogram; no external image or font requests. The orchid hero was created with built-in image generation as original website artwork. It is visual brand imagery, not a photograph of the finished product.
- `tests/model.test.cjs`: run `node tests/model.test.cjs` to check pricing and saved-basket validation.

Browser storage may be unavailable in private browsing or local-file contexts; the basket still works for the current session and can be downloaded. There is no analytics, customer account, address collection or live payment processing.

## Image direction

Asset: `assets/orchid-editorial.png`. Generated with the built-in image-generation tool. Brief: original dramatic macro orchid photography, cream and burgundy petals, olive leaves, dark negative space for the headline, old-master lighting, luxury botanical editorial mood; no text, products, sparkles or cartoon motifs.

## Ingredient guide sources

The guide separates cosmetic function from subjective fragrance profiles. It does not make therapeutic claims. Sensory descriptions are editorial guidance, not tested claims about the final formulation.

- Cosmetic Ingredient Review, plant-derived fatty acid oils (emollient / skin-conditioning roles): https://www.cir-safety.org/sites/default/files/118_final_oils_web.pdf
- Cosmetic Ingredient Review, jojoba oil / wax: https://www.cir-safety.org/ingredient/simmondsia-chinensis-jojoba-seed-oil
- PubChem, squalane (emollient / skin conditioning): https://pubchem.ncbi.nlm.nih.gov/compound/squalane
- PubChem, tocopherols (antioxidant / skin conditioning): https://pubchem.ncbi.nlm.nih.gov/compound/14986
- FDA, fragrance and aromatherapy claim distinctions: https://www.fda.gov/cosmetics/cosmetic-products/aromatherapy

## Category artwork

Four generated editorial still lifes illustrate salt, oils, fragrance notes and dried botanicals. These are illustrative category artwork, not photographs of finished products. The guide image and builder background change by ingredient stage; boosters use a closer oil composition. Optimised WebP assets total under 500 KB.
