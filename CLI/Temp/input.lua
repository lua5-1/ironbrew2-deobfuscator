local d = string.byte
local i = string.char
local c = string.sub
local g = table.concat
local s = math.ldexp
local H = getfenv or function()
        return _ENV
    end
local l = setmetatable
local u = select
local f = unpack
local h = tonumber
local function b(d)
    local e, o, t = "", "", {}
    local a = 256
    local n = {}
    for l = 0, a - 1 do
        n[l] = i(l)
    end
    local l = 1
    local function r()
        local e = h(c(d, l, l), 36)
        l = l + 1
        local o = h(c(d, l, l + e - 1), 36)
        l = l + e
        return o
    end
    e = i(r())
    t[1] = e
    while l < #d do
        local l = r()
        if n[l] then
            o = n[l]
        else
            o = e .. c(e, 1, 1)
        end
        n[a] = e .. c(o, 1, 1)
        t[#t + 1], e, a = o, o, a + 1
    end
    return table.concat(t)
end
local r =
    b(
    "1127427415275161926P27221I19274121H27B21E1H274171H27K21D27K111727E1121H27T13275121427523523722W233239121D27522122S2312312321X22E23223723122T1W"
)
local n = bit and bit.bxor or function(l, e)
        local o, n = 1, 0
        while l > 0 and e > 0 do
            local c, a = l % 2, e % 2
            if c ~= a then
                n = n + o
            end
            l, e, o = (l - c) / 2, (e - a) / 2, o * 2
        end
        if l < e then
            l = e
        end
        while l > 0 do
            local e = l % 2
            if e > 0 then
                n = n + o
            end
            l, o = (l - e) / 2, o * 2
        end
        return n
    end
local function e(o, l, e)
    if e then
        local l = (o / 2 ^ (l - 1)) % 2 ^ ((e - 1) - (l - 1) + 1)
        return l - l % 1
    else
        local l = 2 ^ (l - 1)
        return (o % (l + l) >= l) and 1 or 0
    end
end
local l = 1
local function o()
    local a, o, c, e = d(r, l, l + 3)
    a = n(a, 1)
    o = n(o, 1)
    c = n(c, 1)
    e = n(e, 1)
    l = l + 4
    return (e * 16777216) + (c * 65536) + (o * 256) + a
end
local function t()
    local e = n(d(r, l, l), 1)
    l = l + 1
    return e
end
local function b()
    local n = o()
    local l = o()
    local c = 1
    local n = (e(l, 1, 20) * (2 ^ 32)) + n
    local o = e(l, 21, 31)
    local l = ((-1) ^ e(l, 32))
    if (o == 0) then
        if (n == 0) then
            return l * 0
        else
            o = 1
            c = 0
        end
    elseif (o == 2047) then
        return (n == 0) and (l * (1 / 0)) or (l * (0 / 0))
    end
    return s(l, o - 1023) * (c + (n / (2 ^ 52)))
end
local a = o
local function h(e)
    local o
    if (not e) then
        e = a()
        if (e == 0) then
            return ""
        end
    end
    o = c(r, l, l + e - 1)
    l = l + e
    local e = {}
    for l = 1, #o do
        e[l] = i(n(d(c(o, l, l)), 1))
    end
    return g(e)
end
local l = o
local function r(...)
    return {...}, u("#", ...)
end
local function i()
    local d = {0, 0, 0, 0}
    local l = {}
    local c = {}
    local a = {d, nil, l, nil, c}
    a[4] = t()
    for e = 1, o() do
        l[e - 1] = i()
    end
    for a = 1, o() do
        local c = n(o(), 6)
        local o = n(o(), 54)
        local n = e(c, 1, 2)
        local l = e(o, 1, 11)
        local l = {l, e(c, 3, 11), nil, nil, o}
        if (n == 0) then
            l[3] = e(c, 12, 20)
            l[5] = e(c, 21, 29)
        elseif (n == 1) then
            l[3] = e(o, 12, 33)
        elseif (n == 2) then
            l[3] = e(o, 12, 32) - 1048575
        elseif (n == 3) then
            l[3] = e(o, 12, 32) - 1048575
            l[5] = e(c, 21, 29)
        end
        d[a] = l
    end
    local l = o()
    local o = {0, 0}
    for n = 1, l do
        local e = t()
        local l
        if (e == 0) then
            l = (t() ~= 0)
        elseif (e == 2) then
            l = b()
        elseif (e == 3) then
            l = h()
        end
        o[n] = l
    end
    a[2] = o
    return a
end
local function h(l, e, a)
    local e = l[1]
    local o = l[2]
    local c = l[3]
    local l = l[4]
    return function(...)
        local h = e
        local n = o
        local e = c
        local o = l
        local l = r
        local c = 1
        local t = -1
        local i = {}
        local d = {...}
        local r = u("#", ...) - 1
        local l = {}
        local e = {}
        for l = 0, r do
            if (l >= o) then
                i[l - o] = d[l + 1]
            else
                e[l] = d[l + 1]
            end
        end
        local l = r - o + 1
        local l
        local o
        while true do
            l = h[c]
            o = l[1]
            if o <= 3 then
                if o <= 1 then
                    if o > 0 then
                        e[l[2]] = a[n[l[3]]]
                    else
                        do
                            return
                        end
                    end
                elseif o > 2 then
                    local o = l[2]
                    local c = {}
                    local n = 0
                    local l = o + l[3] - 1
                    for l = o + 1, l do
                        n = n + 1
                        c[n] = e[l]
                    end
                    e[o](f(c, 1, l - o))
                    t = o
                else
                    do
                        return
                    end
                end
            elseif o <= 5 then
                if o > 4 then
                    e[l[2]] = n[l[3]]
                else
                    e[l[2]] = a[n[l[3]]]
                end
            elseif o > 6 then
                e[l[2]] = n[l[3]]
            else
                local o = l[2]
                local c = {}
                local n = 0
                local l = o + l[3] - 1
                for l = o + 1, l do
                    n = n + 1
                    c[n] = e[l]
                end
                e[o](f(c, 1, l - o))
                t = o
            end
            c = c + 1
        end
    end
end
return h(i(), {}, H())()
