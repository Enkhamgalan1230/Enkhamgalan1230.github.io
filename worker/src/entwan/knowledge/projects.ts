import type { KnowledgeChunk } from "./types";

export const projects: KnowledgeChunk[] = [
  {
    id: "project-accountancy-001",
    category: "project",
    subject: "accountancy-v2",
    topic: "overview",
    text: "Accountancy-v2 is an accounting-focused financial data review and reconciliation system developed by Enkh as a work and internal project. It is designed as a field-specific subsystem that could eventually become part of a wider SaaS product and is intended for real accounting workflows.",
    importance: "high",
  },

  {
    id: "project-accountancy-002",
    category: "project",
    subject: "accountancy-v2",
    topic: "problem",
    text: "The project addresses a common accounting problem: finance professionals often receive large spreadsheets from different financial sources and must manually review them for unusual transactions, missing expected payments, duplicate-looking activity, weak descriptions, behavioural changes and unreconciled items. This process is slow, repetitive and easy to miss things in.",
    importance: "high",
  },

  {
    id: "project-accountancy-003",
    category: "project",
    subject: "accountancy-v2",
    topic: "users",
    text: "The main intended users of Accountancy-v2 are accountants and finance professionals who review transaction data, bank statements and related financial records. Internally, the project was also shaped around feedback from management and senior colleagues who wanted clear demonstrations of anomaly detection, behavioural patterns and reconciliation.",
    importance: "high",
  },

  {
    id: "project-accountancy-004",
    category: "project",
    subject: "accountancy-v2",
    topic: "what-enkh-built",
    text: "Enkh built the core system and workflow for Accountancy-v2, including financial file preparation and normalisation, dataset classification, column identification, deterministic anomaly checks, machine-learning anomaly checks, recurring-pattern detection, grouped behavioural analysis, reconciliation logic, plain-English review explanations, anomaly visualisations, the Streamlit review interface and synthetic demo datasets.",
    importance: "high",
  },

  {
    id: "project-accountancy-005",
    category: "project",
    subject: "accountancy-v2",
    topic: "pipeline",
    text: "The Accountancy-v2 pipeline follows the stages: Ingestion, Preparation, Classification, Column Identification, Normalisation, Financial Review and Anomaly Detection, Behavioural and Recurring Analysis, Reconciliation, Reporting and Review UI, and finally Human Decision.",
    importance: "high",
  },

  {
    id: "project-accountancy-006",
    category: "project",
    subject: "accountancy-v2",
    topic: "technology",
    text: "The main technologies used in Accountancy-v2 include Python, Pandas, NumPy, scikit-learn, Streamlit, Altair, OpenRouter API, Groq API, Ollama, Jupyter Notebooks, Pytest and Ruff.",
    importance: "high",
  },

  {
    id: "project-accountancy-007",
    category: "project",
    subject: "accountancy-v2",
    topic: "ml-and-ai",
    text: "Accountancy-v2 combines deterministic logic, traditional machine learning and LLM-based assistance. Machine learning is used for anomaly detection based on combinations of signals such as amount, timing, repetition and description behaviour. Deterministic checks cover unusual amounts, daily activity, digit patterns, recurring behaviour and grouped behaviour. LLMs are mainly used for tasks such as dataset classification and presentation or explanation, while the core anomaly and reconciliation logic remains explainable and does not rely on an LLM making the final accounting decision.",
    importance: "high",
  },

  {
    id: "project-accountancy-008",
    category: "project",
    subject: "accountancy-v2",
    topic: "hardest-part",
    text: "One of the hardest parts of Accountancy-v2 was making the system useful without creating too much noise. Financial data contains a large amount of legitimate variation, so poorly designed anomaly detection can flag too many transactions. Enkh repeatedly refined the checks to identify behaviour that was genuinely worth reviewing while keeping the reasons understandable to an accountant.",
    importance: "high",
  },

  {
    id: "project-accountancy-009",
    category: "project",
    subject: "accountancy-v2",
    topic: "recurring-pattern-challenge",
    text: "Recurring-pattern detection was particularly difficult because unrelated transactions can appear similar when descriptions are generic. Enkh repeatedly tested the logic against synthetic datasets and inspected why different transactions were being grouped together in order to reduce false recurring-pattern signals.",
    importance: "high",
  },

  {
    id: "project-accountancy-010",
    category: "project",
    subject: "accountancy-v2",
    topic: "iteration",
    text: "Accountancy-v2 evolved from a relatively simple anomaly-detection script into a broader financial review framework. Major iterations included separating classification, identification, normalisation, review and reconciliation into distinct modules, adding recurring-payment analysis, grouped behavioural analysis, ML-based anomaly checks, plain-English explanations, visual context, richer reconciliation methods, caching improvements and multiple redesigns of the Streamlit workflow and demo data.",
    importance: "high",
  },

  {
    id: "project-accountancy-011",
    category: "project",
    subject: "accountancy-v2",
    topic: "reconciliation",
    text: "The reconciliation component of Accountancy-v2 supports several matching stages including exact, tolerant, split, residual and manual matching. The goal is to identify likely relationships between financial records while still allowing a human reviewer to confirm or override the result.",
    importance: "high",
  },

  {
    id: "project-accountancy-012",
    category: "project",
    subject: "accountancy-v2",
    topic: "human-in-the-loop",
    text: "A core design principle of Accountancy-v2 is that the system should behave like an accountant review assistant rather than an automated judge. It identifies something unusual, explains why it matters, shows relevant transactions and historical context, suggests what should be checked and leaves the final judgement with the human reviewer.",
    importance: "high",
  },

  {
    id: "project-accountancy-013",
    category: "project",
    subject: "accountancy-v2",
    topic: "demo-results",
    text: "In the controlled demo dataset, Accountancy-v2 successfully identified several intended review scenarios, including six unusually large transactions, a missing monthly Jupiter Tel payment, a missing quarterly Oakwood Insurance payment, a Northstar HR payment increasing from around 2.2 thousand pounds to 9.85 thousand pounds, and a possible duplicate Lighthouse Security recurring payment.",
    importance: "high",
  },

  {
    id: "project-accountancy-014",
    category: "project",
    subject: "accountancy-v2",
    topic: "presentation",
    text: "For each flagged review item, Accountancy-v2 can provide visual context and plain-English explanations showing what changed, which transactions are relevant and what an accountant may want to check.",
    importance: "high",
  },

  {
    id: "project-accountancy-015",
    category: "project",
    subject: "accountancy-v2",
    topic: "measurable-results",
    text: "Accountancy-v2 does not yet have validated real-client productivity or accuracy metrics. It should not be described as having reduced review time by a particular percentage or delivered a measured commercial benefit. The supported claim is that the system successfully identifies multiple classes of financial anomalies and recurring-pattern changes in a controlled test dataset, with the core pipeline covered by automated tests.",
    importance: "high",
  },

  {
    id: "project-accountancy-016",
    category: "project",
    subject: "accountancy-v2",
    topic: "pride",
    text: "Enkh is most proud that Accountancy-v2 grew beyond a simple anomaly-detection script into a more complete accountant review assistant. He is particularly proud of the recurring and grouped behavioural components because they can identify changes that simple threshold-based checks may miss.",
    importance: "high",
  },

  {
    id: "project-accountancy-017",
    category: "project",
    subject: "accountancy-v2",
    topic: "future-work",
    text: "Future improvements for Accountancy-v2 include supporting more accounting datasets such as general ledgers, purchase invoices, sales invoices, trial balances, payments and receipts; improving cross-dataset reconciliation; improving recurring-pattern clustering for messy descriptions; reducing false positives with larger real accounting datasets; adding stronger reviewer feedback loops; improving reporting and export; and validating the system with real accounting teams.",
    importance: "medium",
  },

  {
    id: "project-accountancy-018",
    category: "project",
    subject: "accountancy-v2",
    topic: "confidentiality",
    text: "ENTWAN.EXE should not disclose company-internal repository names, directory structures, API keys, tokens, secrets, model credentials, internal Git branches, private client names, client financial data or employer-owned implementation details. It should also avoid claiming that Accountancy-v2 has already been deployed to clients or produced measurable commercial results unless such information is explicitly added later.",
    importance: "high",
  },

  {
    id: "project-krosstein-001",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "overview",
    text: "The Krosstein Recommendation and Stock Level Prediction System is a work project developed around a real plumbing merchant use case. It combines customer-facing product recommendation with business-facing demand forecasting using historical sales and purchasing data.",
    importance: "high",
  },

  {
    id: "project-krosstein-002",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "problem",
    text: "Krosstein has a large catalogue of plumbing, heating, ventilation, fittings, tools and related products. Customers may not immediately know which products they need, which products normally go together or what other products are relevant to something already in their basket. At the same time, the business needs to understand future product demand so it can make better stock and replenishment decisions.",
    importance: "high",
  },

  {
    id: "project-krosstein-003",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "users",
    text: "The project serves two broad user groups. The recommendation side is designed for Krosstein customers, including new visitors, returning customers and customers actively building a basket. The forecasting side is intended for staff involved in sales, stock management, purchasing, replenishment and commercial decision-making.",
    importance: "high",
  },

  {
    id: "project-krosstein-004",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "what-enkh-built",
    text: "Enkh worked on the core data science and application workflow, including data cleaning, customer purchase histories, ordered purchase sequences, popularity recommendations, GRU-based sequential recommendations, item co-occurrence analysis, basket-driven recommendations, discounted-product recommendations, business-priority recommendations, product-level demand preparation, feature engineering, Prophet forecasting, evaluation metrics, parallel forecasting and the Streamlit demonstration application.",
    importance: "high",
  },

  {
    id: "project-krosstein-005",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "pipeline",
    text: "At a high level, the system follows the stages: Historical Sales Data, Cleaning and Validation, Customer and Product Preparation, Feature Engineering, Recommendation or Forecasting Models, Evaluation, and Streamlit Demo and Business Outputs.",
    importance: "high",
  },

  {
    id: "project-krosstein-006",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "recommendation-pipeline",
    text: "The recommendation branch converts transactions into customer purchase sequences and product relationships, detects the available customer context, selects between popularity, GRU-based, co-occurrence and business-ranking strategies, and returns Top-N product recommendations.",
    importance: "high",
  },

  {
    id: "project-krosstein-007",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "forecasting-pipeline",
    text: "The forecasting branch filters genuine sales transactions, aggregates demand at product level, converts transactions into monthly time series, engineers price, discount, calendar and holiday features, runs Prophet-based forecasts, evaluates predictions using MAPE, SMAPE and WAPE, and produces future demand outputs.",
    importance: "high",
  },

  {
    id: "project-krosstein-008",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "technology",
    text: "The main technologies used in the Krosstein project include Python, Pandas, NumPy, TensorFlow, Keras, GRU neural networks, Prophet, Streamlit, python-holidays, concurrent.futures with ThreadPoolExecutor, tqdm and Jupyter Notebooks. Enkh also experimented with Dask and other parallel-processing approaches during forecasting development.",
    importance: "high",
  },

  {
    id: "project-krosstein-009",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "cold-start",
    text: "For completely new visitors with no customer or basket history, the recommendation system uses global popularity ranking as a cold-start strategy rather than pretending to have personalised knowledge that does not exist.",
    importance: "high",
  },

  {
    id: "project-krosstein-010",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "gru-recommender",
    text: "For returning customers, Enkh experimented with a GRU-based sequential recommendation model. Customer purchases are represented as ordered sequences so the model can learn repeat purchasing behaviour, transitions between products and which items are more likely to be purchased next.",
    importance: "high",
  },

  {
    id: "project-krosstein-011",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "basket-recommendations",
    text: "For basket-based recommendations, Enkh used item co-occurrence analysis to identify products that historically tend to be purchased together or within related purchase sequences. This helps the system react to immediate purchasing intent rather than relying only on long-term customer history.",
    importance: "high",
  },

  {
    id: "project-krosstein-012",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "commercial-ranking",
    text: "The recommendation system also includes ranking approaches for discounted products and business-priority products such as Krosstein's Choice, demonstrating that recommendation systems can combine machine learning with explicit commercial requirements.",
    importance: "medium",
  },

  {
    id: "project-krosstein-013",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "forecasting",
    text: "For stock-level prediction, Enkh used Prophet to forecast product-level monthly demand and experimented with additional regressors including price, discount percentage, calendar variables, regional holidays, days before and after holidays and lagged relationships between regressors and demand.",
    importance: "high",
  },

  {
    id: "project-krosstein-014",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "recommendation-challenge",
    text: "One of the hardest lessons from the recommendation side was that no single recommendation model is appropriate for every customer scenario. A new visitor has no history, a returning customer has long-term behaviour and a basket represents immediate intent, so Enkh designed switching and fallback logic between different recommendation strategies.",
    importance: "high",
  },

  {
    id: "project-krosstein-015",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "forecasting-challenge",
    text: "The forecasting side was challenging because individual products can have very different demand patterns, sparse histories, missing months, different price behaviour and irregular purchasing activity. Running Prophet independently across many products also became computationally expensive.",
    importance: "high",
  },

  {
    id: "project-krosstein-016",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "data-leakage",
    text: "An important modelling challenge was avoiding data leakage when using features such as price, discounts and lagged regressors. Enkh had to distinguish between information genuinely available at forecast time and information that would only be known in the future.",
    importance: "high",
  },

  {
    id: "project-krosstein-017",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "recommendation-iteration",
    text: "The recommendation system evolved from simpler ranking logic into a scenario-based architecture. Major iterations included adding a cold-start strategy, GRU sequential recommendations, basket co-occurrence, discounted-product recommendations, Krosstein's Choice, combined customer and basket logic, and an interactive Streamlit application for demonstrating different recommendation scenarios.",
    importance: "high",
  },

  {
    id: "project-krosstein-018",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "forecasting-iteration",
    text: "The forecasting pipeline evolved through multiple iterations including product-level monthly aggregation, price and discount feature engineering, filling missing time periods, cyclical calendar features, regional holiday features, Prophet regressors, automatic lag experiments, train-only standardisation, improved train-test splitting, corrected future-date generation, reduced uncertainty calculations, parallelism experiments, ThreadPoolExecutor, tqdm progress monitoring and fallback behaviour for products with insufficient data.",
    importance: "high",
  },

  {
    id: "project-krosstein-019",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "outputs",
    text: "The recommendation component produces Top-N recommendations according to the customer's current situation. A new visitor can receive popular products, returning customers can receive history-based recommendations, basket users can receive related add-on products, and the system can also surface discounted or business-priority items.",
    importance: "high",
  },

  {
    id: "project-krosstein-020",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "forecast-outputs",
    text: "The forecasting component produces future monthly demand forecasts per product, including predicted demand and forecast intervals, alongside evaluation outputs containing forecasting metrics. These outputs are intended to support stock planning, replenishment and demand monitoring.",
    importance: "high",
  },

  {
    id: "project-krosstein-021",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "evaluation",
    text: "The forecasting pipeline includes quantitative evaluation using MAPE, SMAPE and WAPE. Development experiments were run across approximately 187 product groups in the monthly forecasting dataset.",
    importance: "high",
  },

  {
    id: "project-krosstein-022",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "recommendation-evaluation-limit",
    text: "The recommendation system does not yet have a formal offline evaluation using metrics such as Precision at K, Recall at K, NDCG, Hit Rate or MRR. ENTWAN.EXE should not claim a numerical improvement in recommendation accuracy, sales or conversion without evidence.",
    importance: "high",
  },

  {
    id: "project-krosstein-023",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "measurable-results",
    text: "The project does not yet have a validated business KPI or production impact figure. A safe public description is that Enkh developed and demonstrated a multi-strategy recommendation system and product-level demand forecasting pipeline using historical sales data, with forecasting evaluated using MAPE, SMAPE and WAPE.",
    importance: "high",
  },

  {
    id: "project-krosstein-024",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "pride",
    text: "Enkh is most proud that the project became an end-to-end decision system rather than simply a trained recommender or forecasting model. The system considers what information is available at a particular moment and chooses a recommendation strategy accordingly.",
    importance: "high",
  },

  {
    id: "project-krosstein-025",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "business-domain",
    text: "The plumbing merchant context makes basket recommendations particularly meaningful because many products naturally have complementary relationships, such as pipes, fittings, valves, insulation, heating equipment, ventilation components and related accessories.",
    importance: "medium",
  },

  {
    id: "project-krosstein-026",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "future-recommendation-work",
    text: "A major future improvement would be rigorous temporal offline evaluation using metrics such as Precision at K, Recall at K, Hit Rate at K, NDCG at K and MRR, along with comparisons between the GRU recommender and simpler baselines to determine whether the additional model complexity is justified.",
    importance: "medium",
  },

  {
    id: "project-krosstein-027",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "future-hybrid-ranking",
    text: "A future version could use a stronger hybrid ranking model combining customer history, current basket, co-occurrence, popularity, product similarity, recency, stock availability, margin and discounts.",
    importance: "medium",
  },

  {
    id: "project-krosstein-028",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "future-forecasting-work",
    text: "Future forecasting work should compare Prophet against stronger baselines and alternatives such as seasonal naive forecasting, exponential smoothing, LightGBM or XGBoost with lagged demand features and global forecasting approaches. Intermittent-demand products and future regressor availability also need more careful treatment.",
    importance: "medium",
  },

  {
    id: "project-krosstein-029",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "future-integration",
    text: "One useful future direction would be to combine recommendation score, predicted demand, current stock and business priority into an inventory-aware recommendation ranking system, linking the customer-facing recommendation problem more closely with stock planning.",
    importance: "medium",
  },

  {
    id: "project-krosstein-030",
    category: "project",
    subject: "krosstein-recommendation-stock",
    topic: "confidentiality",
    text: "ENTWAN.EXE should not expose raw customer records, customer identifiers, personally identifiable information, complete transaction datasets, confidential stock levels, commercially sensitive margin information, private pricing information, credentials, secrets, private repositories or employer-owned implementation details. It should also avoid claiming that the system is already deployed to customers or has produced a specific commercial improvement unless that has been measured and approved for public disclosure.",
    importance: "high",
  },

  {
    id: "project-receipt-001",
    category: "project",
    subject: "receipt",
    topic: "overview",
    text: "Receipt is Enkh's final-year university project: an AI-driven grocery budgeting, price comparison and price forecasting platform designed primarily for UK university students facing rising food costs.",
    importance: "high",
  },

  {
    id: "project-receipt-002",
    category: "project",
    subject: "receipt",
    topic: "inspiration",
    text: "The idea for Receipt came from Enkh noticing a Tesco meal deal price increase while living on a tight student budget. He realised that small price changes can matter when money is limited and began thinking about a system that could track supermarket prices and help students shop more intelligently.",
    importance: "high",
  },

  {
    id: "project-receipt-003",
    category: "project",
    subject: "receipt",
    topic: "problem",
    text: "Receipt addresses the difficulty students face when trying to manage grocery spending during a period of rising living costs. Existing budgeting and price comparison tools often separate budgeting, price tracking and forecasting, so Receipt was designed to bring these capabilities together in one platform.",
    importance: "high",
  },

  {
    id: "project-receipt-004",
    category: "project",
    subject: "receipt",
    topic: "users",
    text: "The main intended users of Receipt are university students in the UK who want to compare grocery prices, plan shopping within a budget, understand price trends and make more informed purchasing decisions.",
    importance: "high",
  },

  {
    id: "project-receipt-005",
    category: "project",
    subject: "receipt",
    topic: "what-enkh-built",
    text: "Enkh built the full Receipt system himself, including supermarket web scrapers, data cleaning and standardisation, database integration, price comparison tools, inflation analysis, forecasting, semantic product matching, natural language processing, voice input, conversational AI integration, account management, saved shopping lists, nearby store search, visualisations and the Streamlit interface.",
    importance: "high",
  },

  {
    id: "project-receipt-006",
    category: "project",
    subject: "receipt",
    topic: "architecture",
    text: "Receipt uses a three-layer architecture consisting of a Python and Selenium data collection layer, a PostgreSQL backend hosted through Supabase, and a Streamlit frontend for interaction, analysis and visualisation.",
    importance: "high",
  },

  {
    id: "project-receipt-007",
    category: "project",
    subject: "receipt",
    topic: "pipeline",
    text: "At a high level, Receipt follows the flow: Supermarket Websites, Web Scraping, Cleaning and Standardisation, PostgreSQL Storage, Data Retrieval and Caching, Analysis and Machine Learning, User Interaction, and Shopping or Budgeting Outputs.",
    importance: "high",
  },

  {
    id: "project-receipt-008",
    category: "project",
    subject: "receipt",
    topic: "data-collection",
    text: "Because suitable public supermarket APIs were not available, Enkh built custom Selenium web scrapers for Tesco, Sainsbury's, Asda, Aldi and Waitrose. The scraping logic had to handle different site structures, JavaScript-rendered pages, pagination, infinite scrolling, missing fields and changing CSS selectors.",
    importance: "high",
  },

  {
    id: "project-receipt-009",
    category: "project",
    subject: "receipt",
    topic: "data-scale",
    text: "During development, Receipt collected more than 55,000 product entries in a single scrape across five UK supermarkets, with product information including names, prices, unit prices, discounts, categories, subcategories, stores and collection dates.",
    importance: "high",
  },

  {
    id: "project-receipt-010",
    category: "project",
    subject: "receipt",
    topic: "data-cleaning",
    text: "Receipt standardises inconsistent supermarket data by converting price strings into numerical values and normalising unit formats such as grams, kilograms, millilitres, litres and individual units. This allows products from different retailers to be compared more meaningfully.",
    importance: "high",
  },

  {
    id: "project-receipt-011",
    category: "project",
    subject: "receipt",
    topic: "database",
    text: "Receipt stores cleaned product data in PostgreSQL using Supabase. Supabase was selected after an initial attempt with Amazon RDS proved unnecessarily difficult for the project's requirements and free-tier constraints.",
    importance: "high",
  },

  {
    id: "project-receipt-012",
    category: "project",
    subject: "receipt",
    topic: "data-fetching",
    text: "The Receipt application retrieves product data from Supabase in batches of 1,000 rows and caches the results in the Streamlit session to reduce repeated database calls and improve page responsiveness.",
    importance: "medium",
  },

  {
    id: "project-receipt-013",
    category: "project",
    subject: "receipt",
    topic: "technology",
    text: "Technologies used in Receipt include Python, Pandas, Selenium, PostgreSQL, Supabase, Streamlit, Plotly, Folium, spaCy, sentence-transformers, cosine similarity, ARIMA, Groq's LLaMA model, SpeechRecognition, geopy, Photon API and bcrypt.",
    importance: "high",
  },

  {
    id: "project-receipt-014",
    category: "project",
    subject: "receipt",
    topic: "price-comparison",
    text: "Receipt includes a price comparison page that compares popular grocery items across Tesco, Sainsbury's, Asda, Aldi and Waitrose. Users can also search for specific products and refine results by retailer and subcategory.",
    importance: "high",
  },

  {
    id: "project-receipt-015",
    category: "project",
    subject: "receipt",
    topic: "inflation-analysis",
    text: "Receipt includes a weekly grocery inflation view that compares average prices across approximately 40 product subcategories between recent data collection periods and highlights increases and decreases by supermarket.",
    importance: "high",
  },

  {
    id: "project-receipt-016",
    category: "project",
    subject: "receipt",
    topic: "forecasting",
    text: "Receipt uses ARIMA for short-term category-level food price forecasting. The system can produce six-month forecasts with upper and lower confidence bounds and highlight categories expected to experience relatively large price increases.",
    importance: "high",
  },

  {
    id: "project-receipt-017",
    category: "project",
    subject: "receipt",
    topic: "model-selection",
    text: "Enkh considered more complex forecasting approaches such as LSTM and XGBoost but selected ARIMA because the available historical dataset was relatively small and more complex models would have increased the risk of overfitting.",
    importance: "high",
  },

  {
    id: "project-receipt-018",
    category: "project",
    subject: "receipt",
    topic: "seasonal-analysis",
    text: "Receipt analyses historical food price behaviour around occasions such as Christmas, Easter, Valentine's Day and the Back to School period. It identifies categories that historically experienced relatively large price increases or decreases during these periods.",
    importance: "medium",
  },

  {
    id: "project-receipt-019",
    category: "project",
    subject: "receipt",
    topic: "shopping-list-generator",
    text: "The AI-assisted shopping list generator is one of Receipt's most complex components. Users can create grocery lists by typing items, speaking into a microphone or asking a conversational AI assistant to suggest groceries based on their needs.",
    importance: "high",
  },

  {
    id: "project-receipt-020",
    category: "project",
    subject: "receipt",
    topic: "nlp",
    text: "Receipt uses a custom spaCy-based NLP pipeline to extract grocery item names from casual text and speech. The logic handles structures such as adjective-noun phrases, multi-word product names and hyphenated descriptions such as semi-skimmed milk.",
    importance: "high",
  },

  {
    id: "project-receipt-021",
    category: "project",
    subject: "receipt",
    topic: "llm",
    text: "Receipt integrates a LLaMA model through Groq for conversational grocery suggestions. The model is prompted to return specific grocery items rather than vague recommendations, and the generated output is parsed into a structured shopping list.",
    importance: "high",
  },

  {
    id: "project-receipt-022",
    category: "project",
    subject: "receipt",
    topic: "semantic-search",
    text: "Receipt uses the all-MiniLM-L6-v2 sentence-transformer model and cosine similarity for semantic product matching. This allows user requests to be matched against supermarket products even when the wording is not an exact string match.",
    importance: "high",
  },

  {
    id: "project-receipt-023",
    category: "project",
    subject: "receipt",
    topic: "budget-optimisation",
    text: "After a shopping list is created, users can choose a supermarket and set a budget. Receipt matches requested items against available products, prioritises suitable lower-cost matches and can suggest optional secondary products when budget remains.",
    importance: "high",
  },

  {
    id: "project-receipt-024",
    category: "project",
    subject: "receipt",
    topic: "embedding-performance",
    text: "One technical challenge in Receipt was performing semantic matching against tens of thousands of supermarket products while keeping the application responsive. Enkh used caching and batched tensor operations to improve embedding and similarity-search performance.",
    importance: "high",
  },

  {
    id: "project-receipt-025",
    category: "project",
    subject: "receipt",
    topic: "voice-input",
    text: "Receipt supports voice-based grocery input using audio recording and speech recognition. Building this required handling audio buffering, transcription errors, session state and the conversion of casual spoken language into structured grocery item names.",
    importance: "medium",
  },

  {
    id: "project-receipt-026",
    category: "project",
    subject: "receipt",
    topic: "store-finder",
    text: "Receipt includes a nearby supermarket finder using either the user's current location or a UK postcode. The system queries the Photon API, calculates real-world distance using geodesic calculations and displays nearby Tesco, Sainsbury's, Asda, Waitrose and Aldi locations on an interactive map.",
    importance: "medium",
  },

  {
    id: "project-receipt-027",
    category: "project",
    subject: "receipt",
    topic: "accounts",
    text: "Receipt includes user registration, login and saved shopping-list management through Supabase. Enkh also implemented email-based one-time-password verification and password hashing using bcrypt.",
    importance: "medium",
  },

  {
    id: "project-receipt-028",
    category: "project",
    subject: "receipt",
    topic: "saved-lists",
    text: "Logged-in Receipt users can save generated shopping lists together with matched products and prices, browse previous lists organised by date, download them as text files and delete unwanted lists.",
    importance: "medium",
  },

  {
    id: "project-receipt-029",
    category: "project",
    subject: "receipt",
    topic: "methodology",
    text: "Enkh developed Receipt using a modified CRISP-DM methodology combined with agile principles. The project moved through business understanding, data understanding, data preparation, modelling, evaluation and deployment while using iterative feedback and refinement throughout development.",
    importance: "medium",
  },

  {
    id: "project-receipt-030",
    category: "project",
    subject: "receipt",
    topic: "ui-development",
    text: "Receipt was originally considered for development using Django, but Enkh switched to Streamlit because the project became heavily data-oriented and required rapid iteration, interactive visualisations and close integration with Python data workflows.",
    importance: "medium",
  },

  {
    id: "project-receipt-031",
    category: "project",
    subject: "receipt",
    topic: "testing",
    text: "Receipt was extensively tested using black-box testing across account registration, authentication, saved lists, data collection, price comparison, inflation analysis, forecasting, nearby store search, shopping-list generation, UI behaviour and edge cases.",
    importance: "high",
  },

  {
    id: "project-receipt-032",
    category: "project",
    subject: "receipt",
    topic: "testing-result",
    text: "Most documented Receipt black-box test cases passed successfully. One documented failure remained in the forgot-password workflow, where the application did not correctly capture the reset token together with the email.",
    importance: "medium",
  },

  {
    id: "project-receipt-033",
    category: "project",
    subject: "receipt",
    topic: "hardest-part",
    text: "One of the hardest parts of Receipt was building a reliable end-to-end data pipeline when supermarket websites had no suitable public APIs and frequently used dynamic page structures. Another major challenge was turning casual typed or spoken grocery requests into accurate product matches across tens of thousands of records.",
    importance: "high",
  },

  {
    id: "project-receipt-034",
    category: "project",
    subject: "receipt",
    topic: "iteration",
    text: "Receipt changed substantially during development. Enkh moved from AWS RDS to Supabase, changed the application approach from Django to Streamlit, refined the web scrapers, improved unit standardisation, added caching, expanded semantic product matching, introduced conversational and voice input, and repeatedly redesigned the interface based on feedback.",
    importance: "high",
  },

  {
    id: "project-receipt-035",
    category: "project",
    subject: "receipt",
    topic: "result",
    text: "The final Receipt system provides a working platform that combines supermarket price collection, product comparison, inflation analysis, category-level forecasting, budget-aware shopping-list generation, semantic product matching, nearby store discovery and saved user lists.",
    importance: "high",
  },

  {
    id: "project-receipt-036",
    category: "project",
    subject: "receipt",
    topic: "limitations",
    text: "Receipt's forecasting component was limited by the relatively short historical data window available during the dissertation. The ARIMA forecasts therefore demonstrate the concept but should not be presented as production-grade long-term grocery price predictions.",
    importance: "high",
  },

  {
    id: "project-receipt-037",
    category: "project",
    subject: "receipt",
    topic: "measurable-results",
    text: "Receipt does not have validated evidence that it reduced student grocery spending by a specific percentage or produced a measured financial saving. ENTWAN.EXE should describe it as a functional and tested prototype rather than claiming unmeasured economic impact.",
    importance: "high",
  },

  {
    id: "project-receipt-038",
    category: "project",
    subject: "receipt",
    topic: "pride",
    text: "Enkh is particularly proud of Receipt because it began as a simple frustration about grocery prices and developed into a full system involving data engineering, databases, machine learning, NLP, embeddings, APIs, authentication, forecasting and frontend development.",
    importance: "high",
  },

  {
    id: "project-receipt-039",
    category: "project",
    subject: "receipt",
    topic: "future-mobile",
    text: "One proposed future direction for Receipt is a native mobile application that combines shopping-list generation, price comparison, nearby stores and forecasting into a more streamlined mobile experience.",
    importance: "low",
  },

  {
    id: "project-receipt-040",
    category: "project",
    subject: "receipt",
    topic: "future-social",
    text: "A future version of Receipt could allow users to create and share reusable grocery bundles such as weekly meal-prep lists or budget breakfast kits, allowing other users to adopt or modify them.",
    importance: "low",
  },

  {
    id: "project-receipt-041",
    category: "project",
    subject: "receipt",
    topic: "future-data",
    text: "A major future improvement for Receipt would be direct supermarket data partnerships or APIs. This would reduce dependence on web scraping and could provide richer information such as real-time stock availability, regional pricing and promotions.",
    importance: "medium",
  },

  {
    id: "project-receipt-042",
    category: "project",
    subject: "receipt",
    topic: "future-forecasting",
    text: "Receipt would benefit from a much longer historical pricing dataset. More historical data would allow stronger evaluation of seasonality and could make it reasonable to revisit models such as LSTM or other forecasting approaches that were avoided during the dissertation because the dataset was too small.",
    importance: "medium",
  },
];
