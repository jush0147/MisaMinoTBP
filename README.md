# MisaMinoTBP
Version of MisaMino supporting [TBP protocol](https://github.com/tetris-bot-protocol/tbp-spec). Intended for use on the web by compiling into WebAssembly using Emscripten SDK. This is a fork of command line version of [MisaMinoBot](https://github.com/jezevec10/MisaMinoBot) which is a fork of [MisaMino by misakamm](https://github.com/misakamm/MisaMino).

## Compile
The easiest way to compile is using the Emscripten docker image.
```
cd MisaMinoTBP
docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) emscripten/emsdk bash -c "emcmake cmake . && make"
```

## How to use
Compilation will produce misamino.js and misamino.wasm in build.emscripten directory. File misaImport.js in the same directory can be used in a WebWorker.
```js
var a = new Worker("/build.emscripten/misaImport.js");
a.onmessage = (m) => {
    console.log(m.data);
}
```

Now you can use `postMessage()` to send TBP commands to this worker:
```
a.postMessage({"type":"start","hold":null,"queue":["I","T","I","L","O","Z"],"combo":0,"back_to_back":false,"board":[[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]]});
a.postMessage({"type":"suggest"});
```

And misamino will respond:
```json
{
    "type": "suggestion",
    "moves": [
        {
            "location": {
                "orientation": "east",
                "type": "T",
                "x": 0,
                "y": 1
            },
            "spin": "none"
        }
    ]
}
```

## Depends on
[nlohmann/json](https://github.com/nlohmann/json) - json for C++, by Niels Lohmann. Loaded via CMake.

