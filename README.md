# AssetVerse Client

AssetVerse is a corporate asset management application for HR teams and employees. HR managers maintain inventory, review employee requests, and manage team capacity. Employees can browse available inventory, request assets, and track their requests and assigned items.

## Live Application

- **Frontend:** [https://asset-verses.web.app](https://asset-verses.web.app)
- **Backend API:** [https://asset-verse-server.vercel.app](https://asset-verse-server.vercel.app)
- **Backend repository:** [shuv-on/asset-verse-server](https://github.com/shuv-on/asset-verse-server)

## Features

### HR managers

- View inventory and asset distribution dashboards.
- Add, update, search, filter, and remove assets.
- Review employee requests and approve or reject them.
- View employees associated with the company.
- Increase employee capacity through Stripe-powered subscription checkout.

### Employees

- Browse available assets and submit requests.
- Review, cancel, and track asset requests.
- View team members and profile information.
- Return approved returnable assets.

### Shared

- Firebase email/password and Google authentication.
- Role-specific navigation and dashboards.
- Responsive layouts for desktop and mobile.
- Search, filtering, pagination, notifications, and printable asset request details.

## Technology

- React 19 and Vite 7
- React Router 7
- Firebase Authentication
- TanStack Query and Axios
- Tailwind CSS and DaisyUI
- Stripe Elements
- Recharts, Framer Motion, React Icons, SweetAlert2, and React Hot Toast

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- Firebase project settings for Authentication
- A reachable AssetVerse API
- Stripe publishable key for payment checkout

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root with the Firebase web app settings and payment publishable key:

```dotenv
VITE_API_URL=https://asset-verse-server.vercel.app
VITE_apiKey=your_firebase_web_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_PAYMENT_GATEWAY_PK=your_stripe_publishable_key
```

The production API URL is also defined in `.env.production`, which is used by Vite for production builds. Keep private service credentials, such as the Stripe secret key, in the backend environment only. Do not commit local environment files.

Start the development server:

```bash
npm run dev
```

Vite prints the local development URL when the server starts.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run lint` | Run ESLint across the client. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Deployment

Firebase Hosting serves the Vite `dist/` directory and rewrites application routes to `index.html` for client-side routing.

```bash
npm run lint
npm run build
firebase deploy --only hosting --project asset-verses
```

The Firebase CLI must be installed and authenticated with access to the `asset-verses` project. The deployed site is available at [https://asset-verses.web.app](https://asset-verses.web.app).

## Project Structure

```text
src/
	components/   Shared UI components
	context/      Authentication context
	hooks/        Authentication, role, and API hooks
	pages/        Public, employee, and HR screens
	providers/    Application-level providers
	Routes/       Client-side route configuration
	Firebase/     Firebase client initialization
```
