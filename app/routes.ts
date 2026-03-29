import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
  
    route("our-story", "routes/our-story.tsx"),
    route("q-and-a", "routes/q-and-a.tsx"),
    route("travel", "routes/travel.tsx"),
    route("registry", "routes/registry.tsx"),
    route("wedding-party", "routes/wedding-party.tsx"),
    route("photos", "routes/photos.tsx"),
    route("share-photos", "routes/share-photos.tsx"),
    route("rsvp", "routes/rsvp.tsx"),
  ] satisfies RouteConfig;
