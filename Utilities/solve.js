module.exports = function(Bytestring, PrimaryXorKey) {
    if (Bytestring.includes("\\")) { // No Compression
        return Buffer.from(Bytestring.slice(1).split("\\").map((Byte) => Byte ^ PrimaryXorKey));
    } else { // Compression
        const Dictionary = Array.from({length: 256}, (Value, Index) => String.fromCharCode(Index));
        const Output = [];
        let Marker = 0;
        let Previous = String.fromCharCode(Read());

        Output.push(Previous);

        function Read() {
            const Length = parseInt(Bytestring[Marker], 36);
            Marker++;
            const Value = parseInt(Bytestring.slice(Marker, Marker + Length), 36);
            Marker += Length;
            return Value;
        }

        while (Marker < Bytestring.length) {
            const Entry = Read();
            const Word = Dictionary[Entry] ?? (Previous + Previous[0]);

            Dictionary.push(Previous + Word[0]);
            Output.push(Word);
            Previous = Word;
        }

        return Buffer.from(Output.flatMap((Word) => Array.from(Word, (Char) => Char.charCodeAt() ^ PrimaryXorKey)));
    }
};