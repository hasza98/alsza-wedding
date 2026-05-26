import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("hasznos", "routes/q-and-a.tsx"),
  route("helyszin", "routes/travel.tsx"),
  route("szallas", "routes/accommodation.tsx"),
  route("programterv", "routes/wedding-party.tsx"),
  route("kepeink", "routes/photos.tsx"),
  route("visszajelzes", "routes/rsvp.tsx"),
] satisfies RouteConfig;
