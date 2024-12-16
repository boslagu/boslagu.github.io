'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "1dbb509639f07423cdfd3d04e3a4c782",
"version.json": "18ad6fc840872a7e2b4e99a05c51b684",
"index.html": "37eeae7bc9090cd9fd4ba73341b886af",
"/": "37eeae7bc9090cd9fd4ba73341b886af",
"main.dart.js": "c2c5207bdfaf87793d0300fe3cf00e24",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "b4908c35ffaba4a90a2c08b41b997cbb",
".git/config": "f4dab4e6721f3c153022d40077bd26d6",
".git/objects/0d/c3b5551a2c701abf78bde13dbe5a65f9c92a7d": "196621a2a48940c69f46e39b9384a217",
".git/objects/95/cbc43fa0b8f5601394c42361159dcd5c55db12": "20af869e8b9da55d42a1ddfd9c2e7bc2",
".git/objects/95/1314f2a986a7d2924ea8da139939275612704c": "003d35f6b0b18110942570c35635f178",
".git/objects/50/cad0e224cb006d33470908ef481ef4dea61c8e": "9929069573bc738ddbea02890c97755d",
".git/objects/68/68f7bb64ba71b131690286ddc82aa0f542293e": "b6aeab417f5d5ef28ea070a09b61c7e0",
".git/objects/57/3797fb94c50373bde4f880c2b17841f0ac5489": "7feb9b91a11ddfcddc41e2ed4e400e1f",
".git/objects/6f/cf7e5dbe8e44e37a98b41d5aa7b1eaf3752d2e": "6e32e74a8c5a51662915e95f42aaf870",
".git/objects/35/acda2fa1196aad98c2adf4378a7611dd713aa3": "b485406370fdb56248ec4e5fc074fb65",
".git/objects/58/b007afeab6938f7283db26299ce2de9475d842": "6c6cbea527763bb3cdff2cecfee91721",
".git/objects/58/356635d1dc89f2ed71c73cf27d5eaf97d956cd": "f61f92e39b9805320d2895056208c1b7",
".git/objects/0b/3dee902aab130c66916e4b342660fa123b5c65": "abe3fe50e60b877c7ed5263fa36c93ce",
".git/objects/94/8a2a6cc76a4d7cb692d0d08e352f126ec48a9d": "cbf73b51fb0502e860178e210c363ca7",
".git/objects/94/f7d06e926d627b554eb130e3c3522a941d670a": "77a772baf4c39f0a3a9e45f3e4b285bb",
".git/objects/34/b16bd0f93e550e8cbffc6f2b4c7b88986e2c91": "e57694810c586699d774232a6f1cf265",
".git/objects/9c/03cf09936461fe43f038efa79560455b812dae": "83b261e1df2e8b3e6b98d36871b6a58f",
".git/objects/a3/c58c506000026537160a0076e7d09cdce043ec": "b0555bd09897b23b75323df8828b58ce",
".git/objects/ad/4c0ba9842f4de544316a62269732d33f652961": "d2648c4f7ac6a01d24dedabffef3980b",
".git/objects/b3/176bcfcf17971a127ec340d43ab80dee6d4821": "2dc5dd30498c4689212a53311aff30bd",
".git/objects/b3/ebbd38f666d4ffa1a394c5de15582f9d7ca6c0": "23010709b2d5951ca2b3be3dd49f09df",
".git/objects/b4/a3ecb9428e2a4b8aff40c099e1c27d64a928f0": "6e4bc29289eb6be950713f1b329eaf0d",
".git/objects/a2/6141ec6df49a7057d5224595d28cde1db28c88": "b1370100e522e4c5523a63ae5db04e02",
".git/objects/d1/098e7588881061719e47766c43f49be0c3e38e": "f17e6af17b09b0874aa518914cfe9d8c",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/bc/36bcc2427a84e29e61ea7b634024072c04b206": "08cd2a4fd07be093532cedca2675ee60",
".git/objects/ab/e99e20c38a23e95295917d6a5cdb49a8489eb8": "daa46bdb83328438b3e1f0bb1b074657",
".git/objects/e5/0801b3b620af91f824c7655df7d064db05b764": "3a034b2609afa6f9a14cf62c9fb57254",
".git/objects/e2/6db5dd3dbab6fcdb06f7fd9ab9347ead808f02": "2f6d76624a9dec9c6214eeab0f98202e",
".git/objects/f4/a266dd37d5066da46c9a6b8898073ae2930a64": "90c22367f91de9fd622ad04f0a5fd7c8",
".git/objects/f3/40f2dd4a87c403e0de77909d18f156affb6766": "7a4cbd008e3c22aa6c3af7c20d7a8633",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/eb/00517590ebec6f444d839f7936ad3c84a85d4d": "8e9ce1485018ac558fd9f75f8af90c4d",
".git/objects/eb/7169b729947d6e2bec79f3c2c1734c04d70421": "0b6b771a29ece6e60fec12c087551f30",
".git/objects/c9/bf8af1b92c723b589cc9afadff1013fa0a0213": "632f11e7fee6909d99ecfd9eeab30973",
".git/objects/fd/787a81c3e608898214c09e62216eefa8f2ba90": "ffec126c6bfda0bcc1ee33fc3e64bcf3",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/e4/ae46c6286b2d6c6676b0c3192fc92876778498": "c1fb9fd9132eb732a1d95b1d7a283648",
".git/objects/20/cb2f80169bf29d673844d2bb6a73bc04f3bfb8": "b807949265987310dc442dc3f9f492a2",
".git/objects/20/1afe538261bd7f9a38bed0524669398070d046": "82a4d6c731c1d8cdc48bce3ab3c11172",
".git/objects/18/eb401097242a0ec205d5f8abd29a4c5e09c5a3": "4e08af90d04a082aab5eee741258a1dc",
".git/objects/89/513d94693ae8100315edbb982d7d243f5469f6": "1a977afa8c0dc3ca507a79160ba48a51",
".git/objects/73/65fd0ed328e88e402bbba6023b6b91ee23b64c": "4f1902fe574cb67988227dcf50c3899c",
".git/objects/74/fce7ebedfd2c5672db4da95384e96405f8ab30": "a254dbd92c883ac02f36a9e37a114f9e",
".git/objects/1a/32fed7a236fe577628dfc9a837795e2e816cc9": "dcf900d916a820ad31056a5ff43f057f",
".git/objects/1a/575f30ff85e37c734b05992948318430a5e0f3": "1473e0122ffb87b8fba402da8c55ed09",
".git/objects/8a/e74842465f5eeddc5d9a9b519097f648b27b14": "a80b0abba1450df330ae419e0d76dbb4",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/4c/01843ae6e0221c6ae825b7afe40aae31a9096f": "3146cb9fafbe38559d3a762dcd451ce7",
".git/objects/26/e15225fef47d41be1825fe66a03a6f2cdec312": "ff55c18babddfdd843a13557bf9ae07a",
".git/objects/75/52a4622ce6c00201521ce9eb2978483131f936": "ab1ed71ccf3292e29d7aa7b6df6ca4cc",
".git/objects/81/54e8abda5b94bc57a39f1ece315007debf389c": "9a6c67b111e2377fb4e69aa9009066a9",
".git/objects/81/795ed86d6d812c4e015675d45f04e3d21d1b90": "c22f4ee0fe3ec492bbb315b9566ace67",
".git/objects/72/746a78326f4895e279081c819f3f081ef975e4": "dae93d7ac8b3ae402da0f7c90a43a5f8",
".git/objects/2a/bf03542c17e6f7a7806a226c3be732b51c5a40": "4593012a42df8795cd0ae089a5b7aaaf",
".git/objects/2a/601a2b0a2743f1355d8d1c214cd53b0207faf8": "332fe0d4b3e7679eabd3114032bf84dc",
".git/objects/43/0dbe0068a0f8f7490e66bd7f498da23d81d7dc": "1a9d3e5ce6c17e8198961a6f255aba17",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/9f/0c71b70a49664ced448c63edc9c4ff2bf8cf4a": "bfe12b0c8078a4f477699ecebf5fd96c",
".git/objects/38/8504e4d35862e4ac1f00f9e94d5db4bcb04eb7": "783260a0568d27af76d66e287165145f",
".git/objects/00/18f535545d5c93c727910d29fbaf4984b82599": "20d404aac5e2407dd1a288061657d43a",
".git/objects/00/6a32927bf91cb0bcacfc738b0efc0e10dca3f0": "4d7fcfadd5e972f8d2530a2ed382115d",
".git/objects/6e/cb68683477ecc5aed38ec3fc8910d9bb66276c": "8081799c6f0d89b405c8cca2b18cd6da",
".git/objects/5c/17b943cfc41101b2b2113f56fbfd7a7795d39f": "05c7783be38aea655f39629747f309b6",
".git/objects/09/4bb6ae24f0cd847d40cb4cc4a2434f2ec9b83b": "b9e6d850322c11db635bcf0a45b762ff",
".git/objects/09/27b8133cfc1ed1c326677f8f1275fae4529606": "a610c88a483a5433f49298b8a9c2bfdc",
".git/objects/5d/36951e5cb7675103c1616eda6bc0413461c0b6": "896c3542c4d82af9eeedc5200d8b2acc",
".git/objects/31/8bb71c2a8d28000446fe827ebff35de1e349e0": "92f711ac63e16522e6633f28edae3b4a",
".git/objects/96/e2e81a3d1e00f2638000e2110075d3af23cfbe": "fa5d75dadf587cc64c82eaf9de652f15",
".git/objects/3a/15e64f71c746477573b4e53af6aa95a58b3282": "d549583dac947b1c5618f50c26c0cc0a",
".git/objects/3a/9817ca7aea8f16cbbc1a18ef16056ebacae30c": "da8073cb462abe445f4e511ec030b032",
".git/objects/5b/979039ab28aaae305074541fe39258753ba624": "d8d203e90bc2970b708c118fe10ca044",
".git/objects/6c/ce217ddc2efe3411dc9fa34e294e48e4cdf4f5": "8a6cc32e7f23f25e611213b06bb38448",
".git/objects/39/977a75e97c7c602be5b14a5ff27272e876cb0c": "fd255507d904c610456a427d98e9bead",
".git/objects/99/1c8979d168007b04f944492bb3d263764319ef": "c02590c7b7e8b8eada25f6c107e7ead2",
".git/objects/52/2dc3105c81c753c96ba7b0b0024c42301dee6f": "a9fa8f430f523f3f98fd2f2aced148cb",
".git/objects/55/f48a4180a9079502222e0bdbeca377d89211ae": "90a95cde9aa3bd67a2b4bbe3af0e9169",
".git/objects/63/8205b017f37457e215139752d7c44d604f1bf9": "50a43049a1a526b63b57747ff66739e7",
".git/objects/0f/d9750fff2a5cf30e48df50e13d5e5954c0ada7": "f607fce4d03ec263425e53e0685ed2ae",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/ba/dfac20851b13dbc9b76bd720f705c1b9b5f16c": "616e22149f8c14a0f950f3afc77645ac",
".git/objects/a0/22c0c72c8bcce7f00ceb877517a0e680a55d28": "b87b53ef3993ed5ca921ab530592fe5d",
".git/objects/b8/192836bf82ca1dbf8514fffc5d2c0161d8a734": "aaec6a5f90cd5b3238ec459a97b061d3",
".git/objects/b8/2dfd1b5ce3369c3b2882785c81a746b871e1b4": "22594bb5de2521237f052cff7f995fe9",
".git/objects/d5/80ce749ea55b12b92f5db7747290419c975070": "8b0329dbc6565154a5434e6a0f898fdb",
".git/objects/d2/2dd474412b5f103d3f15486ff77e1980f0f1e0": "a63786064b2db230ff5843f0b9b9ef55",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/a8/7a9902a9cfc82b08ed93504978f207722834ea": "262de3999990bc4fd0d0b33d764adae2",
".git/objects/b0/3d6369ad5c1575109a880ffb9ef12140722e15": "8d192a4cfc7f02fa4f7f8d1eb8670a48",
".git/objects/b0/b65b9cc57406f170d0941494dcdb719aa7c6ca": "ddc5d65531649f9e241071c4e555fdc2",
".git/objects/b0/8cb3c832944435ad9169cb2e514cbbe62920f3": "98386500dbe783f7779d52670064d232",
".git/objects/a6/74c3827cb72db6173519d597697e9a4eb7d439": "14fd98f99a80d43c6e909cfed0a406c1",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/ef/b874676c59df0684b8d5c49882282709c1ceac": "b61966f34f03933a686285e9e80c56dc",
".git/objects/ef/b0660c8a02ba0b8e0a9e8aa05e514c12db5543": "cc27f29a3a59a9c6663454c9afe39057",
".git/objects/cc/96dbd4a5c0d76a05a2d3ce695fb3da8126010e": "018d754ec3d403897d1ff5ea85cabe19",
".git/objects/e8/b983b36239112f55288a34ee9c87aae4e57a39": "42862f67f6d6561d3321b1e2b224e31b",
".git/objects/e8/ca5081fd4da3f3da86173580643abfc67d1291": "c74e01e55d0a694fa149b59578902c41",
".git/objects/f6/5396d93ef9d3155cfcf302dea05fda4a5a564b": "aaf4cc6c815f90f2243551efe8224e9c",
".git/objects/e7/6ec69a650f1323fe9af6dafc55628ca1afc7e1": "cdc851a64d802b21a07c9e1291833911",
".git/objects/f8/eab441ef05215b1cded7efd1524188590c610f": "c4868861d31c18857c84158ea00a46fa",
".git/objects/ce/ac75d75e6bcaf56823bacd051bd9f135af6f4a": "339275ef60385a218d05801d845443c2",
".git/objects/41/5c059c8094b888b0159fdedfd4e3cb08a8028e": "86914685ccd40e82a7fe5b70459fb9f7",
".git/objects/48/0230448a40b7bdb3b106afb9c153612e6e1df9": "6f8296be7c1e65328afcd101e38f1f0a",
".git/objects/24/0c8c154ce032faedc88924e482897fc9a929cd": "1c0b1da578f41b870b04eaba4eda6e83",
".git/objects/23/2718316e0ee3d72db6d62f4198e246e2836d82": "96f29133284a3aabe5f974bd17a87e2f",
".git/objects/8d/ce0185482913ff84844823c9462310aec2eb7c": "5e496ad7360cfc1792a72a86066d1533",
".git/objects/12/e9ad5dcc486a063d6f3480ca95cc07c3c5f629": "d1436da7a197e8317e48a9318449b7b6",
".git/objects/12/b318a2d82a1d6b3577ede0c13e73c00d39376f": "bf4037733fefc22051ca182b9d3bde25",
".git/objects/8c/99266130a89547b4344f47e08aacad473b14e0": "41375232ceba14f47b99f9d83708cb79",
".git/objects/71/9442d420a9c3d8df77d85b6f6ea1bc55bd39cc": "f0f785e8e884c8c1befbda9dcd273a1d",
".git/objects/71/3f932c591e8f661aa4a8e54c32c196262fd574": "66c6c54fbdf71902cb7321617d5fa33c",
".git/objects/76/b99fe954b8bb10c7d81ee7d36d128e7c1c03e1": "d0b004e9d87151457edec8766ab092d5",
".git/objects/76/0ff6af40e4946e3b2734c0e69a6e186ab4d8f4": "009b8f1268bb6c384d233bd88764e6f8",
".git/objects/1c/8f5e910bfb1a4a2871eeedc6eae01ca25e7ce1": "7d52f9ae3b3fac811829018aea2c668f",
".git/objects/49/adebdb511c8c293b28db3f6792e5bac28cdc32": "ba6a3971e7f06834fd6ec3844372ce17",
".git/objects/49/e6a2a3cc9c69e4617b1b9b0b2480dc8aaf65fd": "be3a178eb5ac656abf43591308d7b303",
".git/objects/40/f1694ba4c97cdfaaa99a6459feab9a24614586": "aca2ed34561ba1ba8fc7d7674cd50113",
".git/objects/7a/f9fb4420e3851e67c228388a491b908d08b63b": "c3fddd40d590a847ae43452253325766",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "c435468bc95357a6cf03361e4b955aa3",
".git/logs/refs/heads/main": "c435468bc95357a6cf03361e4b955aa3",
".git/logs/refs/remotes/web/main": "99183eb56eb120a33652c745d3f34aae",
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
".git/refs/heads/main": "4438f22f4bfa2dbbf4a5c015afc591d4",
".git/refs/remotes/web/main": "4438f22f4bfa2dbbf4a5c015afc591d4",
".git/index": "d4abdf536fa4e32f910f956a3bb44183",
".git/COMMIT_EDITMSG": "6dd15a721c133951ee7085a86623f638",
"assets/AssetManifest.json": "664ca1813d3c2235b5d3aef5495ea9ab",
"assets/NOTICES": "88a6337521278d531288f7f687dae81a",
"assets/FontManifest.json": "10bd3034ff8a0c834975558a1cade363",
"assets/AssetManifest.bin.json": "10e71fc454a53b25d3f9c0468297a7ea",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b93248a553f9e8bc17f1065929d5934b",
"assets/packages/iconsax/lib/assets/fonts/iconsax.ttf": "071d77779414a409552e0584dcbfd03d",
"assets/packages/flutter_vector_icons/fonts/Fontisto.ttf": "b49ae8ab2dbccb02c4d11caaacf09eab",
"assets/packages/flutter_vector_icons/fonts/Octicons.ttf": "8e7f807ef943bff1f6d3c2c6e0f3769e",
"assets/packages/flutter_vector_icons/fonts/Feather.ttf": "e766963327e0a89f9ec2ba88646b6177",
"assets/packages/flutter_vector_icons/fonts/Entypo.ttf": "744ce60078c17d86006dd0edabcd59a7",
"assets/packages/flutter_vector_icons/fonts/FontAwesome5_Brands.ttf": "13685372945d816a2b474fc082fd9aaa",
"assets/packages/flutter_vector_icons/fonts/MaterialCommunityIcons.ttf": "6a2ddad1092a0a1c326b6d0e738e682b",
"assets/packages/flutter_vector_icons/fonts/AntDesign.ttf": "3a2ba31570920eeb9b1d217cabe58315",
"assets/packages/flutter_vector_icons/fonts/Foundation.ttf": "e20945d7c929279ef7a6f1db184a4470",
"assets/packages/flutter_vector_icons/fonts/Ionicons.ttf": "b3263095df30cb7db78c613e73f9499a",
"assets/packages/flutter_vector_icons/fonts/FontAwesome5_Solid.ttf": "1ab236ed440ee51810c56bd16628aef0",
"assets/packages/flutter_vector_icons/fonts/FontAwesome5_Regular.ttf": "db78b9359171f24936b16d84f63af378",
"assets/packages/flutter_vector_icons/fonts/FontAwesome.ttf": "b06871f281fee6b241d60582ae9369b9",
"assets/packages/flutter_vector_icons/fonts/Zocial.ttf": "5cdf883b18a5651a29a4d1ef276d2457",
"assets/packages/flutter_vector_icons/fonts/EvilIcons.ttf": "140c53a7643ea949007aa9a282153849",
"assets/packages/flutter_vector_icons/fonts/SimpleLineIcons.ttf": "d2285965fe34b05465047401b8595dd0",
"assets/packages/flutter_vector_icons/fonts/MaterialIcons.ttf": "8ef52a15e44481b41e7db3c7eaf9bb83",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "5f26991d0a9f49bef4080f50e78e7edf",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/workinprogress.gif": "f91121c2506f00a1076144eb7707ddc9",
"assets/assets/images/banner.jpg": "25ace673d80d50a6ba3968c8691961bb",
"assets/assets/images/cala2.jpg": "9d6bacd193943a2fcd91fa5fdfe65ad4",
"assets/assets/images/resort.jpg": "625075676da91ca7711c9caf1fbf21f2",
"assets/assets/images/resort5.jpg": "236d35797b81f182e51fbdf550a1a2e6",
"assets/assets/images/resort4.jpg": "96d02e7b464c70474aa808e6c0f297f5",
"assets/assets/images/cala3.jpg": "55835e32a20d0d00a2dfdceced353f78",
"assets/assets/images/closed.png": "129ef4501271e15880289918d9f8035e",
"assets/assets/images/cala1.jpg": "c52847f5e1a99fe483f55050c48ff867",
"assets/assets/images/resort6.jpg": "55b72d906cfb57633e98083b3a5481d5",
"assets/assets/images/resort7.jpg": "d008e6ba8bcc8926869a991ce35b1a19",
"assets/assets/images/cala4.jpg": "2ce412c8415eece6390a5ba82d5951a3",
"assets/assets/images/resort3.jpg": "dd9b5019abbe2fd95432a0fafe35f76d",
"assets/assets/images/resort2.jpg": "f74bdede51e820a7cdbc126c6cb23e62",
"assets/assets/images/sandbg.jpg": "1570f23db96b7a2295cdd4acf8da8f7b",
"assets/assets/images/laiya.jpg": "12f32d1c05eaafaff63e14a2ea947b69",
"assets/assets/images/logo.png": "d25a1fbd1ab26dadfc66898b7b559e40",
"assets/assets/images/wave.jpg": "6e7e1e85c7759ed61eee7188ee8f683c",
"assets/assets/images/coccoons4.jpg": "9bc3bb2c62622dfb7b47d0f3104522d4",
"assets/assets/images/club-laiya.jpg": "bb1a411bc93e4286ac3520f50d25dc15",
"assets/assets/images/planeloading.gif": "bfd0fbd7b077bb2748e37853fbae58c2",
"assets/assets/images/sammy-line-searching.gif": "deb343fe59f59566d98cd14119aedd61",
"assets/assets/images/wave1.jpg": "9c8f7f698269bbe0495d714141818cac",
"assets/assets/images/bg1.jpg": "211db34e88e181dd2ed3f5c9fac71cf9",
"assets/assets/images/coccoons1.jpg": "7f543ebf9fdfc01b22c1ee2fbfe940c6",
"assets/assets/images/coccoons3.jpg": "e754a7b392c24b73324a6272c3db8e06",
"assets/assets/images/resort8.jpg": "423878e2465461097794135febe15796",
"assets/assets/images/coccoons2.jpg": "f1748c62979e1de72222a498696a2ea7",
"assets/assets/images/4931029.jpg": "36b68c5f26196dba1f0c64833d2e84e3",
"assets/assets/images/sammy-line-no-connection.gif": "58aedc14a78caa9edfccf3683a80a186",
"assets/assets/images/zen.png": "9676978d15debb38c9b8b50683aaba37",
"assets/assets/images/1.jpg": "7329acec12f64dd02525e6896c54a03e",
"assets/assets/images/whitebg.jpg": "7494241fab78b71eaacb8c9f414957d8",
"assets/assets/json_files/visitors.json": "07320c6c8c6bc2ad7eacb7e17b78b076",
"assets/assets/json_files/users.json": "65c2f7402be7f36c89ab257eb914b85e",
"assets/assets/json_files/resorts.json": "c21d3062ba142a510e81d1c63189bdb3",
"assets/assets/fonts/Montserrat/Montserrat-Light.ttf": "94fbe93542f684134cad1d775947ca92",
"assets/assets/fonts/Montserrat/Montserrat-Bold.ttf": "ed86af2ed5bbaf879e9f2ec2e2eac929",
"assets/assets/fonts/Montserrat/Montserrat-Black.ttf": "cce7ff8c1d7999f907b6760fbe75d99d",
"assets/assets/fonts/Montserrat/Montserrat-Regular.ttf": "5e077c15f6e1d334dd4e9be62b28ac75",
"assets/assets/fonts/Poppins/Poppins-ExtraLight.ttf": "6f8391bbdaeaa540388796c858dfd8ca",
"assets/assets/fonts/Poppins/Poppins-ThinItalic.ttf": "01555d25092b213d2ea3a982123722c9",
"assets/assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf": "a9bed017984a258097841902b696a7a6",
"assets/assets/fonts/Poppins/Poppins-Light.ttf": "fcc40ae9a542d001971e53eaed948410",
"assets/assets/fonts/Poppins/Poppins-Regular.ttf": "093ee89be9ede30383f39a899c485a82",
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
