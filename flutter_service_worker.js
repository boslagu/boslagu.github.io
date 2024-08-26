'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "d7e99b0770f2a0177ad8754961d22ee2",
"version.json": "6b2d46c72bf8dc614a0de8b2780de46c",
"index.html": "a804dc664a10010816d66235180afd48",
"/": "a804dc664a10010816d66235180afd48",
"main.dart.js": "196f7d17aba85b0b68b069370400789b",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "e37a89c12384e3d1e70de57baebbd199",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "494f760a69a36a53df565cb598294750",
".git/config": "b1676ba9bd06f6cb34ccbf8ef137ecf6",
".git/objects/68/bea4dfb4aeae4ded0621c9c367d1d440b6de11": "9c8b66dcfa12794c2eb7ec5fce432c07",
".git/objects/6f/5abd204646de0d8fa419e9221f4caac8c972bc": "0b5c9f4e941f28efd1c607e3dd2a4f7c",
".git/objects/58/b007afeab6938f7283db26299ce2de9475d842": "6c6cbea527763bb3cdff2cecfee91721",
".git/objects/58/356635d1dc89f2ed71c73cf27d5eaf97d956cd": "f61f92e39b9805320d2895056208c1b7",
".git/objects/94/f7d06e926d627b554eb130e3c3522a941d670a": "77a772baf4c39f0a3a9e45f3e4b285bb",
".git/objects/5f/1e93ebccf5947b7b0f0844212e3997781e82c3": "b1fc3a07fdc6fdcbff5bcbe2522383fd",
".git/objects/b2/0575f734587314e852cc02a446dbe735fa8986": "2d02aed3170f9a24c106dd831d752a16",
".git/objects/d0/2cf377319541d89f17d4a1318272ca511f5e01": "7eee12492d3bba8b8f24ae7c0c98726a",
".git/objects/b3/ebbd38f666d4ffa1a394c5de15582f9d7ca6c0": "23010709b2d5951ca2b3be3dd49f09df",
".git/objects/b4/a3ecb9428e2a4b8aff40c099e1c27d64a928f0": "6e4bc29289eb6be950713f1b329eaf0d",
".git/objects/bd/e9731ce197408f071063ed510fad11d42889db": "50f12a410df96169c910cd5d897d12fd",
".git/objects/bd/27bfdaf56a140e2c10f832674dbd294acc80cd": "dc11597075239f7d5cd3690f3c9486a4",
".git/objects/d1/098e7588881061719e47766c43f49be0c3e38e": "f17e6af17b09b0874aa518914cfe9d8c",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/ae/0947396a150ced55d20740fb0194fd6b24e882": "f3a19c9e198d0f26e4caa78a1a9ab348",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/c9/bf8af1b92c723b589cc9afadff1013fa0a0213": "632f11e7fee6909d99ecfd9eeab30973",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/c1/ceb3f694062633992ff93a3df63611bdb1cb84": "14893c1f04353dcdacb1720175470256",
".git/objects/ec/de503a39cf7fd0143e949ec4b66af4e7a20c67": "8edc50c20312f54cbe3821a26bfae2a7",
".git/objects/20/188500eb296f2e60d96293201423907a66f59c": "d0d99f870090d12af1cf99b06cb34591",
".git/objects/20/cb2f80169bf29d673844d2bb6a73bc04f3bfb8": "b807949265987310dc442dc3f9f492a2",
".git/objects/20/1afe538261bd7f9a38bed0524669398070d046": "82a4d6c731c1d8cdc48bce3ab3c11172",
".git/objects/18/eb401097242a0ec205d5f8abd29a4c5e09c5a3": "4e08af90d04a082aab5eee741258a1dc",
".git/objects/27/71bdcb6ad38a03aa2305ddcc7416af64c67f2b": "9c0f948f362ea0599d36906786875eb0",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/74/4c2e4a2ef44223dea20fb3a8a7175cc8340813": "ea2aadbb47e667e65af3c83ec6998664",
".git/objects/7b/1819c0e2d94e24c9b9fd52dfaef59e008400c7": "c347b7369cadf2d0189cb97356334e34",
".git/objects/8f/f1f996285ff84b3b20357cd9aead618ec3a380": "45fc01db7babca5c3c1fbb7b861e5236",
".git/objects/4d/acd518271483638dabd607c00c718639c0cc8f": "d0756a7c78e9f56dd0f3a719b538a3b7",
".git/objects/43/1f84fdd14d07091036a27bfbec22ad01f7ef0f": "295a29875c4de6913dcd123366f055e5",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/9f/d5c39d3a17123bd9f59f4cfc56131dca161f36": "4c7957a52d27734c455c47075b46c0a8",
".git/objects/9a/d07050f2104d8508c2870dddbe020cfc692056": "4e828b8698697872f0edf36b5aa61a70",
".git/objects/36/a8e075b65f4384342eb514a914d0bfea38d990": "b55e6c09f0d0de2a1ff66637d01c28d4",
".git/objects/09/4bb6ae24f0cd847d40cb4cc4a2434f2ec9b83b": "b9e6d850322c11db635bcf0a45b762ff",
".git/objects/31/1ec2eaceba0173fa6c9dc90bdcdba690fc0855": "e104b81dcdff98e55e51a902844d8170",
".git/objects/39/052dc1b0033a0196dd7cfcf4a9596ba832124f": "e6e706df5a6e2d34e31ec11b1c844197",
".git/objects/97/217e20fbb87fb635c31592b3175ff56d6ecaa8": "0ebce333fea3fccf9768d9b384c9e371",
".git/objects/d3/d675cce2ee1d753f601e359d55a2d360799f4a": "8e88c564f31abbb656faa9fa6f17522a",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/b1/615d0a30dcb5c493caf87faae5d785355a33ce": "28261e6998a2f529300005c670bcd8cd",
".git/objects/dc/548d7aca79aa84d7b67003d03d9d197b2ad2ee": "9e7c35862f33bbe8cfb41aa7f0a82f04",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/db/55565ac756b278093db1db4d2b0a1961cb2020": "70bbfed1b8e7e664435091b321d864eb",
".git/objects/a8/7af821b68a424ce19c6e1b3e193b1facc88e2e": "d63874269e585d0988c1b8ce3027b298",
".git/objects/b0/d371c7cfc0d53b8e62a28793ded4b37ba821c0": "a32d311bbedd2e209003a5e5ce36c1fa",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/2d/f641be3975da9e9647dfb2999db6e5188a90fc": "2425b00ed4e9ea893f39636c1a8cbae1",
".git/objects/41/f78ba5082847110f83020e1172896d61becb31": "2c00e76fc0b8ce8a1e04185f9a2e01f8",
".git/objects/83/f649b9cbb75ec4a3344e2c6c42c3cee3a9ec55": "c669dbe7caef51832986e7eb4bd93bd5",
".git/objects/4a/75f0edda0b3dc7c501525bd1c0f7f04137982d": "d7060f271764b2b0492ee640dd3dcb8e",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/1d/a14c018591984b02272bef8b45a4617aa2b5df": "0004e17966864ec1ebe48bc7bd847975",
".git/objects/71/3f932c591e8f661aa4a8e54c32c196262fd574": "66c6c54fbdf71902cb7321617d5fa33c",
".git/objects/82/7ee3a50a30340487d3a1ab966efd5a47ce9611": "e3f88895f1a3d5bfde14db041070122f",
".git/objects/49/adebdb511c8c293b28db3f6792e5bac28cdc32": "ba6a3971e7f06834fd6ec3844372ce17",
".git/objects/49/dc31451f8f9fe010108297032c737a478c6714": "d4d58fddef75d099cf564d973a3632a8",
".git/objects/8b/784f178a6edaf0fcb151d7efdbbde70949aad5": "5e35bf67cca003e7608ba6234dd9abce",
".git/objects/25/8b3eee70f98b2ece403869d9fe41ff8d32b7e1": "05e38b9242f2ece7b4208c191bc7b258",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "d341701f21a0005db15731d36929f73d",
".git/logs/refs/heads/main": "d341701f21a0005db15731d36929f73d",
".git/logs/refs/remotes/origin/main": "fbac1de437541e1761f76fccdb948486",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/main": "784717d64a75620fa193cd5c9ca0c0ca",
".git/refs/remotes/origin/main": "784717d64a75620fa193cd5c9ca0c0ca",
".git/index": "559e41df3cf42faea9d0ed0318f74fbe",
".git/COMMIT_EDITMSG": "2eac9dda749a05c1308a62e89061f57e",
".git/FETCH_HEAD": "52938c4c06b7e3180e2a628ff2b71dfc",
"assets/AssetManifest.json": "e4f34060d18f82e01d287098fb0be1d7",
"assets/NOTICES": "aa0fcf89876609fe5a6b795e270723d2",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "db9be89549e8ebbafeaae0d0b5bd72ac",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "36cd345d5516509ce239d40f4e2d1355",
"assets/fonts/MaterialIcons-Regular.otf": "071649f092c44dabaacf6c98450f7924",
"assets/assets/images/macbook.jpeg": "6ccd65101387bcb35f8373c3182bfff6",
"assets/assets/images/macbook_cropped.png": "dc3ffcb59942aefc58b6c9d3812de46c",
"assets/assets/images/404.png": "cb4f4c273a036d56fe27a56907f1e46a",
"assets/assets/images/certificate.png": "150df8061d7790c8af19f4ddbb2364dd",
"assets/assets/images/404.gif": "a5f289b66b0cb50f8edab880a8e0acae",
"assets/assets/images/dirty_macbook.jpeg": "531f8fb4dd70eed36cd2223db3dba496",
"assets/assets/images/avatar.jpeg": "d29a7b9c5e6c339a76cca12ebb6dee80",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
