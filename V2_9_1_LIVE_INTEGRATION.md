# V2.9.1 integration bridge checkpoint

The development branch now contains a runtime bridge that is injected by the service worker into the app shell. This is a development integration step only; it keeps the monolithic V2.8 index untouched while exercising the real app rendering/answer pipeline.

The bridge loads new Stochastik generator modules and registers valid generators in the existing TOPICS structure. The service worker caches the injected app shell and the generator modules for offline use.

Release blocker: before the final PR, replace this bridge with a clean permanent application structure if possible and verify the full 42-skill registry, mastery, migration and exam paths. Do not call V2.9.1 release-ready from bridge integration alone.
