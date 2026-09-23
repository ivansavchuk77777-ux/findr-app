# FINDR Alpha — Mobile + Search API

FINDR now has an end-to-end search path: the Expo app sends a natural-language request to a small server API, the API parses price/year/radius constraints, returns normalized results, and accepts Keep Looking watch requests.

## Run the backend
```bash
cd backend
npm install
npm run dev
```
The API starts on port 8787. Test `GET /health`.

## Run the mobile app
At the project root:
```bash
npm install
# copy .env.example to .env and set your computer's LAN IP when testing on a physical phone
npx expo start
```
Set `EXPO_PUBLIC_FINDR_API_URL` to the backend address. `localhost` works for web/some simulators; a physical phone normally needs your computer's LAN IP or a deployed HTTPS API.

## What works now
- Natural-language request from phone -> FINDR API -> normalized result cards
- Basic extraction of maximum price, radius and minimum year
- Keep Looking API endpoint
- Mobile Watching/Saved UI from the prior build
- Supabase-ready schema with Row Level Security policies
- `.env.example` separating public mobile configuration from server secrets

## Provider boundary
The included result provider is intentionally marked DEMO. It proves the full app/API flow without pretending to search marketplaces. The next connection is one or more approved product, vehicle and local-service APIs. Add adapters server-side and map every provider into the common result shape: `{id,title,subtitle,price,url,provider,score}`.

## Supabase
`supabase/schema.sql` creates searches, matches and watch_rules. Create a Supabase project, run that SQL, then add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the backend environment. Never put the service-role key in the Expo app.

## Next production checkpoint
1. Connect Supabase Auth and persist watches.
2. Add the first approved live provider adapter.
3. Add scheduled watch execution and Expo push notifications.
4. Add image understanding and speech-to-text.
5. Add privacy policy, terms, account deletion and release assets before store submission.
