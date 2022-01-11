const express = require("express");
const fetch = require("node-fetch");
const { multer, bucket, extendTimeout } = require("../config/config");

const router = express.Router();

router.get("/getPartners", (req, res, next) => {
    return getAdlibToken().then((result) => {
        if (result.status === "ok") {
            fetch("https://api-app.ad-lib.io/api/v2/partners", {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "no-cache",
                    pragma: "no-cache",
                    "sec-ch-ua":
                        '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    cookie: `connect.sid=${result.data};`,
                },
                referrer: "https://app.ad-lib.io/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: null,
                method: "GET",
                mode: "cors",
            })
                .then((response) =>
                    response
                        .json()
                        .then((data) => ({ status: response.status, body: data }))
                )
                .then((obj) => res.status(200).json(obj));
        }
    });
});

router.get("/getConcepts", (req, res, next) => {
    return getAdlibToken().then((result) => {
        if (result.status === "ok") {
            fetch(
                "https://api-app.ad-lib.io/api/v2/assets/concepts?partnerId=" +
                req.query.pId,
                {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-US,en;q=0.9",
                        "cache-control": "no-cache",
                        pragma: "no-cache",
                        "sec-ch-ua":
                            '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        cookie: `connect.sid=${result.data};`,
                    },
                    referrer: "https://app.ad-lib.io/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: null,
                    method: "GET",
                    mode: "cors",
                }
            )
                .then((response) =>
                    response
                        .json()
                        .then((data) => ({ status: response.status, body: data }))
                )
                .then((obj) => res.status(200).json(obj));
        }
    });
});

router.get("/getCreatives", (req, res, next) => {
    return getAdlibToken().then((result) => {
        if (result.status === "ok") {
            let allData = [];
            fetch(
                `https://api-app.ad-lib.io/api/v2/assets/concepts/${req.query.cId}?partnerId=${req.query.pId}`,
                {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-US,en;q=0.9",
                        "cache-control": "no-cache",
                        pragma: "no-cache",
                        "sec-ch-ua":
                            '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        cookie: `connect.sid=${result.data};`,
                    },
                    referrer: "https://app.ad-lib.io/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: null,
                    method: "GET",
                    mode: "cors",
                }
            )
                .then((response) =>
                    response
                        .json()
                        .then((data) => ({ status: response.status, body: data }))
                )
                .then((obj) => {
                    alterCreative(obj, req, result).then((a)=>console.log(a));
                    res.status(200).json(obj);
                });
        }
    });
});

router.post("/upload", extendTimeout, multer.any(), (req, res, next) => {
    return res.status(200).json(req.files);
});

async function getAdlibToken () {
    var details = {
        username: "ciano@ad-lib.io",
        password: "W4d1w4dz",
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var loginRequest = await fetch("https://api-app.ad-lib.io/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody,
    });

    var responseHeaders = loginRequest.headers;
    var responseCookies = responseHeaders.get("set-cookie");
    var loginCookie = responseCookies.substr(
        responseCookies.indexOf("connect.sid=") + 12,
        responseCookies.indexOf(";") -
        (responseCookies.indexOf("connect.sid=") + 12)
    );
    console.log(loginCookie);
    return { status: "ok", data: loginCookie };
}

async function alterCreative (obj, req, result) {
    let c = [];
    let testF =  obj.body.templates.map(async (data) => {
        let res = await fetch(
            `https://api-app.ad-lib.io/api/v2/assets/templates/${data.generation}/versions?partnerId=${req.query.pId}`,
            {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "no-cache",
                    pragma: "no-cache",
                    "sec-ch-ua":
                        '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    cookie: `connect.sid=${result.data};`,
                },
                referrer: "https://app.ad-lib.io/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: null,
                method: "GET",
                mode: "cors",
            }
        )

        return await c.push({ generation: data.generation, data: res.json()});
    });

    return await testF;
}

module.exports = router;
