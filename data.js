/* ============================================================
   Animeog — shared data & rendering helpers
   Loaded by index.html, watch.html and channel.html
   ============================================================ */

// ===== Lazy image loading =====
// Loads an <img>'s real source only once it scrolls near the viewport (works for
// vertical grids AND horizontal sliders), instead of every image in a page/slider
// fetching at once. Falls back to loading immediately if the browser has no
// IntersectionObserver support.
const _lazyImageObserver = ('IntersectionObserver' in window) ? new IntersectionObserver(function(entries, obs) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) { img.src = src; img.removeAttribute('data-src'); }
            obs.unobserve(img);
        }
    });
}, { rootMargin: '150px' }) : null;

function lazyObserve(img) {
    if (_lazyImageObserver) {
        _lazyImageObserver.observe(img);
    } else {
        const src = img.getAttribute('data-src');
        if (src) { img.src = src; img.removeAttribute('data-src'); }
    }
}

// Converts "MM:SS" into "H:MM:SS" when minutes exceed 59 (fixes unrealistic durations like "171:46")
function formatDuration(durStr) {
    if (!durStr || durStr.indexOf(':') === -1) return durStr;
    const parts = durStr.split(':').map(Number);
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return durStr;
    const totalMinutes = parts[0], seconds = parts[1];
    if (totalMinutes < 60) return durStr;
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return h + ':' + String(m).padStart(2,'0') + ':' + String(seconds).padStart(2,'0');
}

