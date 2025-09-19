# DB Ratina

A web application for retina image classification and medical explanation, built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- Upload retina images for classification
- View classification results using a CNN model
- Get medical explanations powered by Gemini
- Responsive and modern UI

## Project Structure
```
project/
  src/
    components/         # React components
    services/           # API and ML service logic
    types/              # TypeScript types
  .env                  # Environment variables (not committed)
  
  DB_RATINA_Tfolder/    # Custom folder for DB Ratina
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/vnigoated/db_ratina.git
   cd db_ratina/project
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the `project/` directory and add your environment variables (see `.env.example` if available).

### Running the App
```sh
npm run dev
# or
yarn dev
```



## Environment Variables
- All Vite environment variables must start with `VITE_` (e.g., `VITE_API_URL`).


## License
MIT
