const FS = require("fs");
const Path = `./Temp`;
const Deobfuscator = require("../index");

return Deobfuscator(FS.readFileSync(`${Path}/input.lua`, "utf-8"), function(LuaC) {
    try {
        FS.writeFileSync(`${Path}/luac.out`, LuaC);
        console.log(`Saved to ${Path}/luac.out`);
    } catch {
        throw `Failed writing to ${Path}/luac.out!`;
    }
})