const games = [
  { title:"All Episodes", epCount:8, subDub:"sub", img:"https://i.postimg.cc/SxZqWnXg/shirakawa-ayane-and-shirakawa-kotone-overflow-drawn-by-nyaa-nnekoron-sample-aa6637be16de73edd95cd.jpg", views:"186,897 Total views", episodes:[{title:"Episode 1",date:"2020-01-06",duration:"7:20",thumbnail:"https://i.postimg.cc/yxnjngkr/Picsart-26-08-26-10-04-13-449.jpg"},{title:"Episode 2",date:"2020-01-06",duration:"6:56",thumbnail:"https://i.postimg.cc/Hn3z3cVf/Picsart-26-08-26-10-04-37-023.jpg"},{title:"Episode 3",date:"2020-01-06",duration:"7:26",thumbnail:"https://i.postimg.cc/gj4s4Xn7/Picsart-26-08-26-10-04-53-635.jpg"},{title:"Episode 4",date:"2020-01-06",duration:"7:35",thumbnail:"https://i.postimg.cc/brLgLDsW/Picsart-26-08-26-10-05-08-510.jpg"},{title:"Episode 5",date:"2020-01-06",duration:"6:35",thumbnail:"https://i.postimg.cc/kGwsw62r/Picsart-26-08-26-10-05-57-874.jpg"},{title:"Episode 6",date:"2020-01-06",duration:"6:53",thumbnail:"https://i.postimg.cc/C5J7JBR0/Picsart-26-08-26-10-06-20-538.jpg"},{title:"Episode 7",date:"2020-01-06",duration:"7:15",thumbnail:"https://i.postimg.cc/GtzKz84b/Picsart-26-08-26-10-06-50-557.jpg"},{title:"Episode 8",date:"2020-01-06",duration:"7:05",thumbnail:"https://i.postimg.cc/Y08R8GvC/Picsart-26-08-26-10-07-20-993.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"dub", img:"https://i.postimg.cc/3J1HTkZ3/1-(2).jpg", views:"219,367 Total views", episodes:[{title:"Video",date:"2023-05-02",duration:"19:31",thumbnail:"https://i.postimg.cc/N09hmpq3/Screenshot-2026-06-28-07-47-01-597-com-videoplayer-arcplayer-edit.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"dub", img:"https://i.postimg.cc/tCdVqhrT/1-(3).webp", views:"236,684 Total views", episodes:[{title:"Episode 1",date:"2025-10-31",duration:"16:25",thumbnail:"https://i.postimg.cc/fb1b0kbc/compressed-1787831496017.jpg"},{title:"Episode 2",date:"2025-10-31",duration:"16:32",thumbnail:"https://i.postimg.cc/xdBdbqdM/compressed-1787831496119.jpg"}] },
  { title:"All Episodes", epCount:6, subDub:"dub", img:"https://i.postimg.cc/5tzXrLQh/1-(1).webp", views:"226,578 Total views", episodes:[{title:"Episode 1",date:"2019-02-01",duration:"16:21",thumbnail:"https://i.postimg.cc/KY1zztm3/compressed-1787831495605.jpg"},{title:"Episode 2",date:"2019-02-01",duration:"16:35",thumbnail:"https://i.postimg.cc/3wzwDWwv/compressed-1787831496168.jpg"},{title:"Episode 3",date:"2019-02-01",duration:"16:26",thumbnail:"https://i.postimg.cc/QMFttcjN/compressed-1787831495803.jpg"},{title:"Episode 4",date:"2019-02-01",duration:"15:57",thumbnail:"https://i.postimg.cc/5tX008f8/compressed-1787831495234.jpg"},{title:"Episode 5",date:"2019-02-01",duration:"16:53",thumbnail:"https://i.postimg.cc/s2MXX53D/compressed-1787831495852.jpg"},{title:"Episode 6",date:"2019-02-01",duration:"16:46",thumbnail:"https://i.postimg.cc/7LjLTbLT/compressed-1787831496219.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"sub", img:"https://i.postimg.cc/nhjrsB2v/IMG-20251208-183610-957.jpg", views:"139,496 Total views", episodes:[{title:"Video",date:"2014-08-29",duration:"38:54",thumbnail:"https://i.postimg.cc/wM9Sf0vP/gallery-ep-1-1-(7).webp"}] },
  { title:"All Episodes", epCount:4, subDub:"sub", img:"https://i.postimg.cc/C5rM5xfm/2.jpg", views:"125,574 Total views", episodes:[{title:"Episode 1",date:"2018-02-02",duration:"16:32",thumbnail:"https://i.postimg.cc/jjD55yRQ/compressed-1787831495388.jpg.jpg"},{title:"Episode 2",date:"2018-02-02",duration:"16:50",thumbnail:"https://i.postimg.cc/pdmTTKPR/compressed-1787831495966.jpg"},{title:"Episode 3",date:"2018-02-02",duration:"16:32",thumbnail:"https://i.postimg.cc/bv4v2dv1/compressed-1787831496067.jpg"},{title:"Episode 4",date:"2018-02-02",duration:"16:32",thumbnail:"https://i.postimg.cc/Bvj662Jb/compressed-1787831495670.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/qRkpG3c0/1-(3).jpg", views:"175,578 Total views", episodes:[{title:"Episode 1",date:"2016-02-26",duration:"16:14",thumbnail:"https://i.postimg.cc/25166nCW/compressed-1787831496385.jpg"},{title:"Episode 2",date:"2016-02-26",duration:"16:46",thumbnail:"https://i.postimg.cc/k5244W7y/compressed-1787831496287.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/3NzMz4Gy/1.webp", views:"146,589 Total views", episodes:[{title:"Episode 1",date:"2023-10-06",duration:"16:20",thumbnail:"https://i.postimg.cc/xdXCCL93/compressed-1787831496336.jpg"},{title:"Episode 2",date:"2023-10-06",duration:"16:05",thumbnail:"https://i.postimg.cc/pdmTTKPT/compressed-1787831495530.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/3xXqKbp3/succubus-yondara-haha-ga-kita-manga-Anime-02.jpg", views:"176,566 Total views", episodes:[{title:"Episode 1",date:"2022-11-04",duration:"16:30",thumbnail:"https://i.postimg.cc/hGXjjVK8/compressed-1787831495330.jpg"},{title:"Episode 2",date:"2022-11-04",duration:"19:26",thumbnail:"https://i.postimg.cc/yNDdd07N/compressed-1787831495736.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"dub", img:"https://i.postimg.cc/MGWtD6LQ/1-(4).webp", views:"186,523 Total views", episodes:[{title:"Episode 1",date:"2019-07-05",duration:"16:12",thumbnail:"https://i.postimg.cc/rpDmm5qw/compressed-1787831495904.jpg"},{title:"Episode 2",date:"2019-07-05",duration:"16:46",thumbnail:"https://i.postimg.cc/SKnsscm2/compressed-1787831495442.jpg"}] },
  { title:"All Episodes", epCount:10, subDub:"sub", img:"https://i.postimg.cc/g2BqvV3M/1-(2).webp", views:"143,597 Total views", episodes:[{title:"Episode 1",date:"2021-04-30",duration:"19:22",thumbnail:"https://i.postimg.cc/rwDPspRY/compressed-1787833271182.jpg"},{title:"Episode 2",date:"2021-04-30",duration:"19:20",thumbnail:"https://i.postimg.cc/Z5WMnqvV/compressed-1787833271068.jpg"},{title:"Episode 3",date:"2021-04-30",duration:"17:21",thumbnail:"https://i.postimg.cc/nhXPrLQ8/compressed-1787833271421.jpg"},{title:"Episode 4",date:"2021-04-30",duration:"20:32",thumbnail:"https://i.postimg.cc/0yhHwq7H/compressed-1787833271560.jpg"},{title:"Episode 5",date:"2021-04-30",duration:"21:30",thumbnail:"https://i.postimg.cc/13bYqZD7/compressed-1787833271626.jpg"},{title:"Episode 6",date:"2021-04-30",duration:"17:13",thumbnail:"https://i.postimg.cc/9QsN7jG3/compressed-1787833271745.jpg"},{title:"Episode 7",date:"2021-04-30",duration:"18:40",thumbnail:"https://i.postimg.cc/9QDn0fqh/compressed-1787833271493.jpg"},{title:"Episode 8",date:"2021-04-30",duration:"19:32",thumbnail:"https://i.postimg.cc/MpgrQ814/compressed-1787833271680.jpg"},{title:"Episode 9",date:"2021-04-30",duration:"16:36",thumbnail:"https://i.postimg.cc/QdFyCMKv/compressed-1787833271310.jpg"},{title:"Episode 10",date:"2021-04-30",duration:"23:41",thumbnail:"https://i.postimg.cc/cLvbCJ8y/compressed-1787833271235.jpg"}] },
  { title:"All Episodes", epCount:6, subDub:"sub", img:"https://i.postimg.cc/wvztJM4f/b-Eq-Pb-Yfo-NT0Gm0Hl-Bj6fo-A5cyr-EJVv-Ki3R0Vvp-LI6y4Aj-S5FIHy-Ez7PI11Fmp-Sw.webp", views:"136,855 Total views", episodes:[{title:"Episode 1",date:"2020-05-22",duration:"16:12",thumbnail:"https://i.postimg.cc/x8C4mG1g/compressed-1787834580080.jpg"},{title:"Episode 2",date:"2020-05-22",duration:"16:32",thumbnail:"https://i.postimg.cc/0jBH06zm/compressed-1787834580227.jpg"},{title:"Episode 3",date:"2020-05-22",duration:"16:35",thumbnail:"https://i.postimg.cc/prT6jQLC/compressed-1787834580483.jpg"},{title:"Episode 4",date:"2020-05-22",duration:"16:10",thumbnail:"https://i.postimg.cc/QCty7gd9/compressed-1787834580926.jpg"},{title:"Episode 5",date:"2020-05-22",duration:"16:52",thumbnail:"https://i.postimg.cc/rsPYNdDC/compressed-1787834581028.jpg"},{title:"Episode 6",date:"2020-05-22",duration:"16:23",thumbnail:"https://i.postimg.cc/tJTM6d4h/compressed-1787834580578.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"dub", img:"https://i.postimg.cc/WzgW7rC9/1-(5).webp", views:"175,895 Total views", episodes:[{title:"Episode 1",date:"2022-02-04",duration:"16:40",thumbnail:"https://i.postimg.cc/x8C4mG1H/compressed-1787834580750.jpg"},{title:"Episode 2",date:"2022-02-04",duration:"16:03",thumbnail:"https://i.postimg.cc/5yRkSHXB/compressed-1787834581192.jpg"}] },
  { title:"All Episodes", epCount:6, subDub:"sub", img:"https://i.postimg.cc/DZbB2L2D/1-(6).webp", views:"175,963 Total views", episodes:[{title:"Episode 1",date:"2023-09-01",duration:"16:12",thumbnail:"https://i.postimg.cc/L5XbPk8B/compressed-1787834580675.jpg"},{title:"Episode 2",date:"2023-09-01",duration:"16:32",thumbnail:"https://i.postimg.cc/Y0syz4v3/compressed-1787834581104.jpg"},{title:"Episode 3",date:"2023-09-01",duration:"16:35",thumbnail:"https://i.postimg.cc/x8C4mG1v/compressed-1787834580836.jpg"},{title:"Episode 4",date:"2023-09-01",duration:"16:10",thumbnail:"https://i.postimg.cc/zvcPFLyT/compressed-1787834580370.jpg"},{title:"Episode 5",date:"2023-09-01",duration:"16:52",thumbnail:"https://i.postimg.cc/1XjYrg80/compressed-1787834581334.jpg"},{title:"Episode 6",date:"2023-09-01",duration:"16:23",thumbnail:"https://i.postimg.cc/rsmP4Gwf/compressed-1787834581479.jpg"}] },
  { title:"All Episodes", epCount:3, subDub:"sub", img:"https://i.postimg.cc/DwjgLB0R/1-(7).webp", views:"210,856 Total views", episodes:[{title:"Episode 1",date:"2022-03-25",duration:"21:30",thumbnail:"https://i.postimg.cc/Y0SRvpCF/compressed-1787836152588.jpg"},{title:"Episode 2",date:"2022-03-25",duration:"22:26",thumbnail:"https://i.postimg.cc/C5K7RFxz/compressed-1787836152260.jpg"},{title:"Episode 2",date:"2022-03-25",duration:"24:52",thumbnail:"https://i.postimg.cc/0jNnz8yr/compressed-1787836152322.jpg"}] },
  { title:"All Episodes", epCount:4, subDub:"sub", img:"https://i.postimg.cc/Jz2NG0dm/1-(8).webp", views:"148,863 Total views", episodes:[{title:"Episode 1",date:"2021-07-02",duration:"16:30",thumbnail:"https://i.postimg.cc/FzKpY9HL/compressed-1787836152530.jpg"},{title:"Episode 2",date:"2021-07-02",duration:"16:32",thumbnail:"https://i.postimg.cc/kG5s2ngG/compressed-1787836152382.jpg"},{title:"Episode 3",date:"2021-07-02",duration:"16:54",thumbnail:"https://i.postimg.cc/brFTbKZd/compressed-1787836152840.jpg"},{title:"Episode 4",date:"2021-07-02",duration:"15:42",thumbnail:"https://i.postimg.cc/J0dqJ9sG/compressed-1787836152944.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"sub", img:"https://i.postimg.cc/bNYkgk7j/1-(9).webp", views:"145,962 Total views", episodes:[{title:"Video",date:"2021-01-29",duration:"16:45",thumbnail:"https://i.postimg.cc/BbvpjqnD/compressed-1787836152655.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"dub", img:"https://i.postimg.cc/jjf72X7X/1-(10).webp", views:"129,856 Total views", episodes:[{title:"Episode 1",date:"2016-08-19",duration:"15:29",thumbnail:"https://i.postimg.cc/FzKpY9Hk/compressed-1787836152462.jpg"},{title:"Episode 2",date:"2016-08-19",duration:"16:56",thumbnail:"https://i.postimg.cc/2yXwvP16/compressed-1787836152786.jpg"}] },
  { title:"All Episodes", epCount:4, subDub:"sub", img:"https://i.postimg.cc/Znw92sGY/1-(11).webp", views:"149,856 Total views", episodes:[{title:"Episode 1",date:"2024-06-28",duration:"16:12",thumbnail:"https://i.postimg.cc/ZnDc31Wq/compressed-1787836152722.jpg"},{title:"Episode 2",date:"2024-06-28",duration:"16:36",thumbnail:"https://i.postimg.cc/tJm5PLsJ/compressed-1787836152893.jpg"},{title:"Episode 3",date:"2024-06-28",duration:"16:52",thumbnail:"https://i.postimg.cc/d306hqVV/compressed-1787836152105.jpg"},{title:"Episode 4",date:"2024-06-28",duration:"16:35",thumbnail:"https://i.postimg.cc/GtpK4cm2/compressed-1787836152203.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"dub", img:"https://i.postimg.cc/d0GhwVbk/1-(12).webp", views:"236,857 Total views", episodes:[{title:"Video",date:"2025-07-01",duration:"16:53",thumbnail:"https://i.postimg.cc/jSBRTMTT/Screenshot-2026-08-13-07-02-18-950-com-videoplayer-arcplayer-edit.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"dub", img:"https://i.postimg.cc/7hRHgvv1/1-(13).webp", views:"220,855 Total views", episodes:[{title:"Video",date:"2021-01-05",duration:"16:42",thumbnail:"https://i.postimg.cc/hvHhYcps/gallery-ep-1-3-(5).webp"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/Yq9T4p63/RDT-20260628-1622347901441389776326849.webp", views:"196,825 Total views", episodes:[{title:"Episode 1",date:"2020-05-29",duration:"16:14",thumbnail:"https://i.postimg.cc/Pxrh5F0P/compressed-1787837729494.jpg"},{title:"Episode 2",date:"2020-05-29",duration:"16:22",thumbnail:"https://i.postimg.cc/W3bj1fxm/compressed-1787837729983.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/ydjrd5kV/1-(14).webp", views:"147,854 Total views", episodes:[{title:"Episode 1",date:"2020-12-18",duration:"18:26",thumbnail:"https://i.postimg.cc/Pxrh5F0W/compressed-1787837730041.jpg"},{title:"Episode 2",date:"2020-12-18",duration:"19:25",thumbnail:"https://i.postimg.cc/W47TjPYk/compressed-1787837729792.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/KYr0qV7h/1-(15).webp", views:"132,854 Total views", episodes:[{title:"Episode 1",date:"2023-07-07",duration:"16:37",thumbnail:"https://i.postimg.cc/C1LYx698/compressed-1787837730174.jpg"},{title:"Episode 2",date:"2023-07-07",duration:"16:54",thumbnail:"https://i.postimg.cc/cH4ZL5PC/compressed-1787837729607.jpg"}] },
  { title:"All Episodes", epCount:3, subDub:"sub", img:"https://i.postimg.cc/5Nhpx1n1/1-(16).webp", views:"142,954 Total views", episodes:[{title:"Episode 1",date:"2024-11-29",duration:"16:10",thumbnail:"https://i.postimg.cc/6QhtwNbZ/compressed-1787837729867.jpg"},{title:"Episode 2",date:"2024-11-29",duration:"16:15",thumbnail:"https://i.postimg.cc/9MFVQNsR/compressed-1787837730300.jpg"},{title:"Episode 3",date:"2024-11-29",duration:"16:29",thumbnail:"https://i.postimg.cc/3wZY7Hfp/compressed-1787837729718.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"dub", img:"https://i.postimg.cc/ncn5bDbC/compressed-1787838080457.jpg", views:"174,854 Total views", episodes:[{title:"Episode 1",date:"2019-05-31",duration:"21:52",thumbnail:"https://i.postimg.cc/vHGjFVFD/compressed-1787838080313.jpg"},{title:"Episode 2",date:"2019-05-31",duration:"20:36",thumbnail:"https://i.postimg.cc/SNm5FMFs/compressed-1787838080538.jpg"}] },
  { title:"All Episodes", epCount:4, subDub:"sub", img:"https://i.postimg.cc/5ydXCSqK/ab14d0a8-93f7-4660-8d21-eb912a265394.jpg", views:"112,824 Total views", episodes:[{title:"Episode 1",date:"2021-02-05",duration:"16:34",thumbnail:"https://i.postimg.cc/Y9qkCyTY/compressed-1787837730111.jpg"},{title:"Episode 2",date:"2021-02-05",duration:"16:28",thumbnail:"https://i.postimg.cc/Jn4mzdSk/compressed-1787837730242.jpg"},{title:"Episode 3",date:"2021-02-05",duration:"16:39",thumbnail:"https://i.postimg.cc/TwYG3HBh/compressed-1787837730353.jpg"},{title:"Episode 4",date:"2021-02-05",duration:"16:42",thumbnail:"https://i.postimg.cc/CK4SYVrz/compressed-1787837729929.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/63Rdg3HJ/4198388-jpg.webp", views:"196,548 Total views", episodes:[{title:"Episode 1",date:"2022-04-28",duration:"16:36",thumbnail:"https://i.postimg.cc/5tmb1MKL/compressed-1787837729662.jpg"},{title:"Episode 2",date:"2022-04-28",duration:"16:56",thumbnail:"https://i.postimg.cc/tTCy4m8s/compressed-1787837730417.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/k5njbrsN/compressed-1787841957106.jpg", views:"145,535 Total views", episodes:[{title:"Episode 1",date:"2006-02-24",duration:"21:32",thumbnail:"https://i.postimg.cc/pLQGrVfW/compressed-1787841956720.jpg"},{title:"Episode 2",date:"2006-02-24",duration:"20:25",thumbnail:"https://i.postimg.cc/nhKRrV4H/compressed-1787841956658.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"sub", img:"https://i.postimg.cc/qR3vG61z/1-(22).webp", views:"123,845 Total views", episodes:[{title:"Video",date:"June 22, 2026",duration:"17:56",thumbnail:"https://i.postimg.cc/6qDTPtYk/mayohiga-no-onee-san-the-animation-1-Yaep-NLWv-Fv.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"sub", img:"https://i.postimg.cc/2SVhhpHx/1-(23).webp", views:"120,845 Total views", episodes:[{title:"Video",date:"June 22, 2026",duration:"16:37",thumbnail:"https://i.postimg.cc/N0XXC6vC/Screenshot-2026-07-14-13-40-14-570-com-brave-browser.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"dub", img:"https://i.postimg.cc/YSPXYff8/pic-001.jpg", views:"148,545 Total views", episodes:[{title:"Video",date:"June 22, 2026",duration:"27:31",thumbnail:"https://i.postimg.cc/C5Tm6h2S/Screenshot-2026-07-14-13-35-54-768-com-brave-browser.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"dub", img:"https://i.postimg.cc/yYrSVQVm/1-(24).webp", views:"213,555 Total views", episodes:[{title:"Video",date:"June 22, 2026",duration:"29:54",thumbnail:"https://i.postimg.cc/9fy4YcyZ/Screenshot-2026-07-14-13-44-43-121-com-brave-browser.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/L81hmmCC/Jashin-Shoukan-Inran-Kyonyuu-Oyako-Ikenie-Gishiki-Chapter-1.avif", views:"162,553 Total views", episodes:[{title:"Episode 1",date:"2021-09-03",duration:"16:39",thumbnail:"https://i.postimg.cc/Hk0ZnWw4/compressed-1787841957252.jpg"},{title:"Episode 2",date:"2021-09-03",duration:"16:35",thumbnail:"https://i.postimg.cc/pTqLsrry/Jashin-Shoukan-Inran-Kyonyuu-Oyako-Ikenie-Gishiki-Chapter-178.avif"}] },
  { title:"All Episodes", epCount:4, subDub:"sub", img:"https://i.postimg.cc/t4dSJR3B/compressed-1787841957455.jpg", views:"136,825 Total views", episodes:[{title:"Episode 1",date:"2025-09-26",duration:"16:56",thumbnail:"https://i.postimg.cc/Qdg4CNQK/compressed-1787841956203.jpg"},{title:"Episode 2",date:"2025-09-26",duration:"16:35",thumbnail:"https://i.postimg.cc/kgN1GMQ4/compressed-1787841956466.jpg"},{title:"Episode 3",date:"2025-09-26",duration:"16:35",thumbnail:"https://i.postimg.cc/CxprwnqR/compressed-1787841955734.jpg"},{title:"Episode 4",date:"2025-09-26",duration:"16:14",thumbnail:"https://i.postimg.cc/SxLTRQ6K/compressed-1787841956527.jpg"}] },
  { title:"All Episodes", epCount:6, subDub:"dub", img:"https://i.postimg.cc/PJ3vvPh3/1-(25).webp", views:"215,548 Total views", episodes:[{title:"Episode 1",date:"2022-07-01",duration:"16:02",thumbnail:"https://i.postimg.cc/L8kC54tP/compressed-1787841957799.jpg"},{title:"Episode 2",date:"2022-07-01",duration:"16:41",thumbnail:"https://i.postimg.cc/K87qjcPj/compressed-1787841956405.jpg"},{title:"Episode 3",date:"2022-07-01",duration:"16:35",thumbnail:"https://i.postimg.cc/GmngbTyH/compressed-1787841955845.jpg"},{title:"Episode 4",date:"2022-07-01",duration:"16:14",thumbnail:"https://i.postimg.cc/jS6g2qHJ/compressed-1787841956146.jpg"},{title:"Episode 5",date:"2022-07-01",duration:"16:28",thumbnail:"https://i.postimg.cc/y8Cp73ZY/compressed-1787841955912.jpg"},{title:"Episode 6",date:"2022-07-01",duration:"16:05",thumbnail:"https://i.postimg.cc/nhfSn9DM/compressed-1787841956969.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/BZLjmQqh/Kyonyuu-Elf-Oyako-Saimin-08-END-(siganos-ge-ren-fan-yi-Chapter-1.avif", views:"145,596 Total views", episodes:[{title:"Episode 1",date:"2022-01-01",duration:"16:28",thumbnail:"https://i.postimg.cc/K8hpm3M3/compressed-1787841956840.jpg"},{title:"Episode 2",date:"2022-01-01",duration:"16:25",thumbnail:"https://i.postimg.cc/3xjSNrXp/compressed-1787841955996.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"dub", img:"https://i.postimg.cc/Gt8TYb2c/Gsj-So-ra0AAZthp.jpg(siganos-ge-ren-fan-yi-Chapter-1.avif", views:"208,525 Total views", episodes:[{title:"Episode 1",date:"2020-06-05",duration:"16:19",thumbnail:"https://i.postimg.cc/Qdg4CNQd/compressed-1787841956594.jpg"},{title:"Episode 2",date:"2020-06-05",duration:"16:15",thumbnail:"https://i.postimg.cc/t4dSJR3Z/compressed-1787841956266.jpg"}] },
  { title:"All Episodes", epCount:6, subDub:"sub", img:"https://i.postimg.cc/wj0Lsqck/1-(26).webp(siganos-ge-ren-fan-yi-Chapter-1.avif", views:"136,544 Total views", episodes:[{title:"Episode 1",date:"2021-08-06",duration:"16:40",thumbnail:"https://i.postimg.cc/5257y9BC/compressed-1787841956071.jpg"},{title:"Episode 2",date:"2021-08-06",duration:"15:29",thumbnail:"https://i.postimg.cc/8zdKckR7/compressed-1787841956329.jpg"},{title:"Episode 3",date:"2021-08-06",duration:"16:38",thumbnail:"https://i.postimg.cc/rw2ZqRr0/compressed-1787841956779.jpg"},{title:"Episode 4",date:"2021-08-06",duration:"16:20",thumbnail:"https://i.postimg.cc/Nj8JFG6b/compressed-1787841957196.jpg"},{title:"Episode 5",date:"2021-08-06",duration:"16:32",thumbnail:"https://i.postimg.cc/Nj8JFG61/compressed-1787841957665.jpg"},{title:"Episode 6",date:"2021-08-06",duration:"16:15",thumbnail:"https://i.postimg.cc/y8Cp73Zx/compressed-1787841956905.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/v85s8cb0/Kyonyuu-Princess-Saimin-Gesen-na-Anata-no-Mono-o-Nchu-Njurururu-Rero-Shabuttari-Suru-Mono-d.avif", views:"185,525 Total views", episodes:[{title:"Episode 1",date:"2020-04-03",duration:"16:54",thumbnail:"https://i.postimg.cc/Nj8JFG6m/compressed-1787841957732.jpg"},{title:"Episode 2",date:"2020-04-03",duration:"16:15",thumbnail:"https://i.postimg.cc/Jz3607NQ/compressed-1787841957606.jpg"}] },
  { title:"All Episodes", epCount:6, subDub:"sub", img:"https://i.postimg.cc/3NMnxJ9Q/Boku-ni-Sefure-ga-Dekita-Riyuu-6-Chapter-1.avif(siganos-ge-ren-fan-yi-Chapter-1.avif", views:"196,525 Total views", episodes:[{title:"Episode 1",date:"2022-10-07",duration:"16:58",thumbnail:"https://i.postimg.cc/Qdpwxhmf/compressed-1787877040290.jpg"},{title:"Episode 2",date:"2022-10-07",duration:"15:53",thumbnail:"https://i.postimg.cc/nLp5XgS2/compressed-1787877040727.jpg"},{title:"Episode 3",date:"2022-10-07",duration:"16:30",thumbnail:"https://i.postimg.cc/N0BVKSC6/compressed-1787877040453.jpg"},{title:"Episode 4",date:"2022-10-07",duration:"16:28",thumbnail:"https://i.postimg.cc/GmkVhdKJ/compressed-1787877041225.jpg"},{title:"Episode 5",date:"2022-10-07",duration:"16:05",thumbnail:"https://i.postimg.cc/bvpMZWV9/compressed-1787877040562.jpg"},{title:"Episode 6",date:"2022-10-07",duration:"15:15",thumbnail:"https://i.postimg.cc/5tbGXTKs/compressed-1787877040848.jpg"}] },
  { title:"All Episodes", epCount:4, subDub:"sub", img:"https://i.postimg.cc/3xK7w3bm/Nikuyome-Takayanagike-no-Hitobito-yu-wang-ren-qi-Chapter-1.avif", views:"214,855 Total views", episodes:[{title:"Episode 1",date:"2005-08-25",duration:"27:35",thumbnail:"https://i.postimg.cc/43sMYq20/compressed-1787877039728.jpg"},{title:"Episode 2",date:"2005-08-25",duration:"25:36",thumbnail:"https://i.postimg.cc/xdn7XhpH/compressed-1787877040238.jpg"},{title:"Episode 3",date:"2005-08-25",duration:"24:12",thumbnail:"https://i.postimg.cc/BnxkQ4pM/compressed-1787877040187.jpg"},{title:"Episode 4",date:"2005-08-25",duration:"23:45",thumbnail:"https://i.postimg.cc/q74YNSDD/compressed-1787877039612.jpg"}] },
  { title:"All Episodes", epCount:6, subDub:"sub", img:"https://i.postimg.cc/kG4K9r3j/1-(27).webp", views:"162,245 Total views", episodes:[{title:"Episode 1",date:"2021-10-01",duration:"00:00",thumbnail:"https://i.postimg.cc/ht96Pcs1/compressed-1787877041168.jpg"},{title:"Episode 2",date:"2021-10-01",duration:"16:14",thumbnail:"https://i.postimg.cc/DznDSHpR/compressed-1787877039836.jpg"},{title:"Episode 3",date:"2021-10-01",duration:"16:36",thumbnail:"https://i.postimg.cc/7Lwc5dQr/compressed-1787877039903.jpg"},{title:"Episode 4",date:"2021-10-01",duration:"16:19",thumbnail:"https://i.postimg.cc/25rJ1M9K/compressed-1787877039673.jpg"},{title:"Episode 5",date:"2021-10-01",duration:"16:02",thumbnail:"https://i.postimg.cc/nLp5XgSg/compressed-1787877039777.jpg"},{title:"Episode 6",date:"2021-10-01",duration:"16:45",thumbnail:"https://i.postimg.cc/2S4M8rGT/compressed-1787877040141.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/KcJC5t9r/image-1.png", views:"205,536 Total views", episodes:[{title:"Episode 1",date:"2024-01-26",duration:"17:15",thumbnail:"https://i.postimg.cc/13p25sBH/compressed-1787877040030.jpg"},{title:"Episode 2",date:"2024-01-26",duration:"16:45",thumbnail:"https://i.postimg.cc/PqTcC9VF/compressed-1787877039518.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/3wt2qrzk/anehame-ore-no-hatsukoi-ga-jisshi-na-wake-ga-nai-light-novel-1.webp", views:"132,596 Total views", episodes:[{title:"Episode 1",date:"2021-12-24",duration:"16:14",thumbnail:"https://i.postimg.cc/3wY6kVb5/compressed-1787877039970.jpg"},{title:"Episode 2",date:"2021-12-24",duration:"15:34",thumbnail:"https://i.postimg.cc/s2s8MqH7/compressed-1787877040342.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/RZjkQ6RC/1-(28).webp", views:"142,855 Total views", episodes:[{title:"Episode 1",date:"2023-11-10",duration:"15:40",thumbnail:"https://i.postimg.cc/pLD4XRC8/compressed-1787877040988.jpg"},{title:"Episode 2",date:"2023-11-10",duration:"19:24",thumbnail:"https://i.postimg.cc/W4TKdCY6/compressed-1787877040509.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"sub", img:"https://i.postimg.cc/wMZ28J30/1-(29).webp", views:"152,536 Total views", episodes:[{title:"Video",date:"2017-05-26",duration:"24:29",thumbnail:"https://i.postimg.cc/c1bXnqT6/gallery-ep-1-0-(3).webp"}] },
  { title:"All Episodes", epCount:1, subDub:"sub", img:"https://i.postimg.cc/X7ndqs6w/Class-de-Otoko-wa-Boku-Hitori-1-Chapter-1.avif", views:"136,533 Total views", episodes:[{title:"Video",date:"2023-03-03",duration:"15:43",thumbnail:"https://i.postimg.cc/Jz2kTmDb/gallery-ep-1-4-(2).webp"}] },
  { title:"All Episodes", epCount:4, subDub:"dub", img:"https://i.postimg.cc/ydBYjrPc/ccdn0001.jpg", views:"136,854 Total views", episodes:[{title:"Episode 1",date:"2024-12-13",duration:"18:02",thumbnail:"https://i.postimg.cc/FKNqY8Cx/compressed-1787877040617.jpg"},{title:"Episode 2",date:"2024-12-13",duration:"18:29",thumbnail:"https://i.postimg.cc/8zh9PN44/compressed-1787877040088.jpg"},{title:"Episode 3",date:"2024-12-13",duration:"19:52",thumbnail:"https://i.postimg.cc/pdR7m4cZ/compressed-1787877040671.jpg"},{title:"Episode 4",date:"2024-12-13",duration:"17:57",thumbnail:"https://i.postimg.cc/3xgVJY1X/compressed-1787877041053.jpg"}] },
  { title:"All Episodes", epCount:4, subDub:"sub", img:"https://i.postimg.cc/xdPSfjvL/1-(30).webp", views:"152,726 Total views", episodes:[{title:"Episode 1",date:"2010-11-26",duration:"17:35",thumbnail:"https://i.postimg.cc/jjt9Dm3Z/compressed-1787877040790.jpg"},{title:"Episode 2",date:"2010-11-26",duration:"17:23",thumbnail:"https://i.postimg.cc/pdR7m4cK/compressed-1787877040395.jpg"},{title:"Episode 3",date:"2010-11-26",duration:"16:36",thumbnail:"https://i.postimg.cc/dV8ptw68/compressed-1787877041109.jpg"},{title:"Episode 4",date:"2010-11-26",duration:"17:34",thumbnail:"https://i.postimg.cc/jjt9Dm3g/compressed-1787877040932.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/MpKbTqj0/1-(6).jpg", views:"149,515 Total views", episodes:[{title:"Episode 1",date:"2017-09-08",duration:"16:35",thumbnail:"https://i.postimg.cc/htmr9f8f/compressed-1787908104962.jpg"},{title:"Episode 2",date:"2017-09-08",duration:"17:24",thumbnail:"https://i.postimg.cc/rF3j0S4X/compressed-1787908105273.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/QtrFFJnz/ccdn0001-(1).jpg", views:"126,264 Total views", episodes:[{title:"Episode 1",date:"2013-02-15",duration:"24:21",thumbnail:"https://i.postimg.cc/qMSwh83P/compressed-1787908105083.jpg"},{title:"Episode 2",date:"2013-02-15",duration:"24:46",thumbnail:"https://i.postimg.cc/htmr9f8c/compressed-1787908104342.jpg"}] },
  { title:"All Episodes", epCount:3, subDub:"sub", img:"https://i.postimg.cc/4NMNK1Yw/1-(31).webp", views:"128,752 Total views", episodes:[{title:"Episode 1",date:"2013-04-19",duration:"24:35",thumbnail:"https://i.postimg.cc/6pZ0dyVw/compressed-1787908104243.jpg"},{title:"Episode 2",date:"2013-04-19",duration:"23:40",thumbnail:"https://i.postimg.cc/yYtjgFRC/compressed-1787908105207.jpg"},{title:"Episode 3",date:"2013-04-19",duration:"22:08",thumbnail:"https://i.postimg.cc/3JV14gG7/compressed-1787908105467.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/N0QhLykm/1-(32).webp", views:"175,854 Total views", episodes:[{title:"Episode 1",date:"2022-07-08",duration:"20:12",thumbnail:"https://i.postimg.cc/K8TNnR7v/compressed-1787908104589.jpg"},{title:"Episode 2",date:"2022-07-08",duration:"19:24",thumbnail:"https://i.postimg.cc/vHkhgWVj/compressed-1787908105022.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"dub", img:"https://i.postimg.cc/tTY9CZ9v/1-(33).webp", views:"146,843 Total views", episodes:[{title:"Video",date:"2014-02-28",duration:"20:04",thumbnail:"https://i.postimg.cc/dVCB8LRh/compressed-1787908104834.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/sx5dv5qH/1-(34).webp", views:"165,428 Total views", episodes:[{title:"Episode 1",date:"2016-01-01",duration:"17:52",thumbnail:"https://i.postimg.cc/tCwkZh60/compressed-1787908105146.jpg"},{title:"Episode 2",date:"2016-01-01",duration:"17:58",thumbnail:"https://i.postimg.cc/2SWw4VdS/compressed-1787908104750.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"sub", img:"https://i.postimg.cc/wBnGL7hs/p0001.jpg", views:"146,844 Total views", episodes:[{title:"Video",date:"2015-12-04",duration:"17:07",thumbnail:"https://i.postimg.cc/qvKL8zcf/compressed-1787908104034.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/rw3JY7K2/2-(1).jpg", views:"132,545 Total views", episodes:[{title:"Episode 1",date:"2024-04-05",duration:"17:32",thumbnail:"https://i.postimg.cc/0ySfpbGQ/compressed-1787908104899.jpg"},{title:"Episode 2",date:"2024-04-05",duration:"16:34",thumbnail:"https://i.postimg.cc/y8RPFkhN/compressed-1787908104661.jpg"}] },
  { title:"All Episodes", epCount:4, subDub:"dub", img:"https://i.postimg.cc/283nR2pj/1-(35).webp", views:"146,256 Total views", episodes:[{title:"Episode 1",date:"2021-04-23",duration:"20:23",thumbnail:"https://i.postimg.cc/rw4JSKGq/compressed-1787908104434.jpg"},{title:"Episode 2",date:"2021-04-23",duration:"19:30",thumbnail:"https://i.postimg.cc/jdmcwzfT/compressed-1787908105409.jpg"},{title:"Episode 3",date:"2021-04-23",duration:"19:38",thumbnail:"https://i.postimg.cc/rw4JSKG8/compressed-1787908104511.jpg"},{title:"Episode 4",date:"2021-04-23",duration:"19:56",thumbnail:"https://i.postimg.cc/zX67bnh8/compressed-1787908105534.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"dub", img:"https://i.postimg.cc/rFdRYsWQ/1-(36).webp", views:"136,826 Total views", episodes:[{title:"Episode 1",date:"2017-08-25",duration:"16:43",thumbnail:"https://i.postimg.cc/L6wDYzPp/compressed-1787908105343.jpg"},{title:"Episode 2",date:"2017-08-25",duration:"16:28",thumbnail:"https://i.postimg.cc/Pr9ypmDr/compressed-1787908105596.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"dub", img:"https://i.postimg.cc/bJFPN5MY/Picsart-26-08-18-07-38-23-994.jpg", views:"185,655 Total views", episodes:[{title:"Video",date:"2025-06-27",duration:"16:32",thumbnail:"https://i.postimg.cc/Sx9RJj1c/compressed-1787958702392.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"dub", img:"https://i.postimg.cc/90Rh4p52/Picsart-26-08-18-07-46-35-481.jpg", views:"172,946 Total views", episodes:[{title:"Episode 1",date:"2018-06-01",duration:"16:20",thumbnail:"https://i.postimg.cc/bNWdy1gx/compressed-1787958703336.jpg"},{title:"Episode 2",date:"2018-06-01",duration:"15:12",thumbnail:"https://i.postimg.cc/pLjrpycz/compressed-1787958702329.jpg"}] },
  { title:"All Episodes", epCount:6, subDub:"sub", img:"https://i.postimg.cc/gjXWwDFY/Picsart-26-08-18-07-53-32-728.jpg", views:"152,543 Total views", episodes:[{title:"Episode 1",date:"2024-08-30",duration:"16:02",thumbnail:"https://i.postimg.cc/y8RxkWpg/compressed-1787958703646.jpg"},{title:"Episode 2",date:"2024-08-30",duration:"16:32",thumbnail:"https://i.postimg.cc/YqZjrQRW/compressed-1787958703030.jpg"},{title:"Episode 3",date:"2024-08-30",duration:"16:52",thumbnail:"https://i.postimg.cc/5NTj48gw/compressed-1787958703150.jpg"},{title:"Episode 4",date:"2024-08-30",duration:"16:34",thumbnail:"https://i.postimg.cc/HkMnVjvy/compressed-1787958702199.jpg"},{title:"Episode 5",date:"2024-08-30",duration:"16:41",thumbnail:"https://i.postimg.cc/Qd7CHVYp/compressed-1787958702466.jpg"},{title:"Episode 6",date:"2024-08-30",duration:"15:32",thumbnail:"https://i.postimg.cc/y8RxkWph/compressed-1787958702648.jpg"}] },
  { title:"All Episodes", epCount:1, subDub:"sub", img:"https://i.postimg.cc/90Rh4p5F/Picsart-26-08-18-07-57-13-836.jpg", views:"165,856 Total views", episodes:[{title:"Video",date:"2025-06-27",duration:"16:23",thumbnail:"https://i.postimg.cc/NjXF5LC2/compressed-1787958703587.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/90Rh4p5q/Picsart-26-08-18-08-04-18-358.jpg", views:"175,843 Total views", episodes:[{title:"Episode 1",date:"2024-09-27",duration:"15:52",thumbnail:"https://i.postimg.cc/J4vtrjxc/compressed-1787958703462.jpg"},{title:"Episode 2",date:"2024-09-27",duration:"15:08",thumbnail:"https://i.postimg.cc/Pr9NX1y1/compressed-1787958703217.jpg"}] },
  { title:"All Episodes", epCount:3, subDub:"sub", img:"https://i.postimg.cc/D0JTWgkL/Picsart-26-08-18-08-07-06-485.jpg", views:"152,656 Total views", episodes:[{title:"Episode 1",date:"2020-01-31",duration:"25:32",thumbnail:"https://i.postimg.cc/qvKqzgDn/compressed-1787958702257.jpg"},{title:"Episode 2",date:"2020-01-31",duration:"21:21",thumbnail:"https://i.postimg.cc/htmvfhZL/compressed-1787958702525.jpg"},{title:"Episode 3",date:"2020-01-31",duration:"24:03",thumbnail:"https://i.postimg.cc/qvKqzgDw/compressed-1787958702702.jpg"}] },
  { title:"All Episodes", epCount:4, subDub:"sub", img:"https://i.postimg.cc/D0JTWgkd/Picsart-26-08-18-08-08-27-088.jpg", views:"142,943 Total views", episodes:[{title:"Episode 1",date:"2015-12-11",duration:"16:21",thumbnail:"https://i.postimg.cc/4xcymn2b/compressed-1787958702580.jpg"},{title:"Episode 2",date:"2015-12-11",duration:"16:26",thumbnail:"https://i.postimg.cc/wjNM7340/compressed-1787958702900.jpg"},{title:"Episode 3",date:"2015-12-11",duration:"16:41",thumbnail:"https://i.postimg.cc/JzX0GtYB/compressed-1787958702075.jpg"},{title:"Episode 4",date:"2015-12-11",duration:"16:53",thumbnail:"https://i.postimg.cc/P5DJPNVK/compressed-1787958702971.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/D09K1XnG/Picsart-26-08-18-08-12-36-027.jpg", views:"179,546 Total views", episodes:[{title:"Episode 1",date:"2017-06-30",duration:"16:52",thumbnail:"https://i.postimg.cc/XY5qpX1g/compressed-1787958702765.jpg"},{title:"Episode 2",date:"2017-06-30",duration:"16:45",thumbnail:"https://i.postimg.cc/bwnrsdV9/compressed-1787958702838.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/MHC81Qqy/Picsart-26-08-18-08-14-28-873.jpg", views:"165,946 Total views", episodes:[{title:"Episode 1",date:"2017-12-01",duration:"16:35",thumbnail:"https://i.postimg.cc/HsRjYbzM/compressed-1787958703087.jpg"},{title:"Episode 2",date:"2017-12-01",duration:"17:36",thumbnail:"https://i.postimg.cc/WbCtN08g/compressed-1787958703276.jpg"}] },
  { title:"All Episodes", epCount:2, subDub:"sub", img:"https://i.postimg.cc/VvxcXCmW/Picsart-26-08-18-08-20-59-671.jpg", views:"176,946 Total views", episodes:[{title:"Episode 1",date:"2017-10-06",duration:"16:15",thumbnail:"https://i.postimg.cc/Fs81r0pV/compressed-1787958703527.jpg"},{title:"Episode 2",date:"2017-10-06",duration:"16:05",thumbnail:"https://i.postimg.cc/NfSLsRD8/compressed-1787958703395.jpg"}] }
];

// Uses each episode's own real data (thumbnail/date/duration) directly when the
// stored `episodes` array already has one entry per episode. Only falls back to
// synthetic generation (reusing a single template) for legacy anime that still
// have just one stored episode object despite epCount being higher.
function generateEpisodes(game) {
    if (game._episodesCache) return game._episodesCache;
    const count = Math.max(1, game.epCount || (game.episodes ? game.episodes.length : 1));

    if (game.episodes && game.episodes.length >= count) {
        game._episodesCache = game.episodes.slice(0, count).map(function(ep, i) {
            return {
                title: ep.title || ('Episode ' + (i + 1)),
                date: ep.date || '',
                duration: formatDuration(ep.duration || ''),
                thumbnail: ep.thumbnail || game.img
            };
        });
        return game._episodesCache;
    }

    const template = (game.episodes && game.episodes[0]) ? game.episodes[0] : {};
    const parsedDate = template.date ? new Date(template.date) : null;
    const hasValidDate = parsedDate && !isNaN(parsedDate.getTime());
    const list = [];
    for (let i = 0; i < count; i++) {
        const epNum = i + 1;
        let dateLabel = template.date || '';
        if (hasValidDate) {
            const d = new Date(parsedDate);
            d.setDate(d.getDate() - (count - epNum) * 7);
            dateLabel = d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
        }
        list.push({
            title: 'Episode ' + epNum,
            date: dateLabel,
            duration: formatDuration(template.duration || ''),
            thumbnail: template.thumbnail || game.img
        });
    }
    game._episodesCache = list;
    return list;
}

// Builds one anime poster card. Clicking it navigates to watch.html for that anime.
function createAnimeCard(game, index, targetContainer) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Open ' + game.epCount + ' episode ' + (game.subDub === 'dub' ? 'dubbed' : 'subbed') + ' anime');
    card.onclick = function(){ window.location.href = 'watch.html?id=' + index; };
    card.onkeydown = function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = 'watch.html?id=' + index; } };
    const duration = game.episodes[0] ? formatDuration(game.episodes[0].duration || '') : '';
    const views = game.views ? game.views.replace(' Total views', '') : '';
    const imgWrap = document.createElement('div');
    imgWrap.style.cssText = 'position:relative;width:100%;';
    const img = document.createElement('img');
    img.setAttribute('data-src', game.img);
    img.decoding = 'async';
    img.draggable = false;
    img.oncontextmenu = function(){ return false; };
    img.alt = game.epCount + ' episode ' + (game.subDub === 'dub' ? 'dubbed' : 'subbed') + ' anime cover';
    img.onerror = function(){ this.onerror = null; this.src = 'https://via.placeholder.com/300x450/1A1A24/FF2D55?text=Animeog'; };
    imgWrap.appendChild(img);
    lazyObserve(img);
    const hdBadge = document.createElement('span');
    hdBadge.className = 'hd-badge';
    hdBadge.textContent = 'HD';
    imgWrap.appendChild(hdBadge);
    if (game.epCount) {
        const epBadge = document.createElement('span');
        epBadge.className = 'ep-badge';
        epBadge.textContent = game.epCount + (game.epCount === 1 ? ' EP' : ' EPs');
        imgWrap.appendChild(epBadge);
    }
    if (views) {
        const vBadge = document.createElement('span');
        vBadge.textContent = '👁 ' + views;
        vBadge.style.cssText = 'position:absolute;bottom:7px;left:7px;background:rgba(0,0,0,0.82);color:#fff;font-size:11px;font-weight:600;padding:2px 7px;border-radius:4px;pointer-events:none;';
        imgWrap.appendChild(vBadge);
    }
    if (duration) {
        const dBadge = document.createElement('span');
        dBadge.textContent = duration;
        dBadge.style.cssText = 'position:absolute;bottom:7px;right:7px;background:rgba(0,0,0,0.82);color:#fff;font-size:11px;font-weight:600;padding:2px 7px;border-radius:4px;pointer-events:none;';
        imgWrap.appendChild(dBadge);
    }
    card.appendChild(imgWrap);
    targetContainer.appendChild(card);
}

// Shared side-menu open/close (used on every page that includes the menu markup)
function openSideMenu() {
    const m = document.getElementById('sideMenu');
    const o = document.getElementById('sideMenuOverlay');
    if (m) m.classList.add('open');
    if (o) o.classList.add('open');
}
function closeSideMenu() {
    const m = document.getElementById('sideMenu');
    const o = document.getElementById('sideMenuOverlay');
    if (m) m.classList.remove('open');
    if (o) o.classList.remove('open');
}
